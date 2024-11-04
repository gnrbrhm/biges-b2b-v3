<template>
  <div>
    <div v-if="isDetail">
      <div class="back flex row ml-10">
        <div class="clickable" @click="goBack(tab)">
          <Icon
            name="left-arrow"
            icon-color="transparent"
            strokeColor="rgba(13, 47, 129, 0.7)"
            height="12"
            width="13"
          ></Icon>
        </div>
        <div @click="goBack" class="ml-5">Geri Dön</div>
      </div>
      <ServiceDetail
        v-if="getServiceProductDetail"
        :detail="getServiceProductDetail"
      ></ServiceDetail>
      <ServiceOfferDetail
        v-if="getServiceOfferDetail"
        :detail="getServiceOfferDetail"
      ></ServiceOfferDetail>
    </div>
    <div v-else>
      <TabMenu
        @onTab="$emit('handleTab', $event)"
        :tab="tab"
        :title="title"
        :items="items"
        :isLoading="isLoading"
      >
        <div class="service-content">
          <template v-if="tab == 0">
            <div class="mt-35 mb-35 ml-25 mr-25">
              <div :class="getLayout == 'mobile' ? 'flex col' : 'flex row'">
                <div>
                  <DateInput
                    v-model="dateStart"
                    key="tab1-1"
                    placeholder="Başlangıç"
                    @changeDate="startDate($event)"
                  ></DateInput>
                </div>
                <div :class="getLayout == 'mobile' ? 'mt-10 mb-10' : 'ml-20'">
                  <DateInput
                    v-model="dateEnd"
                    key="tab1-2"
                    placeholder="Bitiş"
                    @changeDate="endDate($event)"
                  ></DateInput>
                </div>
                <div :class="getLayout == 'mobile' ? '' : 'ml-20'">
                  <button
                    @click="searchService"
                    class="flat-button search-button"
                  >
                    Ara
                  </button>
                </div>
              </div>
              <Table
                :isClickable="true"
                @handleRow="selectService($event)"
                :warnText="warnText"
                colHeight="40px"
                class="mt-50"
                :key="tableService.rows.length"
                :data="tableService"
              >
              </Table>
            </div>
          </template>
          <template v-if="tab == 1">
            <div class="mt-35 mb-35 ml-25 mr-25">
              <div :class="getLayout == 'mobile' ? 'flex col' : 'flex row'">
                <div>
                  <DateInput
                    v-model="dateStart"
                    key="tab2-1"
                    placeholder="Başlangıç"
                    @changeDate="startDate($event)"
                  ></DateInput>
                </div>
                <div :class="getLayout == 'mobile' ? 'mt-10 mb-10' : 'ml-20'">
                  <DateInput
                    v-model="dateEnd"
                    key="tab2-2"
                    placeholder="Bitiş"
                    @changeDate="endDate($event)"
                  ></DateInput>
                </div>
                <div :class="getLayout == 'mobile' ? '' : 'ml-20'">
                  <button
                    @click="searchService"
                    class="flat-button search-button"
                  >
                    Ara
                  </button>
                </div>
              </div>
              <Table
                :isClickable="true"
                @handleRow="selectOffer($event)"
                @handleCol="selectServiceFromOffer($event)"
                :warnText="warnText"
                colHeight="40px"
                class="mt-50"
                :data="tableOffer"
                :key="tableOffer.rows.length"
              >
              </Table>
            </div>
          </template>
        </div>
      </TabMenu>
    </div>
  </div>
</template>

