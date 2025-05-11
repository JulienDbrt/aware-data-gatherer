# RSS-GPT

A lightweight **FastAPI** backend that aggregates RSS feeds, stores articles, and exposes a clean REST API—ideal for powering newsletters, dashboards, or AI-driven summarizers.

<p align="center">
  <img src="https://img.shields.io/badge/FastAPI-0.110+-green?style=flat-square" alt="FastAPI">
  <img src="https://img.shields.io/badge/Python-3.10%2B-blue?style=flat-square" alt="Python">
  <img src="https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square" alt="License">
</p>

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Development Workflow](#development-workflow)
- [System Diagram](#system-diagram)
- [Security Notes](#security-notes)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **FastAPI** with automatic interactive docs at `/docs`
- **SQLite** out-of-the-box, optional **PostgreSQL** support
- Periodic RSS fetcher script (cron-friendly)
- Modular routers (`/sources`, `/articles`, `/items`, `/refresh`, `/graph`)
- Typed models with **Pydantic**
- One-command setup for local development

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-username/RSS-GPT.git
cd RSS-GPT

# 2. Create a virtual environment
python -m venv .venv
source .venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Initialize the database (SQLite)
python init_db.py

# 5. Run the API server
uvicorn app:app --reload --port 8000

# 6. (Optional) Fetch articles from all sources
python fetch_articles.py
```

---

## Project Structure

```
rss-gpt/
├── app.py               # FastAPI entry-point
├── routers/
│   ├── articles.py
│   ├── sources.py
│   └── (graph.py)
├── models.py            # SQLAlchemy ORM models
├── schemas.py           # Pydantic models
├── fetch_articles.py    # Cron-capable fetcher
├── init_db.py
├── config.ini
├── requirements.txt
└── README.md
```

---

## Configuration

| Key              | Default                 | Description                           |
| ---------------- | ----------------------- | ------------------------------------- |
| `DATABASE_URL`   | `sqlite:///rssgpt.db`   | SQLAlchemy connection string          |
| `FETCH_INTERVAL` | *None*                  | If set, the fetcher loops every N sec |
| `OPENAI_API_KEY` | *env* var / `.env` file | For downstream AI usage               |

> **Tip:** Copy `config.ini.example` to `config.ini` and adjust as needed.

---

## API Reference

Once the server is running, visit **`/docs`** for the full OpenAPI spec.

### Key Endpoints

| Method | Path                    | Purpose                        |
| ------ | ----------------------- | ------------------------------ |
| GET    | `/`                     | Health check                   |
| GET    | `/sources/`             | List sources                   |
| POST   | `/sources/`             | Add a source                   |
| PUT    | `/sources/{id}`         | Update a source                |
| DELETE | `/sources/{id}`         | Delete a source                |
| POST   | `/refresh/{source_id}`  | Refresh a specific source      |
| GET    | `/articles/`            | List/filter articles           |
| GET    | `/items`                | List articles (frontend shape) |
| GET    | `/graph`                | Article relationship graph     |

#### Example: Add a new RSS source

```bash
curl -X POST http://127.0.0.1:8000/sources/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Example","url":"https://example.com/rss"}'
```

---

## Development Workflow

1. Start the backend:
   ```bash
   uvicorn app:app --reload --port 8000
   ```
2. (Optional) Start the frontend (if using with a React/Vite client):
   ```bash
   npm run dev
   ```
3. Access the API docs at [http://localhost:8000/docs](http://localhost:8000/docs)
4. Access the frontend at [http://localhost:5173](http://localhost:5173) (if applicable)

---

## System Diagram

```mermaid
flowchart TD
    subgraph Frontend (Vite + React)
        A[User Browser] -- HTTP (localhost:5173) --> B[Vite Dev Server]
    end
    subgraph Backend (FastAPI)
        C[FastAPI API] -- HTTP (localhost:8000) --> D[Database]
    end
    B -- API Requests (CORS/Proxy) --> C
```

---

## Security Notes

- **Authentication:** None by default (PRs welcome!)
- **CORS:** Enable as needed for your frontend origin
- **Input validation:** Handled via Pydantic, but custom URL checks recommended
- **Secrets:** Store API keys in environment variables or a `.env` file

---

## Roadmap

- [ ] JWT / API-key authentication
- [ ] Pagination & rate limiting
- [ ] Background task queue (Celery/RQ)
- [ ] Dockerfile & CI workflow
- [ ] Unit / integration tests

---

## Contributing

1. Fork the repo & create a feature branch
2. Run `pre-commit install` for linting/formatting
3. Open a PR with a descriptive title and context

---

## License

MIT © 2025 Julien Dabert
