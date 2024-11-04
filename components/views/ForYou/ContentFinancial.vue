<template>
  <div>
    <div v-if="isDetail">
      <CreditCardDetail
        v-if="getPaymentHistoryDetail"
        :item="getPaymentHistoryDetail"
        @handleBack="goOfferBack"
        :cardId="cardId"
        :isOld="isOld"
      ></CreditCardDetail>
    </div>
    <div v-else>
      <TabMenu
        @onTab="$emit('handleTab', $event)"
        :isLoading="isLoading"
        :tab="tab"
        :title="title"
        :items="items"
      >
        <div class="financial-content">
          <template v-if="tab == 0">
            <div :class="getLayout == 'mobile' ? 'flex col' : 'flex row'">
              <div>
                <DateInput
                  v-model="dateStart"
                  key="tab0-1"
                  placeholder="Başlangıç"
                  @changeDate="startDate($event)"
                ></DateInput>
              </div>
              <div :class="getLayout == 'mobile' ? 'mt-10 mb-10' : 'ml-20'">
                <DateInput
                  v-model="dateEnd"
                  key="tab0-2"
                  placeholder="Bitiş"
                  @changeDate="endDate($event)"
                ></DateInput>
              </div>
              <div :class="getLayout == 'mobile' ? 'mt-10 mb-10' : 'ml-20'">
                <div class="flex row">
                  <button @click="searchDate" class="flat-button search-button">
                    Ara
                  </button>
                  <!-- <button
                    @click="searchDate"
                    class="flat-button pdf-button ml-10"
                  >
                    PDF Görüntüle
                  </button> -->
                  <div class="control ml-10">
                    <div @click="clickViewPdf" class="button is-info">
                      <span class="icon">
                        <svg
                          class="svg-inline--fa fa-file-pdf fa-w-12"
                          aria-hidden="true"
                          data-prefix="fas"
                          data-icon="file-pdf"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                          data-fa-i2svg=""
                          width="20px"
                          height="20px"
                        >
                          <path
                            fill="currentColor"
                            d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z"
                          ></path></svg
                        ><!-- <i class="fas fa-file-pdf"></i> -->
                      </span>
                      <span>PDF Görüntüle</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Table
              @handleRow="selectStatement($event)"
              :warnText="warnText"
              :data="tableStatement"
              :key="'statement' + tableStatement.rows.length"
              :isClickable="true"
              :isSort="false"
            >
            </Table>
          </template>
          <template v-if="tab == 1">
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
              <div :class="getLayout == 'mobile' ? 'mt-10 mb-10' : 'ml-20'">
                <button @click="searchDate" class="flat-button search-button">
                  Ara
                </button>
              </div>
            </div>
            <Table
              :data="tableBill"
              :key="'f-1' + tableBill.rows.length"
              :warnText="warnText"
            >
              <template #subtitle-tab>
                <div class="flex row mt-30">
                  <div class="tab-menu">
                    <button
                      @click="selectSubTab(index)"
                      v-for="(item, index) in subItems"
                      :key="item + '-' + index"
                      :class="{ active: index == activeSubTab }"
                    >
                      {{ item.text }}
                    </button>
                  </div>
                </div>
              </template>
            </Table>
          </template>

          <template v-if="tab == 2">
            <div
              :class="
                getLayout == 'mobile'
                  ? 'mt-10 mb-10 ml-1 mr-1 '
                  : 'mt-25 mb-25 ml-25 mr-25 border'
              "
            >
              <div class="pt-25 pb-25 pl-25 pr-25">
                <Table
                  :warnText="warnText"
                  :key="'f-3' + transferInfoTable.rows.length"
                  title="Göndereceğiniz Banka"
                  :data="transferInfoTable"
                  @handleRow="selectedRow($event)"
                >
                </Table>
              </div>
            </div>
            <div
              :class="
                getLayout == 'mobile'
                  ? 'mt-10 mb-10 ml-1 mr-1 '
                  : 'mt-25 mb-25 ml-25 mr-25 border'
              "
            >
              <div class="pt-25 pb-25 pl-25 pr-25">
                <div class="form-content__title">
                  <div class="form-content__title__first mb-20">
                    Gönderen Bilgisi
                  </div>
                  <div class="profile-content__form">
                    <form class="form-input-grid">
                      <div
                        :class="getLayout == 'mobile' ? 'grid ' : 'grid col-2'"
                      >
                        <div
                          class="input-grid"
                          :data-error="
                            errors.includes('sender_account_name')
                              ? errorMessage
                              : null
                          "
                        >
                          <input
                            v-model="form.sender_account_name"
                            class="flat-input"
                            type="text"
                            @input="handleValid('sender_account_name')"
                            placeholder="Gönderen Hesap Adı"
                          />
                        </div>
                      </div>
                      <div
                        :class="getLayout == 'mobile' ? 'grid ' : 'grid col-2'"
                      >
                        <div class="flex row">
                          <div
                            class="input-grid width-100"
                            :data-error="
                              errors.includes('amount') ? errorMessage : null
                            "
                          >
                            <input
                              v-model="form.amount"
                              class="flat-input"
                              type="text"
                              @input="handleValid('amount')"
                              placeholder="Miktar"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        :class="getLayout == 'mobile' ? 'grid ' : 'grid col-2'"
                      >
                        <div
                          class="input-grid"
                          :data-error="
                            errors.includes('message') ? errorMessage : null
                          "
                        >
                          <textarea
                            v-model="form.message"
                            class="textarea"
                            @input="handleValid('message')"
                            placeholder="Notunuz"
                          />
                        </div>
                      </div>
                    </form>
                    <div
                      :class="
                        getLayout == 'mobile'
                          ? 'form-content__form__button '
                          : 'form-content__form__button pr-20'
                      "
                    >
                      <button @click="sendForm" class="form-button ml-50">
                        Gönder
                      </button>
                      <div
                        class="form-content__form__button__left"
                        @click="resetForm"
                      >
                        SIFIRLA
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-if="tab == 3">
            <div :class="getLayout == 'mobile' ? 'pt-10 pb-20' : ''">
              <div class="flex row mb-20">
                <div class="tab-menu">
                  <button
                    @click="selectPaymentTab(index)"
                    v-for="(item, index) in subItemsPayment"
                    :key="item + '-' + index"
                    :class="{ active: index == activePaymentTab }"
                  >
                    {{ item.text }}
                  </button>
                </div>
              </div>
              <template v-if="activePaymentTab == 0">
                <!-- <SavedCard /> -->
                <Payment
                  @formHandle="paymentFormHandle($event)"
                  @installmentHandle="paymentInstallment($event)"
                  :isFormClear="isFormClear"
                  @installmentClear="clearInstallment"
                  :isSendFormLoading="isSendFormLoading"
                  :tablePayment="tablePayment"
                  :isBlur="isBlur"
                  warningMessage="Ödeme koşullarını görmek için kredi kartı bilgilerinizi giriniz."
                  @selectInstallment="selectInstallment($event)"
                  :savedCards="saved_cards"
                  :isNewCard="isNewCard"
                  @setIsNewCard="setIsNewCard($event)"
                />
              </template>
              <template v-if="activePaymentTab == 1">
                <Iyzilink></Iyzilink>
              </template>
            </div>
          </template>
          <template v-if="tab == 4">
            <div class="saved_cards">
              <div
                v-for="(card, index) in saved_cards"
                :key="card + index"
                class="saved_cards_item"
              >
                <img :src="`/cards/${cardImage[card.card_type]}`" />
                <div class="dots">
                  <span
                    class="dot"
                    v-for="index in 12"
                    :key="'dot' + index"
                  ></span>
                  <span>{{ card.last_four_number }}</span>
                </div>

                <span>{{ card.card_alias }}</span>

                <img @click="deleteCard(card.id)" src="/trash.png" />
              </div>
            </div>
          </template>
          <template v-if="tab == 5">
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
                <button @click="searchDate" class="flat-button search-button">
                  Ara
                </button>
              </div>
              <div>
                <button
                  @click="oldDataClick(isOld)"
                  class="flat-button old-button"
                >
                  {{ isOld ? 'Yeni Kayıtlar' : 'Eski Kayıtlar' }}
                </button>
              </div>
            </div>

            <Table
              @handleRow="rowClick($event)"
              :data="table3"
              :key="'f-' + table3.rows.length"
              :warnText="warnText"
              :isClickable="true"
            >
              <template #subtitle-tab>
                <div class="flex row mt-30">
                  <div class="tab-menu">
                    <button
                      @click="selectSubTab(index)"
                      v-for="(item, index) in subItems2"
                      :key="item + '-' + index"
                      :class="{ active: index == activeSubTab }"
                    >
                      {{ item.text }}
                    </button>
                  </div>
                </div>
              </template>
            </Table>
          </template>
        </div>
      </TabMenu>
    </div>
    <template v-if="show3dModal">
      <PaymentModal
        @close="
          show3dModal = false
          isLoading = false
          isSendFormLoading = false
        "
        width="485px"
        height="600px"
        :isActive="show3dModal"
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
import SearchInput from '@/components/common/SearchInput'
import DateInput from '@/components/common/DateInput'
import Payment from '@/components/common/Payment'
import Iyzilink from '@/components/common/Iyzilink'
import SavedCard from '@/components/common/SavedCard'
import CreditCardDetail from './CreditCardDetail'
import PaymentModal from '../Basket/PaymentModal'
import { dateFormat, dateSubtract, currentDate } from '@/utils/date'
import { mixinNumberFormatTr } from '@/utils'
import endpoints from '@/api/endpoints'

