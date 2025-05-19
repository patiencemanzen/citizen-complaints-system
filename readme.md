# Citizen Complaints and Engagement System

A full-stack digital platform for citizens to submit complaints or feedback about public services, track their status, and engage with government agencies. The system features role-based dashboards for citizens, agency staff, and administrators, and is designed to streamline communication, increase transparency, and improve public service delivery.

## Features

- **Complaint Submission:** Citizens can submit complaints or feedback online.
- **Status Tracking:** Track the progress and resolution of submissions.
- **Automated Routing:** Complaints are categorized and routed to the correct agency.
- **Agency Dashboards:** Agencies manage and respond to assigned complaints.
- **Role-Based Access:** Secure dashboards for citizens, agency users, and admins.
- **Comment System:** All users can comment on complaints for engagement and follow-up.
- **Authentication:** Email/password and Google OAuth login.
- **Admin Controls:** Admins manage agencies and users.

## Basic Workflow

1. **Citizens** register/login and submit complaints.
2. **Complaints** are routed to the appropriate agency.
3. **Agencies** log in to view, manage, and respond to assigned complaints.
4. **Admins** manage agencies, users, and system settings.
5. **All users** can comment on complaints for updates and engagement.

## Tech Stack

- **Backend:** NestJS, TypeScript, MongoDB (Mongoose & Prisma), JWT, Nodemailer, Google OAuth
- **Frontend:** Next.js (App Router), Tailwind CSS, Flowbite, Axios, React Context

## Project Structure

- `backend/` – API, authentication, business logic, and database models
- `frontend/` – User/admin/agency dashboards, forms, and UI components

## Getting Started

1. **Backend:**
   - See [`backend/README.md`](./backend/README.md) for setup, environment variables, and API usage.
2. **Frontend:**
   - See [`frontend/README.md`](./frontend/README.md) for setup, environment variables, and running the UI.

## Contribution

- Open issues for bugs or feature requests.
- Submit pull requests for improvements.
- See individual `README.md` files in `backend/` and `frontend/` for development notes and requirements.

---

For questions or contributions, please open an issue or submit a pull request.
