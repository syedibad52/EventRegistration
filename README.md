# EventRegistration Platform

A modern, full-stack college event registration platform. The application allows students to browse upcoming events and register, while providing an admin dashboard to track and manage all registrations.

![EventHub Preview](https://via.placeholder.com/800x400.png?text=EventHub+College+Platform)

## 🏗️ Architecture

The project has been separated into two distinct parts:
1. **Frontend**: Next.js (React) application
2. **Backend**: Node.js & Express server with SQLite database

## 💻 Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Custom CSS with CSS Variables, Flexbox/Grid, and modern glassmorphism UI.
- **Features**: Responsive design, micro-animations, fetching from external backend.

### Backend
- **Server**: Node.js with Express.js
- **Database**: SQLite (via `better-sqlite3`)
- **Security**: Cookie-based session authentication, CORS protection.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Backend Setup
The backend runs on port `5000` and handles the database and API endpoints.

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the server (runs on http://localhost:5000)
npm run dev
```

### 2. Frontend Setup
The frontend runs on port `3000` and serves the UI.

```bash
# Open a NEW terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server (runs on http://localhost:3000)
npm run dev
```

## 🔐 Admin Dashboard

To access the admin panel, navigate to `http://localhost:3000/admin`.
- **Username**: `admin`
- **Password**: `admin123`

*(Note: These credentials can be changed in the `backend/.env` file)*

From the dashboard, you can:
- View total registration statistics.
- See a breakdown of registrations per event.
- Search and filter students.
- Delete participant registrations.

## 🌐 Live Deployment

This project is configured for easy live hosting using **Vercel** for the frontend and **Render** for the backend.

### 1. Backend Deployment (Render)
1. Log in to [Render](https://render.com/) and create a new **Web Service** linked to your GitHub repo.
2. Set the following details:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
3. Under **Environment**, add these Environment Variables:
   - `PORT` = `5000`
   - `NODE_ENV` = `production`
   - `ADMIN_USERNAME` = `your-admin-username`
   - `ADMIN_PASSWORD` = `your-admin-password`
   - `FRONTEND_URL` = `https://your-app.vercel.app` *(update this once you deploy your frontend)*
4. Deploy the service and copy the provided URL (e.g. `https://your-api.onrender.com`).

### 2. Frontend Deployment (Vercel)
1. Log in to [Vercel](https://vercel.com/) and import your GitHub repo.
2. Select **Next.js** framework and configure the **Root Directory** as `frontend`.
3. Add the following Environment Variable:
   - `NEXT_PUBLIC_API_URL` = `https://your-api.onrender.com/api` *(use the backend URL copied from Render)*
4. Click **Deploy**. Vercel will build the frontend and provide your live URL.
5. **CORS Configuration**: Copy your live Vercel URL and update the `FRONTEND_URL` variable in your Render dashboard, then restart/redeploy the backend.

*(Note: Because SQLite is a local file-based database, on Render's free tier the database file is ephemeral and will reset when the instance spins down or restarts. This is standard behavior for free-tier SQLite hosting and is perfect for academic demonstration.)*

## 📁 Project Structure

```text
EventRegistration/
├── backend/
│   ├── .env                 # Backend environment variables
│   ├── db.js                # SQLite database logic & queries
│   ├── server.js            # Express server & API routes
│   └── event_registration.db # SQLite database file (auto-generated)
├── frontend/
│   ├── src/app/             # Next.js App Router pages
│   ├── .env.local           # Frontend environment variables
│   └── public/              # Static assets
└── README.md
```

## 📝 License
This project is created for educational purposes.
