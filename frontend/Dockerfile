# Frontend Dockerfile
# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Build-time arguments for Vite envs
ARG VITE_API_URL
ARG VITE_CDN_URL

# Expose them as environment variables so Vite sees import.meta.env.VITE_*
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_CDN_URL=${VITE_CDN_URL}

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

# Runtime stage: only provides built assets via volume
FROM alpine:3.19 AS runtime

WORKDIR /dist

# Copy build artifacts to a well-known path that will be mounted as a volume
COPY --from=build /app/dist .

# This image is intended to be used as a build artifact provider for nginx via volume
CMD ["sh", "-c", "ls -R /dist"]
