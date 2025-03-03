# 🚀 Galactic Spacefarer Adventure System

A full-stack **Fiori-inspired** web application for managing spacefarers traveling across the **SAP galaxy**.  
Built with **React (Vite), Express, MongoDB, and JWT Authentication**.

---

## 🌌 Features

✅ **Spacefarer Management:** View, add, and promote spacefarers  
✅ **Authentication & Role-Based Access:** JWT-based login with Admin/User roles  
✅ **Sorting & Filtering:** Search by name, filter by planet/color, sort by skills and name  
✅ **Dark Mode:** User-friendly theme toggle (Light/Dark Mode)  
✅ **Pagination:** Clean and efficient client-side pagination  
✅ **Event Handlers:** Auto-enhance new spacefarers & send email notifications  
✅ **Modern UI:** Built with Material UI and React Query

---

## 🛠 Tech Stack

### **Frontend:**

- ⚛️ React (Vite) + React Router
- 🎨 Material UI (MUI)
- 📡 React Query
- 🔑 JWT Decode
- 🔔 React Hot Toast (Notifications)

### **Backend:**

- 🟢 Node.js (Express)
- 🗄️ MongoDB (Mongoose)
- 🔐 JWT Authentication

---

## 🚀 Getting Started

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/yourusername/galactic-spacefarer.git
cd galactic-spacefarer
```

### **2️⃣ Install Dependencies**

#### **Backend:**

```bash
cd backend
npm install
```

#### **Frontend:**

```bash
cd ../spacefarers-ui
npm install
```

### **3️⃣ Set Up Environment Variables**

- **Create a `.env` file** inside the `backend` directory:
- **Set up MongoDB Atlas database** and copy the `MONGO_URI` into `.env`

```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
```

---

## 🖥 Running the App

### **Start the Backend**

```bash
cd backend
node api/seed.js  # (Optional: Seeds initial spacefarers)
node server.js
```

Runs on: **[http://localhost:4004](http://localhost:4004)**

### **Start the Frontend**

```bash
cd ../spacefarers-ui
npm run dev
```

Runs on: **[http://localhost:5173](http://localhost:5173)**

---

## 👤 Authentication

### **Login:**

Click the **Login** button → Type `"admin"` to get **admin role**

### **Roles:**

🔹 **Admin:** Can promote spacefarers & add new ones  
🔹 **User:** Can view spacefarers but **cannot** promote them

---

## 📌 API Routes

| Method | Endpoint                   | Description             | Auth Required  |
| ------ | -------------------------- | ----------------------- | -------------- |
| GET    | `/spacefarers`             | Get all spacefarers     | ❌ No          |
| GET    | `/spacefarers/:id`         | Get a single spacefarer | ✅ Yes         |
| POST   | `/spacefarers`             | Add a new spacefarer    | ✅ Yes (Admin) |
| POST   | `/spacefarers/:id/promote` | Promote a spacefarer    | ✅ Yes (Admin) |
| POST   | `/login`                   | Generate JWT token      | ❌ No          |

---

## 📸 Screenshots

| 🌞 Light Mode    | 🌙 Dark Mode     |
| ---------------- | ---------------- |
| (Add Screenshot) | (Add Screenshot) |

---

## 📦 Deployment

🔹 **Deploy Backend to** [Render](https://spacefarers.onrender.com)  
🔹 **Deploy Frontend to** [Vercel](https://spacefarers.vercel.app)

---

## 🤝 Contributing

1️⃣ **Fork the repo**  
2️⃣ **Create a new branch**

```bash
git checkout -b new-feature
```

3️⃣ **Commit your changes**

```bash
git commit -m "Added feature"
```

4️⃣ **Push to your branch**

```bash
git push origin new-feature
```

5️⃣ **Create a Pull Request** 🎉

---

## 📜 License

This project is licensed under the **MIT License**. Feel free to **modify and use** it for any purpose.

---

## ⭐ Star This Repo

If you like this project, **give it a star ⭐ on GitHub**!
