<template>
  <div class="pagination">
    <button
      @click="$emit('page-change', currentPage - 1)"
      :disabled="currentPage <= 1"
      class="page-btn prev-btn"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="btn-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Anterior
    </button>

    <div class="page-numbers">
      <button
        v-for="page in displayedPages"
        :key="page"
        @click="$emit('page-change', page)"
        :class="['page-btn', currentPage === page ? 'active' : '']"
      >
        {{ page }}
      </button>
    </div>

    <button
      @click="$emit('page-change', currentPage + 1)"
      :disabled="currentPage >= totalPages"
      class="page-btn next-btn"
    >
      Siguiente
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="btn-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  computed: {
    displayedPages() {
      const pages = []
      const maxPagesToShow = 5

      let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2))
      let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1)

      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1)
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      return pages
    },
  },
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 1rem 0;
  flex-wrap: wrap;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-btn {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  background: var(--surface-color);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-primary);
}

.page-btn:hover:not(:disabled) {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.page-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.prev-btn,
.next-btn {
  padding: 0.75rem 1.25rem;
  font-weight: 600;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

@media (max-width: 768px) {
  .pagination {
    gap: 0.25rem;
  }

  .page-numbers {
    gap: 0.125rem;
  }

  .page-btn {
    padding: 0.625rem 0.875rem;
    min-width: 40px;
    font-size: 0.875rem;
  }

  .prev-btn,
  .next-btn {
    padding: 0.625rem 1rem;
  }

  .btn-icon {
    width: 1rem;
    height: 1rem;
  }
}

@media (max-width: 480px) {
  .pagination {
    flex-direction: column;
    gap: 1rem;
  }

  .page-numbers {
    order: 2;
  }

  .prev-btn {
    order: 1;
  }

  .next-btn {
    order: 3;
  }
}
</style>
