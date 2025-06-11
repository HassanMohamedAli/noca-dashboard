# Article Management Dashboard

This is a frontend application built with **Angular 20+** to manage bicycle-related articles. It provides functionality for:

- Creating, editing, and listing articles
- Filtering articles by category, material, and bicycle types
- Managing article categories, materials, and bicycle categories
- Integration with secured .NET 6+ Web API using **JWT Authentication**

---

## 🔧 Technologies Used

- Angular 20+
- Angular Material
- Reactive Forms
- TypeScript
- RxJS
- JWT Authentication
- API Integration (REST)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HassanMohamedAli/noca-dashboard.git
cd noca-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

```bash
ng serve
```

App will run at: [http://localhost:4200](http://localhost:4200)

---

## ⚙️ Environment

Make sure to update the `environment.ts` file with your API base URL and JWT token key if required.

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5220/api/v1',
};
```

---

## 📦 API Integration

The app communicates with the backend via secured endpoints using JWT tokens. Make sure you're logged in to access protected routes.

---

## 📌 Notes

- Clean and responsive UI using Angular Material
- Applied object-oriented and modular structure
- Designed with scalability and reusability in mind
- Authentication token is stored and attached via `HttpInterceptor`
- Basic error handling and loading indicators implemented

---

## 🙏 Credits

Special thanks to **Mr. Robert Teschendorf** for providing this opportunity.  
This task allowed me to explore Angular 20+ features, apply JWT Authentication, API Versioning, and build a clean architecture with real-world patterns.

---

## 📄 License

MIT
