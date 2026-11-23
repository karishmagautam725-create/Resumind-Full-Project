from pydantic import BaseModel,Field
class ResumeAnalysisResult(BaseModel):
    ats_score : int = Field(description="ATS score from 0 to 100")
    grammer_score:int=Field(description="Grammer score from 0 to 100")
    keyword_score: int=Field(description="Keyword score from 0 to 100")
    match_score : int =Field(description="Resume and job description match score from 0 to 100")
    missing_keyword : list[str]=Field(description="Important keywords missing from the resume")
    strengths : list[str] = Field(description="Important strengths found in the resume")
    weakness : list[str]=Field(description="Important weaknesses found in the resume")
    suggestion : list[str]=Field(description="Suggestions for improving the resume")
