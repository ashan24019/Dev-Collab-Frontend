# DevCollab — Frontend

React single-page application for the DevCollab team project management platform.

## Tech Stack
- React 18 + Vite
- React Router v6
- Axios
- Docker (multi-stage Node build + Nginx)
- GitHub Actions CI
- Deployed on Railway

## Key Features
- JWT authentication with automatic token handling via Axios interceptors
- Protected routes with automatic redirect for unauthenticated users
- Auth Context API for global authentication state
- Kanban-style task board with status-based grouping
- Project member management with role-based UI rendering (ADMIN / MEMBER)
- Responsive layout with inline styles

## Project Structure
```
src/
├── api/           ← Axios instance and API call functions
├── components/    ← Reusable UI components
├── context/       ← Auth Context and provider
├── hooks/         ← Custom hooks (useProjects, useTasks)
├── pages/
│   ├── auth/      ← Login and Register pages
│   └── dashboard/ ← Dashboard and Project detail pages
└── utils/         ← Helper functions
```

## Local Setup

### Prerequisites
- Node.js 20+
- DevCollab backend running locally or use the live Railway URL

### Run locally
```bash
# Clone the repo
git clone https://github.com/ashan24019/Dev-Collab-Frontend.git

cd Dev-Collab-Frontend

# Install dependencies
npm install

# Set environment variable (optional — defaults to localhost:8080)
# Create a .env.local file:
VITE_API_URL=http://localhost:8080

# Run development server
npm run dev
```

Open `http://localhost:5173`

### Build for production
```bash
npm run build
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8080` |

## Docker

```bash
# Build image
docker build \
  --build-arg VITE_API_URL=https://your-backend-url \
  -t devcollab-frontend .

# Run container
docker run -p 5173:80 devcollab-frontend
```

## CI/CD
- GitHub Actions CI runs on every PR — installs dependencies and builds the project
- Railway auto-deploys on every push to `main`
- Branch protection enforces green CI before merge is allowed

## Live Demo
Frontend: https://dev-collab-frontend-production.up.railway.app
Backend API: https://dev-collab-production-bb15.up.railway.app

## Related Repository
Backend: https://github.com/ashan24019/Dev-Collab