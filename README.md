# CharacterME 🎌

Una aplicación web moderna para explorar el mundo del anime y sus personajes favoritos. Desarrollada con Vue.js 3 y la API de Jikan para MyAnimeList.

![CharacterME](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![API](https://img.shields.io/badge/API-Jikan-FF6B6B?style=for-the-badge)

## ✨ Características

- 🔍 **Búsqueda avanzada** de anime y personajes
- 🎨 **Diseño moderno** con interfaz intuitiva y responsive
- 📱 **Totalmente responsive** para dispositivos móviles y desktop
- ⚡ **Carga rápida** con lazy loading de imágenes
- 🎯 **Paginación inteligente** para navegar por los resultados
- 🌈 **Tema atractivo** con gradientes y animaciones suaves
- 📊 **Información detallada** de anime y personajes

## 🚀 Tecnologías Utilizadas

- **Vue.js 3** - Framework de JavaScript progresivo
- **Vite** - Herramienta de construcción rápida
- **Axios** - Cliente HTTP para las peticiones a la API
- **CSS3** - Estilos modernos con variables CSS y gradientes
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

## 🎨 Características del Diseño

### Paleta de Colores

- **Primario**: `#8b5cf6` (Morado)
- **Secundario**: `#ec4899` (Rosa)
- **Acento**: `#10b981` (Verde)
- **Fondo**: `#f8fafc` (Gris claro)
- **Superficie**: `#ffffff` (Blanco)

### Tipografía

- **Fuente principal**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700, 800

### Animaciones

- Transiciones suaves en hover
- Efectos de elevación en tarjetas
- Animaciones de carga personalizadas
- Gradientes animados

## 🔧 Scripts Disponibles

```bash
# Servidor de desarrollo
npm run dev

# Construcción para producción
npm run build

# Vista previa de la construcción
npm run preview

# Linting
npm run lint
```

## 📱 Responsive Design

La aplicación está optimizada para:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🌐 API Utilizada

CharacterME utiliza la [API de Jikan](https://jikan.moe/), una API no oficial de MyAnimeList que proporciona acceso a:

- Información de anime
- Datos de personajes
- Imágenes y multimedia
- Estadísticas y puntuaciones

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Jikan API](https://jikan.moe/) por proporcionar acceso a los datos de MyAnimeList
- [Vue.js](https://vuejs.org/) por el excelente framework
- [Vite](https://vitejs.dev/) por las herramientas de desarrollo
- [Inter Font](https://rsms.me/inter/) por la tipografía

## 📞 Contacto

- **Desarrollador**: [Tu Nombre]
- **Email**: tu-email@ejemplo.com
- **GitHub**: [@tu-usuario](https://github.com/tu-usuario)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
