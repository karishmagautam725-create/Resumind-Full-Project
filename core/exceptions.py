from rest_framework.views import  exception_handler
from rest_framework.response import Response
from rest_framework import status

import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):

    logger.error(
    f"{exc.__class__.__name__}: {str(exc)}"
)
    """
    Custom exception handler that returns a standardized error response.
    """
    response =exception_handler(exc, context)

    if response is not None:
        current_response={
            "success":False,
            "status_code":response.status_code,
            "message":"",
            "error":None
        }

        if response.status_code==status.HTTP_400_BAD_REQUEST:
            current_response["message"]="Validation Error"
            current_response["error"]=response.data

        elif response.status_code==status.HTTP_401_UNAUTHORIZED:
            current_response["message"]="Authentication credentials are invalid or missing."

        elif response.status_code==status.HTTP_403_FORBIDDEN:
            current_response["message"]="You do not have permission to perform this action."

        elif response.status_code==status.HTTP_404_NOT_FOUND:
            current_response["message"]="The requested resource was not found."

        elif response.status_code==status.HTTP_405_METHOD_NOT_ALLOWED:
            current_response["message"]="The method is not allowed for the requested URL."
        else:
            current_response["message"]=response.data.get("detail","An unexpected error occurred.")

        response.data=current_response
        return response
    return Response(
        {
            "success":False,
            "status_code":status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": "Internal server error.",
            "error": None
        }
    )