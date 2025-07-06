<template>
  <div class="home-container">
    <!-- Hero Section con Header -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="hero-pattern"></div>
        <div class="hero-glow"></div>
      </div>

      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              <span class="title-gradient">Character</span>
              <span class="title-accent">ME</span>
            </h1>
            <p class="hero-subtitle">
              Descubre el fascinante mundo del anime y sus personajes más queridos
            </p>
            <div class="hero-features">
              <div class="feature-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="feature-icon"
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
                <span>Búsqueda avanzada</span>
              </div>
              <div class="feature-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="feature-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
                  />
                </svg>
                <span>Miles de anime</span>
              </div>
              <div class="feature-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="feature-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Personajes únicos</span>
              </div>
            </div>

            <div class="hero-actions">
              <router-link to="/characters" class="btn btn-primary hero-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="btn-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Ver todos los personajes
              </router-link>
            </div>
          </div>

          <div class="hero-visual">
            <div class="floating-cards">
              <div class="floating-card card-1">
                <div class="card-preview"></div>
              </div>
              <div class="floating-card card-2">
                <div class="card-preview"></div>
              </div>
              <div class="floating-card card-3">
                <div class="card-preview"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section class="search-section">
      <div class="container">
        <SearchBar @search="handleSearch" @type-change="handleTypeChange" />
      </div>
    </section>

    <!-- Content Section -->
    <section class="content-section">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="content-loading">
          <LoadingSpinner />
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-container">
          <div class="error-content">
            <div class="error-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 class="error-title">¡Ups! Algo salió mal</h3>
            <p class="error-message">{{ error }}</p>
            <button @click="fetchData" class="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="btn-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reintentar
            </button>
          </div>
        </div>

        <!-- Results Section -->
        <div v-else class="results-section">
          <!-- Results Header -->
          <div v-if="animeList.length > 0 || characterList.length > 0" class="results-header">
            <div class="results-info">
              <h2 class="results-title">
                {{ searchType === 'anime' ? 'Anime' : 'Personajes' }} encontrados
              </h2>
              <p class="results-count">
                {{ searchType === 'anime' ? animeList.length : characterList.length }} resultados
                <span v-if="totalPages > 1">• Página {{ currentPage }} de {{ totalPages }}</span>
              </p>
            </div>
            <div class="results-actions">
              <button @click="clearSearch" class="btn btn-secondary" v-if="searchQuery">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="btn-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Limpiar búsqueda
              </button>
            </div>
          </div>

          <!-- Empty Results -->
          <div
            v-if="
              (searchType === 'anime' && animeList.length === 0) ||
              (searchType === 'character' && characterList.length === 0)
            "
            class="empty-results"
          >
            <div class="empty-content">
              <div class="empty-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                  />
                </svg>
              </div>
              <h3 class="empty-title">No se encontraron resultados</h3>
              <p class="empty-message">
                Intenta con otros términos de búsqueda o explora nuestras recomendaciones
              </p>
              <div class="empty-suggestions">
                <span class="suggestion-tag">Naruto</span>
                <span class="suggestion-tag">Dragon Ball</span>
                <span class="suggestion-tag">One Piece</span>
                <span class="suggestion-tag">Attack on Titan</span>
              </div>
            </div>
          </div>

          <!-- Results Grid -->
          <div v-else class="results-grid">
            <!-- Pagination Top -->
            <PaginationComponent
              v-if="totalPages > 1"
              :current-page="currentPage"
              :total-pages="totalPages"
              @page-change="handlePageChange"
              class="pagination-section pagination-top"
            />

            <div v-if="searchType === 'anime'" class="grid">
              <AnimeCard
                v-for="anime in animeList"
                :key="anime.mal_id"
                :anime="anime"
                class="fade-in"
              />
            </div>
            <div v-else class="grid">
              <CharacterCard
                v-for="character in characterList"
                :key="character.mal_id"
                :character="character"
                class="fade-in"
              />
            </div>
          </div>

          <!-- Pagination Bottom -->
          <PaginationComponent
            v-if="totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="handlePageChange"
            class="pagination-section pagination-bottom"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AnimeCard from '@/components/AnimeCard.vue'
import CharacterCard from '@/components/CharacterCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PaginationComponent from '@/components/Pagination.vue'

