FROM node:20
EXPOSE 3000
COPY . /app
WORKDIR /app
RUN npm i -g pnpm
RUN pnpm i
RUN pnpm run build
CMD node --experimental-loader ./dist/index.js