<template>
  <div class="nav-categories-grid">
    <div class="nav-categories-main">
      <div class="categories">
        <li
          @click="clickMenu"
          v-for="category in categories"
          :key="category.id"
          @mouseover="handleCategory(category)"
          @touchstart="handleCategory(category)"
          :class="{ active: category.id == viewedCategoryID }"
        >
          <nuxt-link
            :to="{
              path: '/urunler',
              query: { category: category.id, category_name: category.name }
            }"
            replace
          >
            {{ category.name }}</nuxt-link
          >
        </li>
      </div>

      <div class="categories-sub">
        <li
          @click="clickMenu"
          v-for="categorySub in categoryChildren.slice(
            0,
            parseInt(categoryChildren.length / 2)
          )"
          :key="categorySub.id"
        >
          <nuxt-link
            :to="{
              path: '/urunler',
              query: {
                category: categorySub.id,
                category_name: viewedCategoryName,
                child_name: categorySub.name
              }
            }"
            :class="{ 'has-sub': categorySub.children }"
          >
            {{ categorySub.name }}</nuxt-link
          >

          <span
            @click="clickMenu"
            v-if="categorySub.children"
            class="categories-sub-sub"
          >
            <nuxt-link
              v-for="sub in categorySub.children"
              :key="sub.id + '-sub-link'"
              :to="{
                path: '/urunler',
                query: {
                  category: sub.id,
                  category_name: viewedCategoryName,
                  child_name: sub.name
                }
              }"
            >
              {{ sub.name }}</nuxt-link
            >
          </span>
        </li>
      </div>
      <div class="categories-sub">
        <li
          @click="clickMenu"
          v-for="categorySub in categoryChildren.slice(
            parseInt(categoryChildren.length / 2)
          )"
          :key="categorySub.id"
        >
          <nuxt-link
            :to="{
              path: '/urunler',
              query: {
                category: categorySub.id,
                category_name: viewedCategoryName,
                child_name: categorySub.name
              }
            }"
            :class="{ 'has-sub': categorySub.children }"
          >
            {{ categorySub.name }}</nuxt-link
          >

          <span
            @click="clickMenu"
            v-if="categorySub.children"
            class="categories-sub-sub"
          >
            <nuxt-link
              v-for="sub in categorySub.children"
              :key="sub.id + '-sub-link'"
              :to="{
                path: '/urunler',
                query: {
                  category: sub.id,
                  category_name: viewedCategoryName,
                  child_name: categorySub.name,
                  deep_name: sub.name
                }
              }"
            >
              {{ sub.name }}</nuxt-link
            >
          </span>
        </li>
      </div>
      <div v-if="viewedCategoryID" class="categories-image">
        <img :src="photo" alt="cctv, camera, kamera" />
      </div>
    </div>

    <!-- sub categories -->
    <div class="nav-categories-sub" v-if="loggedInUser">
      <li @click="clickMenu" v-for="subLink in opportunities" :key="subLink.id">
        <nuxt-link
          :to="{
            path:
              subLink.id == 'outlet'
                ? '/urunler/outlet'
                : `/urunler/?${subLink.id}=1`
          }"
        >
          {{ subLink.name }}</nuxt-link
        >
      </li>
    </div>
    <!-- sub categories -->
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('categories', ['categories']),
    ...mapGetters(['loggedInUser']),
    categoryChildren() {
      let child = this.categories.filter((i) => i.id == this.viewedCategoryID)
      if (child[0] && child[0].children) return child[0].children
      return []
    }
  },
  data() {
    return {
      photo: '',
      viewedCategoryID: null,
      viewedCategoryName: null,
      opportunities: [
        {
          name: 'Favori Ürünlerim',
          id: 'favorite'
        },
        {
          name: 'Outlet Ürünler',
          id: 'outlet'
        },
        {
          name: 'İndirimli Ürünler',
          id: 'discount'
        },
        {
          name: 'Kampanyalı Ürünler',
          id: 'campaign'
        },
        // {
        //   name: 'Stoktaki Ürünler',
        //   id: 'stock'
        // },
        {
          name: 'Alternatif Ürünler',
          id: 'alternative'
        },
        {
          name: 'Eko Ürünler',
          id: 'eco'
        },
        {
          name: 'Proje Ürünleri',
          id: 'project'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      getProductCategories: 'categories/getProductCategories'
    }),
    clickMenu() {
      this.$emit('closeMenu')
    },
    handleCategory(category) {
      try {
        this.photo = category.photo
        this.viewedCategoryID = category.id
        this.viewedCategoryName = category.name

        if (document)
          document.cookie = `category.child=${JSON.stringify(
            this.categoryChildren
          )}`
      } catch (error) {
        console.log(error)
      }
    },
    async getCategoriesProduct() {
      await this.getProductCategories()
      this.handleCategory(this.categories[0])
    }
  },
  created() {
    if (!this.categories.length) this.getCategoriesProduct()
    if (this.categories.length) this.handleCategory(this.categories[0])
  }
}
</script>

<style lang="scss" scoped>
@import './components/styles/Nav/nav-categories-grid.scss';
</style>
