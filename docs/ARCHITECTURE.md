# SurvAi Architecture

## Overview

SurvAi is a monorepo-based, microservices-ready survey platform with a modern, scalable architecture designed for high performance and easy maintenance.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Layer                            │
│  (Web Browser, Mobile App, Desktop)                         │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
        ┌───────▼─────┐  ┌────▼────┐  ┌───▼──────┐
        │ Next.js Web │  │  React  │  │  Native  │
        │ Application │  │ Native  │  │  Mobile  │
        │ (React 18)  │  │  Expo   │  │   App    │
        └───────┬─────┘  └────┬────┘  └───┬──────┘
                │             │             │
                └─────────────┼─────────────┘
                              │
                   ┌──────────▼──────────┐
                   │  API Gateway Layer  │
                   │   (CORS, Auth)      │
                   └──────────┬──────────┘
                              │
        ┌─────────────────────▼──────────────────────┐
        │         FastAPI Backend Services           │
        │  (Python 3.11, Uvicorn, async/await)       │
        │                                             │
        │  ┌──────────────────────────────────────┐  │
        │  │  API Routes (v1)                     │  │
        │  │  - Authentication                    │  │
        │  │  - Surveys                           │  │
        │  │  - Questions                         │  │
        │  │  - Responses                         │  │
        │  │  - Analytics                         │  │
        │  │  - AI Services                       │  │
        │  └──────────────────────────────────────┘  │
        │                                             │
        │  ┌──────────────────────────────────────┐  │
        │  │  Business Logic Services             │  │
        │  │  - SentimentAnalyzer                 │  │
        │  │  - KnowledgeAssessor                 │  │
        │  │  - SurveyGenerator                   │  │
        │  │  - AnalyticsEngine                   │  │
        │  │  - AuthService                       │  │
        │  └──────────────────────────────────────┘  │
        │                                             │
        │  ┌──────────────────────────────────────┐  │
        │  │  Data Access Layer                   │  │
        │  │  - SQLAlchemy ORM                    │  │
        │  │  - Database Models                   │  │
        │  │  - Query Builders                    │  │
        │  └──────────────────────────────────────┘  │
        └─────────────────────┬──────────────────────┘
                              │
        ┌─────────────────────┼──────────────────────┐
        │                     │                      │
    ┌───▼────────┐    ┌──────▼───────┐    ┌────────▼───┐
    │ PostgreSQL  │    │    Redis     │    │ Vector DB  │
    │    15+      │    │   Cache      │    │ (Pinecone/ │
    │             │    │              │    │ Weaviate)  │
    └─────────────┘    └──────────────┘    └────────────┘
        │                     │                      │
        └─────────────────────┼──────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  External Services│
                    │                   │
                    │ - OpenAI GPT-4    │
                    │ - Transformers    │
                    │ - Email Service   │
                    │ - WhatsApp API    │
                    └───────────────────┘
```

## Directory Structure Details

### Backend Structure
```
backend/
├── main.py                 # FastAPI application entry point
├── config.py              # Configuration management
├── database.py            # SQLAlchemy models & session
├── requirements.txt       # Python dependencies
├── .env.example          # Environment template
├── api/                  # API route modules (to be created)
│   ├── __init__.py
│   ├── auth.py          # Authentication endpoints
│   ├── surveys.py       # Survey CRUD endpoints
│   ├── questions.py     # Question CRUD endpoints
│   ├── responses.py     # Response submission endpoints
│   ├── analytics.py     # Analytics endpoints
│   └── ai.py            # AI features endpoints
├── services/            # Business logic (to be created)
│   ├── __init__.py
│   ├── auth_service.py      # Authentication logic
│   ├── survey_service.py    # Survey management logic
│   ├── sentiment_service.py # Sentiment analysis
│   ├── knowledge_service.py # Knowledge assessment
│   ├── ai_service.py        # AI generation
│   └── email_service.py     # Email operations
├── schemas/             # Pydantic request/response models (to be created)
│   ├── auth.py
│   ├── surveys.py
│   ├── responses.py
│   └── analytics.py
├── utils/              # Utility functions (to be created)
│   ├── jwt_handler.py
│   ├── security.py
│   ├── validators.py
│   └── helpers.py
└── tests/              # Test files (to be created)
    ├── test_auth.py
    ├── test_surveys.py
    └── test_analytics.py
