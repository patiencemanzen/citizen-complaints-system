# Citizen Complaints System – Frontend

This is the frontend for the Citizen Complaints and Engagement System, built with [Next.js](https://nextjs.org), Tailwind CSS, and Flowbite. It provides a modern, user-friendly interface for citizens, agencies, and administrators to interact with the platform.

## Features

- **User Authentication:** Register, login, password reset, and Google OAuth.
- **Role-Based Dashboards:** Separate dashboards and navigation for citizens, agency users, and admins.
- **Complaint Management:** Submit, view, and comment on complaints. Agencies can manage assigned complaints.
- **Agency Management:** Admins can create, edit, and delete agencies. Each agency is linked to a user account.
- **Comment System:** Users can add comments to complaints for engagement and follow-up.
- **Responsive UI:** Built with Tailwind CSS and Flowbite for a modern, accessible experience.

## Basic Workflow

1. **User Registration & Login:**
   - Citizens and agencies can register or log in using email/password or Google.
   - Admins can only be created by the backend or via database.

2. **Submitting a Complaint:**
   - Citizens submit complaints via a modal form.
   - Complaints are routed to the appropriate agency.

3. **Agency Management:**
   - Only admins can create agencies. Each agency must have a unique email and password (used for login).
   - When an agency is created, a user account with the "AGENCY_USER" role is also created.

4. **Complaint Handling:**
   - Agencies see complaints assigned to them and can update status or add comments.
   - Citizens can view their own complaints and comment on them.

5. **Role-Based Navigation:**
   - Navigation and dashboard content change based on the user's role (citizen, agency, admin).

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set environment variables:**
   - Copy `.env.example` to `.env.local` and fill in the required values:
     - `NEXT_PUBLIC_API_URL` – URL of the backend API (e.g., <http://localhost:4000>)
     - Google OAuth client ID, etc. (if using Google login)

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `app/` – Next.js App Router pages and layouts
- `components/` – Reusable UI components (forms, lists, cards, etc.)
- `context/` – React context for authentication/session
- `types/` – TypeScript type definitions
- `utils/` – Utility functions (e.g., Axios instance)

## Requirements

- Node.js 18+
- Backend API (NestJS, see `/backend`)
- MongoDB database (for backend)
- Environment variables set in `.env.local`

## Customization

- Update branding, colors, and content in `app/page.tsx` and `components/` as needed.
- Add more roles, permissions, or features by extending the backend and frontend code.

## License

This project is for demonstration and educational purposes. See LICENSE for details.
