# Docker Setup for fit-legacy-open-builder

This is a **standalone Vite + React application** containerized for both development and production.

## Quick Start

### Development (with hot reload)
```bash
docker compose up dev
```
Your app will be available at: **http://localhost:5178**

Changes to `src/`, `public/`, and `index.html` will hot-reload automatically.

### Production (optimized nginx)
```bash
docker compose up prod
```
Your app will be available at: **http://localhost:80**

## Architecture

### `Dockerfile`
Multi-stage build for production:
- **Stage 1 (builder)**: Node.js Alpine + pnpm → builds to `/app/dist`
- **Stage 2 (runtime)**: Nginx Alpine → serves static files with SPA routing

Result: ~50MB production image (minimal size)

### `Dockerfile.dev`
Node.js Alpine + Vite dev server with bind mounts for instant feedback.

### `nginx.conf`
Production nginx configuration:
- SPA routing (fallback to index.html)
- Gzip compression
- Security headers
- Asset caching (1 year for versioned files)

## Environment Variables

For development, create `.env.local` in the project root and it will be picked up by Vite.

For production Docker builds, pass environment variables at runtime:
```bash
docker run -e VITE_API_URL=https://api.example.com fit-legacy-builder:prod
```

Or use compose `.env` file:
```bash
VITE_API_URL=https://api.example.com docker compose up prod
```

## Build & Push to Registry

```bash
# Build for amd64 (cloud)
docker build --platform linux/amd64 -t myregistry.com/fit-legacy-builder:latest .

# Push
docker push myregistry.com/fit-legacy-builder:latest
```

## Troubleshooting

### Port already in use
```bash
# Dev port (5178)
docker compose down dev

# Prod port (80)
docker compose down prod
sudo lsof -i :80  # Check what's using port 80
```

### Build fails with pnpm
Ensure `pnpm-lock.yaml` is committed to git.

### Hot reload not working
Make sure you're using the `dev` service and files are in the correct mount paths:
- `./src` → `/app/src`
- `./public` → `/app/public`
- `./index.html` → `/app/index.html`

## Production Deployment

See your cloud provider's Docker/container deployment docs:
- **AWS ECS**: Push to ECR, then deploy
- **Vercel**: Deploy the Vite build directly (no Docker needed)
- **Render**: Connect GitHub repo, Render auto-detects Dockerfile
- **Fly.io**: `flyctl launch` then `flyctl deploy`

For this app, **Vite builds to static HTML/CSS/JS**, so any static file host works (S3, Cloudflare Pages, Netlify, etc.) — Docker is optional for production.
