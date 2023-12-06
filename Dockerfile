FROM node:21.4.0
COPY . /app
WORKDIR /app
RUN npm i -g pnpm
RUN pnpm i
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "start"]
