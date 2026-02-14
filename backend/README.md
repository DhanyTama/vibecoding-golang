# Maulana Laundry - Go Backend

Powerful and scalable Go Fiber backend for Maulana Laundry Management System.

## 🚀 Tech Stack

- **Framework**: [Fiber v2](https://gofiber.io/)
- **Database**: [GORM](https://gorm.io/) with PostgreSQL
- **Security**: JWT Authentication, Bcrypt Password Hashing, Helmet
- **Validation**: Fiber Body Parser (GORM handles DB constraints)
- **Deployment**: Docker, Railway

## 🛠️ Prerequisites

- Go 1.21 or higher
- PostgreSQL database
- Git

## ⚙️ Setup & Installation

1.  **Clone the Repository**
    ```bash
    git clone <repo-url>
    cd backend
    ```

2.  **Configure Environment Variables**
    Copy `env.example` to `.env` and fill in your details:
    ```bash
    cp env.example .env
    ```

3.  **Install Dependencies**
    ```bash
    go mod download
    ```

4.  **Run Migrations & Seeds**
    The application automatically runs migrations and seeds data on startup.

5.  **Run the Server**
    ```bash
    # Development with Air (if installed)
    air

    # Standard run
    go run cmd/main.go
    ```

## 📂 Project Structure

- `cmd/`: Application entry point (`main.go`).
- `config/`: Environment and configuration management.
- `database/`: Database connection and seeders.
- `handlers/`: HTTP request handlers (Business logic).
- `middleware/`: Custom middleware (Auth, CORS, etc.).
- `models/`: GORM database models.
- `routes/`: API route definitions.
- `utils/`: Helper functions (JWT, Hashing).

## 🔑 Key Features

- **Authentication**: Secure login and password management.
- **User Management**: Complete CRUD with soft deletes and archive/restore.
- **Transaction System**: (Planned) Tracking laundry orders.
- **Modern Security**: Protected paths via JWT middleware.
- **Production Ready**: Dockerized and ready for Railway deployment.

## 📡 API Endpoints

See `/docs/API.md` for full documentation.
