<template>
  <div class="anime-detail-container">
    <div v-if="loading" class="loading-container">
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
        <div class="error-actions">
          <button @click="fetchAnimeData" class="btn btn-primary">
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
          <router-link to="/" class="btn btn-secondary">
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Volver al inicio
          </router-link>
        </div>
      </div>
    </div>

    <div v-else-if="anime" class="anime-detail-content">
      <div class="container">
        <section class="hero-section">
          <div class="hero-background">
            <div class="hero-pattern"></div>
            <div class="hero-glow"></div>
          </div>

          <div class="hero-content">
            <div class="anime-poster">
              <img
                :src="
                  anime.images?.jpg?.large_image_url ||
                  anime.images?.jpg?.image_url ||
                  'https://via.placeholder.com/350x500?text=No+Image'
                "
                :alt="anime.title"
                class="poster-image"
              />
              <div class="score-badge" v-if="anime.score">
                <span class="score-number">{{ anime.score.toFixed(1) }}</span>
                <span class="score-label">Puntuación</span>
              </div>
            </div>

            <div class="anime-info">
              <div class="anime-header">
                <h1 class="anime-title">{{ anime.title }}</h1>
                <h2 v-if="anime.title_japanese" class="anime-title-japanese">
                  {{ anime.title_japanese }}
                </h2>
              </div>

              <div class="anime-genres">
                <span v-for="(genre, index) in anime.genres" :key="index" class="genre-badge">
                  {{ genre.name }}
                </span>
              </div>

              <div class="anime-stats">
                <div class="stat-item">
                  <span class="stat-label">Tipo</span>
                  <span class="stat-value">{{ anime.type || 'N/A' }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Episodios</span>
                  <span class="stat-value">{{ anime.episodes || 'N/A' }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Estado</span>
                  <span class="stat-value">{{ anime.status || 'N/A' }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Emisión</span>
                  <span class="stat-value">
                    {{ formatDate(anime.aired?.from) }} - {{ formatDate(anime.aired?.to) }}
                  </span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Duración</span>
                  <span class="stat-value">{{ anime.duration || 'N/A' }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Clasificación</span>
                  <span class="stat-value">{{ anime.rating || 'N/A' }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="content-section">
          <div class="container">
            <div class="synopsis-section">
              <h3 class="section-title">Sinopsis</h3>
              <p class="synopsis-text">{{ anime.synopsis || 'No hay sinopsis disponible.' }}</p>
            </div>

            <div v-if="anime.trailer?.embed_url" class="trailer-section">
              <h3 class="section-title">Trailer</h3>
              <div class="trailer-container">
                <iframe
                  :src="anime.trailer.embed_url"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="trailer-iframe"
                ></iframe>
              </div>
            </div>

            <div class="characters-section">
              <h3 class="section-title">Personajes</h3>

              <div v-if="loadingCharacters" class="loading-characters">
                <LoadingSpinner />
              </div>

              <div v-else-if="characters.length === 0" class="no-characters">
                <p class="no-data-text">No hay personajes disponibles</p>
              </div>

              <div v-else class="characters-grid">
                <CharacterCard
                  v-for="character in characters"
                  :key="character.character.mal_id"
                  :character="character.character"
                  class="fade-in"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import CharacterCard from '@/components/CharacterCard.vue'

export default {
  name: 'AnimeDetailView',
  components: {
    LoadingSpinner,
    CharacterCard,
  },
  setup() {
    const route = useRoute()
    const anime = ref(null)
    const characters = ref([])
    const loading = ref(true)
    const loadingCharacters = ref(true)
    const error = ref(null)

    const fetchAnimeData = async () => {
      loading.value = true
      error.value = null

      try {
        const animeId = route.params.id
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/full`)
        anime.value = response.data.data

        if (anime.value.synopsis) {
          anime.value.synopsis = await translateSynopsis(anime.value.synopsis)
        }

        setTimeout(() => {
          fetchCharacters(animeId)
        }, 1000)
      } catch (err) {
        console.error('Error fetching anime data:', err)
        error.value = 'Error al cargar los datos del anime. Por favor, inténtalo de nuevo.'
        loadingCharacters.value = false
      } finally {
        loading.value = false
      }
    }

    const fetchCharacters = async (animeId) => {
      loadingCharacters.value = true

      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/characters`)
        characters.value = response.data.data
      } catch (err) {
        console.error('Error fetching characters:', err)
      } finally {
        loadingCharacters.value = false
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    const translateSynopsis = async (text) => {
      if (!text) return 'No hay sinopsis disponible.'

      try {
        const response = await axios.get('https://api.mymemory.translated.net/get', {
          params: {
            q: text,
            langpair: 'en|es',
          },
        })

        const data = response.data
        return data.responseData.translatedText || text
      } catch (error) {
        console.error('Error translating synopsis:', error)
        return text
      }
    }

    onMounted(() => {
      fetchAnimeData()
    })

    return {
      anime,
      characters,
      loading,
      loadingCharacters,
      error,
      fetchAnimeData,
      formatDate,
    }
  },
}
</script>

<style scoped>
.anime-detail-container {
  min-height: 100vh;
  background: var(--background-color);
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 2rem;
}

.error-content {
  text-align: center;
  max-width: 500px;
}

.error-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  color: var(--accent-color);
}

.error-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.error-message {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
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
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.anime-poster {
  position: relative;
}

.poster-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.score-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--primary-color);
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.score-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
}

.score-label {
  font-size: 0.75rem;
  opacity: 0.9;
}

.anime-info {
  color: white;
}

.anime-header {
  margin-bottom: 1.5rem;
}

.anime-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.anime-title-japanese {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
}

.anime-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.genre-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.anime-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

.content-section {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.synopsis-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.synopsis-text {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--text-secondary);
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.trailer-section {
  margin-bottom: 3rem;
}

.trailer-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.trailer-iframe {
  width: 100%;
  height: 400px;
}

.characters-section {
  margin-bottom: 3rem;
}

.loading-characters {
  display: flex;
  justify-content: center;
  padding: 3rem 0;
}

.no-characters {
  text-align: center;
  padding: 3rem 0;
}

.no-data-text {
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
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
    transform: translate(-50%, -50%) scale(1.05);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-in-out;
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

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .anime-title {
    font-size: 2rem;
  }

  .anime-stats {
    grid-template-columns: 1fr;
  }

  .characters-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .trailer-iframe {
    height: 250px;
  }
}
</style>
