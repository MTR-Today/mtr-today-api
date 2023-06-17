FROM node:18
COPY . /app
WORKDIR /app
RUN npm i -g pnpm
RUN pnpm i
RUN pnpm run build
CMD node --experimental-specifier-resolution=node ./dist/index.js