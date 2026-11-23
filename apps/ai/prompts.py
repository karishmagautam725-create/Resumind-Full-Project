

from langchain_core.prompts import ChatPromptTemplate


RESUME_ANALYSIS_PROMPT = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are an expert ATS resume analyzer.

Analyze the resume against the job description.

Evaluate:
- ATS compatibility
- Job match
-Grammer Score
-Keyword Score
- Missing keywords
- Strengths
- Weaknesses
- Improvement suggestions

Only use information supported by the provided resume
and job description.
"""
        ),
        (
            "human",
            """
Resume:

{resume_text}


Job Description:

{job_description}
"""
        ),
    ]
)