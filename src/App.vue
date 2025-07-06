<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <div class="container">
      <nav class="navbar">
        <router-link to="/" class="logo">CharacterME</router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Inicio</router-link>
          <router-link to="/characters" class="nav-link">Personajes</router-link>
        </div>
      </nav>
    </div>
  </header>

  <main class="main-content">
    <router-view />
  </main>

  <footer class="footer">
    <div class="container">
      <p>CharacterME - Desarrollado con Vue.js y la API de JIKAN</p>
      <p class="copyright">© {{ new Date().getFullYear() }} - Todos los derechos reservados</p>
    </div>
  </footer>
</template>

<style scoped>
.header {
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-link {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover {
  color: rgba(255, 255, 255, 0.8);
}

.main-content {
  min-height: 100vh;
  background-color: var(--background-color);
  padding: 1.5rem 0;
}

.footer {
  background-color: #333;
  color: white;
  padding: 2rem 0;
  text-align: center;
}

.copyright {
  margin-top: 0.5rem;
  color: #aaa;
}
</style>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
