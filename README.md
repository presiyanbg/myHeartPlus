# My Hearth Plus

This project consists of a **Laravel API backend** and a **Next.js frontend**, designed to provide a scalable health platform with multilingual support, authentication, and modular features.

---

## 📂 Project Structure

```
project-root/
├── api/           # Laravel backend (REST API, business logic, DB migrations)
├── web-next/      # Next.js frontend (React, Tailwind, TypeScript)
├── ideas.txt      # Notes and ideas
├── install-steps.txt # Setup helper
└── web-next-nginx.conf # Example Nginx configuration
```

---

## 🚀 Backend (Laravel API)

Located in **`api/`**.

### Features
- RESTful API endpoints for:
  - Users, Authentication, Roles
  - Articles & Translations
  - Doctors, Patients, Organizations, Prescriptions
  - Health Tests, Questions, Answers & Results
- Laravel Sanctum for authentication
- Policies for access control
- Multilingual support (`lang/bg`, `lang/en`)
- Database seeders & factories for test data

### Setup
```bash
cd api
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

---

## 🌐 Frontend (Next.js)

Located in **`web-next/`**.

### Features
- Next.js 13+ App Router
- TailwindCSS styling
- Multilingual routing (`/bg`, `/en`)
- Authentication system (login, registration, logout)
- User profile, health data, prescriptions, organizations
- Dynamic pages for articles, doctors, medicaments, health tests
- Context API for global state (auth, navigation, notifications, etc.)

### Setup
```bash
cd web-next
cp .env.example .env.local
npm install
npm run dev
```

---

## ⚙️ Deployment

- **Backend (Laravel API)**:
  - Configure `.env` with database and cache drivers
  - Run `php artisan config:cache && php artisan migrate --seed`
  - Serve with Nginx/Apache or `php-fpm`

- **Frontend (Next.js)**:
  - Build with:
    ```bash
    npm run build
    npm run start
    ```
  - Use `web-next-nginx.conf` for Nginx reverse proxy

---

## 🧪 Testing

- **Backend**:
  ```bash
  cd api
  php artisan test
  ```

- **Frontend**:
  ```bash
  cd web-next
  npm run test
  ```

---

## 📖 Documentation

- **API Endpoints** → Defined in `routes/api.php`
- **Frontend Routes** → Inside `web-next/src/app/`

---

## 🛠️ Tech Stack

- **Backend**: PHP 8+, Laravel 10+, MySQL
- **Frontend**: Next.js 13+, React 18, TailwindCSS, TypeScript
- **Deployment**: Nginx

---

## 👤 Authors

- Project created and maintained by **Presiyan Tsonevski**