```

### Frontend Structure
```
frontend/web/
├── public/                     # Static assets
├── src/
│   ├── app/                   # Next.js App Router pages (to be created)
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── (auth)/            # Auth route group
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── forgot-password/
│   │   ├── (dashboard)/       # Dashboard route group
│   │   │   ├── surveys/
│   │   │   ├── analytics/
│   │   │   └── settings/
│   │   └── error.tsx          # Error page
│   ├── components/
│   │   ├── auth/              # Auth components
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── survey/            # Survey components
│   │   │   ├── SurveyBuilder.tsx
│   │   │   ├── QuestionEditor.tsx
│   │   │   ├── FormRenderer.tsx
│   │   │   └── ResponseForm.tsx
│   │   ├── analytics/         # Analytics components
│   │   │   ├── ChartComponent.tsx
│   │   │   ├── SentimentChart.tsx
│   │   │   └── StatsCard.tsx
│   │   └── common/            # Common components
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       ├── Button.tsx
│   │       └── Card.tsx
│   ├── contexts/
│   │   ├── AuthContext.tsx    # Authentication state
│   │   └── SurveyContext.tsx  # Survey state (to be created)
│   ├── hooks/
│   │   ├── useApi.ts          # API calls hook
│   │   ├── useAuth.ts         # Auth hook (to be created)
│   │   └── useSurvey.ts       # Survey hook (to be created)
│   ├── services/
│   │   └── api.ts             # Axios API client & calls
│   ├── types/
│   │   └── index.ts           # TypeScript definitions
│   ├── utils/
│   │   ├── validators.ts      # Form validation
│   │   ├── formatters.ts      # Data formatting
│   │   └── helpers.ts         # Utility functions
│   └── styles/
│       └── globals.css        # Global styles
├── .env.local.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Mobile Structure
```
frontend/mobile/
├── assets/                    # Images, icons, fonts
├── src/
│   ├── screens/              # Screen components
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── SignupScreen.tsx
│   │   ├── main/
│   │   │   ├── DashboardScreen.tsx
│   │   │   ├── SurveysScreen.tsx
│   │   │   └── AnalyticsScreen.tsx
│   │   └── survey/
│   │       ├── SurveyListScreen.tsx
│   │       ├── SurveyDetailScreen.tsx
│   │       └── FormScreen.tsx
│   ├── components/           # Reusable components
│   ├── navigation/
│   │   └── RootNavigator.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── utils/
├── app.json                  # Expo configuration
├── App.tsx                   # Main app entry
├── babel.config.js
├── tsconfig.json
└── package.json
```

## Data Flow

### User Authentication Flow
```
┌─────────────────┐
│   User Login    │
│   (Frontend)    │
└────────┬────────┘
         │
         │ POST /api/v1/auth/login
         ▼
┌──────────────────┐
│  Auth Service    │
│  (Backend)       │
│ - Validate email │
│ - Check password │
│ - Generate JWT   │
└────────┬─────────┘
         │
         │ Tokens (access + refresh)
         ▼
┌─────────────────┐
│   Frontend      │
│ - Store tokens  │
│ - Set user      │
│ - Redirect      │
└─────────────────┘
```

### Survey Creation Flow
```
┌─────────────────────┐
│   User Creates      │
│   Survey (Frontend) │
└──────────┬──────────┘
           │
           │ POST /api/v1/surveys
           │ + Auth token
           ▼
┌──────────────────────┐
│  Survey Service      │
│  (Backend)           │
│ - Validate data      │
│ - Store survey       │
│ - Create questions   │
│ - Update user stats  │
└──────────┬───────────┘
           │
           │ Survey ID + details
           ▼
┌──────────────────────┐
│   Frontend           │
│ - Show confirmation  │
│ - Redirect to editor │
└──────────────────────┘
```

### Response Submission & Analytics Flow
```
┌──────────────────┐
│  User Submits    │
│  Response        │
└────────┬─────────┘
         │
         │ POST /api/v1/surveys/{id}/responses
         ▼
┌───────────────────────────────┐
│  Response Service             │
│  - Validate answers           │
│  - Store response             │
│  - Trigger AI analysis        │
└────────┬────────────────────┬─┘
         │                    │
         │                    │ Async: AI Processing
         │                    │
         ▼                    ▼
    ┌─────────┐      ┌────────────────────┐
    │Database │      │ Sentiment Analysis │
    │         │      │ Knowledge Assess   │
    └─────────┘      │ Keyword Extract    │
                     └─────────┬──────────┘
                               │
                     ┌─────────▼──────────┐
                     │  Update Analytics  │
                     │  Cache (Redis)     │
                     └────────────────────┘
```

## Technology Stack Details

### Backend Stack
- **Framework**: FastAPI (async, modern Python web framework)
- **Server**: Uvicorn (ASGI server)
- **ORM**: SQLAlchemy 2.0+ (with async support)
- **Database**: PostgreSQL 15+
- **Caching**: Redis 7+
- **Authentication**: JWT + bcrypt
- **AI/ML**:
  - OpenAI API (GPT-4)
  - Hugging Face Transformers (sentiment analysis)
  - NLTK (NLP)
- **Validation**: Pydantic v2
- **API Documentation**: OpenAPI/Swagger

### Frontend Stack
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript 5.3+
- **Styling**: Tailwind CSS 3.3+
- **State Management**: Zustand (lightweight)
- **Data Fetching**: React Query + Axios
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **i18n**: i18next
- **Testing**: Jest + React Testing Library

