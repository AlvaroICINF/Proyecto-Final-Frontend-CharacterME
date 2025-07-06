# CharacterME 🎌

Una aplicación web moderna para explorar el mundo del anime y sus personajes favoritos. Desarrollada con Vue.js 3 y la API de Jikan para MyAnimeList.

![CharacterME](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![API](https://img.shields.io/badge/API-Jikan-FF6B6B?style=for-the-badge)

## ✨ Características

- 🔍 **Búsqueda** de anime y personajes
- 🎨 **Diseño moderno** con interfaz intuitiva y responsive
- ⚡ **Carga rápida** con lazy loading de imágenes
- 🎯 **Paginación** para navegar por los resultados
- 📊 **Información detallada** de anime y personajes

## 🚀 Tecnologías Utilizadas

- **Vue.js 3** - Framework de JavaScript progresivo
- **Vite** - Herramienta de construcción rápida
- **Axios** - Cliente HTTP para las peticiones a la API
- **CSS** - Estilos modernos con variables CSS y gradientes
- **Jikan API** - API no oficial de MyAnimeList

## 📦 Instalación

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/CharacterME.git
   cd CharacterME
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Ejecuta el servidor de desarrollo**

   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   ```
   http://localhost:5173
   ```

## 🏗️ Estructura del Proyecto

```
CharacterME/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── AnimeCard.vue    # Tarjeta de anime
│   │   ├── CharacterCard.vue # Tarjeta de personaje
│   │   ├── SearchBar.vue    # Barra de búsqueda
│   │   ├── LoadingSpinner.vue # Spinner de carga
│   │   └── Pagination.vue   # Componente de paginación
│   ├── views/               # Vistas de la aplicación
│   │   ├── HomeView.vue     # Página principal
│   │   ├── AnimeDetailView.vue # Detalles de anime
│   │   └── CharacterDetailView.vue # Detalles de personaje
│   ├── router/              # Configuración de rutas
│   ├── stores/              # Estado global (Pinia)
│   ├── assets/              # Recursos estáticos
│   └── main.js              # Punto de entrada
├── public/                  # Archivos públicos
└── package.json             # Dependencias y scripts
```

## 🌐 API Utilizada

CharacterME utiliza la [API de Jikan](https://jikan.moe/), una API no oficial de MyAnimeList que proporciona acceso a:

- Información de anime
- Datos de personajes
- Imágenes y multimedia
- Estadísticas y puntuaciones

