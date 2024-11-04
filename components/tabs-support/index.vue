<template>
  <div class="support-tabs">
    <div class="container">
      <div class="tabs-s">
        <ul>
          <li
            v-for="(item, key) in tabs"
            v-show="item.isShow"
            :key="key + '-tabs-item'"
            :class="[currentTab == key ? 'active' : '']"
            @click="handleClickTab(item, key)"
          >
            <a>{{ item.title }}</a>
          </li>
        </ul>
      </div>
      <div class="support-tabs-content" id="support">
        <!-- <component
          :is="tabs[currentTab].component"
          v-if="currentTab == 6 ? isAuthenticated : true"
          :list="dummyFAQ.results"
        /> -->

        <component
          :is="tabs[currentTab].component"
          v-if="tabs[currentTab].isShow"
          :docs="dataFromFetch"
          :product="tabs[currentTab].product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import endpoints from '@/api/endpoints'
import Documents from './documents'
import Softwares from './softwares'
import General from './general'
import Support from './support'
import Features from './features'

export default {
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  data: () => {
    return {
      currentTab: 1,
      dataFromFetch: [],
      tabs: {
        1: {
          title: 'GENEL BAKIŞ',
          isShow: false,
          code: 'general',
          component: General,
          product: null
        },
        2: {
          title: 'TEKNİK ÖZELLİKLER',
          isShow: false,
          code: 'features',
          component: Features,
          product: null
        },
        3: {
          title: 'DOKÜMANLAR',
          isShow: false,
          component: Documents,
          fetch: self => self.fetchData('document')
        },
        4: {
          title: 'YAZILIMLAR',
          isShow: false,
          component: Softwares,
          fetch: self => self.fetchData('software')
        },
        5: {
          title: 'TEKNİK DESTEK',
          isShow: true,
          component: Support
        }
      }
    }
  },
  methods: {
    handleClickTab(item, key) {
      this.dataFromFetch.length = 0
      this.currentTab = key
      if (item.fetch) item.fetch(this)
    },
    async fetchData(api) {
      try {
        let resp = await this.$axios({
          ...endpoints.support[api],
          url: endpoints.support[api].url(),
          params: {
            stock_code: this.$route.params.id
          }
        })

        this.dataFromFetch = resp?.data?.results || []
        return resp
      } catch (error) {}
    }
  },
  created() {
    this.handleClickTab({}, 5)
    for (const tabIndex of Object.keys(this.tabs)) {
      if (this.tabs[tabIndex].fetch) {
        this.tabs[tabIndex].fetch(this).then(res => {
          if (res.data.count > 0) this.tabs[tabIndex].isShow = true
        })
      } else if (tabIndex == 1 && this.product?.info_description) {
        this.tabs[tabIndex].isShow = true
        this.tabs[tabIndex].product = this.product
      } else if (tabIndex == 2 && this.product?.technical_features) {
        this.tabs[tabIndex].isShow = true
        this.tabs[tabIndex].product = this.product
      }
    }
  }
}
</script>

<style lang="scss">
@import './components/styles/Tabs/support-tabs.scss';
</style>
