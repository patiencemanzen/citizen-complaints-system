# Citizen Complaints System – Backend

This is the backend API for the Citizen Complaints and Engagement System, built with [NestJS](https://nestjs.com), MongoDB (Mongoose & Prisma), and JWT authentication. It provides RESTful endpoints for user, agency, complaint, and comment management, with role-based access control and email/Google authentication.

## Features

- **User Authentication:** Register, login, password reset, JWT, and Google OAuth.
- **Role-Based Access:** Admin, agency, and citizen roles with protected endpoints.
- **Agency Management:** Admins can create, update, and delete agencies. Each agency is linked to a user account.
- **Complaint Management:** Citizens submit complaints, agencies manage assigned complaints, all users can comment.
- **Comment System:** Add and view comments on complaints.
- **Email Integration:** Nodemailer for password reset and notifications.
- **Modular Structure:** Clean, maintainable NestJS modules and services.

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or cloud)

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

- `DATABASE_URL` – MongoDB connection string
- `JWT_SECRET` – Secret for JWT signing
- `EMAIL_USER`, `EMAIL_PASS` – For nodemailer (Gmail or SMTP)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` – For Google OAuth

### Running the Server

```bash
npm run start:dev
```

The API will be available at [http://localhost:4000](http://localhost:4000) by default.

## API Overview

- **Auth:** `/auth/register`, `/auth/login`, `/auth/forgot-password`, `/auth/verify-code`, `/auth/google`
- **Users:** `/users` (CRUD, admin only)
- **Agencies:** `/agencies` (CRUD, admin only for create/update/delete)
- **Complaints:** `/complaints` (CRUD, role-based access)
- **Comments:** `/complaints/:id/comments` (add/view comments)

All endpoints (except public ones) require a valid JWT in the `Authorization` header.

## Development Notes

- Uses both Mongoose and Prisma for MongoDB (for flexibility and future migration).
- Modularized code: see `src/modules/`, `src/controllers/`, `src/services/`, `src/schemas/`, `src/dtos/`.
- Guards and decorators for role-based access (`@Roles`, `@Public`).
- Prisma schema in `/prisma/schema.prisma`.
- Test cases in `/test/` (Jest).

## Running Tests

```powershell
npm run test
```

## Project Structure

- `src/` – Main source code (modules, controllers, services, schemas, dtos)
- `prisma/` – Prisma schema and config
- `test/` – Jest test cases

## License

This project is for demonstration and educational purposes. See LICENSE for details.
