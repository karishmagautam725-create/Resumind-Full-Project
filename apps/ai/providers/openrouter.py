from django.conf import settings
from langchain_openai import ChatOpenAI
from apps.ai.schema import ResumeAnalysisResult
from apps.ai.exceptions import AIProviderError


class OpenRouterProvider:

    def __init__(self):
        self.model = ChatOpenAI(
            model=settings.OPENROUTER_MODEL,
            api_key=settings.OPENROUTER_API_KEY,
            base_url=settings.OPENROUTER_BASE_URL,
            temperature=0,
            max_tokens=4000,
           
        )

        

    def generate(self, messages):
        structure_output=self.model.with_structured_output(ResumeAnalysisResult)
        # response=self.model.invoke(messages)
        return structure_output.invoke(messages)