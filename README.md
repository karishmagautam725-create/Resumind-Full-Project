# Resumind – AI Resume Analyzer

**Resumind** is an AI-powered resume analysis web application designed to help job seekers evaluate their resumes against specific job descriptions.

The application allows users to upload and manage resumes, create job descriptions, and analyze resume-job compatibility using ATS-style scoring and AI-powered feedback.

Resumind combines modern web technologies, asynchronous task processing, and AI integration to simplify resume evaluation and provide actionable insights.

## Project Status

🚧 Under active development.

## Key Highlights

- Resume upload and management.
- User authentication using JWT.
- Resume text extraction and processing.
- Job description management.
- Resume analysis and ATS-style scoring.
- AI integration for resume evaluation.
- Background task processing using Celery.
- RESTful API architecture using Django REST Framework.

## Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- Django ORM
- PostgreSQL

### Frontend
- React
- JavaScript
- Vite
- Tailwind CSS
- Axios
- React Router

### Background Processing and Caching
- Celery
- Redis

### AI and Retrieval
- OpenAI API
- LangChain

### API Documentation
- Django Spectacular
- Swagger UI
- ReDoc

### DevOps and Tools
- Docker
- Docker Compose
- Git
- GitHub


## Screenshots

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### My Resumes
![My Resumes](docs/screenshots/my-resumes.png)

### Resume Upload
![Resume Upload](docs/screenshots/upload-resume.png)

### Resume Analysis
![Resume Analysis](docs/screenshots/analysis.png)


## Project Structure

```text
Resumind/
│
├── apps/
│   ├── ai/              # AI integration and RAG functionality
│   ├── analysis/        # Resume analysis operations
│   ├── dashboard/       # Dashboard APIs and services
│   ├── jobs/            # Job description management
│   ├── resumes/         # Resume upload and processing
│   └── users/           # User authentication and management
│
├── config/
│   ├── settings/        # Django settings
│   ├── celery.py        # Celery configuration
│   ├── urls.py          # Main URL configuration
│   ├── asgi.py
│   └── wsgi.py
│
├── core/                # Shared utilities
├── services/            # Business logic and services
├── frontend/            # React frontend application
├── Dockerfile
├── docker-compose.yml
├── manage.py
├── requirements.txt
└── README.md
```


## System Architecture

Resumind follows a client-server architecture with asynchronous background processing.

1. The React frontend provides the user interface.
2. Axios communicates with the Django REST Framework APIs.
3. Django handles authentication, request validation, and application business logic.
4. PostgreSQL stores application data.
5. Redis acts as the Celery message broker and Django cache backend.
6. Celery workers process time-consuming resume-related tasks asynchronously.
7. AI services support intelligent resume analysis.


Docker Compose manages the application's backend, database, Redis, and Celery worker services.

## Docker Configuration

Resumind uses Docker and Docker Compose to manage its backend infrastructure and development environment.

The Docker Compose configuration includes the following services:

| Service | Description |
|---|---|
| `web` | Runs the Django application |
| `db` | PostgreSQL database |
| `redis` | Redis service for message brokering and caching |
| `worker` | Celery worker for asynchronous task processing |

### Docker Services

- **Django:** Handles HTTP requests and application logic.
- **PostgreSQL:** Stores application data.
- **Redis:** Acts as the Celery message broker and Django cache backend.
- **Celery Worker:** Executes background tasks independently of HTTP requests.

## Asynchronous Task Processing

Resumind uses Celery with Redis to execute time-consuming operations asynchronously.

The Celery application is configured in `config/celery.py` and automatically discovers tasks from registered Django applications.

Background processing is used for operations such as resume processing and analysis.

This approach helps keep API requests responsive while time-consuming operations execute in the background.