# 🔐 SafeEntry — Frontend

> A clean, responsive frontend for the **SafeEntry** authentication system — built with **React 19**, **Vite 7**, and **Tailwind CSS 4**. Provides a seamless Email OTP login experience with toast notifications and client-side routing.

![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=flat&logo=axios&logoColor=white)
![License](https://img.shields.io/badge/License-Private-red?style=flat)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Backend Integration](#-backend-integration)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🧭 Overview

SafeEntry Frontend is the user-facing interface for the SafeEntry authentication platform. It handles user registration, email OTP verification, login, and protected dashboard access — all connected to the [SafeEntry Backend](https://github.com/Shubham8468/SafeEntry_Backend) REST API.

The UI is fully responsive, lightweight, and optimized for fast load times using Vite's blazing-fast build tooling.

---

## 🌐 Live Demo

| Environment | URL |
|---|---|
| 🚀 Production | [safe-entry-frontend.vercel.app](https://safe-entry-frontend.vercel.app) |
| 🔧 Backend API | [safe-entry-backend.vercel.app](https://safe-entry-backend.vercel.app) |

---

## ✨ Features

- 📧 **Email OTP Login Flow** — Register → Verify OTP → Access dashboard
- 🔔 **Toast Notifications** — Real-time feedback on all user actions via React Toastify
- 🧭 **Client-Side Routing** — Smooth page navigation using React Router DOM v7
- 🌐 **Axios API Integration** — Centralized HTTP client with credential support
- 🎨 **Tailwind CSS 4** — Utility-first styling with the latest Tailwind Vite plugin
- ⚡ **Vite 7** — Ultra-fast HMR and optimized production builds
- 📱 **Fully Responsive** — Works perfectly on mobile, tablet, and desktop
- 🔒 **Protected Routes** — Authenticated pages accessible only after login

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | v19.x | UI component library |
| Vite | v7.x | Build tool & dev server |
| Tailwind CSS | v4.x | Utility-first CSS framework |
| React Router DOM | v7.x | Client-side routing |
| Axios | v1.x | HTTP requests to backend API |
| React Toastify | v11.x | Toast notifications |
| ESLint | v9.x | Code linting & quality |

---

## 📁 Project Structure

```
SafeEntry_Frontend/
├── public/
│   └── favicon.svg               # App favicon
├── src/
│   ├── assets/                   # Images, icons, static files
│   ├── components/               # Reusable UI components
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/                  # React context (auth state)
│   │   └── AuthContext.jsx
│   ├── pages/                    # Page-level components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── VerifyOtp.jsx
│   │   └── Dashboard.jsx
│   ├── utils/                    # Axios instance & helpers
│   │   └── axiosInstance.js
│   ├── App.jsx                   # Root component with routes
│   └── main.jsx                  # React DOM entry point
├── .env                          # Environment variables (not committed)
├── .gitignore
├── eslint.config.js              # ESLint configuration
├── index.html                    # HTML entry point
├── vite.config.js                # Vite configuration
└── package.json
```

> ⚠️ The folder structure above is a suggested convention — refer to the actual `/src` directory for the current layout.

---

## ⚙️ Getting Started

### Prerequisites

Ensure the following are installed:

- [Node.js](https://nodejs.org/) v18 or above
- [npm](https://www.npmjs.com/) v9 or above
- The [SafeEntry Backend](https://github.com/Shubham8468/SafeEntry_Backend) running locally or deployed

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Shubham8468/SafeEntry_Frontend.git
cd SafeEntry_Frontend
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file in the root directory:

```env
VITE_BACKEND_URL=http://localhost:4000
```

> For production, set this to your deployed backend URL.

**4. Start the development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🔑 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_BACKEND_URL` | Base URL of the SafeEntry backend API | `http://localhost:4000` |

> All Vite environment variables must be prefixed with `VITE_` to be accessible in the browser.

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Start local dev server with HMR |
| Build | `npm run build` | Create optimized production build |
| Preview | `npm run preview` | Preview the production build locally |
| Lint | `npm run lint` | Run ESLint on all source files |

---

## 🔌 Backend Integration

This frontend communicates with the **SafeEntry Backend** via Axios.

All API requests are sent to the base URL defined in `VITE_BACKEND_URL`.

```javascript
// Example: src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // sends cookies with every request
});

export default axiosInstance;
```

### API Endpoints Used

| Page | Method | Endpoint |
|---|---|---|
| Register | POST | `/api/auth/register` |
| Send OTP | POST | `/api/auth/send-otp` |
| Verify OTP | POST | `/api/auth/verify-otp` |
| Login | POST | `/api/auth/login` |
| Logout | POST | `/api/auth/logout` |
| Get Profile | GET | `/api/user/profile` |

> For full API documentation, refer to the [SafeEntry Backend README](https://github.com/Shubham8468/SafeEntry_Backend).

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes using conventional commits

```bash
git commit -m "feat: add OTP resend button"
```

4. Push and open a Pull Request

```bash
git push origin feature/your-feature-name
```

---

## 👨‍💻 Author

**Shubham**
- 🐙 GitHub: [@Shubham8468](https://github.com/Shubham8468)
- 🚀 Backend Repo: [SafeEntry Backend](https://github.com/Shubham8468/SafeEntry_Backend)

---

## 📄 License

This project is private. All rights reserved © Shubham.

---

<div align="center">
  ⭐ If this project helped you, please give it a star on GitHub!
</div>