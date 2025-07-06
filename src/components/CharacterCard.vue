<template>
  <div class="card">
    <div class="card-image-container">
      <img
        :src="
          character.images?.jpg?.image_url || 'https://via.placeholder.com/225x318?text=No+Image'
        "
        :alt="character.name"
        class="card-image"
        loading="lazy"
      />
      <div class="card-overlay">
        <div v-if="character.favorites" class="favorites-badge">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="heart-icon"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd"
            />
          </svg>
          {{ character.favorites.toLocaleString() }}
        </div>
      </div>
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ character.name }}</h3>
      <p v-if="character.name_kanji" class="card-subtitle">
        {{ character.name_kanji }}
      </p>
      <div v-if="character.nicknames && character.nicknames.length > 0" class="nicknames-container">
        <span class="nicknames-label">También conocido como:</span>
        <div class="nicknames-list">
          <span
            v-for="(nickname, index) in character.nicknames.slice(0, 2)"
            :key="index"
            class="nickname-tag"
          >
            {{ nickname }}
          </span>
          <span v-if="character.nicknames.length > 2" class="nickname-more">
            +{{ character.nicknames.length - 2 }} más
          </span>
        </div>
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Personaje
        </div>
        <div v-if="character.anime" class="card-stat">
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
          {{ character.anime.length }} anime
        </div>
      </div>
      <router-link
        :to="{ name: 'CharacterDetail', params: { id: character.mal_id } }"
        class="card-button"
      >
        Ver detalles
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: {
    character: {
      type: Object,
      required: true,
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

.favorites-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(52, 73, 94, 0.9);
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

.heart-icon {
  width: 1rem;
  height: 1rem;
  color: #ef4444;
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

.card-subtitle {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin: 0 0 0.75rem 0;
  font-style: italic;
}

.nicknames-container {
  margin-bottom: 0.75rem;
}

.nicknames-label {
  font-size: 0.625rem;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.375rem;
  font-weight: 500;
}

.nicknames-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.nickname-tag {
  font-size: 0.625rem;
  background: var(--background-color);
  color: var(--text-secondary);
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-weight: 500;
  border: 1px solid var(--border-color);
}

.nickname-more {
  font-size: 0.625rem;
  color: var(--text-muted);
  font-style: italic;
  align-self: center;
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

  .favorites-badge {
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.375rem 0.5rem;
    font-size: 0.75rem;
  }
}
</style>
