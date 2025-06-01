FROM node:22.16.0@sha256:0b5b940c21ab03353de9042f9166c75bcfc53c4cd0508c7fd88576646adbf875
COPY . /app
WORKDIR /app
RUN npm i -g pnpm
RUN pnpm i
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "start"]
