<div align="center">

  <h1>🍛 AagriKart-FoodDel</h1>

  <p>
    <b>Order. Track. Deliver. Repeat.</b>
  </p>

  <p>
    A full‑stack MERN food delivery ecosystem. <br/>
    Built to feel real, scalable, and ready for production.
  </p>

  ![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
  ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=0B0F14)
  ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
  ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=0B0F14)
  ![License](https://img.shields.io/badge/License-MIT-2563EB?style=for-the-badge)

  <p>
    <a href="https://github.com/Manthann-05/AagriKart-FoodDel/graphs/contributors">
      <img src="https://img.shields.io/github/contributors/Manthann-05/AagriKart-FoodDel?style=for-the-badge&logo=github&color=000000" alt="Contributors" />
    </a>
    <a href="https://github.com/Manthann-05/AagriKart-FoodDel/network/members">
      <img src="https://img.shields.io/github/forks/Manthann-05/AagriKart-FoodDel?style=for-the-badge&logo=git&color=000000" alt="Forks" />
    </a>
    <a href="https://github.com/Manthann-05/AagriKart-FoodDel/stargazers">
      <img src="https://img.shields.io/github/stars/Manthann-05/AagriKart-FoodDel?style=for-the-badge&logo=star&color=ffd700" alt="Stars" />
    </a>
    <a href="https://github.com/Manthann-05/AagriKart-FoodDel/issues">
      <img src="https://img.shields.io/github/issues/Manthann-05/AagriKart-FoodDel?style=for-the-badge&logo=github&color=ff0000" alt="Issues" />
    </a>
    <a href="https://github.com/Manthann-05/AagriKart-FoodDel/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/Manthann-05/AagriKart-FoodDel?style=for-the-badge&logo=law&color=008000" alt="License" />
    </a>
  </p>

  <p>
    <a href="https://aagrikart-fooddel-frontend.onrender.com">🚀 <b>Live Demo</b></a> •
    <a href="#-quick-start">⚡ <b>Quick Start</b></a> •
    <a href="#-tech-stack">💻 <b>Tech Stack</b></a> •
    <a href="#-contributing">🤝 <b>Contribute</b></a>
  </p>

</div>

<br />

---

## 🧐 About

**AagriKart-FoodDel** is a MERN-powered food delivery app where customers discover food, build a cart, and place orders—while admins keep menus and orders moving.

We separated concerns to keep things clean:
* **Frontend:** Where customers drool over menus and manage carts.
* **Admin Panel:** Where the business manages inventory and tracks delivery status.
* **Backend:** The logic layer gluing it all together with a secure REST API.

---

## 📂 Project Structure

A quick look at the top-level directory structure:

```text
AagriKart-FoodDel/
├── 📂 backend/       # Node.js + Express API + MongoDB Models
├── 📂 frontend/      # Customer-facing React App (Vite)
├── 📂 admin/         # Admin Dashboard React App (Vite)
└── 📄 README.md
```

## 💻 Tech stack

- ⚛️ React (Frontend + Admin)
- 🟩 Node.js + 🚂 Express (Backend API)
- 🍃 MongoDB + Mongoose (Database)
- 🔐 JWT + bcrypt (Authentication)
- 💳 Razorpay (Payments-ready)
- 🎨 Tailwind (Styling)
- 🚀 Render (Deployment)

---

<div align="center"> 
  <table> 
    <tr> 
      <td align="center"><b>🍔 Food Menu</b></td> 
      <td align="center"><b>🛒 Smart Cart</b></td> 
      <td align="center"><b>👨‍💻 Admin Panel</b></td> 
    </tr> 
    <tr> 
      <td><img src="https://github.com/Manthann-05/AagriKart-FoodDel/blob/main/frontend/src/assets/" alt="Menu" /></td> 
      <td><img src="https://github.com/Manthann-05/AagriKart-FoodDel/blob/main/frontend/src/assets/" alt="Cart" /></td> 
      <td><img src="https://github.com/Manthann-05/AagriKart-FoodDel/blob/main/frontend/src/assets/" alt="Admin" /></td> 
    </tr> 
  </table> 
</div>

## ⚡ Quick Start
Got 5 minutes? Let's get this running locally.

### Prerequisites
- Node.js 18+ (recommended: 20+)
- MongoDB (Atlas or local)
- Git

### 1) Clone

```bash
git clone https://github.com/Manthann-05/AagriKart-FoodDel.git
cd AagriKart-FoodDel
```

### 2) Backend

```bash
cd backend
npm install
```
Create `backend/.env`:

```bash
PORT
JWT_SECRET
RAZORPAY_API_KEY
RAZORPAY_API_SECRET
MONGO_URI
```

Run:

```bash
npm run server
```

### 3) Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 📡 API Reference

| Method | Endpoint | What it does |
|---:|---|---|
| GET | `/api/food/list` | Returns available food items |
| POST | `/api/user/login` | Logs in & returns JWT |
| POST | `/api/order/place` | Places an order |
| GET | `/api/order/myorders` | Returns user order history |

---

## 🤝 Contributing

We love PRs! Whether it's a bug fix, a new feature, or just correcting a typo—your help is appreciated.

1. Fork the Project
2. Create your Feature Branch : `git checkout -b feature/AmazingFeature`
3. Commit your Changes : `git commit -m 'Add some AmazingFeature'`
4. Push to the Branchc: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

<br />

<div align="center"> 
  <p>If you found this project helpful, give it a ⭐!</p> 
  <p>Made with ❤️ by <a href="https://www.google.com/search?q=https://github.com/Manthann-05">Manthan</a></p> 
</div>
