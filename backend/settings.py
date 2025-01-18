import os
from pydantic import BaseModel, Field

class TwilioCredentials(BaseModel):
    apiKey: str = Field(default_factory=lambda: os.getenv("TWILIO_API_KEY", ""))

class MongoDBSettings(BaseModel):
    uri: str = Field(default_factory=lambda: os.getenv("MONGO_URL", ""))
    database_name: str = Field(default_factory=lambda: os.getenv("MONGODB_DB", "phishing_simulator"))

class JWTSettings(BaseModel):
    secret: str = Field(default_factory=lambda: os.getenv("JWT_SECRET", ""))
    algorithm: str = "HS256"
    
class OpenAI(BaseModel):
    openai_key: str = Field(default_factory=lambda: os.getenv("OPENAI_KEY", ""))

class Settings:
    twilio_credentials: TwilioCredentials = TwilioCredentials()
    mongodb: MongoDBSettings = MongoDBSettings()
    jwt : JWTSettings = JWTSettings()
    openai: OpenAI = OpenAI()