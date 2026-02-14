# Maulana Laundry - Full-Stack Management System

A premium, modern, and efficient laundry management solution built with Go and React.

## 🏗️ Project Overview

Maulana Laundry is a monorepo containing a high-performance backend and a rich, interactive frontend dashboard designed for laundry service operations.

## 📂 Repository Structure

- [**backend/**](./backend/): Go Fiber API with GORM and PostgreSQL.
- [**frontend/**](./frontend/): React + Vite dashboard with Shadcn UI and Tailwind CSS.
- [**docs/**](./docs/): Comprehensive API and architectural documentation.

## 🚀 Quick Start

### 1. Database
Ensure you have a PostgreSQL database running.

### 2. Backend
```bash
cd backend
cp env.example .env
# Edit .env with your DB credentials
go run cmd/main.go
```

### 3. Frontend
```bash
cd frontend
# Create .env with VITE_API_URL=http://localhost:8090/api
npm install
npm run dev
```

## 🛠️ Main Technologies

| Layer | Technology |
| :--- | :--- |
| **Backend** | Go, Fiber v2, GORM, PostgreSQL, JWT |
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, Shadcn UI |
| **Deployment** | Docker, Nginx, Railway |

## 📖 Documentation

- **Setup & Installation**: Detailed guides in [Backend README](./backend/README.md) and [Frontend README](./frontend/README.md).
- **API Reference**: Standardized endpoint definitions in [API.md](./docs/API.md).

## 🛡️ License

This project is licensed under the MIT License.
