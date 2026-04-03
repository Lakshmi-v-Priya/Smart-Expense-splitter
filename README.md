<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/566a07ac-c0e4-4c4a-9fba-c0f686620407" /># Smart Expense Splitter 💸

A simple and practical web application built to make group expense management easy.
Whether it’s a trip with friends, hostel room expenses, team outings, or shared rent, this app helps track who paid, who owes, and how much needs to be settled — without the usual confusion.

The main goal of this project is to keep expense splitting fast, clear, and user-friendly while also adding a smarter touch with AI-powered categorization.

---

## ✨ Features

### 👥 Group Management

* Create expense groups
* Add multiple participants or members
* Manage shared expenses for trips, rooms, teams, and events

### 💰 Expense Tracking

* Add new expenses with:

  * Description
  * Amount
  * Paid by
  * Participants involved
* Supports **equal split** among selected members
* Ready for **custom split logic** extension

### ⚡ Real-Time Balance Calculation

* Automatically calculates:

  * Total spent
  * Individual contribution
  * Pending balances
* Shows **live balance updates instantly after adding an expense**

### 🤝 Debt Summary

* Displays a clean **“Who owes whom”** section
* Makes settlements easy to understand
* Reduces manual calculations and mistakes

### 🤖 AI Smart Categorization

Expenses are automatically categorized based on description.
Examples:

* *Pizza dinner* → Food
* *Uber to office* → Travel
* *Monthly rent* → Rent
* *Movie tickets* → Entertainment

This makes tracking spending habits much easier.

### 📊 Spending Insights

Provides a quick overview of spending distribution across categories.
This helps users understand where most of the money is going.

---

## 🛠️ Tech Stack

### Frontend

* **Next.js 16**
* **React**
* **Tailwind CSS**
* **TypeScript**

### Backend

* **Next.js API Routes**
* **MongoDB Atlas**

### Deployment

* **Vercel**

### AI Logic

* Rule-based smart categorization using description keywords
* Easily extendable to OpenAI / ML-based categorization

---

## 📂 Project Structure

```bash
smart-expense-splitter/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── groups/
│   │   ├── page.tsx
│   │   └── [groupId]/
│   │       └── page.tsx
│   │
│   └── api/
│       ├── groups/
│       │   └── route.ts
│       │
│       ├── expenses/
│       │   └── route.ts
│       │
│       └── balances/
│           └── route.ts
│
├── components/
│   ├── Navbar.tsx
│   ├── GroupCard.tsx
│   ├── ExpenseForm.tsx
│   ├── BalanceSummary.tsx
│   └── SettlementCard.tsx
│
├── lib/
│   ├── mongodb.ts
│   ├── calculations.ts
│   └── helpers.ts
│
├── models/
│   ├── Group.ts
│   └── Expense.ts
│
├── types/
│   └── index.ts
│
├── public/
│   └── logo.png
│
├── .env.local
├── package.json
├── tsconfig.json
└── next.config.js

```

---

## ⚙️ Setup Instructions

### 1) Clone the Repository

```bash
git clone https://github.com/your-username/Smart-Expense-Splitter.git
cd Smart-Expense-Splitter
```

### 2) Install Dependencies

```bash
npm install
```

### 3) Configure Environment Variables

Create a **.env.local** file in the root folder.

```env
MONGODB_URI=your_mongodb_connection_string
```

### 4) Run the Project

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## 🧠 How the Split Logic Works

The application follows a simple balance algorithm:

1. Total expense is divided equally among selected members
2. The payer gets credited for the full amount paid
3. Each participant gets debited for their share
4. Net balances are calculated in real time
5. The app simplifies debts into **clear settlement suggestions**

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/c0007752-b574-41b5-8d50-09d01b4c9628" />

### Example

If:

* Lakshmi pays ₹600
* Split among 3 people

Each person owes ₹200.

So the final result becomes:

* Lakshmi gets back ₹400
* Member 2 owes ₹200
* Member 3 owes ₹200

---

## 🏗️ Architecture Overview

The project is built with a modular structure for easy scalability.

* **UI Layer** → Handles forms, tables, summaries, and charts
* **API Layer** → Stores and fetches group + expense data
* **Database Layer** → MongoDB collections for persistent storage
* **Logic Layer** → Balance calculations + AI categorization

This makes the project clean, reusable, and easy to expand.

---

## 🚀 Deployment

The project is deployed using **Vercel** for fast and reliable hosting.

### Deploy Steps

```bash
npm run build
```

Push to GitHub and import the repository into Vercel.

Add environment variable:

```env
MONGODB_URI
```

Then deployed.

---

## 🌟 Future Improvements

* Custom percentage split
* Settlement payment history
* User authentication
* Downloadable expense reports
* Charts for monthly spending trends
* AI-based spending insights
* Email reminders for pending debts

---

## 👩‍💻 Author

**Lakshmi Priya .V**

Built as part of the **Neev AI Internship Assignment** with focus on clean UI, real-time calculations, and smart automation.

This project was designed to feel simple for users while keeping the code scalable for future improvements.

---

## 📌 Final Note

The intention behind this project is not just to split expenses, but to remove the awkwardness and confusion that usually comes with shared payments.
A clean interface, automatic calculations, and AI-based categorization together make this app practical for real-world daily use.
