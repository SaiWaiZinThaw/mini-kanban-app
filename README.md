# 🗂️ Mini Kanban App

A minimal Kanban board built using **React 18**, **ShadCN UI**, **react-beautiful-dnd**, and **Firebase**. Organize your tasks easily with drag-and-drop support, local storage persistence, and cross-device sync via Firebase authentication.

## ✨ Features

- ✅ Drag-and-drop tasks using `react-beautiful-dnd`
- 💾 Persistent state using localStorage
- 🔐 Firebase Authentication (Google Sign-In)
- ☁️ Cross-device sync with Firebase Realtime Database or Firestore
- 💅 Beautiful UI built with **ShadCN** and **Tailwind CSS**

> ⚠️ Note: `react-beautiful-dnd` is not compatible with **React 19**. This project uses **React 18** for full compatibility.

---

## 🛠️ Tech Stack

- **React 18**
- **TypeScript**
- **Tailwind CSS** (via ShadCN)
- **react-beautiful-dnd**
- **Firebase** (Auth & Database)
- **Vite** (for fast build & dev)

---

## 🚀 Getting Started

### 1. Clone the repo

```
git clone https://github.com/your-username/mini-kanban-app.git
cd mini-kanban-app
```
### 2. Install dependencies
```
npm install
# or
yarn install
```
### 3. Set up Firebase
```
Go to Firebase Console

Create a project

Enable Authentication (Google sign-in)

Create a Realtime Database or Firestore

Copy your Firebase config and create a .env file:
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_DATABASE_URL=your_database_url (if using RTDB)

```
### 4. Start the app

```
npm run dev
# or
yarn dev
```
