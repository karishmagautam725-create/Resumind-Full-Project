
from django.db.models import Avg,Max
from apps.resumes.models import Resume
from apps.jobs.models import JobDescription
from apps.analysis.models import ResumeAnalysis


def get_dashboard_data(user):
    analyses = ResumeAnalysis.objects.filter(resume__user=user)
    total_resumes = Resume.objects.filter(user=user).count()
    total_job_descriptions = JobDescription.objects.filter(user=user).count()
    total_analysis_report=ResumeAnalysis.objects.filter(resume__user=user).count()
    #ATS Score
    analysis_stats=analyses.aggregate(
       average_ats_score=Avg("ats_score"),
       highest_ats_score=Max("ats_score")
    )
    average_ats_score=analysis_stats["average_ats_score"] or 0
    highest_ats_score=analysis_stats["highest_ats_score"] or 0
    recent_reports = (
        analyses.select_related("resume", "job_description")
        .order_by("-created_at")[:5]
    )

    recent_reports_data = []

    for report in recent_reports:
        recent_reports_data.append(
            {
                "id": report.id,
                "resume": report.resume.file_type,
                "job_title": report.job_description.title,
                "ats_score": report.ats_score,
                "created_at": report.created_at,
            }
        )
  

    return {
        "total_resumes": total_resumes,
        "total_job_description": total_job_descriptions,
        "total_analysis_report":total_analysis_report,
        "average_ats_score":average_ats_score,
        "highest_ats_score":highest_ats_score,
        "recent_reports":recent_reports_data,
    }