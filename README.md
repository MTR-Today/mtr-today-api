
<div align="center">

![Banner](docs/banner.png 'Banner')

# MTR Today API

Open API for [MTR HK](https://www.mtr.com.hk/) trains schedule and fares

![GitHub CI](https://github.com/MTR-Today/mtr-today-api/actions/workflows/runTest.yml/badge.svg) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) [![npm type definitions](https://img.shields.io/npm/types/typescript.svg)](https://www.typescriptlang.org/)

[Usage](#-api-documentation) | [Development](#%EF%B8%8F-development) | [Contributing](#-contributing)

</div>

## 💻 API Documentation

- [REST API](https://api.mtr.today/api/v1)
- [GraphQL API](https://api.mtr.today/api/v1/graphql)

## ⌨️ Development

### Local Development

```bash
pnpm i

# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

### Build

```bash
pnpm run build
```

## 🤝 Contributing

### 🚢 Release Flow

This repo uses [Release Please](https://github.com/google-github-actions/release-please-action) to release.

### To release a new version

1. Merge `develop` into `main`
2. A GH Action will run(triggered automatically) and a Release PR will be created.
3. Merge the release PR
4. Wait for the second GH Action to run(triggered automatically)
5. Create merge back PR(from `main` back to `develop`)
6. You're done!
