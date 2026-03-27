FULL-STACK TODO APPLICATION

A responsive, full-stack Todo List application built with the MERN stack (MongoDB, Express, React, Node.js). It features secure user authentication with JWTs and complete CRUD operations for task management.

FEATURES
- User Authentication: Secure signup and login using JWT (JSON Web Tokens) and bcrypt.
- Task Management: Create, read, update, and delete (CRUD) tasks.
- Responsive UI: A modern frontend built with React and Vite.
- RESTful API: Backend built with Node.js and Express.js.

TECHNOLOGIES USED
Frontend
- React 19
- Vite
- React Router DOM
- Axios (for API requests)
- Lucide React (for icons)

Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcryptjs (for password hashing)
- CORS & dotenv

PREREQUISITES
Before you begin, ensure you have the following installed on your machine:
- Node.js (v16 or higher recommended)
- MongoDB (Local installation or MongoDB Atlas account)

INSTALLATION & SETUP

1. Clone the repository
git clone <your-repository-url>
cd todo-application

2. Backend Setup
- Navigate to the backend directory:
  cd backend
- Install dependencies:
  npm install
- Create a .env file in the backend directory with the following variables:
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
- Start the backend server:
  npm run dev

3. Frontend Setup
- Open a new terminal and navigate to the frontend directory:
  cd frontend
- Install dependencies:
  npm install
- Start the Vite development server:
  npm run dev

PROJECT STRUCTURE

todo-application/
|-- backend/          # Node.js/Express API
|   |-- models/       # Mongoose models
|   |-- routes/       # API routes
|   |-- middleware/   # Custom Express middleware
|   |-- server.js     # Entry point
|   |-- package.json  # Backend dependencies
|-- frontend/         # React/Vite web application
    |-- src/          # React components and logic
    |-- public/       # Static assets
    |-- index.html    # HTML template
    |-- vite.config.js# Vite configuration
    |-- package.json  # Frontend dependencies

LICENSE
ISC
