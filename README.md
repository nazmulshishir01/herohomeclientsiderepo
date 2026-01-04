# HomeHero Client (Frontend)

🏠 **HomeHero** - Local Household Service Marketplace

## 🚀 Live Site
[Live Site URL](https://homehero-bd.web.app)

## 📋 Features

### Core Features
- ✅ User Authentication (Email/Password + Google OAuth)
- ✅ Demo Login Credentials (User & Admin)
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Dark/Light Theme Toggle
- ✅ Service Browsing with Advanced Filters
- ✅ Search by Service Name/Category
- ✅ Price Range Filter ($min - $max)
- ✅ Sorting (Price, Rating, Newest)
- ✅ Pagination
- ✅ Service Details with Reviews
- ✅ Booking System with Restriction

### Dashboard Features
- ✅ Dashboard with Charts (Revenue, Bookings Trend)
- ✅ Profile Management
- ✅ My Services (CRUD Operations)
- ✅ Add/Update/Delete Services
- ✅ My Bookings (Customer)
- ✅ Received Bookings (Provider)
- ✅ Add Reviews & Ratings

### Additional Pages
- ✅ Home Page (10+ Sections)
- ✅ About Us Page
- ✅ Contact Page
- ✅ Custom 404 Error Page

## 🛠️ Tech Stack
- React 18 + Vite
- Tailwind CSS 4 (with @tailwindcss/vite)
- Firebase Authentication
- React Router DOM
- Framer Motion (Animations)
- Recharts (Dashboard Charts)
- React Hot Toast / SweetAlert2
- Axios

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/nazmulshishir01/herohomeclientsiderepo.git
cd homehero-client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

### 6. Deploy to Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```


## 🔐 Demo Credentials
- **Demo User**: demo@homehero.com / Demo@123


---

Made with ❤️ by HomeHero Team
