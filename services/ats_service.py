from collections import defaultdict
import re

SKILLS_DATABASE = {
    "backend": {
        "python": 10,
        "django": 10,
        "fastapi": 9,
        "flask": 8,
        "rest": 7,
        "api": 7,
        "celery": 8,
    },

    "frontend": {
        "javascript": 8,
        "react": 9,
        "html": 5,
        "css": 5,
        "tailwind": 6,
    },

    "database": {
        "postgresql": 9,
        "mysql": 8,
        "sqlite": 5,
        "mongodb": 7,
        "redis": 8,
    },

    "devops": {
        "docker": 9,
        "kubernetes": 10,
        "aws": 9,
        "linux": 7,
        "nginx": 6,
        "github": 5,
        "git": 5,
    }
}

ALL_SKILLS={}
for category, skills in SKILLS_DATABASE.items():
    ALL_SKILLS.update(skills)


def clean_text(text):

    text = text.lower()

    text = re.sub(r"[^\w\s]", " ", text)

    text = re.sub(r"\s+", " ", text).strip()

    return text


def extract_keywords(text):

    cleaned_text = clean_text(text)

    words = set(cleaned_text.split())
    extracted_keyword=[]
    for skill in ALL_SKILLS.keys():
        if skill in words:
            extracted_keyword.append(skill)
    return set(extracted_keyword)
    
#Section Detection

def detect_sections(text):
    cleaned_text=clean_text(text)
    sections={
        "skills":False,
        "projects":False,
        "experience":False,
        "education":False,
        "certifications":False,
    }
    section_keywords={
        "skills": ["skills", "technical skills"],
        "projects": ["projects", "personal projects"],
        "experience": ["experience", "work experience"],
        "education": ["education", "academic"],
        "certifications": ["certifications", "certificates"],
    }
    for section,keywords in section_keywords.items():
        for keyword in keywords:
            if keyword in cleaned_text:
                sections[section]=True
                break
    return sections

#Detect Experience
def detect_experience(text):
    cleaned_text=clean_text(text)
    patterns = [
        r"(\d+)\+?\s+years",
        r"(\d+)\+?\s+year",
        r"(\d+)\+?\s+yrs",
        r"(\d+)\+?\s+yr",
    ]
    detected_years=[]
    for pattern in patterns:
        matches=re.findall(pattern,cleaned_text)
        for match in matches:
            detected_years.append(int(match))
    if not detected_years:
        return 0
    return max(detected_years)

# =========================================================
# MATCHED KEYWORDS
# =========================================================

def get_matched_keywords(
    resume_keywords,
    job_keywords
):

    return list(
        resume_keywords.intersection(job_keywords)
    )


# =========================================================
# MISSING KEYWORDS
# =========================================================

def get_missing_keywords(
    resume_keywords,
    job_keywords
):

    return list(
        job_keywords.difference(resume_keywords)
    )
    

#Category Analysis

def analyze_skill_categories(matched_keyword):
    category_scores=defaultdict(int)
    for category,skills in SKILLS_DATABASE.items():
        for skill in matched_keyword:
            if skill in skills:
                category_scores[category]+=1
    return dict(category_scores)

#WEIGHTED ATS SCORE
def calculate_weighted_ats_score(matched_keyword, job_keyword):
    total_weight=0
    matched_weight=0

    for keyword in job_keyword:
        weight=ALL_SKILLS.get(keyword,1)
        total_weight+=weight
        if keyword in matched_keyword:
            matched_weight+=weight
    if total_weight==0:
        return 0;
    score=(matched_weight/total_weight)*100
    return round(score,2)


def generate_feedback(
    ats_score,
    missing_keywords,
    detected_sections,
    experience_years,
):

    feedback = []

    # ATS SCORE FEEDBACK

    if ats_score < 40:
        feedback.append(
            "Resume has low ATS match percentage"
        )

    elif ats_score < 70:
        feedback.append(
            "Resume has moderate ATS match percentage"
        )

    else:
        feedback.append(
            "Strong ATS match score"
        )

    # MISSING SKILLS FEEDBACK

    if missing_keywords:

        feedback.append(
            f"Missing important skills: {', '.join(missing_keywords)}"
        )

    # SECTION FEEDBACK

    for section, exists in detected_sections.items():

        if not exists:

            feedback.append(
                f"Add {section} section in resume"
            )

    # EXPERIENCE FEEDBACK

    if experience_years == 0:

        feedback.append(
            "Experience information not detected"
        )

    elif experience_years < 2:

        feedback.append(
            "Try adding more project or internship experience"
        )

    return feedback



def analyze_resume(resume_text, job_description):

    resume_keywords = extract_keywords(resume_text)

    job_keywords = extract_keywords(job_description)

    matched_keywords= get_matched_keywords(resume_keywords,job_keywords)

    missing_keywords= get_missing_keywords(resume_keywords,job_keywords)

    
    # -----------------------------------------
    # SECTION DETECTION
    # -----------------------------------------

    detected_sections = detect_sections(
        resume_text
    )

    # -----------------------------------------
    # EXPERIENCE DETECTION
    # -----------------------------------------

    experience_years = detect_experience(
        resume_text
    )

    # -----------------------------------------
    # CATEGORY ANALYSIS
    # -----------------------------------------

    category_analysis = analyze_skill_categories(
        matched_keywords
    )

    # -----------------------------------------
    # ATS SCORE
    # -----------------------------------------

    ats_score = calculate_weighted_ats_score(
        matched_keywords,
        job_keywords
    )
    match_score = len(matched_keywords)
    # -----------------------------------------
    # FEEDBACK
    # -----------------------------------------

    feedback = generate_feedback(
        ats_score=ats_score,
        missing_keywords=missing_keywords,
        detected_sections=detected_sections,
        experience_years=experience_years,
    )

    # -----------------------------------------
    # FINAL RESPONSE
    # -----------------------------------------

    return {
        "ats_score": ats_score,

        "match_score": match_score,

        "missing_keywords": missing_keywords,

        "detected_sections": detected_sections,

        "experience_years": experience_years,

        "category_analysis": category_analysis,

        "feedback": feedback,
    }