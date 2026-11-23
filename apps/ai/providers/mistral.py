from django.conf import settings
from langchain_mistralai import ChatMistralAI
from apps.ai.schema import ResumeAnalysisResult

class MistralProvider:
    def __init__(self):
        self.model=ChatMistralAI(model=settings.MISTRAL_MODEL,
            api_key=settings.MISTRAL_API_KEY,
            temperature=0,
            max_tokens=4000,
          
            )

    def generate(self,messages):
        structure_model=self.model.with_structured_output(ResumeAnalysisResult)
        # response=self.model.invoke(messages)
        return structure_model.invoke(messages)

