# Maulana Laundry - React Frontend

Modern, high-performance Admin Dashboard and Landing Page for Maulana Laundry Management System.

## 🚀 Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Table](https://tanstack.com/table/v8)
- **Deployment**: [Railway](https://railway.app/) + Nginx

## 🛠️ Prerequisites

- Node.js 20 or higher
- npm or pnpm
- Git

## ⚙️ Setup & Installation

1.  **Clone the Repository**
    ```bash
    git clone <repo-url>
    cd frontend
    ```

2.  **Configure Environment Variables**
    Create a `.env` file in the `frontend` root:
    ```bash
    VITE_API_URL=http://localhost:8090/api
    ```

3.  **Install Dependencies**
    ```bash
    npm install
    ```

4.  **Run in Development**
    ```bash
    npm run dev
    ```

5.  **Build for Production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

- `src/components/`: Reusable UI components (Shadcn UI).
- `src/lib/`: API client and utility functions.
- `src/store/`: State management (Zustand).
- `src/pages/`: Page-level components (Dashboard, Login).
- `src/hooks/`: Custom React hooks.
- `public/`: Static assets (Logos, Icons).

## 🔑 Key Features

- **Responsive Design**: Works perfectly on mobile and desktop.
- **Admin Dashboard**: Comprehensive user management and interface.
- **Data Management**: Advanced tables with sorting, filtering, and pagination.
- **Visuals**: Premium aesthetics with smooth transitions and micro-animations.
- **PWA Support**: Installable web application.

## 📡 Backend Integration

The frontend communicates with a Go Fiber backend. Ensure the backend is running and `VITE_API_URL` is correctly configured.
