# WhatTheGame2

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/IvanJialo/WhatTheGame2)

# WhatTheGame – Instalación y ejecución

Este proyecto está desarrollado con **Vue 3** y **Vite**. A continuación se detallan los pasos necesarios para instalarlo y ejecutarlo localmente o en producción.

## 🧩 Requisitos previos

- [Node.js](https://nodejs.org/) (versión recomendada: 18 o superior)
- npm (se instala junto con Node)

## ⚙️ Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tuusuario/WhatTheGame.git
cd WhatTheGame
```

2. Instala las dependencias:

```bash
npm install
```

## 🚀 Modo desarrollo

Para ejecutar el proyecto en entorno de desarrollo con hot reload:

```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:5173` (por defecto).

## 📦 Generar versión de producción

Para compilar la aplicación:

```bash
npm run build
```

Esto generará una carpeta `dist/` con el proyecto listo para producción.

## 📡 Servir la app compilada

Para lanzar un servidor local que sirva los archivos estáticos de producción (útil para pruebas o despliegue en servidores sin configuración adicional):

1. Instala `serve` si no lo tienes:

```bash
npm install -g serve
```

2. Ejecuta la app desde `dist`:

```bash
serve -s dist
```

La app estará disponible en `http://localhost:3000` (puerto por defecto).

## ✅ Entorno listo
