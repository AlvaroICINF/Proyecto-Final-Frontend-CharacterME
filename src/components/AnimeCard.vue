<template>
  <div class="card">
    <div class="card-image-container">
      <img
        :src="anime.images?.jpg?.image_url || 'https://via.placeholder.com/225x318?text=No+Image'"
        :alt="anime.title"
        class="card-image"
        loading="lazy"
      />
      <div class="card-overlay">
        <div class="score-badge">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="star-icon"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          {{ anime.score ? anime.score.toFixed(1) : 'N/A' }}
        </div>
      </div>
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ anime.title }}</h3>
      <p v-if="anime.aired" class="card-date">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="date-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {{ formatDate(anime.aired.from) }}
      </p>
      <div class="genre-tags">
        <span v-for="(genre, index) in anime.genres?.slice(0, 3)" :key="index" class="genre-tag">
          {{ genre.name }}
        </span>
      </div>
      <div class="card-stats">
        <div class="card-stat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stat-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ anime.episodes || '?' }} eps
        </div>
        <div class="card-stat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stat-icon"
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
          {{ anime.type || 'TV' }}
        </div>
      </div>
      <router-link :to="{ name: 'AnimeDetail', params: { id: anime.mal_id } }" class="card-button">
        Ver detalles
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnimeCard',
  props: {
    anime: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return 'Fecha desconocida'
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short' })
    },
  },
}
</script>

<style scoped>
.card {
  background: var(--surface-color);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.card-image-container {
  position: relative;
  padding-bottom: 140%;
  overflow: hidden;
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .card-image {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0) 70%,
    rgba(0, 0, 0, 0.7) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
}

.card:hover .card-overlay {
  opacity: 1;
}

.score-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  backdrop-filter: blur(10px);
}

.star-icon {
  width: 1rem;
  height: 1rem;
  color: #fbbf24;
}

.card-content {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-weight: 700;
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-date {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin: 0 0 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.date-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.genre-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
}

.genre-tag {
  font-size: 0.625rem;
  background: var(--background-color);
  color: var(--text-secondary);
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-weight: 500;
  border: 1px solid var(--border-color);
}

.card-stats {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.card-stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.stat-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.card-button {
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  text-align: center;
  transition: all 0.3s ease;
  margin-top: auto;
}

.card-button:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

@media (max-width: 768px) {
  .card-content {
    padding: 1rem;
  }

  .card-overlay {
    padding: 0.75rem;
  }

  .score-badge {
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.375rem 0.5rem;
    font-size: 0.75rem;
  }
}
</style>
