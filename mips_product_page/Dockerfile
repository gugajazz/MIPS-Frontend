# mips_product_page/Dockerfile)
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set workdir
WORKDIR /app

# Copy pnpm files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Rsbuild/Vite dev servers need this to be accessible
ENV HOST=0.0.0.0