import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ContentFinancial',
  components: {
    TabMenu,
    Table,
    SearchInput,
    DateInput,
    Payment,
    Iyzilink,
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
      title: 'Finansal Hizmetler',
      items: [
        { text: 'HESAP ÖZETİ' },
        { text: 'ÇEK BİLGİLERİ' },
        { text: 'HAVALE BİLDİRİMİ' },
        { text: 'BAKİYE ÖDEME (K.K)' },
        { text: 'KREDİ KARTLARIM' },
        { text: 'KREDİ KARTI MAKBUZLARI' }
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
      }
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
    }),
    token() {
      return this.$auth?.strategy?.token?.get()?.split(' ')?.[1]
    }
  },
  methods: {
    ...mapActions({
      fetchRemittanceReport: 'foryou/fetchRemittanceReport',
      fetchResellerStatement: 'foryou/fetchResellerStatement',
      postRemittanceReport: 'foryou/postRemittanceReport',
      fetchPaymentHistory: 'foryou/fetchPaymentHistory',
      fetchCheckBillInformation: 'foryou/fetchCheckBillInformation',
      postBalancePaymentinstallment: 'foryou/postBalancePaymentinstallment',
      postBalancePayment: 'foryou/postBalancePayment',
      fetchPaymentHistoryById: 'foryou/fetchPaymentHistoryById',
      fetchPaymentHistoryByIdOld: 'foryou/fetchPaymentHistoryByIdOld'
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
    async getRemittanceReport() {
      this.isLoading = true
      this.warnText = ''
      if (Object.keys(this.fetchRemittanceReport).length) return
      await this.fetchRemittanceReport()
      let tableMap = this.getRemittanceReportList.map(item => {
        return [
          { component: 'TableRadio' },
          item.name,
          item.branch,
          item?.currency?.toUpperCase(),
          item.accountNo,
          item.iban
        ]
      })
      this.isLoading = false

      this.transferInfoTable.rows = tableMap
      this.warnText = this.transferInfoTable.rows.length
        ? ''
        : 'Seçili tarih aralığında kayıt bulunamadı.'
    },
    async getPaymentHistoryOld(start, end, payment_type) {
      this.isLoading = true
      this.warnText = ''

      if (Object.keys(this.fetchPaymentHistory).length) return
      await this.fetchPaymentHistoryOld({
        start_date: dateFormat(start),
        end_date: dateFormat(end) || null,
        payment_type
      })
      let tableMap = this.getPaymentHistoryList.map(item => {
        return [
          item?.created_at ? item?.created_at?.split('T')?.[0] : '',
          item?.payment_type || '',
          mixinNumberFormatTr(item?.total_payment) || '',
          { data: item }
        ]
      })
      this.isLoading = false
      this.table3.rows = tableMap
      this.warnText = this.table3.rows.length
        ? ''
        : 'Seçili tarih aralığında kayıt bulunamadı.'
    },
    async getPaymentHistory(start, end, payment_type) {
      this.isLoading = true
      this.warnText = ''

      if (Object.keys(this.fetchPaymentHistory).length) return
      await this.fetchPaymentHistory({
        start_date: dateFormat(start),
        end_date: dateFormat(end) || null,
        payment_type
      })
      let tableMap = this.getPaymentHistoryList.map(item => {
        return [
          item?.created_at ? item?.created_at?.split('T')?.[0] : '',
          item?.payment_type || '',
          mixinNumberFormatTr(item?.total_payment) || '',
          { data: item }
        ]
      })
      this.isLoading = false
      this.table3.rows = tableMap
      this.warnText = this.table3.rows.length
        ? ''
        : 'Seçili tarih aralığında kayıt bulunamadı.'
    },
    async getPaymentHistoryId(id) {
      this.isLoading = true
      this.warnText = ''
      await this.fetchPaymentHistoryById(id)

      this.isLoading = false
    },
    async getPaymentHistoryIdOld(id) {
      this.isLoading = true
      this.warnText = ''
      await this.fetchPaymentHistoryByIdOld(id)

      this.isLoading = false
    },
    clickViewPdf() {
      let url = `${
        this.$axios.defaults.baseURL
      }for_you/reseller-statement_pdf/?start_date=${dateFormat(
        this.dateStart
      )}&end_date=${dateFormat(this.dateEnd)}&type=pdf&key=${this.token}`
      window.open(url, '_blank')
    },
    async getResellerStatement(start, end, type) {
      try {
        this.isLoading = true
        this.warnText = ''
        if (Object.keys(this.fetchResellerStatement).length) return
        await this.fetchResellerStatement({
          start_date: dateFormat(start),
          end_date: dateFormat(end) || null,
          type: type || null
        }).then(resp => {
          this.tableStatement.rows = resp.map(item => {
            if (!item.document_type) {
              return [
                {
                  component: 'TableBoldColumn',
                  text: item.date?.split(' ')?.[0] || ''
                },
                {
                  component: 'TableBoldColumn',
                  text: item.explanation
                },
                '',
                {
                  component: 'TableBoldColumn',
                  text: mixinNumberFormatTr(item.dept)
                },
                {
                  component: 'TableBoldColumn',
                  text: mixinNumberFormatTr(item.will_take)
                },
                {
                  component: 'TableBoldColumn',
                  text: mixinNumberFormatTr(item.balance)
                },
                {
                  component: 'TableBoldColumn',
                  text: item.type
                }
              ]
            } else {
              return [
                item.date?.split(' ')?.[0] || '',
                { component: 'BankStatementLink', options: item },
                item.explanation,
                mixinNumberFormatTr(item.dept),
                mixinNumberFormatTr(item.will_take),
                mixinNumberFormatTr(item.balance),
                item.type
              ]
            }
          })
          this.isLoading = false
          this.warnText = this.tableStatement.rows.length
            ? ''
            : 'Seçili tarih aralığında kayıt bulunamadı.'
        })
      } catch (error) {
        console.log(error)
        this.isLoading = false
      }
    },
    async getCheckBillInfo(start, end) {
      this.isLoading = true
      this.warnText = ''
      if (Object.keys(this.fetchCheckBillInformation).length) return
      await this.fetchCheckBillInformation({
        start_date: dateFormat(start),
        end_date: dateFormat(end) || null
      })
      let tableMap = this.getChequeBillList.map(item => {
        return [
          item.system_number,
          item.description,
          item.bank_name,
          item.account_number,
          item.document_type,
          item.external_document_number,
          mixinNumberFormatTr(item.amount),
          mixinNumberFormatTr(item.exchange_rate),
          mixinNumberFormatTr(item.amount)
        ]
      })
      this.isLoading = false
      this.tableBill.rows = tableMap
      this.warnText = this.tableBill.rows.length
        ? ''
        : 'Seçili tarih aralığında kayıt bulunamadı.'
    },
    async getSavedCards() {
      try {
        this.isLoading = true
        const { data, status } = await this.$axios({
          ...endpoints.for_you.card_list
        })

        if (status == 200) {
          this.saved_cards = data.results
          this.isLoading = false

          return
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    }
  },
  created() {
    this.dateStart = dateSubtract(2)
    this.dateEnd = currentDate()
    if (this.tab == 0) {
      this.getResellerStatement(this.dateStart, this.dateEnd)
    } else if (this.tab == 1) {
      this.getCheckBillInfo(this.dateStart, this.dateEnd)
    } else if (this.tab == 2) {
      this.getRemittanceReport()
    } else if (this.tab == 5) {
      this.getPaymentHistory(this.dateStart, this.dateEnd)
    }
    this.getSavedCards()
  }
}
</script>

<style lang="scss" scoped>
// @import '@/assets/css/variables.scss/';

.saved_cards {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &_item {
    display: grid;
    grid-template-columns: 50px auto 1fr 40px;
    gap: 40px;
    border: 1px solid rgba(31, 31, 31, 0.1);
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    padding: 20px;

    img {
      width: 100%;
      padding: 10px;
      border: 1px solid #d9d9d9;
      border-radius: 5px;
    }

    img:last-child {
      border: none;
      padding: 10px;
      cursor: pointer;
    }

    .dots {
      display: flex;
      gap: 5px;
      align-items: center;
      color: #2c3357;
      font-weight: 500;

      .dot {
        border-radius: 50%;
        width: 4px;
        height: 4px;
        background: #2c3357;

        &:nth-child(4n) {
          margin-right: 10px;
        }
      }

      span:last-child {
        font-size: 14px;
        color: #2c3357;
        font-weight: 500;
      }
    }
  }
}

.search-button {
  height: 40px;
  width: 70px;
}

.pdf-button {
  height: 40px;
  width: 70px;
}

.old-button {
  margin-left: 20px;
  height: 40px;
  width: 200px;
  background: rgba(31, 31, 31, 0.5);
}

textarea {
  background: #f2f2f2;
}

.financial-content {
  min-height: 600px;
  padding: 30px 25px;
}

.tab-menu {
  border-bottom: 1px solid rgba(31, 31, 31, 0.1);
  height: 25px;
  width: 100%;

  button {
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
  margin-top: 50px;
  margin-left: 25px;
  margin-right: 92px;
  padding-bottom: 60px;

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
    margin-top: 30px;

    &__button {
      margin-top: 30px;

      width: 50%;
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
