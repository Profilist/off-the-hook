import os
from pydantic import BaseModel, Field

class TwilioCredentials(BaseModel):
    apiKey: str = Field(default_factory=lambda: os.getenv("TWILIO_API_KEY", ""))

class Settings:
    twilio_credentials: TwilioCredentials = TwilioCredentials()