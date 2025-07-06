<template>
  <div class="search-container">
    <div class="search-bar">
      <div class="search-input-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="search-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          v-model="searchQuery"
          @input="debounceSearch"
          placeholder="Buscar anime o personaje..."
          class="search-input"
        />
      </div>
      <button @click="emitSearch" class="search-button">Buscar</button>
    </div>

    <!-- Filtros avanzados -->
    <div class="filters-section">
      <div class="filters-header">
        <button @click="toggleFilters" class="filters-toggle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="filter-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
            />
          </svg>
          Filtros avanzados
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="chevron-icon"
            :class="{ rotated: showFilters }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <button v-if="hasActiveFilters" @click="clearFilters" class="clear-filters">
          Limpiar filtros
        </button>
      </div>

      <div v-if="showFilters" class="filters-content">
        <!-- Filtros para Anime -->
        <div v-if="searchType === 'anime'" class="anime-filters">
          <div class="filter-group">
            <label class="filter-label">Género</label>
            <select v-model="filters.genre" @change="applyFilters" class="filter-select">
              <option value="">Todos los géneros</option>
              <option value="action">Acción</option>
              <option value="adventure">Aventura</option>
              <option value="comedy">Comedia</option>
              <option value="drama">Drama</option>
              <option value="fantasy">Fantasía</option>
              <option value="horror">Terror</option>
              <option value="mystery">Misterio</option>
              <option value="romance">Romance</option>
              <option value="sci-fi">Ciencia ficción</option>
              <option value="slice-of-life">Slice of Life</option>
              <option value="sports">Deportes</option>
              <option value="supernatural">Sobrenatural</option>
              <option value="thriller">Suspenso</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Tipo</label>
            <select v-model="filters.type" @change="applyFilters" class="filter-select">
              <option value="">Todos los tipos</option>
              <option value="tv">TV</option>
              <option value="movie">Película</option>
              <option value="ova">OVA</option>
              <option value="special">Especial</option>
              <option value="ona">ONA</option>
              <option value="music">Música</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Estado</label>
            <select v-model="filters.status" @change="applyFilters" class="filter-select">
              <option value="">Todos los estados</option>
              <option value="airing">En emisión</option>
              <option value="complete">Completado</option>
              <option value="upcoming">Próximamente</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Ordenar por</label>
            <select v-model="filters.orderBy" @change="applyFilters" class="filter-select">
              <option value="popularity">Popularidad</option>
              <option value="score">Puntuación</option>
              <option value="title">Título</option>
              <option value="start_date">Fecha de inicio</option>
              <option value="end_date">Fecha de fin</option>
            </select>
          </div>
        </div>

        <!-- Filtros para Personajes -->
        <div v-if="searchType === 'character'" class="character-filters">
          <div class="filter-group">
            <label class="filter-label">Género</label>
            <select v-model="filters.gender" @change="applyFilters" class="filter-select">
              <option value="">Todos los géneros</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="non-binary">No binario</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Tipo</label>
            <select v-model="filters.characterType" @change="applyFilters" class="filter-select">
              <option value="">Todos los tipos</option>
              <option value="main">Protagonista</option>
              <option value="supporting">Secundario</option>
              <option value="background">De fondo</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Ordenar por</label>
            <select v-model="filters.orderBy" @change="applyFilters" class="filter-select">
              <option value="popularity">Popularidad</option>
              <option value="favorites">Favoritos</option>
              <option value="name">Nombre</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: '',
      searchType: 'anime',
      timeout: null,
      showFilters: false,
      filters: {
        genre: '',
        type: '',
        status: '',
        gender: '',
        characterType: '',
        orderBy: 'popularity',
      },
    }
  },
  computed: {
    hasActiveFilters() {
      if (this.searchType === 'anime') {
        return (
          this.filters.genre ||
          this.filters.type ||
          this.filters.status ||
          this.filters.orderBy !== 'popularity'
        )
      } else {
        return (
          this.filters.gender || this.filters.characterType || this.filters.orderBy !== 'popularity'
        )
      }
    },
  },
  methods: {
    debounceSearch() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.emitSearch()
      }, 500)
    },
    setSearchType(type) {
      this.searchType = type
      // Reset filters when changing type
      this.filters = {
        genre: '',
        type: '',
        status: '',
        gender: '',
        characterType: '',
        orderBy: 'popularity',
      }
      this.$emit('type-change', type)
      this.emitSearch()
    },
    toggleFilters() {
      this.showFilters = !this.showFilters
    },
    clearFilters() {
      this.filters = {
        genre: '',
        type: '',
        status: '',
        gender: '',
        characterType: '',
        orderBy: 'popularity',
      }
      this.emitSearch()
    },
    applyFilters() {
      this.emitSearch()
    },
    emitSearch() {
      const searchData = {
        query: this.searchQuery,
        type: this.searchType,
        filters: { ...this.filters },
      }
      this.$emit('search', searchData)
    },
  },
}
</script>

<style scoped>
.search-container {
  background: var(--surface-color);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: var(--shadow-lg);
  margin-bottom: 2rem;
  border: 1px solid var(--border-color);
}

.search-bar {
  display: flex;
  gap: 1rem;
  align-items: center;
  max-width: 600px;
  margin: 0 auto 1rem auto;
}

.search-input-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  color: var(--text-muted);
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid var(--border-color);
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: var(--surface-color);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.search-button {
  padding: 1rem 2rem;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.search-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.search-type-toggle {
  display: flex;
  background: var(--background-color);
  border-radius: 0.75rem;
  padding: 0.25rem;
  border: 1px solid var(--border-color);
  max-width: 300px;
  margin: 0 auto;
}

.search-type-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.search-type-btn.active {
  background: var(--surface-color);
  color: var(--primary-color);
  box-shadow: var(--shadow-sm);
}

.type-icon {
  width: 1rem;
  height: 1rem;
}

.filters-section {
  margin-top: 1rem;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}

.filters-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: var(--text-secondary);
}

.filter-icon {
  width: 1rem;
  height: 1rem;
}

.chevron-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
}

.rotated {
  transform: rotate(90deg);
}

.clear-filters {
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-decoration: underline;
}

.clear-filters:hover {
  color: var(--primary-color);
}

.filters-content {
  padding: 1rem;
  background: var(--background-color);
  border-radius: 0.75rem;
  margin-top: 0.5rem;
  border: 1px solid var(--border-color);
}

.anime-filters,
.character-filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.filter-select {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid var(--border-color);
  border-radius: 0.5rem;
  background: var(--surface-color);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
}

@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
    gap: 1rem;
  }

  .search-type-toggle {
    width: 100%;
  }

  .search-container {
    padding: 1rem;
  }

  .anime-filters,
  .character-filters {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .filters-content {
    padding: 0.75rem;
  }
}
</style>