export default {
  name: 'HomeView',
  components: {
    AnimeCard,
    CharacterCard,
    SearchBar,
    LoadingSpinner,
    PaginationComponent,
  },
  setup() {
    const animeList = ref([])
    const characterList = ref([])
    const loading = ref(true)
    const error = ref(null)
    const searchQuery = ref('')
    const searchType = ref('anime')
    const currentFilters = ref({})
    const currentPage = ref(1)
    const totalPages = ref(1)

    const fetchData = async () => {
      loading.value = true
      error.value = null

      try {
        let url
        let params = {
          page: currentPage.value,
          limit: 12,
          sfw: true,
        }

        if (searchType.value === 'anime') {
          url = 'https://api.jikan.moe/v4/anime'
          if (searchQuery.value) {
            params.q = searchQuery.value
          }
          if (currentFilters.value.genre && currentFilters.value.genre !== '') {
            params.genres = currentFilters.value.genre
          }
          if (currentFilters.value.type && currentFilters.value.type !== '') {
            params.type = currentFilters.value.type
          }
          if (currentFilters.value.status && currentFilters.value.status !== '') {
            params.status = currentFilters.value.status
          }
          if (currentFilters.value.orderBy && currentFilters.value.orderBy !== '') {
            params.order_by = currentFilters.value.orderBy
          }
          if (!params.order_by) {
            params.order_by = 'popularity'
          }
        } else {
          url = 'https://api.jikan.moe/v4/characters'
          if (searchQuery.value) {
            params.q = searchQuery.value
          }
          if (currentFilters.value.gender && currentFilters.value.gender !== '') {
            params.gender = currentFilters.value.gender
          }
          if (currentFilters.value.orderBy && currentFilters.value.orderBy !== '') {
            params.order_by = currentFilters.value.orderBy
          }
          if (!params.order_by) {
            params.order_by = 'popularity'
          }
        }

        const response = await axios.get(url, { params })

        if (searchType.value === 'anime') {
          animeList.value = response.data.data || []
        } else {
          characterList.value = response.data.data || []
        }

        if (response.data.pagination) {
          totalPages.value = response.data.pagination.last_visible_page || 1
        } else {
          totalPages.value = 1
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        error.value = 'Error al cargar los datos. Por favor, inténtalo de nuevo.'
      } finally {
        loading.value = false
      }
    }

    const handleSearch = (searchData) => {
      if (typeof searchData === 'string') {
        searchQuery.value = searchData
        currentFilters.value = {}
      } else {
        searchQuery.value = searchData.query
        currentFilters.value = searchData.filters
        searchType.value = searchData.type
      }
      currentPage.value = 1
      fetchData()
    }

    const handleTypeChange = (type) => {
      searchType.value = type
      currentPage.value = 1
      fetchData()
    }

    const handlePageChange = (page) => {
      currentPage.value = page
      fetchData()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const clearSearch = () => {
      searchQuery.value = ''
      currentFilters.value = {}
      currentPage.value = 1
      fetchData()
    }

    onMounted(() => {
      fetchData()
    })

    return {
      animeList,
      characterList,
      loading,
      error,
      searchType,
      currentPage,
      totalPages,
      searchQuery,
      currentFilters,
      fetchData,
      handleSearch,
      handleTypeChange,
      handlePageChange,
      clearSearch,
    }
  },
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: var(--background-color);
}

.hero-section {
  position: relative;
  padding: 4rem 0 6rem 0;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--primary-color);
}

.hero-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  animation: float 20s ease-in-out infinite;
}

.hero-glow {
  display: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-text {
  color: white;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title-gradient {
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-accent {
  color: var(--accent-color);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.feature-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--accent-color);
}

.hero-actions {
  margin-top: 2rem;
}

.hero-btn {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.hero-btn:hover {
  background: rgba(93, 109, 126, 0.2);
  border-color: rgba(93, 109, 126, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-cards {
  position: relative;
  width: 300px;
  height: 400px;
}

.floating-card {
  position: absolute;
  width: 200px;
  height: 280px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.card-1 {
  top: 0;
  left: 0;
  animation: float1 6s ease-in-out infinite;
}

.card-2 {
  top: 60px;
  right: 0;
  animation: float2 6s ease-in-out infinite;
  animation-delay: -2s;
}

.card-3 {
  bottom: 0;
  left: 50px;
  animation: float3 6s ease-in-out infinite;
  animation-delay: -4s;
}

.card-preview {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
}

.search-section {
  padding: 2rem 0;
  background: var(--surface-color);
  border-radius: 2rem 2rem 0 0;
  margin-top: -2rem;
  position: relative;
  z-index: 3;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
}

.content-section {
  padding: 3rem 0;
  background: var(--surface-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--background-color);
  border-radius: 1rem;
  border: 1px solid var(--border-color);
}

.results-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.results-count {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0;
}

.results-actions {
  display: flex;
  gap: 1rem;
}

.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.error-content {
  text-align: center;
  max-width: 400px;
}

.error-icon {
  width: 4rem;
  height: 4rem;
  color: #ef4444;
  margin: 0 auto 1.5rem auto;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
}

.error-message {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.empty-results {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.empty-content {
  text-align: center;
  max-width: 500px;
}

.empty-icon {
  width: 4rem;
  height: 4rem;
  color: var(--text-muted);
  margin: 0 auto 1.5rem auto;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
}

.empty-message {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.empty-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.suggestion-tag {
  padding: 0.5rem 1rem;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 9999px;
  font-size: 0.875rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.suggestion-tag:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes float1 {
  0%,
  100% {
    transform: translateY(0px) rotate(-5deg);
  }
  50% {
    transform: translateY(-20px) rotate(-3deg);
  }
}

@keyframes float2 {
  0%,
  100% {
    transform: translateY(0px) rotate(5deg);
  }
  50% {
    transform: translateY(-15px) rotate(3deg);
  }
}

@keyframes float3 {
  0%,
  100% {
    transform: translateY(0px) rotate(-3deg);
  }
  50% {
    transform: translateY(-25px) rotate(-1deg);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
  gap: 0.5rem;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: var(--surface-color);
  color: var(--text-primary);
  border: 2px solid var(--border-color);
}

.btn-secondary:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero-title {
    font-size: 3rem;
  }

  .floating-cards {
    width: 250px;
    height: 300px;
  }

  .floating-card {
    width: 150px;
    height: 200px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 0 4rem 0;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .hero-features {
    align-items: center;
  }

  .results-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .container {
    padding: 0 1rem;
  }

  .grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .feature-item {
    font-size: 0.875rem;
  }

  .floating-cards {
    display: none;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}

.pagination-section {
  margin: 2rem 0;
}

.pagination-top {
  margin-bottom: 1rem;
}

.pagination-bottom {
  margin-top: 1rem;
}
</style>
