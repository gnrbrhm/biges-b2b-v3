<template>
    <div class="opportunities-wrapper">
      <div class="container">
        <div class="opportunities">
          <h1 class="opportunities-title">Biges'in Fırsatlar Dünyası</h1>
          <ul>
            <li v-for="(category, key) in Object.keys(categories)" :key="key">
              <nuxt-link :to="categories[category].route" :class="key">
                <app-icon :name="categories[category].icon" stroke-color="transparent" />
                <span>{{ categories[category].label }}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import Icon from './Icon.vue'
  
  // Components
  const components = {
    appIcon: Icon
  }
  
  // State
  const categories = reactive({
    discount: {
      label: 'İndirimli Ürünler',
      icon: 'discount-lg',
      route: { name: 'urunler', query: { discount: 1 } }
    },
    campaign: {
      label: 'Kampanyalı Ürünler',
      icon: 'advertisement-lg',
      route: { name: 'urunler', query: { campaign: 1 } }
    },
    alternative: {
      label: 'Alternatif Ürünler',
      icon: 'shuffle-lg',
      route: { name: 'urunler', query: { alternative: 1 } }
    },
    outlet: {
      label: 'Outlet Ürünler',
      icon: 'warehouse-lg',
      route: { name: 'urunler-outlet' }
    },
    echo: {
      label: 'Eko Ürünler',
      icon: 'downloads-lg',
      route: { name: 'urunler', query: { eco: 1 } }
    },
    project: {
      label: 'Proje Ürünleri',
      icon: 'project-lg',
      route: { name: 'urunler', query: { project: 1 } }
    }
  })
  </script>
  
  <style scoped lang="scss">
  @import './components/styles/Opportunities/opportunities.scss';
  </style>
  