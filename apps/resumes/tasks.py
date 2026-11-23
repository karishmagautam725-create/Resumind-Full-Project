import logging

from celery import shared_task
# from apps.ai.rag.vectorstore import index_resume

from apps.resumes.models import Resume
from services.parser_service import extract_text
from core.cache import clear_dashboard_cache

logger = logging.getLogger("apps")
@shared_task(bind=True, autoretry_for=(Exception,),retry_backoff=True,retry_kwargs={"max_retries": 3})
def process_resume(self,resume_id):

    logger.info(f"Start Processing the resume{resume_id}.")
    try:
        resume=Resume.objects.get(id=resume_id)
        extracted_text=extract_text(resume.file.path)
        resume.extracted_text=extracted_text
        resume.status="completed"
        resume.save(update_fields=["extracted_text","status"])
        # index_resume(resume)
        clear_dashboard_cache(resume.user)
        logger.info(f"Dashboard cache cleared for user {resume.user.id}.")
        logger.info(f"Resume {resume.id} processed successfully.")
    
    except Resume.DoesNotExist:

        logger.error(f"Resume {resume_id} not found.")
    except Exception as e:
        logger.error(f"Resume {resume_id} failed: {str(e)}")
        try:
            resume=Resume.objects.get(id=resume_id)
            resume.status="failed"
            resume.save(update_fields=["status"])
        except Resume.DoesNotExist:
            pass



