FROM node:26.10.0-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --global npm@12.2.0
RUN npm ci
COPY . .
RUN npm run build

FROM node:26.10.0-bookworm-slim
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4100
WORKDIR /app
COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm install --global npm@12.2.0
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
USER node
EXPOSE 4100
CMD ["node", "dist/server/server/index.js"]
