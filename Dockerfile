# Stage 1: Build the NestJS app
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the app
RUN npm run build


# Stage 2: Production image
FROM node:20-slim


WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY ./mongo_crypt_v1.so /tmp/
RUN chmod 755 /tmp/mongo_crypt_v1.so

# RUN apk add --no-cache libstdc++ gcompat
# Install only production dependencies
RUN npm install --omit=dev

# Optionally copy environment and encryption config
# COPY .env .env
# COPY master-key.txt ./  # Be cautious with secrets

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]

# using ubuntu base image
# Base image: Ubuntu 22.04
# FROM ubuntu:22.04

# # Set non-interactive mode for apt
# ENV DEBIAN_FRONTEND=noninteractive

# # Install Node.js 20 from NodeSource
# RUN apt-get update && \
#     apt-get install -y curl gnupg ca-certificates build-essential && \
#     curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
#     apt-get install -y nodejs && \
#     node -v && npm -v

# # Set working directory
# WORKDIR /app

# # Copy dependency files
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy NestJS source code
# COPY . .

# # Build the NestJS app
# RUN npm run build

# # Copy CSFLE shared library (.so) — must be Linux ELF!
# COPY mongo_crypt_v1.so /tmp/mongo_crypt_v1.so
# RUN chmod 755 /tmp/mongo_crypt_v1.so

# # Expose NestJS app port
# EXPOSE 3000

# # Start the app
# CMD ["npm", "start"]
