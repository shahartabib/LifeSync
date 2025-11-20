"""
Application Configuration
"""
import os
from functools import lru_cache
from typing import List
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """Application Settings"""

    # App Configuration
    APP_NAME: str = "SurvAi"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = Field(default="development", env="ENVIRONMENT")
    DEBUG: bool = Field(default=True, env="DEBUG")
    LOG_LEVEL: str = Field(default="INFO", env="LOG_LEVEL")

    # Database Configuration
    DATABASE_URL: str = Field(
        default="postgresql://user:password@localhost/survai_db",
        env="DATABASE_URL"
    )

    # Redis Configuration
    REDIS_URL: str = Field(default="redis://localhost:6379/0", env="REDIS_URL")

    # API Keys
    OPENAI_API_KEY: str = Field(default="", env="OPENAI_API_KEY")
    PINECONE_API_KEY: str = Field(default="", env="PINECONE_API_KEY")
    PINECONE_ENVIRONMENT: str = Field(default="gcp-starter", env="PINECONE_ENVIRONMENT")

    # JWT Configuration
    JWT_SECRET: str = Field(default="your-secret-key", env="JWT_SECRET")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # CORS Configuration
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:8081",
    ]
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: List[str] = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    CORS_ALLOW_HEADERS: List[str] = ["*"]

    # Communication Services
    WHATSAPP_TOKEN: str = Field(default="", env="WHATSAPP_TOKEN")
    EMAIL_SERVICE_KEY: str = Field(default="", env="EMAIL_SERVICE_KEY")
    SMTP_HOST: str = Field(default="smtp.gmail.com", env="SMTP_HOST")
    SMTP_PORT: int = Field(default=587, env="SMTP_PORT")
    SMTP_USER: str = Field(default="", env="SMTP_USER")
    SMTP_PASSWORD: str = Field(default="", env="SMTP_PASSWORD")

    # AWS Configuration
    AWS_ACCESS_KEY_ID: str = Field(default="", env="AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY: str = Field(default="", env="AWS_SECRET_ACCESS_KEY")
    AWS_REGION: str = Field(default="us-east-1", env="AWS_REGION")
    AWS_BUCKET_NAME: str = Field(default="survai-storage", env="AWS_BUCKET_NAME")

    # Application URLs
    FRONTEND_URL: str = Field(default="http://localhost:3000", env="FRONTEND_URL")
    DOMAIN: str = Field(default="http://localhost:8000", env="DOMAIN")

    # Rate Limiting
    RATE_LIMIT_ENABLED: bool = True
    RATE_LIMIT_PER_MINUTE: int = 60

    # Sentry Configuration
    SENTRY_DSN: str = Field(default="", env="SENTRY_DSN")

    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """Get application settings"""
    return Settings()