### Mobile Stack
- **Framework**: React Native 0.72+
- **Build System**: Expo 49+
- **Navigation**: React Navigation 6+
- **State**: Zustand + Context API
- **UI**: React Native built-in + custom components
- **Forms**: React Hook Form
- **Storage**: AsyncStorage + Secure Store
- **API**: Axios
- **i18n**: i18next

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Database**: PostgreSQL 15+
- **Cache**: Redis 7+
- **Vector DB**: Pinecone or Weaviate
- **Monitoring**: Sentry
- **Logging**: Structured logging (backend), LogRocket (frontend)
- **CI/CD**: GitHub Actions
- **Deployment**: Docker, Kubernetes-ready

## API Design

### RESTful Endpoints

#### Auth Endpoints
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
POST   /api/v1/auth/verify-email
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
```

#### Survey Endpoints
```
GET    /api/v1/surveys                      # List all surveys
POST   /api/v1/surveys                      # Create survey
GET    /api/v1/surveys/{id}                 # Get survey details
PUT    /api/v1/surveys/{id}                 # Update survey
DELETE /api/v1/surveys/{id}                 # Delete survey
POST   /api/v1/surveys/{id}/publish         # Publish survey
POST   /api/v1/surveys/{id}/close           # Close survey
POST   /api/v1/surveys/{id}/archive         # Archive survey
```

#### Question Endpoints
```
POST   /api/v1/surveys/{id}/questions
PUT    /api/v1/surveys/{id}/questions/{qid}
DELETE /api/v1/surveys/{id}/questions/{qid}
```

#### Response Endpoints
```
GET    /api/v1/surveys/{id}/form            # Get survey form (public)
POST   /api/v1/surveys/{id}/responses       # Submit response
GET    /api/v1/surveys/{id}/responses       # Get responses (auth)
GET    /api/v1/surveys/{id}/responses/{rid} # Get response detail
```

#### Analytics Endpoints
```
GET    /api/v1/surveys/{id}/analytics
GET    /api/v1/surveys/{id}/sentiment
GET    /api/v1/surveys/{id}/knowledge-assessment
POST   /api/v1/surveys/{id}/generate-insights
GET    /api/v1/surveys/{id}/export?format=pdf|csv
```

#### AI Endpoints
```
POST   /api/v1/surveys/generate
POST   /api/v1/surveys/{id}/improve-questions
POST   /api/v1/surveys/{id}/generate-insights
```

## Security Architecture

### Authentication & Authorization
- **JWT tokens** with short expiry (30 min access, 7 days refresh)
- **Bcrypt password** hashing with salt
- **CORS** properly configured
- **CSRF protection** on state-changing operations

### Data Protection
- **Encryption at rest** for sensitive fields
- **HTTPS/TLS** in production
- **SQL injection prevention** with prepared statements
- **XSS prevention** with proper escaping

### API Security
- **Rate limiting** (Redis-based)
- **Input validation** (Pydantic)
- **Request signing** for sensitive operations
- **API key management** for integrations

## Performance Optimization

### Database Optimization
- **Strategic indexes** on frequently queried columns
- **Connection pooling** (PgBouncer)
- **Query optimization** with proper JOINs
- **Caching layer** (Redis) for hot data

### Application Optimization
- **Code splitting** in frontend
- **Lazy loading** for components
- **Image optimization** with next/image
- **API response caching**

### CDN & Caching
- **Cloudflare** for static assets
- **Browser caching** with proper headers
- **Redis** for application cache
- **Service Worker** for PWA offline support

## Scalability Design

### Horizontal Scaling
- **Stateless backend services** (can run multiple instances)
- **Load balancing** (NGINX/AWS ALB)
- **Database replication** for read scaling
- **Message queue** for async tasks (future: RabbitMQ/Redis)

### Vertical Scaling
- **Async/await** in FastAPI for concurrent requests
- **Connection pooling** to prevent bottlenecks
- **Memory-efficient** data structures
- **Lazy loading** of resources

## Monitoring & Observability

### Metrics
- Request latency
- Error rates
- Database query performance
- Cache hit rates
- AI processing time

### Logging
- Structured logging in JSON format
- Request/response logging
- Error tracking with Sentry
- Application metrics to Prometheus

### Alerting
- Alert on high error rates
- Alert on API latency > 1s
- Alert on database connectivity issues
- Alert on cache failures

## Development Workflow

### Local Development
- Docker Compose for all services
- Hot reload for backend (--reload flag)
- Fast refresh for frontend
- Expo live reload for mobile

### Testing Strategy
- Unit tests for services (backend)
- Component tests (frontend)
- Integration tests for API
- E2E tests with Playwright

### CI/CD Pipeline
- GitHub Actions for automation
- Run tests on every PR
- Build Docker images
- Deploy to staging on PR merge
- Deploy to production on release tag

## Future Improvements

1. **Microservices Migration** - Split services by domain
2. **Message Queue** - Async processing for heavy tasks
3. **GraphQL** - Alternative API for complex queries
4. **Real-time Features** - WebSocket for live analytics
5. **Machine Learning** - Custom models for sentiment analysis
6. **Advanced Caching** - Multi-layer caching strategy
7. **Global Distribution** - Multi-region deployment
8. **Kubernetes** - Container orchestration

---

For implementation details, refer to specific module documentation.
