# from django.shortcuts import render
# from rest_framework.views import APIView

# from services.parser_service import extract_text
# from rest_framework.parsers import MultiPartParser, FormParser
# from .models import Resume
# from rest_framework.response import Response
# from rest_framework import status
# from .serializers import UploadSerializer
# from rest_framework.permissions import IsAuthenticated,AllowAny
# Create your views here.

# class ResumeUploadAPIView(APIView):
#     queryset=Resume.objects.all()
#     # serializer_class = UploadSerializer
#     parser_classes = [MultiPartParser, FormParser]
#     permission_classes=[AllowAny]

#     def post(self,request):
#         serializer=UploadSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         uploaded_file=request.FILES["file"]
#         resume=serializer.save(
#             user=request.user,
#             original_filename=uploaded_file.name,
#             file_size=uploaded_file.size,
#             status="Processing",
#         )
#         try:
#             extracted_text=extract_text(resume.file.path)
#             resume.extracted_text=extracted_text
#             resume.status="Completed"
#             resume.save()
#         except Exception as e:
#             resume.status="Failed"
#             resume.save()
#             return Response(
#                 {
#                     "error":str(e)
#                 },
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
#         return Response(
#             {
#                 "message":"Resume Upload Successful",
#                 "resume_id":resume.id,
#                 "title":resume.title,
#                 "status": resume.status,

#             },
#             status=status.HTTP_201_CREATED
#         )

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from services.parser_service import extract_text

from .models import Resume
from .serializers import UploadSerializer,ResumeListSerializer,ResumeDetailSerializer,ResumeUpdateSerializer
from drf_spectacular.utils import extend_schema
import logging
from core.cache import clear_dashboard_cache

logger = logging.getLogger(__name__)


@extend_schema(
    summary="Upload a resume",
    description="""
    Upload a PDF or DOCX resume.

    The uploaded file is parsed and the extracted text
    is stored for future ATS analysis.
    """,
    tags=["Resume"],
    request=UploadSerializer,
    responses={
        201: UploadSerializer,
        400: None,
        401: None,
        500: None,
    },
)
class ResumeUploadAPIView(generics.CreateAPIView):

    queryset = Resume.objects.all()
    serializer_class = UploadSerializer
    permission_classes = [IsAuthenticated]

    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        logger.info(
        f"User {request.user.id} started uploading a resume." )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        uploaded_file = request.FILES.get("file")

        resume = serializer.save(
            user=request.user,
            original_filename=uploaded_file.name,
            file_size=uploaded_file.size,
            file_type=uploaded_file.content_type,
            status="processing",
        )

        try:
            logger.info(f"Started parsing resume {resume.id}.")

            extracted_text = extract_text(resume.file.path)
            resume.extracted_text = extracted_text
            resume.status = "completed"
            
            resume.save()
            clear_dashboard_cache(request.user)
            logger.info("Dashboard cache cleared.")
            logger.info(f"Resume {resume.id} uploaded successfully.")

        except Exception as e:
            logger.error(f"Error occurred while processing resume: {str(e)}")
            resume.status = "failed"
            resume.save()

            return Response(
                {
                    "error": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {
                "message": "Resume uploaded successfully",
                "resume_id": resume.id,
                "title": resume.title,
                "status": resume.status,
                "extracted_text": resume.extracted_text,
            },
            status=status.HTTP_201_CREATED
        )

@extend_schema(
    summary="List User Resumes",
    tags=["Resume"],
)
class ResumeListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class=ResumeListSerializer

    def  get_queryset(self):
        return Resume.objects.filter(user=self.request.user).order_by("-created_at")

    
@extend_schema(
    summary="Resume Detail",
    tags=["Resume"],
)
class ResumeDetailAPIView(generics.RetrieveAPIView):
      permission_classes = [IsAuthenticated]
      serializer_class=ResumeDetailSerializer
      def get_queryset(self):
          return Resume.objects.filter(
            user=self.request.user
        )

class ResumeUpdateAPIView(generics.UpdateAPIView):

    serializer_class = ResumeUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(
            user=self.request.user
        )


class ResumeDeleteAPIView(generics.DestroyAPIView):

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(
            user=self.request.user
        )

