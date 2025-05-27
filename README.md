# QuickHire

QuickHire is a secure internal recruitment platform built with Vue 3 and Express.js. It enables HR departments to post job listings, manage applicants, and oversee interview pipelines. The platform supports role-based access, secure JWT authentication via httpOnly cookies, and input validation with Joi. The backend is modular, scalable, and protected with Helmet, CORS, and RBAC.

## Tech Stack

Frontend: Vue 3, Composition API, TailwindCSS, TypeScript, Vite  
Backend: Node.js, Express.js, JWT, Joi, Helmet, CORS, RBAC

## Features

- Role-based access control (Admin / Employee)
- JWT Auth with httpOnly cookies
- CORS origin whitelist
- Joi validation for input fields
- Modular Express architecture
- Applicant Tracking System (ATS)
- Helmet + Rate limiting for API security

## Getting Started

Clone repository:  
git clone https://github.com/nearlys40/QuickHire.git  
cd QuickHire

Install dependencies:  
cd frontend  
npm install  
cd ../backend  
npm install

Create a `.env` file in `backend/`:
PORT=5000  
JWT_SECRET=XXXXXXXXXXXXXXXXXXXXX
CORS_ORIGIN=http://localhost:5173

> If you need the actual `.env` values used in production or demo, please email: **visut.savangsuk@gmail.com**

Run development servers:  
cd backend  
npm run dev  
cd ../frontend  
npm run dev

Frontend: http://localhost:5173  
Backend: http://localhost:5000

## License

MIT © 2025 Visut Savangsuk
