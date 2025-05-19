FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS prod

WORKDIR /app

COPY --from=builder /app .

RUN npm prune --production

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
