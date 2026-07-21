# 📽️ Capsula Estudios

Plataforma web de streaming de cine independiente desarrollada con React, que integra catálogo de películas, reproducción de contenido, sistema de pagos, tienda de merchandising, blog y herramientas de administración para la gestión del estudio.

---

# 🚀 Tecnologías

- React 19
- Vite
- Tailwind CSS v4
- Motion (Framer Motion)
- Lucide React
- JavaScript (ES6+)
- Backend API (Node.js / Express)
- Vimeo API
- Mercado Pago (Sandbox)
- LocalStorage

---

# ✨ Funcionalidades

## 🎬 Streaming

- Catálogo de producciones audiovisuales
- Reproducción de películas y cortometrajes
- Contenido bloqueado mediante sistema de compra
- Integración con Vimeo

---

## 💳 Sistema de pagos

- Checkout mediante backend
- Integración con Mercado Pago
- Simulador Sandbox para desarrollo
- Desbloqueo automático del contenido adquirido

---

## 🛒 Tienda de merchandising

- Catálogo de productos
- Carrito de compras
- Checkout integrado
- Persistencia del carrito

---

## 🧾 Blog

- Publicación de artículos
- Contenido relacionado con producciones audiovisuales
- Navegación independiente

---

## 🔐 Autenticación

- Login mediante email
- Persistencia de sesión con LocalStorage
- Restauración automática de sesión

---

## 🧪 Dev Console

Herramienta interna para desarrollo que permite visualizar:

- eventos del sistema
- compras
- reproducciones
- errores
- integraciones con API

---

# 🎨 Sistema de temas

El proyecto implementa un sistema de temas utilizando variables CSS y Tailwind CSS.

Actualmente dispone de tres modos:

- 🌙 Dark
- ☀️ Light
- 🎬 Capsula (Brand)

El tema seleccionado se guarda automáticamente en LocalStorage y puede cambiarse desde la interfaz de usuario.

---

# 🧠 Arquitectura

El proyecto continúa evolucionando hacia una arquitectura modular.

Actualmente la lógica se encuentra distribuida en:

```
src/
│
├── components/
├── pages/
├── hooks/
├── services/
├── styles/
├── data/
└── App.jsx
```

Durante la refactorización se fueron separando responsabilidades desde un único componente principal hacia componentes reutilizables, páginas y hooks personalizados.

Hooks implementados:

- useMovies
- useCart
- useAuth
- useContent
- useContact
- useDevConsole
- useTheme

---

# 💳 Flujo de compra

1. El usuario selecciona una película o producto.
2. Se ejecuta `triggerCheckout()`.
3. El backend genera la preferencia de pago.
4. Se redirige al checkout.
5. Al finalizar el pago:
   - se registra la transacción;
   - se desbloquea el contenido;
   - se actualiza la interfaz.

---

# 🔐 Persistencia

El proyecto utiliza LocalStorage para almacenar:

- usuario autenticado
- contenido desbloqueado
- carrito de compras
- tema seleccionado

---

# 📦 Instalación

Clonar el repositorio:

```bash
git clone <repositorio>
```

Instalar dependencias:

```bash
pnpm install
```

Iniciar el proyecto:

```bash
pnpm dev
```

También es posible utilizar npm:

```bash
npm install
npm run dev
```

---

# 🛠️ Backend esperado

El frontend consume una API compatible con los siguientes endpoints:

```
GET    /api/movies
GET    /api/admin/transactions
GET    /api/vimeo/:id

POST   /api/reviews
POST   /api/checkout
POST   /api/webhook
```

---

# 📌 Estado del proyecto

🟡 En desarrollo activo

Actualmente se encuentra en proceso de mejora continua.

Se han completado importantes tareas de refactorización:

- separación de componentes
- hooks personalizados
- organización por páginas
- integración con Vimeo
- sistema de temas
- centralización de estilos mediante variables CSS

El proyecto continúa evolucionando hacia una arquitectura más escalable y mantenible.

---

# 🎯 Próximos pasos

- Continuar reduciendo responsabilidades de App.jsx
- Mejorar la organización del estado global
- Optimizar componentes reutilizables
- Continuar la integración con el backend
- Incorporar nuevas funcionalidades administrativas

---

# 👨‍💻 Objetivo del proyecto

Capsula Estudios busca simular una plataforma moderna de streaming y distribución audiovisual, combinando reproducción de contenido digital, comercio electrónico y herramientas de gestión en una única aplicación desarrollada con tecnologías actuales del ecosistema React.