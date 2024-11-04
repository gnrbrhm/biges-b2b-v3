<template>
  <div class="nav-categories-grid">
    <div class="nav-categories-main">
      <div class="categories">
        <li class="solution-nav-title">#Çözümler Kategori</li>
        <li
          @click="clickMenu"
          v-for="category in solutionCategories"
          :key="category.name"
          @mouseover="handleCategory(category)"
          @touchstart="handleCategory(category)"
          :class="{ active: category.name == viewedCategoryID }"
        >
          <nuxt-link to="/cozumler" replace> {{ category.name }}</nuxt-link>
        </li>
      </div>
      <div class="flex col pl-60">
        <div class="h-16 font-500 pt-40 pb-15">{{ viewedCategoryID }}</div>
        <div class="solution-sub">
          <div
            @click="clickMenu"
            v-for="categorySub in categoryChildren.slice(0, 5)"
            :key="categorySub.title"
          >
            <BasicCard
              @handleClick="$router.push('/cozumler/' + categorySub.page_url)"
              :title="categorySub.title"
              :imgUrl="categorySub.small_showcase_image"
            ></BasicCard>
          </div>
        </div>
      </div>
    </div>

    <!-- sub categories -->
    <div class="flex row-reverse pr-120 pb-40 pt-18">
      <div class="h-16 font-500 clickable" @click="$router.push('/cozumler')">
        Çözümlere Git
        <Icon name="right-arrow" class="ml-10" icon-color="transparent"></Icon>
      </div>
    </div>
    <!-- sub categories -->
  </div>
</template>

<script>
import BasicCard from '@/components/cards/BasicCard'
import Icon from '@/components/Icon'
import { mapActions, mapState } from 'vuex'

export default {
  components: { BasicCard, Icon },
  computed: {
    ...mapState('categories', ['solutionCategories']),
    categoryChildren() {
      let child = this.solutionCategories.filter(
        (i) => i.name == this.viewedCategoryID
      )
      if (child[0] && child[0].solutions) return child[0].solutions
      return []
    }
  },
  data() {
    return {
      viewedCategoryID: null,
      viewedCategoryName: null
    }
  },
  methods: {
    ...mapActions({
      getSolutionCategories: 'categories/getSolutionCategories'
    }),
    clickMenu() {
      this.$emit('closeMenu')
    },
    handleCategory(category) {
      this.viewedCategoryID = category.name
      this.viewedCategoryName = category.name

      if (document)
        document.cookie = `category.child=${JSON.stringify(
          this.categoryChildren
        )}`
    },
    async getCategoriesSolution() {
      await this.getSolutionCategories()
      this.handleCategory(this.solutionCategories[0])
    }
  },
  created() {
    if (!this.solutionCategories.length) this.getCategoriesSolution()
    if (this.solutionCategories.length)
      this.handleCategory(this.solutionCategories[0])
  }
}
</script>

<style lang="scss" scoped>
@import './components/styles/Nav/nav-categories-grid.scss';
.solution-nav-title {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  color: #0d2f81;
}
</style>
