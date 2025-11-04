# decideai-api

Minimal backend scaffold built with Node.js 20, TypeScript, Fastify, PostgreSQL, and Redis.

## Features

- **Node.js 20** with TypeScript for type safety
- **Fastify** web framework for high performance
- **PostgreSQL** database support
- **Redis** caching support
- **Docker** containerization with multi-stage builds
- **GitHub Actions** CI/CD for building and pushing Docker images

## Project Structure

```
.
├── src/
│   ├── index.ts          # Application entry point
│   ├── lib/
│   │   └── env.ts        # Environment configuration
│   └── routes/
│       └── health.ts     # Health check endpoint
├── .env.example          # Example environment variables
├── Dockerfile            # Multi-stage Docker build
├── docker-compose.yml    # Docker Compose configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- Docker and Docker Compose (for containerized deployment)

### Local Development

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file:

```bash
cp .env.example .env
```

3. Run in development mode:

```bash
npm run dev
```

4. Build TypeScript:

```bash
npm run build
```

5. Start production build:

```bash
npm start
```

### Docker Deployment

Run with Docker Compose (includes API, PostgreSQL, and Redis):

```bash
docker compose up --build
```

The API will be available at `http://localhost:3000`.

## API Endpoints

### Health Check

- **GET** `/api/health`
- Returns: `{"status":"ok"}`

## Environment Variables

See `.env.example` for all available environment variables:

- `PORT` - Server port (default: 3000)
- `HOST` - Server host (default: 0.0.0.0)
- `NODE_ENV` - Environment (development/production)
- `DATABASE_HOST` - PostgreSQL host
- `DATABASE_PORT` - PostgreSQL port
- `DATABASE_NAME` - Database name
- `DATABASE_USER` - Database user
- `DATABASE_PASSWORD` - Database password
- `REDIS_HOST` - Redis host
- `REDIS_PORT` - Redis port
- `REDIS_PASSWORD` - Redis password (optional)

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Lint code with ESLint
- `npm run format` - Format code with Prettier

## CI/CD

GitHub Actions workflow automatically builds and pushes Docker images to GitHub Container Registry on push to `main` or `develop` branches.
