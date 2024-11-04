<template>
  <div>
    <div>
      <TabMenu
        :is-loading="isLoading"
        :tab="tab"
        :title="title"
        :items="items"
        @onTab="$emit('handleTab', $event)"
      >
        <div class="financial-content">
          <template v-if="tab == 0">
            <div class="club-content">
              <div>
                <div class="border-bottom">
                  <div class="flex col mrb-25 mtb-15 width-100">
                    <div class="club-financial-header flex row">
                      <div class="flex center col-px-70 radius-35 border">
                        <img src="@/assets/svg/currency-dollar.svg" alt="" />
                      </div>
                      <div class="flex col ml-20 justify-center">
                        <div class="title">
                          {{ financialSections.balance }}
                        </div>
                        <div class="subtitle">
                          TOPLAM BAKİYE TL GÖSTERİMİ
                          <span class="ml-5">
                            <img
                              v-tooltip="
                                'Farklı para birimi bakilerinizin toplam TL karşılığıdır'
                              "
                              src="@/assets/svg/info-icon.svg"
                              alt=""
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="border m-20 p-20">
                      <Table
                        :key="financialTable1.rows.length"
                        width-first-th="221px"
                        :is-last-row-border="false"
                        title="Bakiye Durumu"
                        :data="financialTable1"
                      ></Table>
                    </div>
                  </div>
                </div>
                <div class="border-bottom">
                  <div class="flex col mrb-25 mtb-15 width-100">
                    <div class="club-financial-header flex row">
                      <div class="flex center col-px-70 radius-35 border">
                        <img src="@/assets/svg/currency-dollar.svg" alt="" />
                      </div>
                      <div class="flex col ml-20 justify-center">
                        <div class="title">{{ totalBill }}</div>
                        <div class="subtitle">
                          FATURALAR TOPLAMI
                          <span class="ml-5">
                            <img src="@/assets/svg/info-icon.svg" alt="" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="border m-20 p-20">
                      <Table
                        :key="financialTable2.rows.length"
                        width-first-th="221px"
                        :is-last-row-border="false"
                        title="Fatura Durumu"
                        :data="financialTable2"
                      ></Table>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="flex col mrb-25 mtb-15 width-100">
                    <div class="club-financial-header flex row">
                      <div class="flex center col-px-70 radius-35 border">
                        <img src="@/assets/svg/currency-dollar.svg" alt="" />
                      </div>
                      <div class="flex col ml-20 justify-center">
                        <div class="title">{{ totalLimit }}</div>
                        <div class="subtitle">
                          LİMİTLERİN Toplamı
                          <span class="ml-5">
                            <img src="@/assets/svg/info-icon.svg" alt="" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="border m-20 p-20">
                      <Table
                        :key="financialTable3.rows.length"
                        width-first-th="221px"
                        :is-last-row-border="false"
                        title="Limit Durumu"
                        :data="financialTable3"
                      ></Table>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="flex col mrb-25 mtb-15 width-100">
                    <div class="club-financial-header flex row">
                      <div class="flex center col-px-70 radius-35 border">
                        <img src="@/assets/svg/currency-dollar.svg" alt="" />
                      </div>
                      <div class="flex col ml-20 justify-center">
                        <div class="title">{{ totalRisk }}</div>
                        <div class="subtitle">
                          RİSK PUANI
                          <span class="ml-5">
                            <img src="@/assets/svg/info-icon.svg" alt="" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="border m-20 p-20">
                      <Table
                        :key="'finansal' + financialTable4.rows.length"
                        width-first-th="221px"
                        :is-last-row-border="false"
                        title="Risk Durumu"
                        :data="financialTable4"
                      ></Table>
                    </div>
                  </div>
                </div>
                <div class="info-bar ml-25 mr-25">
                  <div class="title mb-15">Bakiye Durumu Nedir?</div>
                  <div class="text">
                    1 Ekim 2018 tarihinde TL işleme geçilmiştir. Alışverişinizi
                    hangi para birimi ile yaparsanız yapın, bakiyeler TL
                    cinsinden tutulmaktadır. Döviz bakiyesi bu tarihten öncesine
                    aittir. Alacaklı bakiyede olan firmalar, bu alacaklı
                    oldukları tutar kadar alımlarında kredi kartı taksitli
                    indirim oranından yararlanabilecektir.
                  </div>
                </div>
                <div class="info-bar mr-25 ml-25 mt-20">
                  <div class="title mb-15">Fatura Durumu Nedir?</div>
                  <div class="text">
                    Açık hesap ödeme vadesi, fatura bazlı olarak 30 gün olarak
                    belirlenmiştir. Bu bölümde vadesi geçmiş ve kapatılmamış
                    fatura toplamınızı görebilirsiniz. Dilerseniz “Detaylar için
                    Tıklayın” butonuna basarak tüm fatura işlemlerinizi ve
                    durumlarını görüntüleyebilir, faturalarınız hakkında detaylı
                    bilgi alabilirsiniz.
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-if="tab == 1">
            <div class="grid">
              <!-- <TargetCampaignCard
            v-for="(item, index) in getBigesClubTargetList"
            :key="item + '-' + index"
            :item="item"
          ></TargetCampaignCard> -->
              <!-- <TargetCampaignCard
                v-for="(campaign, idx) in getBigesClubTargetList"
                :key="campaign + idx"
                :targetCampaign="campaign" /> -->
            </div>
            <!-- <article class="article">
          <div class="article__header">Hakkında</div>
          <div class="article__content">
            Mauris posuere arcu metus, non blandit libero vulputate quis. Donec
            ipsum dui, tempus in orci ut, maximus sollicitudin massa. Proin
            consequat nunc lacus, non hendrerit eros maximus a. Donec eleifend a
            velit eu hendrerit. Praesent fringilla aliquam dolor sit amet
            fringilla. Proin tristique mauris ac libero dictum, vitae laoreet
            tortor consectetur. Sed eget hendrerit arcu.
          </div>
        </article>
        <div class="flex col mt-80">
          <div class="flex row mb-25 space-between">
            <div class="title">İlginizi Çekebilecek Diğer Kampanyalar</div>
            <div class="title">> Tüm Kampanyalar</div>
          </div>
          <div class="flex row">
            <InfoCard type="footer" class="mr-19"></InfoCard>
            <InfoCard type="footer"></InfoCard>
          </div>
        </div> -->
          </template>
          <template v-if="tab == 2">
            <div class="grid col-3 col-gap-15 row-gap-15">
              <div>
                <InfoCard
                  :is-icon="true"
                  :is-reverse-text="true"
                  first-text="Ciro"
                  :second-text="
                    currencySymbol[
                      earnData.current_year_total_endorsement_currency
                    ] + formatNumber(earnData.current_year_total_endorsement)
                  "
                >
                  <template #icon>
                    <div
                      class="flex center mr-20"
                      style="
                      width: 60px;
                      height: 60px;
                      border-radius: 30px;
                      background: rgba(13, 47, 129, 0.05);
                      border: 1px solid rgba(13, 47, 129, 0.1);
                      box-sizing: border-box;
                    "
                    >
                      <img
                        src="@/assets/svg/accounting-coin-stack.svg"
                        alt=""
                      />
                    </div>
                  </template>
                </InfoCard>
              </div>
              <!-- <div>
            <InfoCard
              :isIcon="true"
              firstText="Biges Club Puanları"
              :secondText="earnData.total_biges_point"
            >
              <template #icon>
                <div
                  class="flex center mr-20"
                  style="
                    width: 60px;
                    height: 60px;
                    border-radius: 30px;
                    background: rgba(13, 47, 129, 0.05);
                    border: 1px solid rgba(13, 47, 129, 0.1);
                    box-sizing: border-box;
                  "
                >
                  <img src="@/assets/svg/video-game-magic-active.svg" alt="" />
                </div>
              </template>
            </InfoCard>
          </div> -->
              <div>
                <!--  ilk etapta olmayacak -->
                <!-- <InfoCard
              :isIcon="true"
              :isReverseText="true"
              firstText="Satış Sonrası Kazançlar"
              :secondText="
                earnData.current_year_total_endorsement_currency +
                earnData.status_point
              "
            >
              <template #icon>
                <div
                  class="flex center mr-20"
                  style="
                    width: 60px;
                    height: 60px;
                    border-radius: 30px;
                    background: rgba(13, 47, 129, 0.05);
                    border: 1px solid rgba(13, 47, 129, 0.1);
                    box-sizing: border-box;
                  "
                >
                  <img src="@/assets/svg/accounting-coin-stack-2.svg" alt="" />
                </div>
              </template>
            </InfoCard> -->
              </div>
            </div>
            <div class="mt-50">
              <Table
                :key="'e-' + earnData.rows.length"
                :is-last-row-border="false"
                title="Kazanç Raporu"
                :data="earnData"
                :warn-text="warnText"
              ></Table>
              <div class="mt-20">
                <BCPuanPagination
                  :options="{ total: paginationLength, per: 20 }"
                  @onChange="handlePaginationTab3"
                >
                </BCPuanPagination>
              </div>
            </div>
          </template>
        </div>
      </TabMenu>
    </div>
    <template v-if="show3dModal">
      <PaymentModal
        width="485px"
        height="600px"
        :is-active="show3dModal"
        @close="
          show3dModal = false
          isLoading = false
          isSendFormLoading = false
        "
      >
        <iframe
          ref="iframePayment"
          :srcdoc="payment3d"
          height="100%"
          width="100%"
          frameborder="0"
        ></iframe>
      </PaymentModal>
    </template>
  </div>
