# Contributing to SurvAi

Thank you for your interest in contributing to SurvAi! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Making Changes](#making-changes)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Coding Standards](#coding-standards)
8. [Testing](#testing)
9. [Documentation](#documentation)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please:

- Be respectful and professional
- Welcome diverse perspectives
- Focus on constructive feedback
- Report unacceptable behavior to the maintainers

## Getting Started

### Prerequisites
- Familiarity with Git and GitHub
- Understanding of the project structure
- Development environment set up (see SETUP.md)

### Fork and Clone
```bash
# Fork the repository on GitHub (click "Fork" button)
# Clone your fork
git clone https://github.com/YOUR_USERNAME/LifeSync.git
cd LifeSync

# Add upstream remote
git remote add upstream https://github.com/shahartabib/LifeSync.git
```

## Development Setup

### 1. Create a Feature Branch
```bash
# Fetch latest changes
git fetch upstream

# Create new branch from main/develop
git checkout -b feature/your-feature-name
# Or for bug fixes:
git checkout -b fix/bug-description
```

### 2. Install Dependencies
Follow the setup instructions in [SETUP.md](SETUP.md) to install all dependencies.

### 3. Start Development
```bash
# Run all services using Docker Compose
docker-compose up -d

# Or run services individually (see SETUP.md)
```

## Making Changes

### Code Organization

#### Backend Changes
- Add new features in `backend/api/` for routes
- Add business logic in `backend/services/`
- Add validation schemas in `backend/schemas/`
- Add new models in `backend/database.py`

#### Frontend Changes
- Add components in `frontend/web/src/components/`
- Add pages in `frontend/web/src/app/`
- Add hooks in `frontend/web/src/hooks/`
- Add utilities in `frontend/web/src/utils/`

#### Mobile Changes
- Add screens in `frontend/mobile/src/screens/`
- Add components in `frontend/mobile/src/components/`
- Add services in `frontend/mobile/src/services/`

### Running Tests
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend/web
npm test

# With coverage
npm run test:coverage
```

### Type Checking
```bash
# Backend
cd backend
mypy .

# Frontend
cd frontend/web
npm run type-check

# Mobile
cd frontend/mobile
npm run type-check
```

### Linting
```bash
# Backend
cd backend
pylint backend/

# Frontend
cd frontend/web
npm run lint

# Mobile
cd frontend/mobile
npm run lint
```

## Commit Guidelines

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **refactor**: Code refactoring
- **perf**: Performance improvement
- **test**: Adding or updating tests
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **chore**: Build process, dependencies, or tooling changes
- **ci**: CI/CD configuration changes

### Scopes
- **backend**: Backend/API changes
- **frontend**: Web frontend changes
- **mobile**: Mobile app changes
- **db**: Database schema or migrations
- **auth**: Authentication features
- **survey**: Survey features
- **analytics**: Analytics features
- **ai**: AI features
- **docs**: Documentation

### Examples

```bash
# Feature
git commit -m "feat(survey): add conditional logic to survey builder"

# Bug fix
git commit -m "fix(auth): handle token refresh failure properly"

# Documentation
git commit -m "docs: update API documentation for survey endpoints"

# Performance
git commit -m "perf(frontend): optimize survey form rendering"

# Refactoring
git commit -m "refactor(backend): simplify sentiment analysis logic"
```

### Detailed Commit Message

For complex changes, provide a detailed commit message:

```
feat(ai): implement survey generation from natural language

Implement AI-powered survey generation using OpenAI GPT-4.
The feature includes:
- Parsing natural language prompts
- Generating structured questions
- Validating question quality
- Storing generation metadata

Closes #123
```

## Pull Request Process

### Before Creating a PR

1. **Sync with upstream**
```bash
git fetch upstream
git rebase upstream/main  # or develop
```

2. **Run all checks locally**
```bash
# Tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint

# Build (if applicable)
npm run build
```

3. **Update documentation** if needed

### Creating a PR

1. Push your branch to your fork
```bash
git push origin feature/your-feature-name
```

2. Go to GitHub and click "Create Pull Request"

3. Use this PR template:
```markdown
## Description
Brief description of the changes and why they're needed.

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Related Issue
Fixes #(issue number)

## How Has This Been Tested?
Describe the tests and how to reproduce them.

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have updated the documentation
- [ ] I have added tests for new features
- [ ] All tests pass
- [ ] My changes generate no new warnings
- [ ] I have reviewed my own code
```

### PR Review Process

- Maintainers will review your PR
- Request changes may be made
- Once approved, your PR will be merged
- Your branch will be deleted

## Coding Standards

### Python (Backend)

- **Style**: PEP 8
- **Formatter**: Black
- **Linter**: Pylint
- **Type Checking**: mypy

```bash
# Format code
black backend/

# Run linter
pylint backend/

# Type check
mypy backend/
```

**Code Style Example**
```python
async def process_survey_response(response_id: UUID, data: ResponseData) -> Response:
    """
    Process and analyze survey response.

    Args:
        response_id: UUID of the response
        data: Response data with answers

    Returns:
        Processed response with AI analysis

    Raises:
        HTTPException: If survey not found
    """
    survey = await get_survey(response_id)
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")

    # Process response
    processed = await response_service.process(response_id, data)

    return processed
```

### TypeScript/JavaScript (Frontend & Mobile)

- **Style**: ESLint config
- **Formatter**: Prettier
- **Type Checking**: TypeScript strict mode

```bash
# Format code
prettier --write "src/**/*.{ts,tsx}"

# Lint
npm run lint

# Type check
npm run type-check
```

**Code Style Example**
```typescript
interface SurveyProps {
  surveyId: string;
  onSubmit?: (data: SurveyResponse) => void;
}

export const Survey: React.FC<SurveyProps> = ({ surveyId, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const response = await surveysApi.submitResponse(surveyId, formData);
      onSubmit?.(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="survey-container">
      {/* Component JSX */}
    </div>
  );
};
```

### Naming Conventions

**Backend (Python)**
- Classes: `PascalCase` (e.g., `SurveyService`)
- Functions/methods: `snake_case` (e.g., `process_response`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`)
- Private methods: `_snake_case` (e.g., `_validate_input`)

**Frontend (TypeScript)**
- Components: `PascalCase` (e.g., `SurveyBuilder`)
- Variables/functions: `camelCase` (e.g., `handleSubmit`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `DEFAULT_TIMEOUT`)
- Types/Interfaces: `PascalCase` (e.g., `SurveyResponse`)

## Testing

### Test File Organization

**Backend**
```
backend/tests/
├── test_auth.py
├── test_surveys.py
├── test_analytics.py
└── conftest.py (shared fixtures)
```

**Frontend**
```
frontend/web/src/
├── components/
│   └── __tests__/
│       └── SurveyBuilder.test.tsx
└── hooks/
    └── __tests__/
        └── useApi.test.ts
```

### Writing Tests

**Backend (Pytest)**
```python
@pytest.mark.asyncio
async def test_create_survey_successful(db_session):
    """Test successful survey creation."""
    user = create_test_user(db_session)

    survey_data = {
        "title": "Test Survey",
        "description": "Test Description",
        "language": "en",
    }

    result = await survey_service.create_survey(user.id, survey_data)

    assert result.title == "Test Survey"
    assert result.user_id == user.id
    assert result.status == "draft"

@pytest.mark.asyncio
async def test_create_survey_validation_error(db_session):
    """Test survey creation with invalid data."""
    user = create_test_user(db_session)

    with pytest.raises(ValidationError):
        await survey_service.create_survey(user.id, {"title": ""})
```

**Frontend (Jest)**
```typescript
describe('SurveyBuilder', () => {
  it('should add a new question when add button is clicked', () => {
    const { getByText } = render(<SurveyBuilder />);

    const addButton = getByText('Add Question');
    fireEvent.click(addButton);

    expect(getByText('Question 2')).toBeInTheDocument();
  });

  it('should validate required fields before submission', async () => {
    const { getByText, getByPlaceholderText } = render(<SurveyBuilder />);

    const submitButton = getByText('Create Survey');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Title is required')).toBeInTheDocument();
    });
  });
});
```

### Test Coverage

Aim for:
- **Backend**: 80%+ coverage
- **Frontend**: 70%+ coverage for critical features
- **E2E**: Cover main user flows

## Documentation

### Inline Documentation
- Add docstrings to all functions/methods
- Explain complex logic with comments
- Keep documentation up-to-date with code changes

**Python Docstring Format**
```python
async def process_response(survey_id: UUID, answers: Dict[str, Any]) -> Response:
    """
    Process and analyze a survey response.

    This function validates answers, stores the response, and triggers
    AI analysis for sentiment and knowledge assessment.

    Args:
        survey_id: Unique identifier of the survey
        answers: Dictionary mapping question IDs to answers

    Returns:
        Response object with metadata and analysis results

    Raises:
        SurveyNotFoundError: If survey doesn't exist
        ValidationError: If answers don't match question types

    Examples:
        >>> response = await process_response(survey_id, {"q1": "yes"})
        >>> print(response.id)
        550e8400-e29b-41d4-a716-446655440000
    """
```

### API Documentation
- Update Swagger/OpenAPI comments for new endpoints
- Include request/response examples
- Document error codes and messages

### README Updates
- Update if adding new features
- Document new environment variables
- Add any new dependencies to installation instructions

## Common Issues & Solutions

### Git Conflicts
```bash
# Update your branch with latest upstream changes
git fetch upstream
git rebase upstream/main

# Resolve conflicts in your editor
# Then continue rebasing
git add .
git rebase --continue
```

### Large Commits
Keep commits focused and reasonably sized:
```bash
# Stage only specific files
git add frontend/web/src/components/NewComponent.tsx

# Stage chunks of a file
git add -p backend/services/survey_service.py
```

### Accidentally Committed Sensitive Data
```bash
# Remove from history (use with caution)
git filter-branch --tree-filter 'rm -f .env'

# Or use BFG Repo-Cleaner for cleaner approach
bfg --delete-files .env
```

## Getting Help

- **Issues**: Check existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Read SETUP.md and ARCHITECTURE.md
- **Community**: Reach out on Discord/Slack (links in README)

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- GitHub contributors page
- Release notes for significant contributions

---

**Thank you for contributing to SurvAi! Your effort helps make this project better. 🎉**
