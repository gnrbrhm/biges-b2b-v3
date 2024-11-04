<template>
  <div>
    <div v-if="isOfferDetail">
      <OfferDetail
        v-if="getReceivedOffersDetailList"
        :detail="getReceivedOffersDetailList"
        @handleBack="goOfferBack"
      ></OfferDetail>
    </div>
    <div v-else>
      <TabMenu
        @onTab="$emit('handleTab', $event)"
        :title="title"
        :tab="tab"
        :items="items"
        :isLoading="isLoading"
      >
        <div class="work-content">
          <template v-if="tab == 0">
            <div class="mt-35 mb-35 ml-25 mr-25">
              <Table
                :key="'w-' + table.rows.length + new Date().getTime()"
                class="mt-50"
                title="Teklifler"
                :warnText="warnText"
                :data="table"
                @handleRow="rowClick($event)"
                :isClickable="true"
              >
                <template #title>
                  <div class="flex row">
                    <div
                      @click="$router.push('/size-ozel/yeni')"
                      class="new-offer flex row align-center clickable"
                    >
                      <span class="mr-10 flex align-center">
                        <img src="@/assets/svg/add.svg" alt=""
                      /></span>
                      Yeni Teklif
                    </div>
                    <div
                      @click="clickItem('offer-settings')"
                      class="settings ml-30 flex row align-center clickable"
                    >
                      <span class="mr-10 flex align-center">
                        <img src="@/assets/svg/settings-15.svg" alt=""/></span
                      >Ayarlar
                    </div>
                  </div>
                </template>
              </Table>
              <div class="mt-20">
                <BCPuanPagination
                  @onChange="handlePaginationTab0"
                  :options="{ total: paginationLength, per: 20 }"
                ></BCPuanPagination>
              </div>
            </div>
          </template>
          <template v-if="tab == 1">
            <div class="mt-35 mb-35 ml-25 mr-25">
              <div :class="getLayout == 'mobile' ? 'flex col' : 'flex row'">
                <div>
                  <DateInput
                    v-model="dateStart"
                    key="tab5-1"
                    placeholder="Başlangıç"
                    @changeDate="startDate($event)"
                  ></DateInput>
                </div>
                <div :class="getLayout == 'mobile' ? 'mt-10 mb-10' : 'ml-20'">
                  <DateInput
                    v-model="dateEnd"
                    key="tab5-2"
                    placeholder="Bitiş"
                    @changeDate="endDate($event)"
                  ></DateInput>
                </div>
                <div :class="getLayout == 'mobile' ? '' : 'ml-20'">
                  <button
                    @click="searchOffer"
                    class="flat-button search-button"
                  >
                    Ara
                  </button>
                </div>
              </div>
              <Table
                @handleRow="selectOffer($event)"
                :warnText="warnText"
                :data="table2"
                :isClickable="true"
                :key="'w' + table2.rows"
              >
              </Table>
              <div class="mt-20">
                <BCPuanPagination
                  @onChange="handlePaginationTab1"
                  :options="{ total: paginationLength, per: 20 }"
                ></BCPuanPagination>
              </div>
            </div>
          </template>
          <DrawerMenu
            v-if="isDrawer"
            :title="drawerTitle"
            @close="close"
            :buttonText="drawerButtonText"
            :isIconTrash="false"
            @add="drawerSave"
          >
            <template v-if="drawerType == 'offer-settings'" #content>
              <div class="flex col">
                <div class="ml-40 mt-30">
                  <span class="has-text-weight-bold"> Geçerli Logo </span>
                </div>
                <div class="flex col center">
                  <img
                    class="m-10"
                    :src="fileUrl"
                    alt=""
                    style="height: 12rem"
                    id="fileImg"
                  />
                  <div>
                    <div class="file is-info has-name">
                      <label class="file-label">
                        <input
                          class="file-input"
                          @change="changeLogo"
                          type="file"
                          name="resume"
                          ref="fileLogo"
                        />
                        <span class="file-cta">
                          <span class="file-icon">
                            <i class="fas fa-upload"></i>
                          </span>
                          <span class="file-label"> Değiştir </span>
                        </span>
                        <span class="file-name">
                          {{ fileName }}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="p-20 width-100">
                    <div class="grid col-2 row-gap-25 col-gap-35 border p-20">
                      <div>
                        <span class="has-text-weight-bold">
                          Varsayılan Fiyat Seçimi
                        </span>
                        <ul class="mt-10">
                          <li class="mb-5">
                            <label for="id_default_price_0"
                              ><input
                                type="radio"
                                name="default_price"
                                value="end_user"
                                required=""
                                id="id_default_price_0"
                                v-model="radioChecked"
                              />
                              Liste Fiyatları</label
                            >
                          </li>
                          <li>
                            <label for="id_default_price_1"
                              ><input
                                type="radio"
                                name="default_price"
                                value="reseller"
                                required=""
                                id="id_default_price_1"
                                v-model="radioChecked"
                              />
                              Bayi Fiyatları</label
                            >
                          </li>
                        </ul>
                      </div>
                      <div>
                        <span class="has-text-weight-bold"> Önizleme </span>
                        <ul class="mt-10">
                          <li class="mb-5">
                            <label class="checkbox">
                              <input
                                type="checkbox"
                                name="show_discount"
                                id="id_show_discount"
                                v-model="isDiscountShow"
                              />
                              İskontoyu Göster
                            </label>
                          </li>
                          <li>
                            <label class="checkbox">
                              <input
                                type="checkbox"
                                name="show_logo"
                                id="id_show_logo"
                                v-model="isLogoShow"
                              />
                              Biges logosunu göster.
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="p-20 editor-container">
                  <CKEditor v-model="editorContent"></CKEditor>
                </div>
              </div>
            </template>
          </DrawerMenu>
        </div>
      </TabMenu>
    </div>
  </div>