</template>

<script>
import TabMenu from '@/components/views/ForYou/TabMenu'
import Table from '@/components/views/ForYou/Table'
import CreditCardDetail from './CreditCardDetail'
import PaymentModal from '../Basket/PaymentModal'
import { dateFormat } from '@/utils/date'
import { mixinNumberFormatTr } from '@/utils'
import endpoints from '@/api/endpoints'
import BCPuanPagination from '@/components/views/ForYou/BCPuanPagination'
import TargetCampaignCard from '@/components/TargetCampaignCard'
import InfoCard from '@/components/views/ForYou/InfoCard'
import { CURRENCY_SYMBOL } from '@/constants'

import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ContentFinancialState',
  components: {
    InfoCard,
    BCPuanPagination,
    TargetCampaignCard,
    TabMenu,
    Table,
    CreditCardDetail,
    PaymentModal
  },
  props: {
    tab: { type: Number, default: 0 }
  },
  data() {
    return {
      isFormClear: false,
      show3dModal: false,
      payment3d: {},
      isOld: false,
      isDetail: false,
      warnText: '',
      activePaymentTab: 0,
      subItemsPayment: [{ text: 'Kredi Kartı' }, { text: 'İyzilink' }],
      isBlur: true,
      selectedAccountId: null,
      dateStart: null,
      dateEnd: null,
      errors: [],
      errorMessage: 'Lütfen bu alanı kontrol ediniz.',
      errorPassword: 'Lütfen şifrenizi kontrol ediniz.',
      errorAgain: 'Şifreniz uyuşmamaktadır.',
      isLoading: false,
      isSendFormLoading: false,
      isNewCard: false,
      cardImage: {
        MASTER_CARD: 'mastercard.png',
        VISA: 'visa.png'
      },
      saved_cards: [],
      form: {
        sender_account_name: null,
        message: null,
        amount: null
      },
      isDrawer: false,
      drawerTitle: '',
      activeSubTab: 0,
      title: 'Finansal Durum',
      items: [
        { text: 'FİNANSAL DURUM' }
        // { text: '2022 HEDEFLERİ' },
        // { text: 'KAZANÇLAR' }
      ],
      subItems: [{ text: 'TÜMÜ' }, { text: 'ÇEK' }],
      subItems2: [
        { text: 'TÜMÜ' },
        { text: 'KREDİ KARTI' },
        { text: 'BAKİYE' }
      ],
      tableStatement: {
        headers: [
          'Tarih',
          'Döküman No',
          'Açıklama',
          'Borç',
          'Alacak',
          'Bakiye',
          'Tip'
        ],
        rows: [
          // [
          //   '01.09.2030',
          //   '#3232',
          //   '-',
          //   '90',
          //   '2,5',
          //   '2,5',
          //   '2,5',
          //   { component: 'IconColumn' }
          // ],
          // [
          //   '01.09.2030',
          //   '#3232',
          //   '-',
          //   '90',
          //   '2,5',
          //   '2,5',
          //   '2,5',
          //   { component: 'IconColumn' }
          // ]
        ]
      },
      table3: {
        headers: ['Tarih', 'KREDİ KARTI', 'TUTAR'],
        rows: [
          // ['01.09.2030', 'Kredi Kartı', '₺ 100,000'],
        ]
      },
      transferInfoTable: {
        headers: ['', 'Banka Adı', 'Şube', 'Para Birimi', 'Hesap No', 'IBAN'],
        rows: [
          // [
          //   { component: 'TableRadio' },
          //   'Akbank',
          //   'Çağlayan',
          //   'TL',
          //   '110131',
          //   'TR950004600352888000110131'
          // ],
        ]
      },
      tableBill: {
        headers: [
          'Sistem No',
          'Açıklama',
          'Banka Adı',
          'Hesap No',
          'Belge Tipi',
          'Belge No',
          'Ciro',
          'Kur',
          'Tutar'
        ],
        rows: []
      },
      tablePayment: {
        headers: ['', 'Taksit Seçeneği', 'Aylık Ödeme', 'Toplam Ödeme'],
        rows: [
          // [
          //   { component: 'TableRadio' },
          //   'Taksit',
          //   'Taksit Tutarı',
          //   'Toplam Tutar'
          // ],
        ]
      },
      paymentForm: {
        price: null,
        installment: null,
        card_info: {}
      },
      cardId: 0,
      currencySymbol: { ...CURRENCY_SYMBOL },
      checkList: [
        { name: 'Kazanılan', code: 'earn', isChecked: true, id: 1 },
        { name: 'İade', code: 'return', isChecked: true, id: 2 },
        { name: 'Harcanan', code: 'spent', isChecked: true, id: 0 }
      ],
      table: {
        headers: [
          'Başlama Tarihi',
          'Bitiş Tarihi',
          'Döküman No',
          'Kazanılan Statü Puanları',
          'Biges Club Puan Katsayısı'
        ],
        rows: [
          ['01.09.2019', '01.09.2030', 'Devir', '15.000,00', '15.000,00'],
          ['01.09.2019', '01.09.2030', 'Devir', '15.000,00', '15.000,00']
        ]
      },
      financialSections: {},
      financialTable1: {
        headers: ['Para Birimi', 'Bakiye', 'Durum'],
        rows: []
      },
      financialTable2: {
        headers: ['Fatura Tipi', 'Miktar'],
        rows: [
          // ['Açık Faturalar', '₺33,000'],
          // ['Onay Bekleyen Siparişler', '₺33,000'],
          // ['Onaylanmış Siparişler', '₺33,000']
        ]
      },
      financialTable3: {
        headers: ['Limit Tipi', 'Miktar'],
        rows: [
          // ['Kredi Limiti', '₺33,000'],
          // ['Müsait Limit', '₺33,000']
        ]
      },
      totalRisk: 0,
      financialTable4: {
        headers: ['Risk Tipi', 'Miktar'],
        rows: []
      },
      clubStatusData: {
        data: [],
        headers: ['İşlem Tarihi', 'Döküman No', 'Kazanılan-Harcanan-İade Puan'],
        rows: []
      },
      earnData: {
        current_year_total_endorsement_currency: 'TL',
        current_year_total_endorsement: '0',
        status_point: '0',
        total_biges_point: '0',
        headers: [
          'Yıl',
          'Ay',
          'Ciro',
          // 'Biges Club Puanları',
          'Satış Sonrası Hizmetlerden Kazançlar'
        ],
        rows: []
      },
      clubData: {},
      paginationLength: 0,
      totalLimit: 0,
      totalBill: 0
    }
  },
  watch: {
    getPaymentStatus(value) {
      if (value.status == 'success') {
        this.show3dModal = false
        this.isFormClear = true
        this.tablePayment.rows = []
        this.$notify({
          type: 'success',
          title: 'Başarılı',
          text: 'Ödemeniz Başarıyla tamamlandı.',
          duration: 5000
        })
        this.isSendFormLoading = false
        this.isLoading = false
      }
    }
  },
  computed: {
    ...mapGetters(['getLayout']),
    ...mapGetters({
      getRemittanceReportList: 'foryou/getRemittanceReportList',
      getPaymentHistoryList: 'foryou/getPaymentHistoryList',
      getChequeBillList: 'foryou/getChequeBillList',
      getPaymentHistoryDetail: 'foryou/getPaymentHistoryDetail',
      getPaymentStatus: 'payment/getPaymentStatus',
      getBigesClubTargetList: 'foryou/getBigesClubTargetList'
    }),
    token() {
      return this.$auth?.strategy?.token?.get()?.split(' ')?.[1]
    }
  },
  methods: {
    ...mapActions({
      fetchPaymentHistoryOld: 'foryou/fetchPaymentHistoryOld',
      // fetchBigesClubDetailInfo: 'foryou/fetchBigesClubDetailInfo',
      fetchFinanceInfo: 'foryou/fetchFinanceInfo',
      fetchBigesClubEarn: 'foryou/fetchBigesClubEarn',
      fetchBigesClubTarget: 'foryou/fetchBigesClubTarget'
    }),
    deleteCard(card_id) {
      this.isLoading = true
      this.$axios({ ...endpoints.for_you.card_delete, data: { card_id } })
        .then(response => {
          this.$notify({
            type: 'success',
            title: 'Başarılı',
            text: 'Kartınız başarıyla silindi.',
            duration: 5000
          })
          this.getSavedCards()
        })
        .catch(err => {
          console.log('err', err)
          this.$notify({
            type: 'error',
            title: 'Hata',
            text: 'Kartınız silinirken bir hata oluştu.',
            duration: 5000
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    clearInstallment() {
      this.$nextTick(() => {
        this.tablePayment.rows = []
      })
    },
    oldDataClick(val) {
      this.isOld = !val
      if (this.isOld) {
        this.getPaymentHistoryOld(this.dateStart, this.dateEnd)
      } else {
        this.getPaymentHistory(this.dateStart, this.dateEnd)
      }
    },
    goOfferBack() {
      this.isDetail = false
      this.tab = 4
    },
    rowClick(value) {
      let findId = value?.find(item => item.data)?.data?.id
      if (findId) {
        if (this.isOld) this.getPaymentHistoryIdOld(findId)
        else this.getPaymentHistoryId(findId)

        this.cardId = findId
        this.isDetail = true
      }
    },
    searchDate() {
      if (this.tab == 1) {
        this.getCheckBillInfo(this.dateStart, this.dateEnd)
      } else if (this.tab == 4) {
        if (this.isOld) {
          this.getPaymentHistoryOld(this.dateStart, this.dateEnd)
        } else {
          this.getPaymentHistory(this.dateStart, this.dateEnd)
        }
      } else if (this.tab == 0) {
        this.getResellerStatement(this.dateStart, this.dateEnd)
      }
    },
    selectInstallment(item) {
      if (item?.[0]?.data) {
        this.form = {
          ...this.form,
          price: item[0].data.totalPrice,
          installment: item[0].data.installmentNumber
        }
      }
    },
    selectStatement(item) {
      console.log(item)
    },
    setIsNewCard(value) {
      this.isNewCard = value
      console.log('setNewCard Triggered', value)
    },
    paymentInstallment(form) {
      this.postBalancePaymentinstallment({
        ...form,
        price: form?.price?.toString()?.replaceAll('.', '')
      }).then(response => {
        if (response.installmentDetails.length) {
          let tableMap = response.installmentDetails[0][
            'installmentPrices'
          ].map(item => {
            return [
              { component: 'TableRadio', data: item },
              item.installmentNumber,
              mixinNumberFormatTr(item.installmentPrice),
              mixinNumberFormatTr(item.totalPrice)
            ]
          })
          this.tablePayment.rows = tableMap
          this.isBlur = false
        }
      })
    },
    paymentFormHandle(value) {
      console.log('VALUE', JSON.stringify(value, null, 4))
      this.isSendFormLoading = true

      if (value.saved_card_checked) {
        this.postBalancePayment({
          stored_card_id: value.selected_card_id,
          price: value.form.price.toString().replaceAll('.', ''),
          is_three_d_security: value.is_three_d_security,
          installment: value.installment
        }).then(response => {
          console.log('RESP', JSON.stringify(response, null, 4))
          if (response?.conversation_id) {
            this.payment3d = window.atob(response.three_d_security_form)
            this.show3dModal = true
          } else if (response?.status == 'success') {
            this.$notify({
              type: 'success',
              title: 'İşlem Başarılı!',
              text: 'İşleminiz Başarılı',
              duration: 5000
            })
            this.isBlur = true
            this.tablePayment.rows = [
              [
                { component: 'TableRadio' },
                'Taksit Seçeneği',
                'Aylık Ödeme',
                'Toplam Ödeme'
              ],
              [
                { component: 'TableRadio' },
                'Taksit Seçeneği',
                'Aylık Ödeme',
                'Toplam Ödeme'
              ]
            ]
            this.isFormClear = true
            this.isSendFormLoading = false
          } else {
            this.isFormClear = true
            this.isSendFormLoading = false
          }
        })

        return
      }

      this.isFormClear = false
      this.form = {
        ...this.form,
        price: value?.form?.price?.toString()?.replaceAll('.', ''),
        is_three_d_security: value.is_three_d_security,
        card_info: {
          ...this.form.card_info,
          ...value.form,
          price: value?.form?.price?.toString()?.replaceAll('.', '')
        }
      }

      if (!this.form?.installment) {
        this.isSendFormLoading = false

        this.$notify({
          type: 'warn',
          title: 'Uyarı!',
          text: 'Lütfen taksit seçiniz!',
          duration: 5000
        })

        if (window) {
          window.scrollTo(0, 600)
        }
        return
      }
      console.log('value.is_saved_card', value.is_saved_card)
      if (value.is_saved_card) {
        this.$axios({
          ...endpoints.for_you.card_create,
          data: {
            card_alias: value.form.card_alias,
            card_holder_name: value.form.card_holder_name,
            card_number: value.form.card_number.replaceAll(' ', ''),
            expire_month: value.form.expire_month,
            expire_year: value.form.expire_year
          }
        })
          .then(response => {
            this.getSavedCards()
            this.isNewCard = false
          })
          .catch(error => {
            console.log(error)
          })
      }

      this.postBalancePayment(this.form).then(response => {
        console.log('RESP', JSON.stringify(response, null, 4))
        if (response?.conversation_id) {
          this.payment3d = window.atob(response.three_d_security_form)
          this.show3dModal = true
        } else if (response?.status == 'success') {
          this.$notify({
            type: 'success',
            title: 'İşlem Başarılı!',
            text: 'İşleminiz Başarılı',
            duration: 5000
          })
          this.isBlur = true
          this.tablePayment.rows = [
            [
              { component: 'TableRadio' },
              'Taksit Seçeneği',
              'Aylık Ödeme',
              'Toplam Ödeme'
            ],
            [
              { component: 'TableRadio' },
              'Taksit Seçeneği',
              'Aylık Ödeme',
              'Toplam Ödeme'
            ]
          ]
          this.isFormClear = true
          this.isSendFormLoading = false
        } else {
          this.isFormClear = true
          this.isSendFormLoading = false
        }
      })
    },
    selectedRow(item) {
      this.selectedAccountId = this.getRemittanceReportList.find(
        x => x.iban == item[5]
      ).id
    },
    selectPaymentTab(index) {
      this.activePaymentTab = index
    },
    selectSubTab(index, item) {
      this.activeSubTab = index
      if (this.tab == 1) {
        if (index == 0) {
          let tableMap = this.getChequeBillList.map(item => {
            return [
              item.system_number,
              item.description,
              item.bank_name,
              item.account_number,
              item.document_type,
              item.external_document_number,
              item.amount,
              item.exchange_rate,
              item.amount
            ]
          })
          this.tableBill.rows = tableMap
        } else if (index == 1) {
          let tableMap = this.getChequeBillList.map(item => {
            if (item.document_type == 'cheque') {
              return [
                item.system_number,
                item.description,
                item.bank_name,
                item.account_number,
                item.document_type,
                item.external_document_number,
                item.amount,
                item.exchange_rate,
                item.amount
              ]
            }
          })
          this.tableBill.rows = tableMap
        }
      }
      if (this.tab == 4) {
        if (this.isOld) {
          if (index == 0)
            this.getPaymentHistoryOld(this.dateStart, this.dateEnd)
          else if (index == 1)
            this.getPaymentHistoryOld(this.dateStart, this.dateEnd, 1)
          else if (index == 2)
            this.getPaymentHistoryOld(this.dateStart, this.dateEnd, 2)
        } else {
          if (index == 0) this.getPaymentHistory(this.dateStart, this.dateEnd)
          else if (index == 1)
            this.getPaymentHistory(this.dateStart, this.dateEnd, 1)
          else if (index == 2)
            this.getPaymentHistory(this.dateStart, this.dateEnd, 2)
        }
      }
    },
    startDate(date) {
      this.dateStart = date
    },
    endDate(date) {
      this.dateEnd = date
    },
    handleValid(key) {
      if (this.form[key] && this.errors.includes(key))
        this.errors.splice(this.errors.indexOf(key), 1)
      if (!this.form[key] && !this.errors.includes(key)) this.errors.push(key)
    },
    isValid(form) {
      this.errors = []
      let errors = Object.keys(form).filter(item => !form[item])
      if (errors.length) {
        this.errors = errors
        return false
      }
      return true
    },
    sendForm() {
      console.log('test123')
      this.isLoading = true
      if (!this.isValid(this.form)) {
        this.isLoading = false
        this.isSendFormLoading = false
        console.log('ERRORS::::', this.errors)
        return
      }
      this.postRemittanceReport({
        bank: this.selectedAccountId,
        ...this.form
      })
        .then(response => {
          console.log('RESPONSE FROM SUCCESS::::', response)
          if (response.status == 200) {
            this.resetForm()
          }
          this.isLoading = false
          this.isSendFormLoading = false
        })
        .catch(err => {
          console.log('PAY ERROR::::', err)
        })
        .finally(() => {
          this.isLoading = false
          this.isSendFormLoading = false
        })
    },
    resetForm() {
      this.form = {
        sender_account_name: null,
        message: null,
        amount: null
      }
    },
    clickViewPdf() {
      let url = `${
        this.$axios.defaults.baseURL
      }for_you/reseller-statement_pdf/?start_date=${dateFormat(
        this.dateStart
      )}&end_date=${dateFormat(this.dateEnd)}&type=pdf&key=${this.token}`
      window.open(url, '_blank')
    },
    formatNumber(value) {
      return mixinNumberFormatTr(value)
    },
    convertInt(point) {
      return parseInt(point.toString().replace('.', ''))
    },
    onChangeFilter(filter) {
      let findItemIndex = this.checkList.findIndex(
        item => filter.item.code == item.code
      )
      this.checkList[findItemIndex] = {
        ...filter.item,
        isChecked: filter.isChecked
      }
      let filterTypes = this.checkList
        .map(item => {
          if (item.isChecked) {
            return item.id
          }
        })
        .filter(val => val != undefined)
      this.getBigesClubDetailInfo(filterTypes.join(','))
    },
    handlePaginationTab2(index) {
      let pagData = [...this.clubStatusData.data].splice((index - 1) * 20, 20)
      this.paginationLength = this.clubStatusData.data.length
      this.clubStatusData.rows = pagData
      this.warnText = this.clubStatusData.rows.length
        ? ''
        : 'Kayıt Bulunamadı...'
      if (window && index != 1) {
        this.$nextTick(() => {
          window.scrollTo(0, 650)
        })
      }
    },
    handlePaginationTab3(index) {
      let pagData = [...this.earnData.data].splice((index - 1) * 20, 20)
      this.paginationLength = this.earnData.data.length
      this.earnData.rows = pagData
      this.warnText = this.earnData.rows.length ? '' : 'Kayıt Bulunamadı...'
      if (window && index != 1) {
        this.$nextTick(() => {
          window.scrollTo(0, 600)
        })
      }
    },
    async getBigesClubTarget() {
      await this.fetchBigesClubTarget()
    },
    async getBigesClubEarn() {
      this.isLoading = true
      this.warnText = ''
      try {
        await this.fetchBigesClubEarn().then(response => {
          this.earnData = { ...this.earnData, ...response }
          if (response.data) {
            this.earnData.data = response.data.map(item => {
              return [
                item.year,
                item.month,
                mixinNumberFormatTr(item.endorsement),
                // mixinNumberFormatTr(item.club_point),
                mixinNumberFormatTr(item.after_sales_advantage)
              ]
            })
            this.handlePaginationTab3(1)
            this.isLoading = false
          }
        })
      } catch (error) {
        console.error(error)
      }
      this.isLoading = false
    },
    // async getBigesClubDetailInfo(filterList) {
    //   if (Object.keys(this.fetchBigesClubDetailInfo).length) return
    //   this.isLoading = true
    //   this.warnText = ''
    //   await this.fetchBigesClubDetailInfo(filterList).then(response => {
    //     if (response) {
    //       this.clubData = response
    //       this.clubStatusData.data = response?.transactions
    //         ?.map(item => {
    //           let puanComp = {}
    //           if (parseFloat(item.earned_biges_points) > 0) {
    //             puanComp.component = 'GreenColumn'
    //           } else {
    //             puanComp.component = 'RedColumn'
    //           }
    //           puanComp.options = { justText: true }
    //           puanComp.text = item.earned_biges_points
    //           return [
    //             item.start_date ? item.start_date.split(' ')[0] : '',
    //             item.documan_no || '',
    //             puanComp
    //           ]
    //         })
    //         .filter(val => val)
    //       this.handlePaginationTab2(1)
    //       this.isLoading = false
    //     }
    //     this.isLoading = false
    //   })
    // },
    async getFinanceInfo() {
      this.isLoading = true
      try {
        await this.fetchFinanceInfo().then(response => {
          console.log('Response', response)
          if (response) {
            this.financialSections = {
              ...this.financialSections,
              balance: response.balance
            }
            this.financialTable1.rows = Object.values(
              response.balance_status
            ).map(item => {
              return [item.currency, item.current_balance, item.balance_durumu]
            })
            // [
            //   [
            //     response.balance_status.currency,
            //     response.balance_status.current_balance
            //   ]
            // ]
            this.totalBill =
              parseFloat(response.open_waybill) +
              parseFloat(response.pending_orders) +
              parseFloat(response.open_approved_orders)
            this.financialTable2.rows = [
              ['Açık Fatularalar', response.open_waybill],
              ['Onay Bekleyen Siparişler', response.pending_orders],
              ['Onaylanmış Siparişler', response.open_approved_orders]
            ]
            this.totalLimit =
              parseFloat(response.credit_limit) +
              parseFloat(response.available_limits)
            this.financialTable3.rows = [
              ['Kredi Limiti', response.credit_limit],
              ['Müsait Limit', response.available_limits]
            ]
            this.totalRisk = response.total_risk
            this.financialTable4.rows = [
              //   ['Ödenmemiş Çekler', response.unpaid_check],
              //   ['Ödenmemiş Senetler', response.open_invoice],
              ['Onaylanmış Siparişler', response.open_approved_orders],
              ['TL Bakiye', response.balance_status.balance_tl.current_balance],
              [
                'EURO Bakiye',
                response.balance_status.balance_euro.current_balance
              ],
              [
                'USD Bakiye',
                response.balance_status.balance_usd.current_balance
              ]
            ]
          }
          this.isLoading = false
        })
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
    }
  },
  created() {
    if (this.tab == 0) {
      this.getFinanceInfo()
    } else if (this.tab == 1) {
      this.fetchBigesClubTarget()
    } else if (this.tab == 2) {
      this.getBigesClubEarn()
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '@/assets/css/variables.scss/';

.club-content {
  &__title {
    &__first {
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #1f1f1f;
    }
    &__second {
      margin-top: 5px;
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
      color: rgba(31, 31, 31, 0.5);
    }
  }
  &__common-chart {
    margin-top: 40px;
  }
  &__info-cards {
    margin-top: 40px;
    .card-item {
      margin-right: 15px;
    }
  }
  &__charts {
    border-bottom: 1px solid rgba(31, 31, 31, 0.1);
    padding-bottom: 40px;
    // &__card {}
    // &__left {
    //   border-right: 1px solid rgba(31, 31, 31, 0.1);
    // }
    // &__right {
    //   margin-left: 40px;
    // }
    .top {
      height: 60px;
      margin-bottom: 30px;
      .ticket-icon {
        width: 60px;
        height: 60px;
        background: #ffffff;
        border: 1px solid rgba(31, 31, 31, 0.1);
        box-sizing: border-box;
        border-radius: 30px;
        margin-right: 10px;
      }
      .first {
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #1f1f1f;
      }
      .second {
        margin-top: 5px;
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
        text-decoration-line: underline;
        color: rgba(31, 31, 31, 0.5);
      }
    }
  }
  .article {
    &__header {
      margin-top: 50px;
      margin-bottom: 25px;
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #1f1f1f;
    }
    &__content {
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
      color: rgba(31, 31, 31, 0.7);
    }
  }
  .info-bar {
    background: rgba(31, 31, 31, 0.05);
    border-radius: 3px;
    padding: 30px;
  }
  .text {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: rgba(31, 31, 31, 0.7);
  }
  .title {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #1f1f1f;
  }
  .subtitle {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;
    color: rgba(31, 31, 31, 0.5);
  }
  .club-financial-header {
    margin-top: 20px;
    height: 70px;
    margin-left: 25px;
  }
}

textarea {
  background: #f2f2f2;
}

.financial-content {
  min-height: 600px;
  padding: 30px 25px;
}

@media only screen and (max-width: 768px) {
  .financial-content {
    min-height: 600px;
    padding: 10px 10px;
  }

  .tab-menu {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid rgba(31, 31, 31, 0.1);
    height: 25px;
    width: 100%;

    button {
      white-space: nowrap;
      margin-bottom: 12px;
      padding: 0 0;
      margin-right: 3.75rem;
      background-color: inherit;
      float: left;
      border: none;
      outline: none;
      cursor: pointer;
      transition: 0.3s;

      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;

      color: rgba(31, 31, 31, 0.7);

      &.active {
        position: relative;
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        color: #0d2f81;

        &::after {
          content: '';
          width: 100%;
          height: 1px;
          position: absolute;
          top: 24px;
          border: 1px solid #0d2f81;
          left: 0;
        }
      }
    }
  }

  .form-content {
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
    padding-bottom: 20px;

    &__title {
      &__first {
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        color: #1f1f1f;
      }

      &__second {
        margin-top: 5px;
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;

        color: rgba(31, 31, 31, 0.5);
      }
    }

    &__form {
      margin-top: 10px;

      &__button {
        margin-top: 10px;

        width: 100%;
        display: grid;
        align-items: center;
        justify-content: flex-start;
        display: flex;
        flex-direction: row-reverse;

        &__left {
          font-family: Inter;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 17px;
          color: rgba(31, 31, 31, 0.7);
        }

        .form-button {
          justify-self: end;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 144px;
          height: 55px;
          border: none;
          cursor: pointer;

          background: #0d2f81;
          border-radius: 3px;
          text-align: center;
          font-weight: normal;
          font-size: 14px;
          line-height: 17px;
          color: $white;

          &:hover {
            background: $primary-dark-3x;
          }

          &:disabled {
            opacity: 0.5;
          }
        }
      }
    }
  }
}
</style>
