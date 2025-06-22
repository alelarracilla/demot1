# 🧩 Component Library + Analytics Backend

Proyecto de librería de componentes frontend con tracking de interacciones en tiempo real, respaldado por un backend con autenticación JWT y exportación de estadísticas.

---

## 🛠️ Requisitos

- **Node.js:** `v20.0.0`
- **npm:** `v9+`
- **MongoDB Atlas:** conexión remota

---

## 📦 Instalación general

```bash
git clone https://github.com/alelarracilla/demot1
cd demot1
```

---

## 🚀 Backend

📁 Ubicación: `backend/`

### 🔧 Configuración

Crea un archivo `.env` en la carpeta `backend/` con:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/analytics
JWT_SECRET=your_secret_key
```

### 📦 Instalación

```bash
cd backend
npm install
```

### ▶️ Levantar backend

```bash
npm run dev
```

> Se inicia en: `http://localhost:5000`

---

## 💅 Frontend

📁 Ubicación: `frontend/` o `src/app/` si está en un solo monorepo

### 🔧 Configuración

Crea un archivo `.env.local` con:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 📦 Instalación

```bash
cd frontend
npm install
```

### ▶️ Levantar frontend

```bash
npm run dev
```

> Se inicia en: `http://localhost:3000`

---

## 🧪 Funcionalidades

- ✅ Showcase interactivo de componentes (`/`)
- ✅ Dashboard con estadísticas en tiempo real
- ✅ Login funcional con JWT (`/login`)
- ✅ Registro de interacciones automático
- ✅ Exportación de datos en CSV y JSON

---

## 📁 Estructura de carpetas

```
.
├── backend/
│   └── src/
│       └── routes, controllers, models, middlewares
├── frontend/
│   └── src/app/
│       └── t1-components-library/
│           └── components/
│       └── dashboard/
│       └── login/
```

---

## ✅ Recomendaciones

- Usa `nvm` para asegurar la versión de Node:

```bash
nvm use 20.0.0
```

- MongoDB puede ser local o remoto (recomendado usar Atlas).
- Las variables que comienzan con `NEXT_PUBLIC_` son accesibles desde el cliente.
