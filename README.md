# 📚 MERN LMS

![Express](https://img.shields.io/badge/Backend-Express.js-green?logo=express)  
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)  
![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)  
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?logo=tailwind-css)  
![Stripe](https://img.shields.io/badge/Payments-Stripe-635BFF?logo=stripe)  
![Cloudinary](https://img.shields.io/badge/Media-Cloudinary-blue?logo=cloudinary)  
![Clerk](https://img.shields.io/badge/Auth-Clerk-orange)

A full-stack **Learning Management System (LMS)** built with the **MERN stack** and modern tooling.  
This project allows administrators to create and manage courses, while students can enroll, learn, and track progress.

---

## 🚀 Tech Stack

### Backend

- **Express.js** – API & server framework
- **MongoDB** – NoSQL database
- **Clerk** – Authentication & user management
- **Multer** – File upload handling
- **Stripe** – Payment processing
- **Cloudinary** – Media storage & optimization

### Frontend

- **Vite + React** – Fast and modern frontend framework
- **Tailwind CSS** – Utility-first styling
- **Quill** – Rich text editor for course content
- **Axios** – API requests

---

## ✨ Features

- 🔐 **Authentication & Authorization** (via Clerk)
- 🎓 **Course Management** (create, edit, delete courses)
- 📝 **Rich Text Editor** for lessons (Quill)
- 📦 **File Uploads** (Multer + Cloudinary for images/videos)
- 💳 **Secure Payments** (Stripe integration for course purchases)
- 📊 **Student Dashboard** (enrolled courses & progress tracking)
- ⚡ **Responsive UI** with Tailwind

---

## Installation & Setup

### Clone The Repo

```bash
https://github.com/Himaryy/mern-lms.git
cd mern-lms
```

### Backend Setup

```bash
cd server
npm install
```

```bash
MONGO_URI=your_mongo_uri
CLERK_SECRET_KEY=your_clerk_key
STRIPE_SECRET_KEY=your_stripe_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloud_key
CLOUDINARY_API_SECRET=your_cloud_secret
PORT=3000
```

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
```

```bash
VITE_CLERK_PUBLISHABLE_KEY=
VITE_CURRENCY=
VITE_BACKEND_URL=
```

```bash
npm run dev
```
