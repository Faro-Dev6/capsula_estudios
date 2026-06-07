📽️ Capsula Estudios

Plataforma de streaming de cine independiente con sistema de pagos, catálogo de películas, tienda de merchandising y blog de producción audiovisual.

🚀 Stack
React 18
Vite
Tailwind CSS
Motion (Framer Motion fork)
Lucide Icons
Backend API (Node / Express o similar)
Mercado Pago (Sandbox + producción simulada)
LocalStorage para sesión y estado persistente

🧠 Arquitectura del proyecto

El proyecto está en proceso de refactorización desde una arquitectura monolítica hacia una modular:

src/
 ├── components/
 ├── pages/
 ├── hooks/
 ├── App.jsx (en proceso de limpieza)
 ├── services/
 
✨ Features principales

🎬 Streaming de películas
Catálogo de producciones
Reproducción de contenido desbloqueado
Sistema de bloqueo por pago

💳 Sistema de pagos
Integración con backend /api/checkout
Flujo con Mercado Pago real y sandbox
Simulación de pago en entorno de pruebas
Desbloqueo automático de contenido

🛒 Carrito de compras
Gestión de productos de merchandising
Checkout combinado
Persistencia de estado

🧾 Blog de producción
Artículos de cine y producción audiovisual
Contenido editorial del estudio

👕 Merchandising
Tienda integrada
Agregado al carrito
Categorías de productos

🔐 Autenticación simulada
Login con email
Persistencia en LocalStorage
Sesión restaurada automáticamente

🧪 Dev Console interna
Registro de eventos del sistema
Logs de:
compras
reproducción de contenido
errores de backend
acciones de usuario

🧩 Estructura actual (refactor en progreso)

El App.jsx está siendo dividido en:

Antes:
2600+ líneas monolíticas
Ahora:
componentes UI separados
páginas por sección
hooks de lógica
En proceso de migración:
useCart
useMovies
useAuth
useDevConsole
CheckoutSandbox
ProductionsPage
BlogPage
MerchPage

💳 Flujo de pago
Usuario selecciona película o producto
Se ejecuta triggerCheckout()
Backend genera preferencia (/api/checkout)
Se redirige a:
Mercado Pago real, o
Sandbox interno (CheckoutSandbox)
En pago exitoso:
se desbloquea contenido
se registra transacción
se actualiza UI

🔐 Persistencia

Se utiliza localStorage para:

usuario logueado
contenido desbloqueado
estado de sesión

🧪 Sandbox de pagos

El proyecto incluye un simulador visual de checkout:

UI estilo Mercado Pago
simulación de tarjeta
delay de procesamiento
webhook simulado interno
desbloqueo automático de contenido

📦 Instalación
npm install
npm run dev

🛠️ Backend requerido

El frontend espera estos endpoints:

GET  /api/movies
GET  /api/admin/transactions
POST /api/reviews
POST /api/checkout
POST /api/webhook
GET  /api/vimeo/:id

📌 Estado del proyecto

🟡 En refactor activo

UI funcional
arquitectura en separación progresiva
App.jsx aún en reducción
lógica migrando a hooks y pages

🎯 Próximos pasos
Finalizar separación de App.jsx
Modularizar modales (video player / cart)
Centralizar estado de checkout
Mejorar backend contract (tipado / validación)
Optimizar performance de renders

👨‍💻 Notas

Este proyecto está diseñado como plataforma real de streaming + ecommerce híbrido, con foco en:

UX cinematográfica
monetización de contenido digital
arquitectura escalable
