# NestJS Starter App 🚀

A boilerplate NestJS application pre-configured with common best practices, tools, and integrations for rapid development.

---

## ✨ Features

- **Custom Validation Pipe (Laravel-like)**
  - Instead of returning an array of validation errors (default NestJS behavior), it returns a key-value pair structure.
  - Example output:
    ```json
    // Throws Unprocessable Entity (422)
    {
      "errors": {
        "email": "The email field is required",
        "password": "The password must be at least 6 characters"
      }
    }
    ```

- **Docker Setup**
  - Ready-to-use Docker configuration for both **development** and **testing** environments.

- **Caching with Redis**
  - Integrated `cache-manager` with Redis support for improved performance.

- **Prisma as Database ORM**
  - Uses **Prisma** instead of TypeORM.
  - Includes a **custom Database Service** with `reset()` helper for testing.

- **Custom Logger (Winston)**
  - Structured logging using `winston` with support for different log levels and transports.

- **Custom Response Interceptor**
  - Provides consistent response formatting across all endpoints.

- **Sentry Integration**
  - 3rd-party error tracking with [Sentry](https://sentry.io/).

- **Testing Setup**
  - Pre-installed with `jest-mock-extended` for more powerful and type-safe mocking.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) >= 20
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### Installation
```bash
# Install dependencies
pnpm install
# or
npm install
```

### Running the app
```bash
# Install dependencies
pnpm start:dev
# or
npm run start:dev
```

### Running the E2E or Integration test
```bash
# Install dependencies
pnpm test:e2e
# or
npm run test:e2e
```

### Running the Unit Test
```bash
# Install dependencies
pnpm test
# or
npm run test
```


## Let's Connect

If you have jobs, projects, or just want to discuss something interesting, feel free to reach out!
You can also check out my portfolio here: [Portfolio 🚀](https://newbie2019-hub.github.io/)



