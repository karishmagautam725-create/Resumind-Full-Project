from rest_framework.pagination import PageNumberPagination
class StandardResultPagination(PageNumberPagination):
    page_size=10
    page_size_query_param="page_size"
    page_max_size=100