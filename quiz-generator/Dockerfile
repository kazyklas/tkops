FROM node:20-alpine AS builder-frontend

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build


FROM node:20-alpine AS builder-backend

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install --production

COPY backend/ ./


FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache nginx

COPY --from=builder-frontend /app/frontend/dist /usr/share/nginx/html
COPY --from=builder-backend /app/backend .
COPY nginx.conf /etc/nginx/nginx.conf

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 80 3001

CMD sh -c "node src/index.js & \
    nginx -g 'daemon off;'"
