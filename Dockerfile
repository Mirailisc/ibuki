# Stage 1: Build the frontend (React Vite project)
FROM node:22-alpine AS frontend-build

WORKDIR /app

# Enable corepack and use pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy the root package.json and pnpm workspace files
COPY package.json pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./

# Install all dependencies in the workspace
RUN pnpm install --frozen-lockfile

# Copy the frontend source code (including tsconfig.json)
COPY frontend /app/frontend

# Build the React project
WORKDIR /app/frontend

RUN pnpm run generate-pwa-assets
RUN pnpm run build

# Stage 2: Build the backend (NestJS project)
FROM node:22-alpine AS backend-build

WORKDIR /app

# Enable corepack and use pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy the root package.json and pnpm workspace files
COPY package.json pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./

# Install all dependencies in the workspace
RUN pnpm install --frozen-lockfile

# Copy the backend source code
COPY backend /app/backend

# Copy the built frontend from the first stage
COPY --from=frontend-build /app/frontend/dist /app/backend/public

# Build the NestJS project
WORKDIR /app/backend

RUN pnpm run build

# Stage 3: Final production image
FROM node:22-alpine

WORKDIR /app

# Enable corepack and use pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy the root package.json and pnpm workspace files
COPY package.json pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy the built backend code
COPY --from=backend-build /app/backend /app/backend

# Copy the built frontend from the first stage
COPY --from=frontend-build /app/frontend/dist /app/backend/public

ENV NODE_ENV=production
ENV URL URL

# Expose the port that the NestJS app will run on
EXPOSE 4000

# Command to run the NestJS app
CMD ["pnpm", "run", "backend:prod"]
