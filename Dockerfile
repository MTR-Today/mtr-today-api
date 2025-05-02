FROM node:22.15.0@sha256:a1f1274dadd49738bcd4cf552af43354bb781a7e9e3bc984cfeedc55aba2ddd8
COPY . /app
WORKDIR /app
RUN npm i -g pnpm
RUN pnpm i
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "start"]
