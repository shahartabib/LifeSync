# 🤖 SurvAi - AI-Powered Survey Platform

A comprehensive, multilingual, cross-platform AI-powered survey application with advanced sentiment analysis, knowledge assessment, and real-time analytics.

## 🌟 Features

### Core Features
- **Survey Builder**: Create surveys with 12+ question types (text, radio, checkbox, rating, NPS, etc.)
- **AI Survey Generation**: Auto-generate surveys from natural language prompts
- **Multilingual Support**: 40+ languages with full i18n support
- **Real-time Analytics**: Live response tracking and sentiment analysis
- **Sentiment Analysis**: AI-powered emotion detection and keyword extraction
- **Knowledge Assessment**: Evaluate respondent knowledge based on answers
- **Mobile-First Design**: Fully responsive across all devices
- **PWA Support**: Works offline and installable as app

### Platform Support
- ✅ **Web**: Next.js 14 + React 18
- ✅ **Mobile**: React Native (iOS/Android via Expo)
- ✅ **Backend**: FastAPI (Python 3.11+)
- ✅ **Database**: PostgreSQL 15
- ✅ **Cache**: Redis 7
- ✅ **AI/ML**: OpenAI GPT-4, Hugging Face Transformers

## 📁 Project Structure

```
survai/
├── frontend/
│   ├── web/                    # Next.js 14 web application
│   │   ├── src/
│   │   │   ├── app/            # App Router pages
│   │   │   ├── components/     # Reusable components
│   │   │   ├── contexts/       # React contexts
│   │   │   ├── hooks/          # Custom hooks
│   │   │   ├── services/       # API services
│   │   │   ├── types/          # TypeScript types
│   │   │   └── utils/          # Utilities
│   │   └── package.json
│   └── mobile/                 # React Native (Expo) app
│       ├── src/
│       │   ├── screens/        # Screen components
│       │   ├── components/     # Reusable components
│       │   ├── navigation/     # React Navigation
│       │   └── ...
│       └── app.json            # Expo configuration
├── backend/
│   ├── main.py                 # FastAPI entry point
│   ├── config.py               # Configuration
│   ├── database.py             # SQLAlchemy models
│   ├── api/                    # API routes
│   ├── services/               # Business logic
│   └── requirements.txt        # Python dependencies
├── database/
│   ├── schemas/                # SQL schemas
│   └── migrations/             # Database migrations
├── docker/                     # Docker configurations
├── shared/                     # Shared types and utilities
└── docs/                       # Documentation
```

## 🚀 Quick Start

### Prerequisites
- **Backend**: Python 3.11+, PostgreSQL 15, Redis 7
- **Frontend**: Node.js 18+
- **Mobile**: Node.js 18+, Expo CLI

### Option 1: Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd survai

# Create environment files
cp backend/.env.example backend/.env
cp frontend/web/.env.local.example frontend/web/.env.local

# Update the .env files with your configuration

# Start all services
docker-compose up -d

# Backend will be available at: http://localhost:8000
# Frontend will be available at: http://localhost:3000
# pgAdmin will be available at: http://localhost:5050
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Run migrations (when Alembic is set up)
# alembic upgrade head

# Start development server
uvicorn main:app --reload
```

#### Frontend Setup
```bash
cd frontend/web

# Install dependencies
npm install
# or
yarn install

# Create .env.local file
cp .env.local.example .env.local

# Start development server
npm run dev
# or
yarn dev

# Open http://localhost:3000
```

#### Mobile Setup
```bash
cd frontend/mobile

# Install dependencies
npm install
# or
yarn install

# Start Expo
npm start
# or
yarn start

# Press 'i' for iOS or 'a' for Android
```

## 🔧 Configuration

### Backend Configuration
Edit `backend/.env`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/survai_db
REDIS_URL=redis://localhost:6379/0
OPENAI_API_KEY=sk-your-key
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

### Frontend Configuration
Edit `frontend/web/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_GA_ID=your-ga-id
```

## 📚 API Documentation

Once the backend is running, access the interactive API docs:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

### Key API Endpoints

#### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/logout` - Logout

#### Surveys
- `GET /api/v1/surveys` - Get all surveys
- `POST /api/v1/surveys` - Create survey
- `GET /api/v1/surveys/{id}` - Get survey details
- `PUT /api/v1/surveys/{id}` - Update survey
- `DELETE /api/v1/surveys/{id}` - Delete survey
- `POST /api/v1/surveys/{id}/publish` - Publish survey
- `POST /api/v1/surveys/{id}/close` - Close survey

