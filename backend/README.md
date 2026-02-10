# Public Service Rater - Backend

This directory contains the Python backend for the Public Service Rater application. It's built using FastAPI, providing a high-performance and easy-to-use API.

## Technology Stack

- **Web Framework**: FastAPI
- **Database ORM**: SQLAlchemy with GeoAlchemy2 for geospatial support
- **Database Driver**: psycopg2
- **Data Validation**: Pydantic
- **Database Migrations**: Alembic
- **Authentication**: JWT tokens with Passlib for hashing
- **Server**: Uvicorn

## Setup Instructions

### 1. Prerequisites

- Python 3.8+
- PostgreSQL database with the PostGIS extension enabled.
  To enable PostGIS, connect to your database and run: `CREATE EXTENSION postgis;`

### 2. Installation

1.  **Create a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

### 3. Environment Configuration

1.  **Copy the example environment file:**
    ```bash
    cp .env.example .env
    ```

2.  **Edit the `.env` file** with your specific settings:
    - `DATABASE_URL`: Your PostgreSQL connection string.
      *Format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME`*
    - `SECRET_KEY`: A long, random string for signing JWTs. You can generate one using `openssl rand -hex 32`.
    - `ALGORITHM`: Keep this as `HS256`.
    - `ACCESS_TOKEN_EXPIRE_MINUTES`: Set the duration for login sessions.

### 4. Database Migrations

This project uses Alembic to manage database schema changes.

1.  **Initialize the database:**
    After setting your `DATABASE_URL` in the `.env` file, run the initial migration to create all the tables.
    ```bash
    alembic upgrade head
    ```

2.  **Making schema changes:**
    - Modify the SQLAlchemy models in `backend/models.py`.
    - Generate a new migration script:
      ```bash
      alembic revision --autogenerate -m "Your description of changes"
      ```
    - Apply the changes to the database:
      ```bash
      alembic upgrade head
      ```

### 5. Running the Backend Server

- **For development:**
  ```bash
  uvicorn main:app --reload
  ```
  The server will be available at `http://127.0.0.1:8000`. The `--reload` flag automatically restarts the server when you make code changes.

- **Interactive API Docs:**
  Once the server is running, you can access the automatically generated interactive documentation at:
  - **Swagger UI**: `http://127.0.0.1:8000/docs`
  - **ReDoc**: `http://127.0.0.1:8000/redoc`

### 6. Creating an Admin User

To access the protected admin endpoints, you'll need to create an admin user. An example script or command for this would typically be added to a production setup. For now, you can do this manually via a Python shell or directly in the database.
