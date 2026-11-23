class AIError(Exception):
    """Base exception for AI-related errors."""
    pass


class AIProviderError(AIError):
    """Raised when an AI provider fails."""
    pass


class AIResponseError(AIError):
    """Raised when the AI response is invalid."""
    pass