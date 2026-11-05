# 👟 Shoes Store E-Commerce Website (StepUp Shoes)
> **គម្រោងគេហទំព័រពាណិជ្ជកម្មអេឡិចត្រូនិចលក់ស្បែកជើងគ្រប់ប្រភេទ (Everyday & All-Type Footwear)**
> រៀបចំឡើងតាមការណែនាំនៃឯកសារផែនការគម្រោង៖ [Google Document Project Plan](https://docs.google.com/document/d/1pNZCQzLAlUoGAHhr5FGo2Iptn-M1Wx4DrZhCcjZs6bs/edit?usp=sharing)
> អ្នកគ្រប់គ្រងគម្រោង៖ `chhoyyeanseou5@gmail.com`

---

## 🌟 លក្ខណៈពិសេសចម្បង (Key Features)

### ១. ផ្នែកអតិថិជន (Customer Front-End)
* **ទំព័រដើម (Home Page)**:
  * Hero Banner ទាក់ទាញ ជាមួយរូបភាពស្បែកជើង 3D floating effect
  * ប្រភេទទំនិញចម្បង៖ Sneakers, Formal, Casual, Sandals, និង Sale
  * ស្បែកជើងពេញនិយម (Featured Shoes) និងស្បែកជើងមកដល់ថ្មី (New Arrivals)
  * កូដប្រូម៉ូសិនពិសេស Click-to-copy (`STEPUP10` & `WELCOME20`)
* **កាតាឡុកស្បែកជើង (Shop Catalog & Filters)**:
  * ប្រព័ន្ធស្វែងរក Real-time តាមឈ្មោះ Brand ឬប្រភេទ
  * តម្រងចម្រាញ់តាមប្រភេទទំនិញ, Brand (Nike, Adidas, Puma, New Balance, Converse, StepUp)
  * តម្រងតាមទំហំ **EU Size (38, 39, 40, 41, 42, 43, 44, 45)**
  * Price Range Slider ($20 - $180) និងការតម្រៀបតម្លៃ/ប្រជាប្រិយភាព
* **ព័ត៌មានលម្អិតស្បែកជើង (Product Detail)**:
  * Multi-image Gallery ជាមួយ thumbnails
  * ជ្រើសរើសពណ៌ និងទំហំ Size ជាមួយ real-time stock indicator
  * **📏 តារាងវាស់ទំហំជើង (Size Guide Modal)** ជាមួយរូបមន្តគណនាទំហំស្វ័យប្រវត្តិ (Foot Length cm ទៅ EU Size)
  * បន្ថែមចូលកន្ត្រក (Add to Cart), ទិញភ្លាមៗ (Buy Now), និងរក្សាទុកក្នុង Wishlist
  * ការវាយតម្លៃផ្កាយ (Reviews & Star Ratings) និងទម្រង់ Submit Review
  * ស្បែកជើងដែលប្រហាក់ប្រហែល (Related Shoes)
* **កន្ត្រកទំនិញ (Shopping Cart)**:
  * ប្តូរចំនួន (Quantity) និងប្តូរទំហំ Size ក្នុងកន្ត្រកបានភ្លាមៗ
  * ផ្ទៀងផ្ទាត់កូដបញ្ចុះតម្លៃ Promo Code ជាមួយ Backend API
  * គណនាតម្លៃសរុប និងសេវាដឹកជញ្ជូនឥតគិតថ្លៃលើសពី $50
* **ការទូទាត់ និងដឹកជញ្ជូន (Checkout)**:
  * ទម្រង់បំពេញអាសយដ្ឋានដឹកជញ្ជូន រាជធានីភ្នំពេញ និងបណ្តាខេត្តនានាទូទាំងប្រទេសកម្ពុជា
  * **🇰🇭 KHQR (Bakong / ABA Pay / ACLEDA)** ជាមួយកាត KHQR ស្តង់ដារ និងការផ្ទៀងផ្ទាត់ស្វ័យប្រវត្តិ
  * **🚚 ទូទាត់ប្រាក់ពេលទទួលបានទំនិញ (Cash on Delivery - COD)**
  * **🏦 ផ្ទេរប្រាក់តាមធនាគារផ្ទាល់ (Bank Transfer)**
* **ការបញ្ជាក់ និងវិក្កយបត្រ (Order Confirmation)**:
  * លេខកូដបញ្ជាទិញ (Order ID e.g. `#STEP-2026-8901`)
  * បង្ហាញដំណឹង **Telegram Notification Dispatched** ទៅកាន់ម្ចាស់ហាង
  * ព្រីនវិក្កយបត្រ (Print Receipt)
* **តាមដានការដឹកជញ្ជូន (Live Order Tracking)**:
  * ស្វែងរកតាមលេខកូដ Order ID ឬលេខទូរស័ព្ទ
  * បន្ទាត់ពេលវេលា ៤ ដំណាក់កាល៖ Confirmed -> Processing -> Shipped -> Delivered
  * កំណត់ត្រាលំហូរដឹកជញ្ជូនលម្អិត (Activity Timeline)
* **អំពីយើង & គោលការណ៍ (About, Contact & Policies)**:
  * ទីតាំង Showroom នៅភ្នំពេញ (Russian Federation Blvd)
  * គោលការណ៍ប្តូរ Size រយៈពេល **៧ ថ្ងៃ**
  * ទម្រង់ផ្ញើសារទាក់ទងផ្ទាល់

---

### ២. ផ្ទាំងគ្រប់គ្រងរដ្ឋបាល (Admin Dashboard)
* **Dashboard Overview**:
  * ស្ថិតិលក់សរុប (Total Sales $), ចំនួន Order, ស្បែកជើងក្នុងស្តុក, និង Low stock alert
  * តារាងការបញ្ជាទិញថ្មីៗ (Recent Orders)
* **គ្រប់គ្រងស្បែកជើង (Shoe Management)**:
  * បញ្ជីស្បែកជើងទាំងអស់ ជាមួយការស្វែងរក
  * បន្ថែមស្បែកជើងថ្មី (Add Shoe) ជាមួយការជ្រើសរើសទំហំ EU 38-45
  * កែប្រែ (Edit) និងលុប (Delete) ស្បែកជើង
* **គ្រប់គ្រងការបញ្ជាទិញ (Orders Management)**:
  * តម្រងតាម Status (Pending, Confirmed, Processing, Shipped, Delivered, Cancelled)
  * មើលព័ត៌មានលម្អិត និងប្តូរស្ថានភាព Order
  * **ប្រព័ន្ធបញ្ជូនសារដំណឹង Telegram ស្វ័យប្រវត្តិ** រាល់ពេលមាន Order ថ្មី ឬផ្លាស់ប្តូរ Status
* **កូដប្រូម៉ូសិន (Coupons & Discounts)**:
  * បង្កើត និងគ្រប់គ្រងកូដបញ្ចុះតម្លៃ (%) ឬ ($)
* **គ្រប់គ្រងការវាយតម្លៃ (Reviews Moderation)**
* **កំណត់ត្រា Telegram (Telegram Notification Logs)**:
  * ពិនិត្យមើលសារទាំងអស់ដែលបានបញ្ជូនទៅកាន់ម្ចាស់ហាង
  * ប៊ូតុង Test Telegram Alert
* **ការកំណត់ហាង (Store Settings)**:
  * កំណត់ឈ្មោះហាង, អ៊ីមែល `chhoyyeanseou5@gmail.com`, លេខទូរស័ព្ទ, និង Telegram Bot Token

---

## 🛠️ រចនាសម្ព័ន្ធគម្រោង (Project Structure)

```text
tes backed and fronend/
├── backend/                  # Laravel REST API Server
│   ├── app/
│   │   ├── Http/Controllers/Api/  # Product, Order, Coupon, Review, etc.
│   │   └── Models/                # Eloquent Models (Product, Order, etc.)
│   ├── database/
│   │   ├── migrations/            # Table schemas
│   │   └── seeders/               # Database seeder with 8 initial shoes
│   ├── routes/
│   │   └── api.php                # 27 RESTful API Endpoints
│   ├── artisan
│   └── composer.json
│
├── frontend/                 # Modern React + Vite Web Application
│   ├── src/
│   │   ├── components/       # Navbar, Footer, ProductCard, SizeGuideModal
│   │   ├── context/          # StoreContext (Cart, Wishlist, Theme, Routing)
│   │   ├── services/         # api.js client
│   │   ├── views/            # Home, Shop, ProductDetail, Cart, Checkout,
│   │   │                     # OrderConfirmation, OrderTracking, Wishlist,
│   │   │                     # AboutContact, AdminDashboard
│   │   ├── App.jsx
│   │   ├── index.css         # Modern Luxury Dark/Light CSS Design System
│   │   └── main.jsx
│   ├── index.html            # SEO, Plus Jakarta Sans & Kantumruy Pro Fonts
│   ├── vite.config.js        # Port 5173 with Proxy to Port 8000
│   └── package.json
│
├── run-all.js                # One-command full-stack starter (Laravel + Vite)
├── package.json              # Root npm scripts
└── README.md
```

---

## 🚀 របៀបតម្លើង និងដំណើរការ (How to Run)

### ជម្រើសទី ១៖ ដំណើរការទាំងពីរដំណាលគ្នា (Recommended)
នៅក្នុង root folder `tes backed and fronend`៖
```bash
npm start
```
*(ឬ `node run-all.js` វានឹងបើកដំណើរការទាំង Laravel Backend និង React Frontend ដំណាលគ្នា)*
* **Frontend**: `http://localhost:5173`
* **Laravel API**: `http://localhost:8000`

### ជម្រើសទី ២៖ ដំណើរការដោយឡែកពីគ្នា
1. **ដំណើរការ Laravel Backend API**:
   ```bash
   cd backend
   php artisan serve --port=8000
   ```
   Backend ដំណើរការលើ៖ `http://localhost:8000`

2. **ដំណើរការ Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend ដំណើរការលើ៖ `http://localhost:5173`

---

## 🗄️ ការតភ្ជាប់ Database (Database Connection & Setup)

គម្រោងនេះគាំទ្រការតភ្ជាប់ជាមួយ **MySQL / MariaDB** (XAMPP, WAMP, Laragon, Docker) ដោយមានប្រព័ន្ធ **Auto-Adapter & Local Fallback** ធានាថាគេហទំព័រដំណើរការ ១០០% គ្រប់ពេលវេលា៖

### ១. ឯកសារកំណត់ Database Configuration ([.env](file:///c:/Users/LY%20HENG/Desktop/tes%20backed%20and%20fronend/backend/.env))
```env
PORT=5001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=shoes_store_db
DB_AUTO_INIT=true
```

### ២. ឯកសារ SQL Schema ([database.sql](file:///c:/Users/LY%20HENG/Desktop/tes%20backed%20and%20fronend/backend/database.sql))
* ឯកសារ `backend/database.sql` មានផ្ទុកនូវ Table ទាំង ៨ ស្របតាម Google Document Plan៖
  * `categories`
  * `brands`
  * `products`
  * `orders`
  * `coupons`
  * `reviews`
  * `settings`
  * `telegram_logs`
* រួមទាំងសំណុំទិន្នន័យគំរូស្បែកជើង Nike, Adidas, Puma, StepUp, Converse, ទំហំ Size EU 38-45 និងកូដបញ្ចុះតម្លៃ `STEPUP10`, `WELCOME20`។

### ៣. របៀបភ្ជាប់ជាមួយ XAMPP / WAMP / Laragon
1. បើក XAMPP Control Panel រួចចុច **Start MySQL** (Port 3306)
2. ចូលទៅកាន់ **Admin Panel** លើគេហទំព័រ (`http://localhost:3000`)
3. ចុចលើ Tab **"Database"** រួចចុច **"តភ្ជាប់ទៅកាន់ MySQL (Test & Connect)"**
4. ប្រព័ន្ធនឹងបង្កើត Database `shoes_store_db` និង Table ដោយស្វ័យប្រវត្តិ!

### ៣. ការរៀបចំ Firebase Backend (Authentication & Cloud Firestore)
គម្រោងនេះត្រូវបានតភ្ជាប់ទៅកាន់ Firebase Backend យ៉ាងពេញលេញ៖
* **Firebase Project**: `stepup-shoes-store-2bd6b`
* **Cloud Firestore**:
  * ផ្ទុកទិន្នន័យផលិតផល (`products`), ការបញ្ជាទិញ (`orders`), កូដបញ្ចុះតម្លៃ (`coupons`), ការវាយតម្លៃ (`reviews`), និងការកំណត់ហាង (`settings`)
  * Security Rules ត្រូវបានបង្កើត និង Deploy ត្រឹមត្រូវ
* **Firebase Authentication**:
  * **Email & Password Authentication** (ចុះឈ្មោះ និងចូលគណនី)
  * **Google Sign-In** (ចូលគណនីដោយចុចតែម្តងតាមរយៈ Google Account Popup)
* **ឯកសារកំណត់រចនាសម្ព័ន្ធ (Configuration)**:
  * ព័ត៌មានលម្អិតទាំងអស់ស្ថិតក្នុង `frontend/.env` និង `frontend/src/services/firebase.js`

---

## 💳 ការសាកល្បងប្រព័ន្ធ (Demo Credentials & Codes)
* **កូដបញ្ចុះតម្លៃ (Promo Codes)**:
  * `STEPUP10` (បញ្ចុះតម្លៃ 10%)
  * `WELCOME20` (បញ្ចុះតម្លៃ $20 លើការទិញចាប់ពី $80)
  * `FREESHIP` (ដឹកជញ្ជូនឥតគិតថ្លៃ)
* **កូដតាមដានគំរូ (Demo Tracking IDs)**:
  * `#STEP-2026-8901` (ស្ថានភាព: Processing)
  * `#STEP-2026-8902` (ស្ថានភាព: Confirmed)
* **ផ្ទាំងគ្រប់គ្រងរដ្ឋបាល**:
  * ចុចលើប៊ូតុង **"Admin Panel"** នៅជ្រុងខាងលើស្ដាំនៃ Navbar ដើម្បីប្តូរទៅកាន់ផ្ទាំងគ្រប់គ្រងរដ្ឋបាលភ្លាមៗ!
