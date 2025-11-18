FROM node:18-alpine

WORKDIR /app/backend

# Copy package files
COPY backend/package.json backend/package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy server code
COPY backend/server.js ./

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
