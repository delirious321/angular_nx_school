
FROM node:20-alpine AS builder
WORKDIR /app


COPY package*.json ./
RUN npm ci


COPY . .

RUN npx nx build app1
RUN npx nx build app2 

FROM nginx:stable-alpine


COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/apps/app1/browser/. /usr/share/nginx/html/app1/
COPY --from=builder /app/dist/apps/app2/browser/. /usr/share/nginx/html/app2/

CMD ["nginx", "-g", "daemon off;"]