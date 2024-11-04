<template>
  <TabMenu
    :tab="tab"
    :title="title"
    :items="items"
    :is-loading="isLoading"
    @onTab="$emit('handleTab', $event)"
  >
    <div class="order-content">
      <template v-if="tab == 0">
        <div class="mt-10 mb-35 ml-25 mr-25">
          <OrderTable
            :warn-text="warnText"
            :data="table"
            @dateHandle="dateHandle($event)"
            @orderHandle="orderHandle($event)"
            @rowHandle="rowClick($event)"
          >
          </OrderTable>
          <div class="mt-20">
            <BCPuanPagination
              :options="{ total: paginationLength, per: 20 }"
              @onChange="handlePagination"
            ></BCPuanPagination>
          </div>
        </div>
      </template>
      <template v-if="tab == 1">
        <div class="mt-10 mb-35 ml-25 mr-25">
          <InvoiceTable
            :warn-text="warnText"
            :data="table1"
            @dateHandle="dateHandle($event)"
            @orderHandle="orderHandle($event)"
            @rowHandle="rowClick($event)"
          >
          </InvoiceTable>
          <div class="mt-20">
            <BCPuanPagination
              :options="{ total: paginationLength, per: 20 }"
              @onChange="handlePagination"
            ></BCPuanPagination>
          </div>
        </div>
      </template>
    </div>

    <ModalSpecial
      v-if="showPDF"
      :is-active="{ showPDF }"
      :close-button="true"
      :width="'1000px'"
      :height="'800px'"
      @close="handleModalClose"
    >
      <client-only>
        <!-- <embed :src="{ selectedInvoicePDF }" width="100%" height="600px" /> -->
        <iframe
          :src="selectedInvoicePdfURL"
          width="100%"
          height="750px"
        ></iframe>
      </client-only>
    </ModalSpecial>
  </TabMenu>
</template>