</template>

<script>
import TabMenu from '@/components/views/ForYou/TabMenu'
import Table from '@/components/views/ForYou/Table'
import DrawerMenu from '@/components/views/ForYou/DrawerMenu'
import Checkbox from '@/components/common/Checkbox'
import CKEditor from '@/components/common/CKEditor'
import BCPuanPagination from '@/components/views/ForYou/BCPuanPagination'
import OfferDetail from './OfferDetail'

import DateInput from '@/components/common/DateInput'
import { mixinNumberFormatTr } from '@/utils'
import { mapActions, mapGetters } from 'vuex'

import { dateFormat, dateSubtract, currentDate } from '@/utils/date'
export default {
  name: 'ContentWork',
  props: {
    tab: { type: Number, default: 0 }
  },
  components: {
    TabMenu,
    OfferDetail,
    Table,
    DrawerMenu,
    DateInput,
    Checkbox,
    CKEditor,
    BCPuanPagination
  },
  data() {
    return {
      paginationLength: 0,
      warnText: '',
      isOfferDetail: false,
      isLoading: false,
      editorContent: '',
      dateEnd: null,
      isUploadFile: false,
      drawerButtonText: null,
      dateStart: null,
      isDrawer: false,
      drawerTitle: '',
      fileName: 'Dosya Seçilmedi',
      fileUrl: '',
      radioChecked: 'reseller',
      isDiscountShow: false,
      isLogoShow: false,
      drawerType: null,
      title: 'Tekliflerim',
      items: [{ text: 'TEKLİF MODÜLÜ' }, { text: 'ALINAN TEKLİFLER' }],
      table: {
        headers: ['No', 'Tarih', 'Teklif', 'Müşteri', 'Aşama', 'Toplam Döviz'],
        rows: [
          // [
          //   '#35',
          //   '01.09.2030',
          //   'Test',
          //   'AA Tekstil',
          //   'Ahmet Yılmaz',
          //   'Taslak',
          //   '$99,00',
          //   '$99,00'
          // ],
        ]
      },
      table2: {
        headers: [
          'Talep Tarihi',
          'Geçerlilik Tarihi',
          'Döküman Numarası',
          'Toplam',
          'Durum',
          'Detay'
        ],
        rows: [
          // [
          //   '01.09.2030',
          //   'AA Tekstil',
          //   'Ahmet Yılmaz',
          //   'Taslak',
          //   '$99,00',
          //   '$99,00'
          // ]
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['getLayout']),
    ...mapGetters({
      getReceivedOffersDetailList: 'foryou/getReceivedOffersDetailList'
    })
  },
  methods: {
    ...mapActions({
      fetchReceivedOffers: 'foryou/fetchReceivedOffers',
      fetchReceivedSpecialOffers: 'foryou/fetchReceivedSpecialOffers',
      fetchReceivedOffersDetail: 'foryou/fetchReceivedOffersDetail',
      fetchDefaultSettings: 'offers/fetchDefaultSettings',
      updateDefaultSettings: 'offers/updateDefaultSettings',
      fetchOffer: 'offers/fetchOffer'
    }),
    handlePaginationTab1(index) {
      let pagData = [...this.table2.data].splice((index - 1) * 20, 20)
      this.paginationLength = this.table2.data.length
      this.table2.rows = pagData
      this.warnText = this.table2.rows.length
        ? ''
        : 'Seçili tarih aralığında kayıt bulunamadı.'

      if (window && index != 1) {
        this.$nextTick(() => {
          window.scrollTo(0, 300)
        })
      }
    },
    handlePaginationTab0(index) {
      this.getOffer((parseInt(index) - 1) * 20)
      // let pagData = [...this.table.data].splice((index - 1) * 20, 20)
      // this.paginationLength = this.table.data.length
      // this.table.rows = pagData
      // this.warnText = this.table.rows.length ? '' : 'Seçili tarih aralığında kayıt bulunamadı.'

      if (window && index != 1) {
        this.$nextTick(() => {
          window.scrollTo(0, 300)
        })
      }
    },
    searchOffer() {
      if (this.tab == 1) {
        this.getReceivedOffers(this.dateStart, this.dateEnd)
      }
    },
    goOfferBack() {
      this.isOfferDetail = false
      this.tab = 1
    },
    startDate(date) {
      this.dateStart = date
    },
    endDate(date) {
      this.dateEnd = date
    },
    rowClick(item) {
      this.$router.push('/size-ozel/teklifler/' + item[0])
    },
    drawerSave() {
      let fileSelected = document.getElementById('fileImg').getAttribute('src')

      let updateData = {
        is_logo_show: this.isLogoShow,
        is_discount_show: this.isDiscountShow,
        reseller_logo: fileSelected,
        is_list_price_show: this.radioChecked == 'reseller' ? false : true,
        offer_conditions: this.editorContent
      }

      if (!this.isUploadFile || !updateData.reseller_logo) {
        delete updateData.reseller_logo
      }

      this.updateDefaultSettings(updateData)
      this.isUploadFile = false
    },
    changeLogo(e) {
      this.isUploadFile = true
      this.fileName = this.$refs.fileLogo.files
        ? this.$refs.fileLogo.files[0].name
        : ''

      let selectedFile = this.$refs.fileLogo.files[0]

      this.createBase64Image(selectedFile)
    },
    createBase64Image(file) {
      var reader = new FileReader()

      reader.onload = function(e) {
        // this.fileUrl = e.target.result
        document.getElementById('fileImg').setAttribute('src', e.target.result)
      }

      reader.readAsDataURL(file)
    },
    clickItem(item) {
      this.drawerType = item
      if (item == 'offer-settings') {
        this.getDefaultSettings()

        this.drawerTitle = 'Ayarlar'
        this.drawerButtonText = 'Kaydet'
      }
      this.isDrawer = true
    },
    close() {
      this.isDrawer = false
    },
    selectOffer(item) {
      let findItem = item?.find(value => value.data)?.data
      console.log('Seelc Offer', findItem)
      this.$router.push({
        path: `/teklif`,
        query: {
          documentType: findItem.document_type,
          documenNum: findItem.document_number
        }
      })
      // this.$router.push({
      //   query: {
      //     ...this.$route.query,
      //     documentId: findItem?.doc_number,
      //     startDate: this.dateStart,
      //     endDate: this.dateEnd
      //   }
      // })
    },
    async getSelectOffer(docId) {
      this.isOfferDetail = true
      await this.fetchReceivedOffersDetail(docId)
    },
    async getReceivedOffers(start, end) {
      this.isLoading = true
      this.warnText = ''
      try {
        if (Object.keys(this.fetchReceivedOffers).length) return
        let response = await this.fetchReceivedSpecialOffers({
          start_date: dateFormat(start),
          end_date: dateFormat(end) || null
        })
        console.log('response', response)
        // .then(response => {
        //   console.log('response', response)
        if (response) {
          this.table2.data = response.results.map(item => {
            return [
              // item.document_date ? item.document_date.split(' ')[0] : '',
              item.valid_from,
              item.valid_until,
              item.document_number,
              item.grandTotal ? item.grandTotal : '-',
              item.status_desc,
              '> Detay',
              // mixinNumberFormatTr(item.gross_total),
              // mixinNumberFormatTr(item.total_discount),
              // mixinNumberFormatTr(item.total_price),
              { data: item }
            ]
          })
          console.log('this.table2.data', this.table2.data)
          this.handlePaginationTab1(1)
        }
        this.isLoading = false
        this.warnText = this.table2.rows.length
          ? ''
          : 'Seçili tarih aralığında kayıt bulunamadı.'
        // })
      } catch (error) {
        console.log(error)
        this.isLoading = false
      }
    },

    async getDefaultSettings() {
      this.isLoading = true
      if (Object.keys(this.fetchDefaultSettings).length) return
      await this.fetchDefaultSettings().then(response => {
        this.fileUrl = response.reseller_logo
        this.isLogoShow = response.is_logo_show
        this.isDiscountShow = response.is_discount_show
        this.editorContent = response.offer_conditions || ''
        this.radioChecked = response.is_list_price_show
          ? 'end_user'
          : 'reseller'
      })
      this.isLoading = false
    },
    async getOffer(page) {
      this.isLoading = true
      this.warnText = ''
      if (Object.keys(this.fetchOffer).length) return
      await this.fetchOffer(page)
        .then(response => {
          if (response?.results?.length) {
            this.paginationLength = response.count
            this.table.rows = response.results.map(item => {
              return [
                item.id || '',
                item.date || '',
                item.title || '',
                item.reseller.representative || '',
                item.stage || '',
                mixinNumberFormatTr(item.offer_price_total) || ''
              ]
            })
            // this.handlePaginationTab0(1)
            this.warnText = this.table.rows.length
              ? ''
              : 'Seçili tarih aralığında kayıt bulunamadı.'
          }

          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    }
  },
  created() {
    let { documentId, startDate, endDate } = this.$route?.query

    this.dateStart = startDate || dateSubtract(2)
    this.dateEnd = endDate || currentDate()

    if (this.tab == 0) {
      this.getOffer(0)
    } else if (this.tab == 1) {
      if (documentId) {
        this.getSelectOffer(documentId)
      } else {
        this.getReceivedOffers(this.dateStart, this.dateEnd)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-button {
  height: 40px;
  width: 70px;
}
.work-content {
  min-height: 600px;

  .new-offer {
    height: 17px;

    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #0d2f81;
  }

  .settings {
    height: 17px;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: rgba(31, 31, 31, 0.5);
  }
}
</style>
