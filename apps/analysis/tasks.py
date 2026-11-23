from celery import shared_task
from apps.resumes.models import Resume
from apps.analysis.models import ResumeAnalysis
from apps.jobs.models import JobDescription
import logging
# from rest_framework.response import Response
# from services.ats_service import analyze_resume
from core.cache import clear_dashboard_cache
from apps.ai.services import AIService
# from apps.ai.rag.retriever import retrieve_resume_context
logger = logging.getLogger("apps")
@shared_task(bind=True,autoretry_for=(Exception,),retry_backoff=True,retry_kwargs={"max_retries": 3})
def process_analysis(self,resume_id,job_id):
    logger.info(f"Resume analysis started for {resume_id}")
    try:
        resume=Resume.objects.get(id=resume_id)
        job=JobDescription.objects.get(id=job_id)
    except Resume.DoesNotExist:
                  logger.warning(f"Resume {resume_id} not found.")
                  return
    except JobDescription.DoesNotExist:
                  logger.warning(f"Resume {job_id} not found.")
                  return
    # analysis_result=analyze_resume(resume.extracted_text,job.job_description)
    try:
        # ai=AIService()
    #     documents=retrieve_resume_context(
    #            resume_id=resume.id,
    #            user_id=resume.user_id,
    #            query=job.job_description,
    #     )
    #     if not documents:
    #             raise ValueError(f"No RAG context found for resume {resume.id}. " "Check whether the resume was indexed."
    # )
        # context="\n \n".join(document.page_content for document in documents)
        # logger.info(f"Retrieved %s chunks for resume %s"," {len(documents)} chunks" f"for resume {resume.id}")
        ai=AIService()
        analysis_result = ai.analyze_resume(
            resume.extracted_text,
            job.job_description,

            # resume_context=context,
            # job_description=job.job_description,
        )

        report = ResumeAnalysis.objects.create(
            resume=resume,
            job_description=job,
            ats_score=analysis_result.ats_score,
            grammer_score=analysis_result.grammer_score,
            keyword_score=analysis_result.keyword_score,
            match_score=analysis_result.match_score,
            missing_keyword=analysis_result.missing_keyword,
            strength=analysis_result.strengths,
            weaknesses=analysis_result.weakness,
            ai_suggestion=analysis_result.suggestion,
        )

        clear_dashboard_cache(resume.user)

        logger.info(
            f"Dashboard cache cleared for user {resume.user.id}."
        )

        logger.info(
            f"Analysis completed successfully. Report ID: {report.id}"
        )

        return report.id

    except Exception as e:

        logger.exception(
            f"Analysis failed for resume {resume.id}: {str(e)}"
        )

        raise