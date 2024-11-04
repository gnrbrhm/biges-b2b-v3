<template>
  <div v-if="pages">
    <nav
      class="pagination"
      :class="{ 'is-small': isSmall }"
      role="navigation"
      aria-label="pagination"
    >
      <button
        @click="setPage(active - 1)"
        :disabled="active == 1"
        class="pagination-previous"
      >
        <app-icon name="Left" />
      </button>
      <ul class="pagination-list">
        <li>
          <a
            v-show="active > moreCount"
            @click="setPage(1)"
            :aria-label="`İlk sayfaya git`"
            class="pagination-link"
            >...</a
          >
        </li>

        <li
          v-show="page > active - moreCount && page < active + moreCount"
          v-for="page in pages"
          :key="page + '-pagination-item'"
        >
          <a
            @click="setPage(page)"
            :class="{ active: page == active }"
            :aria-label="`Sayfa ${page}'e git`"
            class="pagination-link"
            >{{ page }}</a
          >
        </li>
        <li>
          <a
            v-show="active < pages - (moreCount - 1)"
            @click="setPage(pages)"
            :aria-label="`Son sayfaya git`"
            class="pagination-link"
            >...</a
          >
        </li>
      </ul>
      <button
        @click="setPage(active + 1)"
        :disabled="active == pages"
        class="pagination-next"
      >
        <app-icon name="Right" />
      </button>
    </nav>
  </div>
</template>

<script>
import Icon from '@/components/icons'
export default {
  components: {
    appIcon: Icon
  },
  props: {
    options: {
      type: Object,
      default: () => ({
        total: 200,
        per: 20
      })
    },
    isSmall: { type: Boolean, default: true }
  },
  computed: {
    pages() {
      return Math.ceil(this.options.total / this.options.per)
    }
  },
  data() {
    return {
      moreCount: 3,
      active: 1
    }
  },
  methods: {
    setPage(page) {
      this.active = page
      setTimeout(() => this.$emit('onChange', this.active), 1)
    }
  }
}
</script>

<style lang="scss">
@import './components/styles/Pagination/pagination.scss';
</style>
