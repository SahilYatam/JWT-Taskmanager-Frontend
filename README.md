# 🎯 JWT Task Manager (Frontend)

Frontend application for the JWT Task Manager built with React, TypeScript, and Zustand for state management.

---

## 🧠 Overview

This application provides a clean interface for users to manage tasks, authenticate securely, and interact with the backend API.

---
🔗 **Live Project:**
https://jwt-taskmanager-frontend.vercel.app
---

## ⚙️ Key Features

* 🔐 Authentication (signup, login, logout)
* ✅ Create, update, delete, and complete tasks
* ⚡ Lightweight state management using Zustand
* 🔄 API integration with Axios
* 🎯 Type-safe development using TypeScript

---

## 🏗️ Project Structure

```bash id="f3k9pl"
src/
 ├── api/
 │    ├── auth.ts
 │    ├── axios.ts
 │    └── todo.ts
 ├── components/
 ├── pages/
 ├── store/
 │    ├── authStore.ts
 │    └── todoStore.ts
 ├── types/
 ├── utils/
 ├── App.tsx
 ├── main.tsx
```

---

## 🧠 State Management

* Zustand for global state
* Separate stores:

  * `authStore` → authentication state
  * `todoStore` → task management

---

## 🔌 API Integration

* Axios instance configured in `api/axios.ts`
* Modular API functions for auth and todo

---

## 🛠️ Tech Stack

* React (Vite)
* TypeScript
* Zustand
* TailwindCSS
* Axios

---

## ⚙️ Setup Instructions

```bash id="m2s8dk"
# Clone repo
git clone https://github.com/SahilYatam/JWT-Taskmanager-Frontend

cd JWT-TaskManager-Frontend

# Install dependencies
npm install

# Run app
npm run dev
```

---

## 📌 Future Improvements

* Improve error handling UX
* Add filtering and sorting for tasks

