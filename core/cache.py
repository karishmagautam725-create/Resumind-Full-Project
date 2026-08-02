
from django.core.cache import cache

def clear_dashboard_cache(user):
    cache.delete(f"dashboard_{user.id}")