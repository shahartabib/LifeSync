# SurvAi - Setup Guide

Complete setup instructions for getting the SurvAi project running on your local machine.

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Quick Start with Docker](#quick-start-with-docker)
3. [Manual Setup](#manual-setup)
4. [Environment Configuration](#environment-configuration)
5. [Database Setup](#database-setup)
6. [Running Services](#running-services)
7. [Verification](#verification)
8. [Troubleshooting](#troubleshooting)

## System Requirements

### Minimum Requirements
- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **RAM**: 8GB
- **Storage**: 20GB free space
- **Internet**: Stable connection for dependencies

### Software Requirements

#### For Docker Setup (Recommended)
- Docker Desktop 4.0+
- Docker Compose 2.0+

#### For Manual Setup
- **Backend**:
  - Python 3.11+
  - PostgreSQL 15+
  - Redis 7+
  - pip/poetry

- **Frontend**:
  - Node.js 18+ (LTS recommended)
  - npm 9+ or yarn 3+

- **Mobile**:
  - Node.js 18+
  - Expo CLI 6+

## Quick Start with Docker

### 1. Clone Repository
```bash
git clone https://github.com/shahartabib/LifeSync.git
cd LifeSync
```

### 2. Create Environment Files
```bash
# Copy environment templates
cp backend/.env.example backend/.env
cp frontend/web/.env.local.example frontend/web/.env.local
```

### 3. (Optional) Update Environment Variables
Edit the `.env` files to customize settings:

**backend/.env**
```env
DATABASE_URL=postgresql://survai_user:survai_password@postgres:5432/survai_db
REDIS_URL=redis://redis:6379/0
OPENAI_API_KEY=your-api-key-here
JWT_SECRET=change-this-in-production
```

**frontend/web/.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### 4. Start Services
```bash
# Start all services in background
docker-compose up -d

# Or start with logs visible
docker-compose up
```

### 5. Wait for Services
All services have health checks. Wait 1-2 minutes for them to be ready:
- Backend: http://localhost:8000
- Frontend: http://localhost:3000
- PostgreSQL: localhost:5432
- Redis: localhost:6379
- pgAdmin: http://localhost:5050

### 6. Verify Installation
```bash
# Check all services are running
docker-compose ps

# Test backend
curl http://localhost:8000/health

# Check logs if needed
docker-compose logs -f backend
```

## Manual Setup

### Backend Setup

#### 1. Create Virtual Environment
```bash
cd backend

# Create virtual environment
python3.11 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

#### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

#### 3. Setup Database

**Option A: Local PostgreSQL**
```bash
# Ensure PostgreSQL is running
# Create database
createdb survai_db
createuser survai_user
psql -U survai_user -d survai_db < ../database/schemas/001_initial_schema.sql
```

**Option B: Docker PostgreSQL**
```bash
docker run -d \
  --name survai-postgres \
  -e POSTGRES_USER=survai_user \
  -e POSTGRES_PASSWORD=survai_password \
  -e POSTGRES_DB=survai_db \
  -p 5432:5432 \
  postgres:15-alpine
```

#### 4. Setup Redis
```bash
# Option A: Local Redis
redis-server

# Option B: Docker Redis
docker run -d \
  --name survai-redis \
  -p 6379:6379 \
  redis:7-alpine
```

#### 5. Create .env File
```bash
cp .env.example .env
# Edit .env with your local credentials
```

#### 6. Run Backend
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

#### 1. Install Dependencies
```bash
cd frontend/web
npm install
# or
yarn install
```

#### 2. Create .env.local
```bash
cp .env.local.example .env.local
```

#### 3. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser.

### Mobile Setup

#### 1. Install Dependencies
```bash
cd frontend/mobile
npm install
# or
yarn install
```

#### 2. Start Expo
```bash
npm start
# or
yarn start
```

#### 3. Choose Platform
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Environment Configuration

### Backend Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/survai_db

# Cache
REDIS_URL=redis://localhost:6379/0

# API Keys
OPENAI_API_KEY=sk-xxxx
PINECONE_API_KEY=xxxx
PINECONE_ENVIRONMENT=gcp-starter

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS
CORS_ORIGINS=["http://localhost:3000","http://localhost:8081"]
CORS_ALLOW_CREDENTIALS=True

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Application
APP_NAME=SurvAi
ENVIRONMENT=development
DEBUG=True
DOMAIN=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_AI_FEATURES=true
NEXT_PUBLIC_ENABLE_PWA=true
```

## Database Setup

### Creating Database

#### Using Docker
```bash
# Connect to running PostgreSQL container
docker exec -it survai-postgres psql -U survai_user -d survai_db

# Or use pgAdmin at http://localhost:5050
```

#### Using psql
```bash
# Connect to database
psql -U survai_user -d survai_db -h localhost

# Run SQL commands
\dt  # List tables
\q   # Quit
```

### Database Migrations

When Alembic is set up:
```bash
cd backend

# Create migration
alembic revision --autogenerate -m "Description"

# Apply migration
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

## Running Services

### Using Docker Compose

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart specific service
docker-compose restart backend

# Rebuild and restart
docker-compose up -d --build
```

### Manual Commands

**Terminal 1 - Backend**
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

**Terminal 2 - Frontend**
```bash
cd frontend/web
npm run dev
```

**Terminal 3 - Mobile**
```bash
cd frontend/mobile
npm start
```

## Verification

### Backend
```bash
# Health check
curl http://localhost:8000/health

# API docs
open http://localhost:8000/docs

# API root
curl http://localhost:8000/api/v1/
```

### Frontend
```bash
# Check if running
open http://localhost:3000

# Check build
npm run build

# Run tests
npm test
```

### Database
```bash
# Check PostgreSQL
psql -h localhost -U survai_user -d survai_db -c "SELECT version();"

# Check Redis
redis-cli ping
```

## Troubleshooting

### Docker Issues

**Docker containers not starting**
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Rebuild everything
docker-compose down -v
docker-compose up -d --build
```

**Port already in use**
```bash
# Kill process using port (macOS/Linux)
lsof -i :8000  # Backend
lsof -i :3000  # Frontend
kill -9 <PID>

# Or change port in docker-compose.yml
```

### Database Issues

**Can't connect to PostgreSQL**
```bash
# Check if container is running
docker ps | grep postgres

# Check logs
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up -d
```

**Wrong password**
```bash
# Update in docker-compose.yml or .env
# Then restart
docker-compose down
docker-compose up -d
```

### Backend Issues

**Module not found errors**
```bash
# Reinstall dependencies
pip install -r requirements.txt

# Check Python version
python --version
```

**Environment variables not loading**
```bash
# Ensure .env file exists in backend/
cp backend/.env.example backend/.env

# Check that variables are exported
source backend/.env
echo $DATABASE_URL
```

### Frontend Issues

**Port 3000 in use**
```bash
# Change port in next.config.js or:
npm run dev -- -p 3001
```

**Module not found**
```bash
# Reinstall dependencies
npm install
# Clear cache
rm -rf node_modules .next
npm install
```

**API connection errors**
```bash
# Check API URL in .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Check backend is running
curl http://localhost:8000/health
```

### Mobile Issues

**Expo not starting**
```bash
# Clear cache
expo start -c

# Reinstall dependencies
rm -rf node_modules
npm install
```

**Device connection issues**
```bash
# Use tunnel connection
expo start --tunnel

# Or use local network
expo start --localhost
```

## Getting Help

- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check README.md and other docs
- **Community**: Join our Discord/Slack for questions

## Next Steps

1. ✅ Backend running at http://localhost:8000
2. ✅ Frontend running at http://localhost:3000
3. ✅ Database ready at localhost:5432
4. 📖 Read [ARCHITECTURE.md](ARCHITECTURE.md) to understand the codebase
5. 🔧 Check [CONTRIBUTING.md](CONTRIBUTING.md) for development workflow
6. 🚀 Start implementing features!
