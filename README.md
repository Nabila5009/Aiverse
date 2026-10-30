# AIVerse

AIVerse is a SaaS-style AI productivity platform built with React on the frontend and Express.js on the backend. It includes authentication, dashboard tools, AI chat, data analysis, article generation, templates, translation, and other AI-powered modules.

## Overview

This project is designed as a modern AI tool marketplace where users can:

- Sign up and log in
- Access a personalized dashboard
- Use AI-powered features such as chat, content writing, code generation, and data analysis
- Upload files and get AI-based insights
- Manage a SaaS-style frontend experience with modular pages and routes

## Tech Stacks

### Frontend
- React
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React
- Axios

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Google Gemini API integration
- Multer for file uploads

## Project Structure

```bash
Saas-ai/
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── README.md
├── .gitignore
└── package-lock.json
```

## Features

- User authentication (register/login)
- JWT-protected dashboard routes
- AI chat and AI-powered responses
- Data analysis using uploaded files
- Translation support
- Article/content generation interface
- Dashboard cards and product-style layout
- PostgreSQL-backed user storage

## Prerequisites

Before starting, make sure you have the following installed:

- Node.js 18+
- npm or yarn
- PostgreSQL database
- A Google Gemini API key

## Step-by-Step Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/AIVerse.git
cd AIVerse
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

### 4. Create PostgreSQL database

Open PostgreSQL and create a database named:

```sql
CREATE DATABASE saas_ai;
```

Then make sure your local PostgreSQL user has access to that database.

### 5. Configure environment variables

Copy the example env file and update it:

```bash
cp .env.example .env
```

Then update the values in `server/.env`:

```env
PORT=5001
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/saas_ai
JWT_SECRET=your_super_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

Important:
- Replace `YOUR_PASSWORD` with your local PostgreSQL password
- Replace the Gemini key with your real API key
- Keep the secret key unique and private

### 6. Start the backend

```bash
cd server
npm run dev
```

You should see the server running on:

```bash
http://localhost:5001
```

### 7. Start the frontend

Open a new terminal and run:

```bash
cd client
npm run dev
```

The frontend will usually run at:

```bash
http://localhost:5173
```

## Running the App

Once both servers are running:

1. Open the frontend URL in the browser
2. Register a new account or log in
3. Access the dashboard and start using the tools

## Default API Configuration

The frontend is configured to call the backend here:

```js
http://localhost:5001/api
```

If you change the backend port, update the baseURL accordingly in the frontend service files.

## Important Notes

- The project currently stores user data in PostgreSQL.
- The backend uses JWT for protected routes.
- AI features rely on the Gemini API key configured in the server environment.
- The uploads folder is used for file-based AI operations.

## GitHub Setup Instructions

After making sure everything works locally:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/AIVerse.git
git push -u origin main
```

Before pushing, make sure you do not include your real `.env` file in Git.

If the `.env` file is already being tracked, remove it from Git with:

```bash
git rm --cached server/.env
```

Then commit again and push.

## Troubleshooting

### PostgreSQL connection error
- Check if PostgreSQL is running
- Confirm the database name, username, and password in `.env`
- Make sure the database exists

### Gemini API error
- Verify that `GEMINI_API_KEY` is valid
- Ensure your API key has permission to use the Gemini API

### Frontend not loading
- Check if the frontend dev server is running on port 5173
- Confirm the backend is active on port 5001

### JWT/auth issues
- Make sure `JWT_SECRET` is set in the backend environment
- Clear browser localStorage if needed and log in again

## License

This project is currently provided for educational and project demonstration purposes.

## Future Improvements

- Add more AI tool modules
- Improve dashboard UX
- Add admin panel
- Add Stripe subscription flow
- Add file processing for more AI tools
- Improve validation and testing

---

If you want, you can also add a project screenshot section, live demo link, or a custom logo banner to this README later.
