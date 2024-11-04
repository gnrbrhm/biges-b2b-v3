<template>
  <TabMenu
    :isLoading="isLoading"
    title="Favorilerim"
    height="80px"
    :tab="tab"
    :isTab="false"
  >
    <div class="order-content">
      <div class="mt-35 mb-35 ml-25 mr-25">
        <template v-if="tableData.length">
          <template v-for="(fav, index) in tableData">
            <ProfileFavoriteCard
              :key="fav + '-' + index"
              :fav="fav"
            ></ProfileFavoriteCard>
          </template>
        </template>
      </div>
    </div>
  </TabMenu>
</template>

<script>
import TabMenu from '@/components/views/ForYou/TabMenu'
import ProfileFavoriteCard from '@/components/views/ForYou/ProfileFavoriteCard'
import { mapActions } from 'vuex'

export default {
  name: 'ContentFavorite',
  components: { TabMenu, ProfileFavoriteCard },
  props: {
    tab: { type: Number, default: 0 }
  },
  data() {
    return {
      table: {
        headers: ['', ''],
        rows: []
      }
    }
  },
  computed: {
    tableData() {
      return this.table.rows.map(row => {
        return {
          ...row
          // stock_code: row.stock_code,
          // summary: row.summary,
          // photo: row?.photos?.[0]?.photo || '',
          // prices: {
          //   bank_transfer: row?.prices?.[0].bank_transfer || '',
          //   end_user: row?.prices?.[0].end_user || ''
          // }
        }
      })
    }
  },
  methods: {
    ...mapActions({
      fetchFavoriteProduct: 'foryou/fetchFavoriteProduct'
    }),
    async getFavoriteProduct() {
      this.isLoading = true
      if (Object.keys(this.fetchFavoriteProduct).length) return
      await this.fetchFavoriteProduct().then(response => {
        this.table.rows = response
        this.isLoading = false
      })
    }
  },
  created() {
    this.getFavoriteProduct()
  }
}
</script>

<style lang="scss" scoped>
.order-content {
  min-height: 600px;
}
</style>
