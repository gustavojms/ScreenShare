FROM node:18.16.0-slim as BUILDER

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:18.16.0-alpine

ARG NODE_ENV

WORKDIR /app

COPY --from=BUILDER /app .

ENV PORT=3000

EXPOSE 3000

RUN npx prisma generate

CMD ["npm", "run", "dev"]