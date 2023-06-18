FROM node:20
COPY . /app
WORKDIR /app
RUN npm i -g pnpm
RUN pnpm i
RUN pnpm run build
EXPOSE 3000
CMD node --experimental-loader ./dist/index.js