# Simple Login & Sign-Up App

## 🚀 Project Overview
This project is a **simple and responsive authentication flow** that includes:
- **Sign-Up & Login Pages** with Formik validation.
- **Home Page with Hero Section** (Accessible only after login).
- **Protected Routes** (Users cannot access the home page without logging in).
- **Persistent Login State** using `localStorage`.
- **IndexedDB Storage** to save registered users.

```

## 🛠 Tech Stack
- **Frontend**: React (TypeScript), MUI, Styled Components, Formik
- **Routing**: React Router
- **Storage**: IndexedDB (for user data), LocalStorage (for session state)

## 📌 Features
✅ **Responsive UI** (MUI + Styled Components)  
✅ **Formik + Yup Validation**  
✅ **LocalStorage for session management**  
✅ **IndexedDB for storing users**  
✅ **Protected Routes (Cannot access Home without login)**

## 🚀 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/login-app.git
cd login-app
```

### 2️⃣ Install Dependencies
```sh
yarn install
# or
npm install
```

### 3️⃣ Run the Development Server
```sh
yarn dev
# or
npm start
```

## 🔐 Authentication Flow
1. **Sign Up** → User enters email & strong password (stored in IndexedDB).
2. **Login** → User enters valid credentials (checked against IndexedDB).
3. **Session Persistence** → Login state is stored in `localStorage` (remains logged in after closing the browser).
4. **Protected Home Page** → Users cannot access `/home` unless logged in.

## 📱 Responsive Design Considerations
- Uses **MUI Grid & Flexbox** for responsiveness.
- **Media Queries** ensure optimal display on mobile, tablet, and desktop.
- **Adaptive input fields** for better usability on smaller screens.