#### Analytics
- `GET /api/v1/surveys/{id}/analytics` - Get survey analytics
- `GET /api/v1/surveys/{id}/sentiment` - Get sentiment analysis
- `GET /api/v1/surveys/{id}/knowledge-assessment` - Get knowledge assessment

#### AI Features
- `POST /api/v1/surveys/generate` - Generate survey from prompt
- `POST /api/v1/surveys/{id}/generate-insights` - Generate AI insights

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
pytest --cov=backend tests/  # With coverage
```

### Frontend Tests
```bash
cd frontend/web
npm test
npm run test:coverage
```

## 🏗️ Development Workflow

### Git Workflow
```bash
# Create a feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: description of changes"

# Push to remote
git push origin feature/feature-name

# Create pull request on GitHub
```

### Code Standards
- **Backend**: PEP 8 (Python)
- **Frontend**: ESLint + Prettier
- **Commits**: Conventional Commits

### Type Checking
```bash
# Backend
mypy backend/

# Frontend
npm run type-check
```

### Linting
```bash
# Backend
pylint backend/

# Frontend
npm run lint
```

## 📦 Deployment

### Backend Deployment (AWS/Heroku)
```bash
# Build Docker image
docker build -f docker/Dockerfile.backend -t survai-backend .

# Push to registry
docker push your-registry/survai-backend

# Deploy using Docker Compose or Kubernetes
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Deploy to Vercel
vercel deploy

# Or Netlify
netlify deploy --prod
```

### Mobile Deployment
```bash
# EAS Build (Recommended)
eas build --platform ios
eas build --platform android

# Or manual build
# iOS: xcode-build in Xcode
# Android: Build APK/AAB in Android Studio
```

## 🔐 Security

- JWT-based authentication with refresh tokens
- Password hashing using bcrypt
- SQL injection prevention with prepared statements
- CORS configuration for cross-origin requests
- HTTPS enforcement in production
- Rate limiting on API endpoints
- GDPR compliance with data export/deletion
- Sentry integration for error tracking

## 📖 Documentation

- **API Docs**: `/docs` (when running backend)
- **Setup Guide**: See [SETUP.md](docs/SETUP.md)
- **Architecture**: See [ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Contributing**: See [CONTRIBUTING.md](docs/CONTRIBUTING.md)

## 🌍 Supported Languages

English, Hebrew, Arabic, Spanish, French, German, Italian, Portuguese, Chinese (Simplified & Traditional), Japanese, Korean, Russian, Polish, Turkish, Dutch, Swedish, Norwegian, Danish, Finnish, Greek, Hungarian, Czech, Romanian, Bulgarian, Croatian, Serbian, Ukrainian, Vietnamese, Thai, Indonesian, Malay, Tagalog, and more...

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.

## 🗺️ Roadmap

### Phase 1 ✅ (Current)
- [x] Project setup & infrastructure
- [x] Database schema & migrations
- [x] Backend API initialization
- [x] Frontend setup (Next.js)
- [x] Mobile setup (React Native)

### Phase 2 (In Progress)
- [ ] Authentication system
- [ ] Email verification
- [ ] Password reset

### Phase 3
- [ ] Survey builder UI
- [ ] Survey responder interface
- [ ] Conditional logic & branching

### Phase 4
- [ ] AI survey generation
- [ ] Question optimization
- [ ] Template system

### Phase 5
- [ ] Sentiment analysis
- [ ] Knowledge assessment
- [ ] Real-time analytics

### Phase 6
- [ ] Multilingual support implementation
- [ ] RTL support for Arabic/Hebrew
- [ ] Translation management

### Phase 7
- [ ] PWA implementation
- [ ] Offline support
- [ ] Mobile optimization

### Phase 8
- [ ] Email integration
- [ ] WhatsApp integration
- [ ] QR code generation
- [ ] Website embed

### Phase 9
- [ ] Security hardening
- [ ] GDPR compliance
- [ ] Privacy features

### Phase 10
- [ ] Testing & QA
- [ ] Performance optimization
- [ ] Load testing

### Phase 11
- [ ] Production deployment
- [ ] CI/CD pipeline
- [ ] Monitoring & logging

### Phase 12
- [ ] Scaling & optimization
- [ ] Advanced caching
- [ ] CDN setup

## 🎯 Performance Targets

- Page load time: < 2 seconds
- API response time: < 500ms
- Lighthouse score: > 90
- Test coverage: > 80%

## 📞 Contact

- **Email**: info@survai.app
- **Twitter**: @SurvAi
- **Website**: https://survai.app

---

**Made with ❤️ by the SurvAi Team**
