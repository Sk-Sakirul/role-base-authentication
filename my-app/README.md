# Backend + Frontend Dashboard (Next.js + MongoDB)

## 📌 Overview
This project is a role-based dashboard system built using Next.js and MongoDB.
It supports authentication, user management, and task management with different roles.

## 🧑‍💻 Tech Stack
- Frontend: Next.js (App Router), CSS
- Backend: Next.js API Routes
- Database: MongoDB (Atlas)
- Authentication: JWT
- Password Hashing: bcrypt

## 🔐 Roles & Features
# 👑 Super Admin
- Create, view, delete admins
- View admin statistics

# 🧑‍💼 Admin
- Create, view, delete users
- Manage assigned users

# 👤 User
- View profile
- Create, update, delete tasks
- Mark tasks as completed

## 📂 Project Structure
```


src/ ├── app/ │ ├── user/ │ ├── admin/ │ ├── superadmin/ │ └── api/ ├── components/ ├── lib/ ├── models/ ├── utils/

```

## ⚙️ Setup Instructions
1. Clone repo
git clone <your-repo-link>
cd project-folder
2. Install dependencies
npm install
3. Create .env file

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
```

# For Testing
User
email - user@test.com
pass - 123456

Admin
email - admin@test.com
pass - 123456

Admin
email - superadmin@test.com
pass - 123456