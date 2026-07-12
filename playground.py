

from services.ats_service import clean_text, detect_experience, detect_sections,extract_keywords


resume_text = """
SKILLS
Python Django PostgreSQL

PROJECTS
AI Resume Analyzer

EXPERIENCE
2 years experience
"""

print(clean_text(resume_text))
print(extract_keywords(resume_text))
print(detect_sections(resume_text))
print(detect_experience(resume_text))