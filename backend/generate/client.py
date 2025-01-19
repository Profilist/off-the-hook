from settings import Settings
from openai import OpenAI
from typing import Dict, Any

class OpenAIClient:
    def __init__(self):
        self.api_key = Settings.openai_credentials.apiKey
        self.client = OpenAI(api_key=self.api_key)
    
    def generate_text(
        self,
        prompt: str,
        model: str = "gpt-3.5-turbo",
        max_tokens: int = 150,
        temperature: float = 0.7
    ) -> Dict[str, Any]:
        try:
            response = self.client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=max_tokens,
                temperature=temperature
            )
            
            return {
                'text': response.choices[0].message.content,
                'usage': response.usage.total_tokens
            }
            
        except Exception as e:
            error_msg = getattr(e, 'message', str(e))
            raise Exception(f"Failed to generate text: {error_msg}")
