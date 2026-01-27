# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=22.20.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

# Default to development for this image; compose can override if needed.
ENV NODE_ENV=development

# Install dependencies separately for better layer caching.
# package-lock.json* is optional (works even if the file is missing).
COPY package.json package-lock.json* ./
RUN npm ci --include=dev

# Copy the rest of the source code (for non-mounted use; in dev we bind-mount).
COPY . .

EXPOSE 3000

# Run Next.js in dev mode. Host 0.0.0.0 is required to be reachable from outside the container.
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "3000"]
