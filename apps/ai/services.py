
from django.conf import settings

from apps.ai.providers.mistral import MistralProvider
from apps.ai.providers.openrouter import OpenRouterProvider

from apps.ai.prompts import RESUME_ANALYSIS_PROMPT

class AIService:

    def __init__(self, provider=None):
        provider=provider or settings.AI_PROVIDER
        if provider=='mistral':
            self.provider = MistralProvider()
        elif provider=='openrouter':
            self.provider=OpenRouterProvider()
        else:

            raise ValueError(
                f"Unsupported AI provider: {provider}"
            )


    def analyze_resume(self, resume_text,job_description):
        messages=RESUME_ANALYSIS_PROMPT.invoke(
             {
                "resume_text": resume_text,
                "job_description": job_description,
            }
        )
        return self.provider.generate(messages)