🚀 Galactic Spacefarer Adventure System
A full-stack Fiori-inspired web application for managing spacefarers traveling across the SAP galaxy. Built with React (Vite), Express, MongoDB, and JWT Authentication.

🌌 Features
✅ Spacefarer Management: View, add, and promote spacefarers
✅ Authentication & Role-Based Access: JWT-based login with Admin/User roles
✅ Sorting & Filtering: Search by name, filter by planet/color, sort by skills
✅ Dark Mode: User-friendly theme toggle (Light/Dark Mode)
✅ Pagination: Clean and efficient client-side pagination
✅ Event Handlers: Auto-enhance new spacefarers & send email notifications
✅ Modern UI: Built with Material UI and React Query

🛠 Tech Stack

Frontend:
React (Vite) + React Router
Material UI (MUI)
React Query
JWT Decode
React Hot Toast (Notifications)

Backend:
Node.js (Express)
MongoDB (Mongoose)
JWT Authentication

🚀 Getting Started
1️⃣ Clone the Repository

git clone https://github.com/yourusername/galactic-spacefarer.git
cd galactic-spacefarer
2️⃣ Install Dependencies

# Install backend dependencies

cd backend
npm install

# Install frontend dependencies

cd ../spacefarers-ui
npm install
3️⃣ Set Up Environment Variables
Create a .env file inside the backend directory:

🖥 Running the App
Start the Backend

cd backend
npm start
Runs on: http://localhost:4004

Start the Frontend

cd ../spacefarers-ui
npm run dev
Runs on: http://localhost:5173

👤 Authentication
Login: Click the Login button (type "admin" for getting admin role)

Roles:
Admin: Can promote spacefarers & add new ones
User: Can view spacefarers but cannot promote them

📌 API Routes
Method Endpoint Description Auth Required
GET /spacefarers Get all spacefarers ❌ No
GET /spacefarers/:id Get a single spacefarer ✅ Yes
POST /spacefarers Add a new spacefarer ✅ Yes (Admin)
POST /spacefarers/:id/promote Promote a spacefarer ✅ Yes (Admin)
POST /login Generate JWT token ❌ No

📸 Screenshots
Light Mode 🌞 Dark Mode 🌙
📦 Deployment
🔹 Deploy Backend to Render/Railway
🔹 Deploy Frontend to Vercel/Netlify

🤝 Contributing
Fork the repo
Create a branch: git checkout -b new-feature
Commit your changes: git commit -m "Added feature"
Push to the branch: git push origin new-feature
Create a Pull Request 🎉

📜 License
This project is licensed under the MIT License. Feel free to modify and use it for any purpose.

⭐ Star This Repo
If you like this project, give it a star ⭐ on GitHub!
