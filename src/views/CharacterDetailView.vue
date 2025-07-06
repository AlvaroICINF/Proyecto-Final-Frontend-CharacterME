<template>
  <div class="character-detail-container">
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
          <button @click="fetchCharacterData" class="btn btn-primary">
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

    <div v-else-if="character" class="character-detail-content">
      <div class="container">
        <section class="hero-section">
          <div class="hero-background">
            <div class="hero-pattern"></div>
            <div class="hero-glow"></div>
          </div>

          <div class="hero-content">
            <div class="character-poster">
              <img
                :src="
                  character.images?.jpg?.image_url ||
                  'https://via.placeholder.com/350x500?text=No+Image'
                "
                :alt="character.name"
                class="poster-image"
              />
              <div class="favorites-badge" v-if="character.favorites">
                <span class="favorites-icon">♥</span>
                <span class="favorites-number">{{ character.favorites.toLocaleString() }}</span>
                <span class="favorites-label">Favoritos</span>
              </div>
            </div>

            <div class="character-info">
              <div class="character-header">
                <h1 class="character-title">{{ character.name }}</h1>
                <h2 v-if="character.name_kanji" class="character-name-kanji">
                  {{ character.name_kanji }}
                </h2>
              </div>

              <div
                v-if="character.nicknames && character.nicknames.length > 0"
                class="character-nicknames"
              >
                <h3 class="nicknames-title">Apodos:</h3>
                <div class="nicknames-list">
                  <span
                    v-for="(nickname, index) in character.nicknames"
                    :key="index"
                    class="nickname-badge"
                  >
                    {{ nickname }}
                  </span>
                </div>
              </div>

              <div class="character-about">
                <h3 class="about-title">Acerca de</h3>
                <div class="about-content" v-html="formatAbout(character.about)"></div>
              </div>
            </div>
          </div>
        </section>

        <section class="content-section">
          <div class="container">
            <div class="anime-appearances-section">
              <h3 class="section-title">Apariciones en Anime</h3>

              <div v-if="loadingAnimes" class="loading-animes">
                <LoadingSpinner />
              </div>

              <div v-else-if="animes.length === 0" class="no-animes">
                <p class="no-data-text">No hay apariciones en anime disponibles</p>
              </div>

              <div v-else class="anime-appearances-grid">
                <div
                  v-for="anime in animes"
                  :key="anime.anime.mal_id"
                  class="anime-appearance-card fade-in"
                >
                  <div class="anime-poster-container">
                    <img
                      :src="
                        anime.anime.images?.jpg?.image_url ||
                        'https://via.placeholder.com/225x318?text=No+Image'
                      "
                      :alt="anime.anime.title"
                      class="anime-poster-image"
                    />
                    <div class="role-badge">
                      {{ anime.role }}
                    </div>
                  </div>
                  <div class="anime-info-container">
                    <h4 class="anime-title">{{ anime.anime.title }}</h4>
                    <router-link
                      :to="{ name: 'AnimeDetail', params: { id: anime.anime.mal_id } }"
                      class="btn btn-primary anime-link"
                    >
                      Ver anime
                    </router-link>
                  </div>
                </div>
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

export default {
  name: 'CharacterDetailView',
  components: {
    LoadingSpinner,
  },
  setup() {
    const route = useRoute()
    const character = ref(null)
    const animes = ref([])
    const loading = ref(true)
    const loadingAnimes = ref(true)
    const error = ref(null)

    const fetchCharacterData = async () => {
      loading.value = true
      error.value = null

      try {
        const characterId = route.params.id
        const response = await axios.get(`https://api.jikan.moe/v4/characters/${characterId}/full`)
        character.value = response.data.data
        animes.value = response.data.data.anime || []
        loadingAnimes.value = false
      } catch (err) {
        console.error('Error fetching character data:', err)
        error.value = 'Error al cargar los datos del personaje. Por favor, inténtalo de nuevo.'
        loadingAnimes.value = false
      } finally {
        loading.value = false
      }
    }

    const formatAbout = (text) => {
      if (!text) return 'No hay información disponible.'
      return text.replace(/\n/g, '<br>')
    }

    onMounted(() => {
      fetchCharacterData()
    })

    return {
      character,
      animes,
      loading,
      loadingAnimes,
      error,
      fetchCharacterData,
      formatAbout,
    }
  },
}
</script>

<style scoped>
.character-detail-container {
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

.character-poster {
  position: relative;
}

.poster-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.favorites-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--accent-color);
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.favorites-icon {
  display: block;
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.favorites-number {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
}

.favorites-label {
  font-size: 0.75rem;
  opacity: 0.9;
}

.character-info {
  color: white;
}

.character-header {
  margin-bottom: 1.5rem;
}

.character-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.character-name-kanji {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
}

.character-nicknames {
  margin-bottom: 2rem;
}

.nicknames-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
}

.nicknames-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.nickname-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.character-about {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.about-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
}

.about-content {
  font-size: 1.125rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
}

.about-content :deep(br) {
  margin-bottom: 0.75rem;
}

.content-section {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.anime-appearances-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 2rem;
}

.loading-animes {
  display: flex;
  justify-content: center;
  padding: 3rem 0;
}

.no-animes {
  text-align: center;
  padding: 3rem 0;
}

.no-data-text {
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.anime-appearances-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.anime-appearance-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.anime-appearance-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.anime-poster-container {
  position: relative;
  overflow: hidden;
}

.anime-poster-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.anime-appearance-card:hover .anime-poster-image {
  transform: scale(1.05);
}

.role-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.anime-info-container {
  padding: 1.5rem;
}

.anime-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.anime-link {
  width: 100%;
  text-align: center;
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

  .character-title {
    font-size: 2rem;
  }

  .anime-appearances-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .anime-poster-image {
    height: 250px;
  }
}
</style>
