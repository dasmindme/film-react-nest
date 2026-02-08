# Frontend Dockerfile
# Build stage
FROM node:20-alpine AS build

WORKDIR /app

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