<script>
import TabMenu from '@/components/views/ForYou/TabMenu'
import Table from '@/components/views/ForYou/Table'
import SearchInput from '@/components/common/SearchInput'
import InputText from '@/components/common/form/InputText'
import DateInput from '@/components/common/DateInput'
import ServiceDetail from './ServiceDetail'
import ServiceOfferDetail from './ServiceOfferDetail'
import Icon from '@/components/Icon'
import { mapActions, mapGetters } from 'vuex'
import endpoints from '@/api/endpoints'
import { dateFormat, dateSubtract, currentDate } from '@/utils/date'
import { mixinNumberFormatTr } from '@/utils'
export default {
  name: 'ContentService',
  components: {
    TabMenu,
    Table,
    SearchInput,
    DateInput,
    InputText,
    ServiceDetail,
    ServiceOfferDetail,
    Icon
  },
  props: {
    tab: { type: Number, default: 0 }
  },
  data() {
    return {
      warrantyText: '',
      warnText: '',
      nPowerText: '',
      serialNumberText: '',
      title: 'Servis',
      isLoading: false,
      items: [
        { text: 'SERVİSTEKİ ÜRÜNLER' },
        { text: 'SERVİS TEKLİFLERİ' },
        { text: 'GARANTİ SORGULAMA' },
        { text: 'GARANTİ UZATMA' }
      ],
      dateStart: null,
      dateEnd: null,
      tableOffer: {
        headers: [
          'Tarih',
          'Döküman No',
          'Brüt Toplam',
          'İskonto',
          'Genel Toplam',
          ''
        ],
        rows: [
          // ['01.09.2030', '#3549', '₺33,000', '34', '₺43,000']
        ]
      },
      tableService: {
        headers: ['Tarih', 'Servis No', 'Seri Numarası', 'Durumu'],
        rows: [
          // [
          //   '01.09.2030',
          //   '#3549',
          //   '32456IM342',
          //   { component: 'BlueColumn', text: 'Hazırlanıyor' }
          // ],
        ]
      },
      tableWarranty: {
        headers: [
          'Stok Kodu',
          'Brand',
          'Başlangıç Tarihi',
          'Bitiş Tarihi',
          'Kalan Gün'
        ],
        rows: []
      },
      warrantyResult: {
        headers: ['Stok Kodu', 'Seri No', 'Tarih', 'Yıl'],
        rows: []
      },
      warrantyProductList: [],
      selectedWarranty: null,
      // resultWarranty: null,
      isDetail: false
    }
  },
  watch: {
    selectedWarranty(val) {
      console.log(val)
    }
  },
  computed: {
    ...mapGetters(['getLayout']),
    ...mapGetters({
      getServiceProductList: 'foryou/getServiceProductList',
      getServiceOfferList: 'foryou/getServiceOfferList',
      getServiceProductDetail: 'foryou/getServiceProductDetail',
      getServiceOfferDetail: 'foryou/getServiceOfferDetail'
    })
  },
  methods: {
    ...mapActions({
      fetchTechnicalServiceProducts: 'foryou/fetchTechnicalServiceProducts',
      fetchTechnicalServiceOffers: 'foryou/fetchTechnicalServiceOffers',
      fetchTechnicalServiceDetail: 'foryou/fetchTechnicalServiceDetail',
      fetchTechnicalOfferDetail: 'foryou/fetchTechnicalOfferDetail'
    }),
    goBack(tab) {
      this.isDetail = false
      this.tab = tab
      // if (this.tab == 0) {
      //   this.getServicesProducts(this.dateStart, this.dateEnd)
      // } else if (this.tab == 1) {
      //   this.getServiceOffers(this.dateStart, this.dateEnd)
      // }
    },
    selectService(value) {
      let findItem = value?.find((value) => value.data)?.data

      this.$router.push({
        query: {
          ...this.$route.query,
          id: findItem.service_no,
          type: findItem.service_type,
          startDate: this.dateStart,
          endDate: this.dateEnd
        }
      })
    },
    async getSelectService(serviceNo, serviceType) {
      this.isDetail = true
      await this.fetchTechnicalServiceDetail({
        id: serviceNo,
        type: serviceType
      })
    },
    async selectServiceFromOffer(value) {
      let findItem = value?.item?.find((value) => value.data)?.data
      this.$router.push({
        query: {
          ...this.$route.query,
          id: findItem.service_no,
          type: findItem.service_type,
          startDate: this.dateStart,
          endDate: this.dateEnd
        }
      })
    },
    async selectOffer(value) {
      let findItem = value?.find((value) => value.data)?.data
      this.$router.push({
        query: {
          ...this.$route.query,
          documentId: findItem.document_number,
          documentType: findItem.document_type,
          startDate: this.dateStart,
          endDate: this.dateEnd
        }
      })
    },
    async getSelectOffer(docId, docType) {
      this.isDetail = true
      await this.fetchTechnicalOfferDetail({
        id: docId,
        type: docType
      })
    },
    searchService() {
      if (this.tab == 0) {
        this.getServicesProducts(this.dateStart, this.dateEnd)
      } else if (this.tab == 1) {
        this.getServiceOffers(this.dateStart, this.dateEnd)
      }
    },
    async getServicesProducts(start, end) {
      try {
        this.isLoading = true
        this.warnText = ''
        if (Object.keys(this.fetchTechnicalServiceProducts).length) return
        await this.fetchTechnicalServiceProducts({
          start_date: dateFormat(start),
          end_date: dateFormat(end)
        })
        let tableMap = this.getServiceProductList.map((item) => {
          return [
            item.date ? item.date.split(' ')[0] : '',
            item.service_no,
            item.serial_no,
            { component: 'BlueColumn', text: item.status_explanation },
            { data: item }
          ]
        })
        this.tableService.rows = tableMap
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
      this.warnText = this.tableService.rows.length
        ? ''
        : 'Seçili tarih aralığında kayıt bulunamadı.'
    },
    async getServiceOffers(start, end) {
      this.isLoading = true
      this.warnText = ''
      if (Object.keys(this.fetchTechnicalServiceOffers).length) return
      let res = await this.fetchTechnicalServiceOffers({
        start_date: dateFormat(start),
        end_date: dateFormat(end)
      })
      let tableMap = this.getServiceOfferList.map((item) => {
        return [
          item.document_date ? item.document_date.split(' ')[0] : '',
          item.document_number,
          mixinNumberFormatTr(item.gross_total),
          mixinNumberFormatTr(item.discount_total),
          mixinNumberFormatTr(item.general_total),
          { component: 'ServiceReportButton' },
          { data: item }
        ]
      })
      this.isLoading = false

      this.tableOffer.rows = tableMap
      this.warnText = this.tableOffer.rows.length
        ? ''
        : 'Seçili tarih aralığında kayıt bulunamadı.'
    },
    startDate(date) {
      this.dateStart = date
    },
    endDate(date) {
      this.dateEnd = date
    }
  },
  created() {
    let {
      id,
      type,
      documentId,
      documentType,
      startDate,
      endDate
    } = this.$route?.query

    this.dateStart = startDate || dateSubtract(2)
    this.dateEnd = endDate || currentDate()
    if (this.tab == 0) {
      if (id && type) {
        this.getSelectService(id, type)
      } else {
        this.getServicesProducts(this.dateStart, this.dateEnd)
      }
    } else if (this.tab == 1) {
      if (id && type) {
        this.getSelectService(id, type)
      } else if (documentId && documentType) {
        this.getSelectOffer(documentId, documentType)
      } else {
        this.getServiceOffers(this.dateStart, this.dateEnd)
      }
    } else if (this.tab == 2) {
      this.$nextTick(() => {
        this.$router.push('/destek/garanti-sorgulama')
      })
    } else if (this.tab == 3) {
      this.$nextTick(() => {
        this.$router.push('/destek/garanti-uzat')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-button {
  height: 40px;
  width: 70px;
}
.list-group {
  list-style-type: circle;
}
.service-content {
  min-height: 600px;
}
.warranty {
  background: #ffffff;
  width: 40%;
}
.warranty-button {
  justify-self: end;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 55px;
  border: none;
  cursor: pointer;

  background: #0d2f81;
  border-radius: 3px;
  text-align: center;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: white;

  &:hover {
    background: rgba(31, 31, 31, 0.5);
  }
  &:disabled {
    opacity: 0.5;
  }
}
</style>