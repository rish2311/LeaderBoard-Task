Great! Based on your requirement **(Leaderboard App with ReactJS + NodeJS + MongoDB)** and the UI reference you shared (live ranking, icons, avatars, rank badges, dynamic updates), here's a clear **15-step beginner-friendly plan** to build this app from scratch.

---

## ✅ 15-Step Breakdown to Complete the Leaderboard Task

---

### **🧱 PHASE 1: Project Setup (Step 1–3)**

#### **1. Setup the Backend (NodeJS + Express + MongoDB)**

* Initialize a project with `npm init -y`
* Install dependencies: `express`, `mongoose`, `cors`, `nodemon`
* Create basic folder structure:

  ```
  /backend
    ├── models/
    ├── routes/
    ├── controllers/
    └── server.js
  ```

#### **2. Setup MongoDB Collections**

* **Users Collection**: Fields → `name`, `totalPoints`, `avatarUrl`
* **ClaimHistory Collection**: Fields → `userId`, `claimedPoints`, `timestamp`
* Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) if you're using cloud

#### **3. Setup the Frontend (ReactJS)**

* Create project: `npx create-react-app leaderboard-app`
* Install dependencies: `axios`, `react-router-dom`, `tailwindcss` (optional but good for styling)
* Folder structure:

  ```
  /frontend
    ├── components/
    ├── pages/
    ├── services/
    └── App.js
  ```

---

### **🧠 PHASE 2: Backend Core Logic (Step 4–6)**

#### **4. Create API: Get Users**

* `GET /users`
* Returns list of users sorted by totalPoints DESC, with rank calculated.

#### **5. Create API: Claim Points**

* `POST /claim`
* Accepts `userId`, randomly gives points (1–10), updates user, logs to history.

#### **6. Create API: Get Claim History**

* `GET /history/:userId`
* Returns all claims by a specific user (used for bonus history UI)

---

### **🎨 PHASE 3: Frontend Core UI (Step 7–11)**

#### **7. Create UserList + Dropdown Component**

* Displays all users (with images + names)
* Select user from dropdown or click card

#### **8. Create “Claim Points” Button**

* On button click:

  * Calls `POST /claim` with selected `userId`
  * Receives updated leaderboard
  * Display assigned points via popup/toast

#### **9. Create Leaderboard Component**

* Display:

  * Rank badges (🥇 🥈 🥉)
  * Avatar + name
  * Points
* Rank based on backend response

#### **10. Add Live Refreshing (Every 2-3s)**

* Use `setInterval` or `polling` to call `/users` every few seconds and refresh leaderboard
* Alternatively: Socket.io for real-time (advanced)

#### **11. Bonus: Add History View (Optional)**

* Show list of claim logs per user: time + points claimed

---

### **📱 PHASE 4: UI/UX Polish (Step 12–13)**

#### **12. Add Badges, Icons, and Responsive Design**

* Use placeholder icons or FontAwesome
* Use TailwindCSS or CSS Modules for styles
* Highlight Top 3 with unique design (crown, glow)

#### **13. Mobile Responsiveness + Pagination**

* Ensure UI works on small screens
* Bonus: If users > 10, paginate or scroll list

---

### **✅ PHASE 5: Testing, Debugging, Submission (Step 14–15)**

#### **14. Test Everything**

* Add users manually in MongoDB if needed
* Test claiming points, leaderboard update, edge cases

#### **15. Final Submission Prep**

* Push code to GitHub
* Fill Round 1 Submission Form with link to GitHub + demo video (if needed)

---

### 🧩 Bonus Features (Optional if time permits)

* Add animations on top 3 rank change
* WebSockets with Socket.io for true real-time
* User profile view with history log

---

You're on track! This 15-step guide will help you complete the task confidently, even as a beginner.

**a.** Want me to generate backend project starter code with MongoDB schemas and APIs?
**b.** Want frontend UI layout using Tailwind + React (avatar, rank badge, points)?
