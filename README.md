# CodeSphere – E-Learning Platform

CodeSphere is a full-stack e-learning platform built using the MERN stack. It allows instructors to create and manage courses while students can enroll, track progress, and access premium content through secure payments.

## Features

### For Students
- User authentication (JWT based)
- Browse and search published courses
- Purchase courses using Stripe
- Track lecture-wise course progress
- Access video lectures and previews

### For Instructors
- Create, edit, and delete courses
- Upload and manage lectures
- Publish / unpublish courses
- View enrolled students and sales analytics

### Platform Features
- Role-based access control
- Course progress tracking
- Secure payment integration (Stripe)
- Cloud media handling
- Responsive UI

## Tech Stack

### Frontend
- React
- React Router
- Redux Toolkit & RTK Query
- Tailwind CSS
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Stripe API

### Other Tools
- Cloudinary (media storage)
- Multer (file uploads)

## Project Structure

CodeSphere_E-Learning
├── client
│ └── src
├── server
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── middlewares
│ └── utils


## Environment Variables

Create a `.env` file in the server directory and add:



PORT=6001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret


## Installation & Setup

### Backend
```bash
cd server
npm install
npm run dev

Frontend
cd client
npm install
npm run dev

Future Improvements

Course ratings & reviews

Instructor dashboards with more analytics

Admin panel

Email notifications

Author

Yasin
Junior MERN Stack Developer

⭐ If you like this project, feel free to star the repository.


---

### Next steps (recommended)
1. Commit message:
```bash
git commit -m "Initial commit: CodeSphere E-Learning Platform"


Push:

git push origin main