<script>
//v-loading="{ loading: data.rows.length }"q
import TabMenu from '@/components/views/ForYou/TabMenu'
import OrderTable from '@/components/views/ForYou/OrderTable'
import InvoiceTable from '@/components/views/ForYou/InvoiceTable'
import ModalSpecial from '@/components/common/ModalSpecial'
import { mapActions, mapGetters } from 'vuex'
import BCPuanPagination from '@/components/views/ForYou/BCPuanPagination'
import { dateFormat } from '@/utils/date'
export default {
  name: 'ContentOrder',
  components: {
    TabMenu,
    OrderTable,
    BCPuanPagination,
    InvoiceTable,
    ModalSpecial
  },
  props: {
    tab: { type: Number, default: 0 }
  },
  data() {
    return {
      dateStart: null,
      dateEnd: null,
      paginationLength: 0,
      warnText: '',
      isLoading: false,
      selectedInvoicePDF: null,
      selectedInvoicePdfURL: null,
      showPDF: false,
      items: [{ text: 'Siparişler' }, { text: 'Faturalar' }],
      title: 'Siparişler ',
      table: {
        headers: ['Sipariş Tarihi', 'Sipariş No', 'Sipariş Durumu', ''],
        rows: [
          // ['01.09.2030', '#3232', 'fff', 'accept', '> Detay'],
          // ['01.09.2030', '#3232', 'fff', 'cancel', '> Detay'],
          // ['01.09.2030', '#3232', 'fff', 'cancel', '> Detay'],
          // ['01.09.2030', '#3232', 'fff', 'cancel', '> Detay'],
          // ['01.09.2030', '#3232', 'ss', 'cancel', '> Detay']
        ]
      },
      table1: {
        headers: [
          'Döküman No',
          'E-Fatura No',
          'Para Birimi',
          'Toplam Tutar',
          'Tarih',
          'Fatura Görüntüle'
        ],
        rows: [
          // ['01.09.2030', '#3232', 'fff', 'accept', '> Detay'],
          // ['01.09.2030', '#3232', 'fff', 'cancel', '> Detay'],
          // ['01.09.2030', '#3232', 'fff', 'cancel', '> Detay'],
          // ['01.09.2030', '#3232', 'fff', 'cancel', '> Detay'],
          // ['01.09.2030', '#3232', 'ss', 'cancel', '> Detay']
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      getOrderHistory: 'foryou/getOrderHistory',
      getInvoiceHistory: 'foryou/getInvoiceHistory'
    })
  },
  methods: {
    ...mapActions({
      fetchOrderHistory: 'foryou/fetchOrderHistory',
      fetchInvoiceHistory: 'foryou/fetchInvoiceHistory',
      fetchInvoiceHistoryWithId: 'foryou/fetchInvoiceHistoryWithId'
    }),

    createPdfUrl(base64) {
      // Base64 verisini Blob'a çevirir ve URL oluşturur
      const byteCharacters = atob(base64)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: 'application/pdf' })
      return URL.createObjectURL(blob)
    },
    handlePagination(index) {
      let pagData = (this.tab == 0
        ? [...this.table.data]
        : [...this.table1.data]
      ).splice((index - 1) * 20, 20)
      this.paginationLength =
        this.tab == 0 ? this.table.data.length : this.table1.data.length
      if (this.tab == 0) this.table.rows = pagData
      else if (this.tab == 1) this.table1.rows = pagData

      this.warnText = this.table.rows.length
        ? ''
        : 'Seçili tarih aralığında kayıt bulunamadı.'

      if (window && index != 1) {
        this.$nextTick(() => {
          window.scrollTo(0, 300)
        })
      }
    },
    dateHandle(value) {
      if (value.start_date && value.end_date) {
        this.isLoading = true
        this.dateStart = value.start_date
        this.dateEnd = value.end_date
        if (this.tab == 0) this.getOrderHistories(this.dateStart, this.dateEnd)
        else if (this.tab == 1)
          this.getInvoiceHistories(this.dateStart, this.dateEnd)
      }
    },
    handleModalClose() {
      this.showPDF = false
    },
    orderHandle(value) {
      let filteredData = this.getOrderHistory.filter(item =>
        item?.document_id?.includes(value?.toString()?.toUpperCase())
      )
      this.table.data = filteredData.map(item => {
        return [
          item.date ? item.date.split(' ')[0] : '',
          item.document_id.length ? item.document_id : '',
          // item.confirmed ? 'accept' : 'cancel',
          this.getStatus(item.status),
          '> Detay'
        ]
      })
      this.handlePagination(1)
    },
    async rowClick(item) {
      console.log('Item', item)
      if (this.tab === 0) {
        let findClicked = this.getOrderHistory.filter(
          val => val.document_id == item[1]
        )

        this.$router.push({
          path: `size-ozel/siparis/${findClicked?.[0]?.['document_id']}`,
          query: {
            startDate: this.dateStart,
            endDate: this.dateEnd
          }
        })
      } else if (this.tab == 1) {
        this.isLoading = true
        // const result = await this.fetchInvoiceHistoryWithId(item[0])
        this.$router.push({
          path: `size-ozel/fatura/${item[0]}`,
          query: {
            startDate: this.dateStart,
            endDate: this.dateEnd,
            invoice_no: item[1]
          }
        })
        // this.selectedInvoicePdfURL = this.createPdfUrl(result.pdfbase64)
        // this.isLoading = false
        // this.showPDF = true
      }
    },
    async getOrderHistories(start, end) {
      if (Object.keys(this.fetchOrderHistory).length) return
      this.warnText = ''
      await this.fetchOrderHistory({
        start_date: dateFormat(start),
        end_date: dateFormat(end)
      })
      console.log('Test Data', this.table)
      this.table.data = this.getOrderHistory.map(item => {
        return [
          item.date ? item.date.split(' ')[0] : '',
          item.document_id.length ? item.document_id : '',
          this.getStatus(item.status),
          '> Detay'
        ]
      })
      this.isLoading = false
      this.handlePagination(1)

      this.warnText = this.table.rows.length
        ? ''
        : 'Seçili tarih aralığında kayıt bulunamadı.'
    },

    async getInvoiceHistories(start, end) {
      await this.fetchInvoiceHistory({
        start_date: dateFormat(start),
        end_date: dateFormat(end)
      })
      console.log('Test Data', this.table1)

      this.table1.data = Object.values(this.getInvoiceHistory).map(item => {
        return [
          item.document_type_number,
          item.invoice_no,
          item.currency,
          item.total_price,
          item.document_date ? item.document_date.split(' ')[0] : '',
          'Görüntüle >'
        ]
      })
      this.warnText = this.table1.rows.length
        ? ''
        : 'Seçili tarih aralığında kayıt bulunamadı.'

      this.isLoading = false
      this.handlePagination(1)
    },

    getStatus(status) {
      let text = ''
      switch (status) {
        case '0':
          text = 'pending'
          break
        case '1':
          text = 'approved'
          break
        case '2':
          text = 'canceled'
          break
        case '3':
          text = 'cargo'
          break
        case '4':
          text = 'delivered'
          break
        default:
          text = ''
          break
      }

      return text
    }
  }
}
</script>

<style lang="scss" scoped>
.order-content {
  min-height: 600px;
}
</style>
