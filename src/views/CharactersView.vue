<template>
  <div class="characters-container">
    <section class="hero-section">
      <div class="hero-background">
        <div class="hero-pattern"></div>
        <div class="hero-glow"></div>
      </div>

      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              <span class="title-gradient">Personajes</span>
              <span class="title-accent">de Anime</span>
            </h1>
            <p class="hero-subtitle">Explora miles de personajes únicos del mundo del anime</p>
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-number">{{ totalCharacters.toLocaleString() }}</span>
                <span class="stat-label">Personajes</span>
              </div>
            </div>
          </div>

          <div class="hero-visual">
            <div class="character-showcase">
              <div class="character-card showcase-1">
                <div class="character-avatar"></div>
              </div>
              <div class="character-card showcase-2">
                <div class="character-avatar"></div>
              </div>
              <div class="character-card showcase-3">
                <div class="character-avatar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="container">
        <div class="search-section">
          <SearchBar @search="handleSearch" @type-change="handleTypeChange" />
        </div>

        <div v-if="loading" class="content-loading">
          <LoadingSpinner />
        </div>

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
            <button @click="fetchCharacters" class="btn btn-primary">
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

        <div v-else class="characters-section">
          <div class="characters-header">
            <div class="characters-info">
              <h2 class="characters-title">Todos los Personajes</h2>
              <p class="characters-count">
                {{ characterList.length }} personajes mostrados
                <span v-if="totalPages > 1">• Página {{ currentPage }} de {{ totalPages }}</span>
              </p>
            </div>
          </div>

          <PaginationComponent
            v-if="totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="handlePageChange"
            class="pagination-section pagination-top"
          />

          <div class="characters-grid">
            <CharacterCard
              v-for="character in characterList"
              :key="character.mal_id"
              :character="character"
              class="fade-in"
            />
          </div>

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
import CharacterCard from '@/components/CharacterCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PaginationComponent from '@/components/Pagination.vue'
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'CharactersView',
  components: {
    CharacterCard,
    LoadingSpinner,
    PaginationComponent,
    SearchBar,
  },
  setup() {
    const characterList = ref([])
    const loading = ref(true)
    const error = ref(null)
    const currentPage = ref(1)
    const totalPages = ref(1)
    const totalCharacters = ref(0)
    const searchQuery = ref('')
    const currentFilters = ref({})

    const fetchCharacters = async () => {
      loading.value = true
      error.value = null

      try {
        const params = {
          page: currentPage.value,
          limit: 12,
          sfw: true,
        }

        if (searchQuery.value && searchQuery.value.trim()) {
          params.q = searchQuery.value.trim()
        }

        console.log('Fetching characters with params:', params)

        const response = await axios.get('https://api.jikan.moe/v4/characters', {
          params: params,
        })

        console.log('API Response:', response.data)

        characterList.value = response.data.data || []

        if (response.data.pagination) {
          totalPages.value = response.data.pagination.last_visible_page || 1
          totalCharacters.value = response.data.pagination.items.total || 0
        } else {
          totalPages.value = 1
          totalCharacters.value = characterList.value.length
        }

        console.log('Characters loaded:', characterList.value.length)
        console.log('Total pages:', totalPages.value)
        console.log('Total characters:', totalCharacters.value)
      } catch (err) {
        console.error('Error fetching characters:', err)
        error.value = 'Error al cargar los personajes. Por favor, inténtalo de nuevo.'
      } finally {
        loading.value = false
      }
    }

    const handlePageChange = (page) => {
      currentPage.value = page
      fetchCharacters()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSearch = (searchData) => {
      if (typeof searchData === 'string') {
        searchQuery.value = searchData
        currentFilters.value = {}
      } else {
        searchQuery.value = searchData.query
        currentFilters.value = searchData.filters
      }
      currentPage.value = 1
      fetchCharacters()
    }

    const handleTypeChange = () => {
      currentPage.value = 1
      fetchCharacters()
    }

    const clearSearch = () => {
      searchQuery.value = ''
      currentFilters.value = {}
      currentPage.value = 1
      fetchCharacters()
    }

    onMounted(() => {
      fetchCharacters()
    })

    return {
      characterList,
      loading,
      error,
      currentPage,
      totalPages,
      totalCharacters,
      searchQuery,
      currentFilters,
      fetchCharacters,
      handlePageChange,
      handleSearch,
      handleTypeChange,
      clearSearch,
    }
  },
}
</script>

<style scoped>
.characters-container {
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
  background: linear-gradient(135deg, var(--secondary-color) 0%, var(--accent-color) 100%);
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(68, 187, 164, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(60px);
  animation: pulse 4s ease-in-out infinite;
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
  color: #fff;
  background: none;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
  background-clip: unset;
}

.title-accent {
  color: #fff;
  background: none;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
  background-clip: unset;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #e94f37;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Hero Visual */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.character-showcase {
  position: relative;
  width: 300px;
  height: 400px;
}

.character-card {
  position: absolute;
  width: 180px;
  height: 240px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.showcase-1 {
  top: 0;
  left: 0;
  animation: float1 6s ease-in-out infinite;
}

.showcase-2 {
  top: 80px;
  right: 0;
  animation: float2 6s ease-in-out infinite;
  animation-delay: -2s;
}

.showcase-3 {
  bottom: 0;
  left: 60px;
  animation: float3 6s ease-in-out infinite;
  animation-delay: -4s;
}

.character-avatar {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
}

/* Content Section */
.content-section {
  padding: 3rem 0;
  background: var(--surface-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Search Section */
.search-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--background-color);
  border-radius: 1rem;
  border: 1px solid var(--border-color);
}

.search-container {
  display: flex;
  gap: 1rem;
}

.search-bar {
  flex: 1;
}

.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
}

.search-button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  background: var(--primary-color);
  color: white;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
}

.search-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Filters Section */
.filters-section {
  margin-top: 1rem;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.filters-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: var(--text-primary);
}

.filter-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.chevron-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.rotated {
  transform: rotate(180deg);
}

.clear-filters {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: var(--text-primary);
}

.filters-content {
  margin-top: 1rem;
}

.filter-group {
  margin-bottom: 1rem;
}

.filter-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.filter-select {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
}

/* Characters Header */
.characters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--background-color);
  border-radius: 1rem;
  border: 1px solid var(--border-color);
}

.characters-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.characters-count {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0;
}

.characters-actions {
  display: flex;
  gap: 1rem;
}

/* Characters Grid */
.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
}

/* Error Container */
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

/* Buttons */
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

/* Animations */
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

/* Responsive */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero-title {
    font-size: 3rem;
  }

  .hero-stats {
    justify-content: center;
  }

  .character-showcase {
    width: 250px;
    height: 300px;
  }

  .character-card {
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

  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .characters-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .container {
    padding: 0 1rem;
  }

  .characters-grid {
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

  .character-showcase {
    display: none;
  }

  .characters-grid {
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
