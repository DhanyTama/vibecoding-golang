# Maulana Laundry API Documentation

## Base URL
`http://localhost:8090/api` (Local)
`https://your-backend.up.railway.app/api` (Production)

## Authentication

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Login and get JWT Token | No |
| `POST` | `/auth/change-password` | Update current user password | Yes |

### Login Request Body
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

## User Management

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/users` | List users (supports search/filter) | Yes |
| `POST` | `/users` | Create new user | Yes |
| `GET` | `/users/:id` | Get user details | Yes |
| `PUT` | `/users/:id` | Update user | Yes |
| `DELETE` | `/users/:id` | Soft delete (Archive) user | Yes |
| `POST` | `/users/:id/restore` | Restore archived user | Yes |
| `DELETE` | `/users/:id/permanent` | Permanent (Hard) delete user | Yes |

### List Users Query Parameters
- `search`: Search by name or email
- `role`: Filter by role
- `status`: `active`, `archived`, or `all` (default: `active`)
- `page`: Page number (default: `1`)
- `limit`: Items per page (default: `10`)
- `sort_by`: Sort field (default: `created_at`)
- `order`: `asc` or `desc` (default: `desc`)

## Statistics & Reports

(Planned) Endpoints for dashboard metrics and data exports.
