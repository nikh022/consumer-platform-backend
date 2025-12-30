# Farmer-to-Consumer Discovery Platform Backend

A free discovery platform for **consumers** and **farmers**.

## About

**Farmer-to-Consumer Discovery Platform** is a free discovery and connection platform where farmers can list their available products such as crops, vegetables, and fruits. Consumers can find nearby farmers based on location and product availability, and connect directly with sellers via phone calls or WhatsApp.

Our vision is to connect farmers directly with consumers to provide fresh, local produce without middlemen, thereby increasing farmers’ profits and ensuring fair prices.

## Tech Stack

[![Node.js](https://img.shields.io/badge/node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/en)
[![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens&logoColor=white)](https://www.jwt.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
![OpenAPI](https://img.shields.io/badge/OpenAPI-6BA539?logo=openapiinitiative&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black)

## Run Locally

> 💡 **Quick Start:** See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for a comprehensive setup guide with troubleshooting tips!

Clone the project

```bash
  git clone https://github.com/your_username/consumer-platform-backend.git
```

Go to the project directory

```bash
  cd consumer-platform-backend
```

Install dependencies

```bash
  npm install
```

### Environment Variables

Create a `.env` file in the root directory by copying the example file:

```bash
  cp .env.example .env
```

Then update the values in `.env` file:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)

### Database Setup

**Option 1: Using Docker (Recommended for local development)**

Start PostgreSQL using Docker Compose:

```bash
  docker-compose up -d
```

**Option 2: Using your own PostgreSQL instance**

Make sure PostgreSQL is installed and running, then update `DATABASE_URL` in your `.env` file accordingly.

### Prisma Setup

Migrate all migrations to database

```bash
  npx prisma migrate dev
```

Generate Prisma client

```bash
  npx prisma generate
```

### Execution

To start the development server, run:

```bash
  npm run dev
```
