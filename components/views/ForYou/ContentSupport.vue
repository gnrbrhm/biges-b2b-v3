<template>
  <TabMenu
    @onTab="$emit('handleTab', $event)"
    :title="title"
    :items="items"
    :height="tabHeight"
    :isTab="isTab"
    :isBack="isBack"
    @onBack="handleBack"
    :tab="tab"
  >
    <div class="support-content mt-30">
      <template v-if="tab == 0">
        <div
          :class="
            getLayout == 'mobile'
              ? 'flex col width-100 ml-10'
              : 'flex col width-100 ml-25'
          "
        >
          <div class="search mb-25">
            <SearchInput placeholder="Ara" @search="handleSearch"></SearchInput>
          </div>
          <div v-if="isSelected" class="pr-30 pb-10 width-100">
            <section>
              <table :isLoading="isLoading" class="table width-100">
                <thead>
                  <tr>
                    <th>Belge Adı</th>
                    <th>Bağlantı</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="!filteredResults.length">
                    <td><p class="h-16">Makale veya doküman bulunamadı.</p></td>
                    <td></td>
                  </tr>
                  <tr v-for="doc in filteredResults" :key="doc.id + '-doc-li'">
                    <td>
                      {{ doc.title }}
                    </td>
                    <td>
                      <a :href="doc.ftp_url || '#'" :title="doc.title">
                        İndir
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <BCPuanPagination
                v-if="filteredResults.length"
                :options="{ total: documents.count, per: 27 }"
                @onChange="handleChangePage"
              ></BCPuanPagination>
            </section>
          </div>
          <div v-else class="flex --wrap">
            <SupportCard
              v-for="(item, index) in filteredCategories"
              :key="item + '-' + index"
              :item="item"
              @onClick="handleCategory"
            ></SupportCard>
          </div>
        </div>
      </template>
    </div>
  </TabMenu>
</template>

<script>
import endpoints from '@/api/endpoints'
import BCPuanPagination from '@/components/views/ForYou/BCPuanPagination'

import TabMenu from '@/components/views/ForYou/TabMenu'
import Table from '@/components/views/ForYou/Table'
import SupportCard from '@/components/views/ForYou/SupportCard'
import SearchInput from '@/components/common/SearchInput'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ContentSupport',
  components: { TabMenu, Table, SearchInput, SupportCard, BCPuanPagination },
  props: {
    tab: { type: Number, default: 0 }
  },
  data() {
    return {
      isSelected: false,
      isLoading: false,
      title: 'Destek',
      items: [{ text: 'DOKÜMANLAR' }],
      documentCatagories: [],
      search: '',
      documents: {},
      list: [],
      currentCategoryId: 0,
      isTab: true,
      isBack: false,
      tabHeight: '110px'
    }
  },
  computed: {
    ...mapGetters(['getLayout']),
    filteredResults() {
      if (!this.search || this.search == '') return this.list
      return this.list.filter((i) => {
        return i.title
          .toLocaleLowerCase()
          .includes(this.search.toLocaleLowerCase())
      })
    },
    filteredCategories() {
      if (!this.search || this.search == '') return this.documentCatagories
      return this.documentCatagories.filter((i) => {
        return i.name
          .toLocaleLowerCase()
          .includes(this.search.toLocaleLowerCase())
      })
    }
  },
  methods: {
    ...mapActions({
      fetchSupportCategory: 'foryou/fetchSupportCategory'
    }),
    handleSearch(text) {
      this.search = text ? text : ''
    },
    handleChangePage(index) {
      this.fetchData(this.currentCategoryId, index)
    },
    async fetchData(id, page) {
      this.isLoading = true
      try {
        const documents = await this.$axios({
          ...endpoints.support.document,
          url: endpoints.support.document.url(),
          params: {
            category: id,
            page: page || 1
          }
        })

        this.documents = documents.data || {}
        this.list = documents.data.results || []
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
    },
    handleBack() {
      this.isTab = true
      this.isBack = false
      this.tabHeight = '110px'
      this.title = 'Destek'
      this.isSelected = false
    },
    handleCategory(cat) {
      this.isTab = false
      this.isBack = true
      this.tabHeight = '91px'
      this.title = cat.name
      this.currentCategoryId = cat.id
      this.fetchData(cat.id, 1)
      this.isSelected = true
    },
    async getSupportCategory() {
      this.isLoading = true
      if (Object.keys(this.fetchSupportCategory).length) return
      await this.fetchSupportCategory().then((resp) => {
        this.documentCatagories = resp
      })
      this.isLoading = false
    }
  },
  created() {
    this.getSupportCategory()
  }
}
</script>

<style lang="scss" scoped>
.notify-card {
  background: rgba(31, 31, 31, 0.05);
}
.support-content {
  min-height: 600px;

  .search {
    width: 200px;
    height: 40px;

    background: rgba(31, 31, 31, 0.05);
    border-radius: 3px;
  }
}
</style>