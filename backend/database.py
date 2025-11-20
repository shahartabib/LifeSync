"""
Database configuration and models
"""

from datetime import datetime
from uuid import UUID
from sqlalchemy import (
    create_engine,
    Column,
    String,
    Integer,
    Boolean,
    DateTime,
    Text,
    JSON,
    ForeignKey,
    Index,
    CheckConstraint,
    func,
)
from sqlalchemy.dialects.postgresql import UUID as PG_UUID, INET, JSONB
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.pool import NullPool
from config import get_settings

settings = get_settings()

# Create database engine
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    poolclass=NullPool,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# ============= Models =============

class User(Base):
    """User model"""

    __tablename__ = "users"

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=lambda: UUID)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(100))
    last_name = Column(String(100))
    subscription_tier = Column(
        String(50),
        default="free",
        nullable=False,
        check=CheckConstraint("subscription_tier IN ('free', 'pro', 'enterprise')"),
    )
    language = Column(String(10), default="en")
    timezone = Column(String(100), default="UTC")
    email_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime)

    # Relationships
    surveys = relationship("Survey", back_populates="user", cascade="all, delete-orphan")
    tokens = relationship("Token", back_populates="user", cascade="all, delete-orphan")
    knowledge_bases = relationship(
        "KnowledgeBase", back_populates="user", cascade="all, delete-orphan"
    )


class Survey(Base):
    """Survey model"""

    __tablename__ = "surveys"

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=lambda: UUID)
    user_id = Column(PG_UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    questions = Column(JSONB, default=list, nullable=False)
    ai_config = Column(JSONB, default=dict)
    status = Column(
        String(50),
        default="draft",
        nullable=False,
        check=CheckConstraint("status IN ('draft', 'published', 'closed', 'archived')"),
    )
    share_settings = Column(JSONB, default=dict)
    theme = Column(String(100), default="default")
    language = Column(String(10), default="en")
    responses_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    published_at = Column(DateTime)
    closed_at = Column(DateTime)
    deleted_at = Column(DateTime)

    # Relationships
    user = relationship("User", back_populates="surveys")
    questions_rel = relationship("Question", back_populates="survey", cascade="all, delete-orphan")
    responses = relationship("Response", back_populates="survey", cascade="all, delete-orphan")
    analytics = relationship("AnalyticsCache", back_populates="survey", cascade="all, delete-orphan")

    # Indexes
    __table_args__ = (
        Index("idx_surveys_user_id", "user_id"),
        Index("idx_surveys_status", "status"),
        Index("idx_surveys_created_at", "created_at"),
    )


class Question(Base):
    """Question model"""

    __tablename__ = "questions"

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=lambda: UUID)
    survey_id = Column(PG_UUID(as_uuid=True), ForeignKey("surveys.id"), nullable=False)
    order = Column(Integer, nullable=False)
    type = Column(
        String(50),
        nullable=False,
        check=CheckConstraint(
            "type IN ('text', 'radio', 'checkbox', 'rating', 'nps', 'ranking', 'matrix', 'date', 'time', 'email', 'phone', 'file')"
        ),
    )
    text = Column(Text, nullable=False)
    description = Column(Text)
    required = Column(Boolean, default=False)
    options = Column(JSONB, default=list)
    validation = Column(JSONB, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    survey = relationship("Survey", back_populates="questions_rel")

    __table_args__ = (Index("idx_questions_survey_id", "survey_id"),)


class Response(Base):
    """Response model"""

    __tablename__ = "responses"

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=lambda: UUID)
    survey_id = Column(PG_UUID(as_uuid=True), ForeignKey("surveys.id"), nullable=False)
    respondent_id = Column(PG_UUID(as_uuid=True), ForeignKey("users.id"))
    answers = Column(JSONB, default=dict, nullable=False)
    ai_analysis = Column(JSONB, default=dict)
    completion_time = Column(Integer)  # in seconds
    ip_address = Column(INET)
    user_agent = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    survey = relationship("Survey", back_populates="responses")

    __table_args__ = (
        Index("idx_responses_survey_id", "survey_id"),
        Index("idx_responses_respondent_id", "respondent_id"),
        Index("idx_responses_created_at", "created_at"),
    )


class AnalyticsCache(Base):
    """Analytics cache model"""

    __tablename__ = "analytics_cache"

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=lambda: UUID)
    survey_id = Column(PG_UUID(as_uuid=True), ForeignKey("surveys.id"), nullable=False)
    metric_type = Column(String(100), nullable=False)
    metric_data = Column(JSONB, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=False)

    # Relationships
    survey = relationship("Survey", back_populates="analytics")

    __table_args__ = (
        Index("idx_analytics_cache_survey_id", "survey_id"),
        Index("idx_analytics_cache_expires", "expires_at"),
    )


class AuditLog(Base):
    """Audit log model"""

    __tablename__ = "audit_logs"

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=lambda: UUID)
    user_id = Column(PG_UUID(as_uuid=True), ForeignKey("users.id"))
    action = Column(String(100), nullable=False)
    resource_type = Column(String(100))
    resource_id = Column(PG_UUID(as_uuid=True))
    changes = Column(JSONB, default=dict)
    ip_address = Column(INET)
    created_at = Column(DateTime, default=datetime.utcnow)

    __table_args__ = (
        Index("idx_audit_logs_user_id", "user_id"),
        Index("idx_audit_logs_resource", "resource_type", "resource_id"),
    )


class KnowledgeBase(Base):
    """Knowledge base model"""

    __tablename__ = "knowledge_bases"

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=lambda: UUID)
    user_id = Column(PG_UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    language = Column(String(10), default="en")
    documents = Column(JSONB, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="knowledge_bases")


class Token(Base):
    """Token model for refresh tokens"""

    __tablename__ = "tokens"

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=lambda: UUID)
    user_id = Column(PG_UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    token = Column(String(500), unique=True, nullable=False, index=True)
    token_type = Column(String(50), default="refresh")
    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    revoked = Column(Boolean, default=False)

    # Relationships
    user = relationship("User", back_populates="tokens")

    __table_args__ = (Index("idx_tokens_user_id", "user_id"),)


def get_db():
    """Get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
