FROM node:18.16.0-slim as BUILDER

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:18.16.0-alpine

ARG NODE_ENV

WORKDIR /app

COPY --from=BUILDER /app .

ENV PORT=5173

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]