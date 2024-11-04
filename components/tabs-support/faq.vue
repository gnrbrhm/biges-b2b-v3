<template>
  <div class="tabcontent supports support-FAQ">
    <div class="about-header">
      <!-- <h5 class="h-20">Hakkında</h5>
      <p class="h-16">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        doloremque maxime veritatis, corporis officiis ipsam impedit unde
        consequuntur blanditiis sint.
      </p> -->
    </div>
    <div class="support-FAQ__tab-grid mt-5">
      <div
        v-for="item in tabs"
        :key="item.id + '-FAQ'"
        class="support-FAQ__tab-grid__tab"
        :class="{ active: currentTab == item.id }"
        @click="changeTab(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="support-FAQ__tab-content">
      <accordion :id="'FAQ'" :list="docs" />
    </div>
  </div>
</template>

<script>
import Accordion from '@/components/Accordion.vue'

export default {
  name: 'TabFAQ',
  components: {
    Accordion
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    docs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentTab: this.categories[0]?.id || 1,
      tabs: this.categories,
      FAQ: this.docs
    }
  },
  methods: {
    changeTab(item) {
      this.currentTab = item.id
    }
  }
}
</script>
