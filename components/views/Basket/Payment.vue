<template>
  <!-- v-loading="{ loading: false, text: 'Yükleniyor' }" -->
  <div class="wizard-component">
    <div class="wizard-component__header">
      <div
        :class="{ 'not-active': !isCompleted && !isActive }"
        class="wizard-component__header__title"
      >
        Ödeme Bilgileri
      </div>
      <div
        v-if="isCompleted && step != 3"
        class="wizard-component__completed-summary"
      >
        <button
          :disabled="isWizardLoading"
          @click="
            () => {
              console.log('Değşitir veya Düzenleye basıldı.')
              $emit('setStep', step)
            }
          "
          class="btn-text-simple"
        >
          <img src="@/assets/svg/edit.svg" />
          Değiştir veya Düzenle
        </button>
        <!--<span class="split-v"></span>-->
      </div>
    </div>
    <div v-if="isActive" class="wizard-component__content">
      <div id="yzc-script" class="p-30">
        <!-- <div class="flex row mb-20">
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
        </div> -->
        <template
          v-if="
            getPaymentType.payment_type == 'credit_card_installment' ||
              getPaymentType.payment_type == 'credit_card'
          "
        >
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
            :inBasket="true"
          />
          <!-- <div
            v-if="isInstallmentLoading"
            class="flex row pt-20 pb-20 pl-20 pr-60 mb-20 tranfer-tab align-center"
          >
            <icons name="Info" class="mr-10"></icons>
            <p class="font-normal">Taksit Seçenekleri Yükleniyor ...</p>
          </div>
          <PaymentInfo
            title="Kart Bilgileri"
            @formHandle="paymentFormHandle($event)"
            @installmentHandle="paymentInstallment($event)"
          ></PaymentInfo>
          <div :class="{ 'mt-25': tablePayment.rows.length }">
            <GreenCheckbox
              @onChange="handle3dSecure($event)"
              :item="{ name: '3D Güvenli ödeme sistemi ile ödemek istiyorum' }"
            ></GreenCheckbox>
          </div>
          <div
            v-if="tablePayment.rows.length && !isInstallmentLoading"
            class="mt-20 border pt-30 pl-20 pr-20 pb-20"
          >
            <TableInstallment
              :isInstallment="true"
              @handleRow="selectInstallment($event)"
              :data="tablePayment"
              title="Taksit Seçenekleri"
              :key="'f' + tableBalance.rows"
            >
            </TableInstallment>
          </div> -->
        </template>
        <template v-else-if="getPaymentType.payment_type == 'bank_transfer'">
          <div
            class="flex row pt-20 pb-20 pl-20 pr-60 tranfer-tab align-center"
          >
            <icons name="Info" class="mr-10"></icons>
            <p class="font-normal">
              Siparişinizi avantajlı fiyatlar ile alabilmek için aşağıdaki
              tutarı listelenen banka hesaplarından birine havale yapmalısınız.
            </p>
          </div>
          <div
            v-if="tableTransfer.rows.length"
            class="mt-20 border pt-30 pl-20 pr-20 pb-20"
          >
            <TableInstallment
              @handleRow="selectBank($event)"
              :data="tableTransfer"
              title="Banka Bilgileri"
              :key="'f' + tableBalance.rows"
            >
            </TableInstallment>
          </div>
        </template>
        <template v-if="getPaymentType.payment_type == 'open_account_30_day'">
          <div v-if="tableBalance.rows.length" class="pt-10">
            <TableInstallment
              marginTitle="0px"
              widthFirstTh="165px"
              :data="tableBalance"
              title="Bakiye Bilgileri"
              :key="'f' + tableBalance.rows"
            >
            </TableInstallment>
          </div>
        </template>

        <template v-else-if="getPaymentType.payment_type == 'cheque'">
          <div v-if="tableBalance.rows.length" class="pt-10">
            <TableInstallment
              marginTitle="0px"
              widthFirstTh="165px"
              :data="tableBalance"
              title="Bakiye Bilgileri"
              :key="'f' + tableBalance.rows"
            >
            </TableInstallment>
          </div>

          <div class="cheques">
            <h3>Çekler</h3>

            <div
              class="imgBox"
              v-if="chequeImage"
              v-loading="{ loading: chequeLoading }"
            >
              <img :src="chequeImage" />
              <div class="close" @click="clearCheque">X</div>
              <input
                type="text"
                v-model="chequeName"
                placeholder="Çek için bir ad tanımlayın"
              />
              <button
                class="upload"
                :disabled="chequeName.length < 1"
                @click="uploadCheque(chequeFile, chequeName)"
              >
                Yükle
              </button>
            </div>

            <div v-else class="add-cheque-box" @click="$refs.file.click()">
              <input
                type="file"
                ref="file"
                @change="handleCheque"
                accept="image/*"
                style="display: none"
              />
              <Icon name="upload" stroke-color="transparent" />
              <span class="ml-10">Yeni Çek Yükleyin</span>
            </div>

            <TableInstallment
              marginTitle="20px"
              widthFirstTh="165px"
              :data="tableCheques"
              title=""
              :isChequesTable="true"
              @chooseCheque="chooseCheque"
              :isActiveCheque="activeCheque"
              :key="'f' + tableCheques.rows"
            >
            </TableInstallment>
          </div>
        </template>
      </div>
    </div>
    <div v-if="isActive" class="step-action-grid">
      <!-- <button :disabled="isWizardLoading" @click="nextStep" class="flat-button">
        DEVAM ET
      </button> -->
      <!-- <button
        v-if="!isError && false"
        :disabled="isWizardLoading"
        @click="$emit('setStep', step + 1)"
        class="flat-button"
      >
        DEVAM ET
      </button>
      <button
        v-if="isError || true"
        @click="fetchCreditCard"
        class="flat-button"
      >
        Tekrar Dene
      </button> -->
    </div>
  </div>
</template>

<script>
import GreenCheckbox from '@/components/common/GreenCheckbox'
import icons from '@/components/icons'
import Icon from '@/components/Icon'

import endpoints from '@/api/endpoints'
import PaymentInfo from '@/components/views/Basket/PaymentInfo'
import TableInstallment from '@/components/views/Basket/TableInstallment'
import { mapActions, mapGetters } from 'vuex'
import { CURRENCY_SYMBOL } from '@/constants'
import Payment from '@/components/common/Payment'

export default {
  props: {
    step: { type: Number, default: null },
    isActive: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    payload: { type: Object, default: () => {} },
    isWizardLoading: { type: Boolean, default: false }
  },
  components: {
    PaymentInfo,
    TableInstallment,
    GreenCheckbox,
    icons,
    Icon,
    Payment
  },
  watch: {
    step(value) {
      if (value == 2 && this.getPaymentType.payment_type == 'bank_transfer') {
        this.getRemittanceReport()
      }
    },
    // Dont use created cycle for initial condition.
    // isActive: function (newVal, oldVal) {
    //   if (newVal) this.fetchCreditCard()
    // },
    getCheques: function(newVal, old) {
      if (newVal) {
        this.tableCheques.rows = []
        this.getCheques.forEach(cheque => {
          this.tableCheques.rows.push([cheque.photo, cheque.title, cheque.id])
        })
      }
    }
  },
  data() {
    return {
      currencySymbol: { ...CURRENCY_SYMBOL },
      activePaymentTab: 0,
      isFormClear: false,
      isBlur: true,

      subItemsPayment: [
        { text: 'KREDİ KARTI / BANKA KARTI' },
        { text: 'HAVALE / EFT' },
        { text: 'AÇIK HESAP' }
      ],
      isLoading: false,
      isInstallmentLoading: false,
      isError: false,
      externalScript: null,
      isSendFormLoading: false,
      isNewCard: true,
      saved_cards: [],
      warnText: '',

      cardImage: {
        MASTER_CARD: 'mastercard.png',
        VISA: 'visa.png'
      },
      tablePayment: {
        headers: ['', 'Taksit Seçeneği', 'Aylık Ödeme', 'Toplam Ödeme'],
        rows: []
      },
      tableTransfer: {
        headers: ['Banka Adı', 'Şube Adı', 'Para Birimi', 'İban'],
        rows: []
      },
      tableBalance: {
        headers: ['', ''],
        rows: []
      },
      tableCheques: {
        headers: ['Çek Görseli', 'Açıklama', ''],
        rows: []
      },
      creditCardInfo: {
        card_holder_name: null,
        card_number: '',
        expire_month: 0,
        expire_year: 0,
        cvc: null,
        installment_count: 1
      },
      chequeImage: '',
      chequeName: '',
      chequeFile: null,
      activeCheque: null
    }
  },
  computed: {
    ...mapGetters({
      getRemittanceReportList: 'foryou/getRemittanceReportList',
      getBasketDetails: 'basket/getBasketDetails',
      getCreditCard: 'payment/getCreditCard',
      getCheques: 'cheques/getCheques',
      chequeLoading: 'cheques/getChequeLoading',
      getPaymentType: 'payment/getPaymentType',
      setPaymentStatus: 'payment/setPaymentStatus',
      getActiveCheque: 'cheques/getActiveCheque',
      getBasketQueries: 'basket/getBasketQueries',
      getLockedBasketDetails: 'basket/getLockedBasketDetails'
    })
  },
  methods: {
    ...mapActions({
      fetchRemittanceReport: 'foryou/fetchRemittanceReport',
      postCheckoutInstallments: 'payment/postCheckoutInstallments',
      setPaymentType: 'payment/setPaymentType',
      fetchCheques: 'cheques/fetchCheques',
      addCheque: 'cheques/addCheque',
      chosenCheque: 'cheques/chooseCheque',
      fetchFinanceInfo: 'foryou/fetchFinanceInfo'
    }),
    async uploadCheque(photo, title) {
      const formData = new FormData()
      formData.append('photo', photo)
      formData.append('title', title)
      formData.append('is_order', 0)

      const cheque = await this.addCheque(formData)

      if (cheque) {
        this.$notify({
          type: 'success',
          title: 'İşlem Başarılı!',
          text: `${cheque.title} adlı çek başarılı bir şekilde yüklendi.`,
          duration: 5000
        })
        this.clearCheque()
      } else {
        this.$notify({
          type: 'error',
          title: 'İşlem Başarısız!',
          text: 'Çek yüklenirken bir hata meydana geldi.',
          duration: 5000
        })
      }
    },
    clearCheque() {
      this.chequeImage = ''
      this.chequeName = ''
    },
    chooseCheque(item) {
      this.chosenCheque(item[2])
      this.activeCheque = item[2]
    },
    handleCheque(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.chequeFile = files[0]
      this.createImage(files[0])
    },
    createImage(file) {
      var reader = new FileReader()
      var vm = this

      reader.onload = e => {
        vm.chequeImage = e.target.result
      }
      reader.readAsDataURL(file)
    },
    clearInstallment() {
      this.$nextTick(() => {
        this.tablePayment.rows = []
      })
    },
    handle3dSecure(item) {
      //if (item.isChecked) {
      this.setPaymentType({ is_three_d_security: item.isChecked })
      //}
    },
    paymentFormHandle(form) {
      this.setPaymentType({ card_info: { ...form } })
    },
    paymentInstallment(form) {
      if (this.isNewCard) {
        this.setPaymentType({
          card_info: { ...form.inBasketForm },
          is_saved_card: form.is_saved_card
        })
      } else {
        this.setPaymentType({ card_info: { ...form.selectedCard } })
      }
      try {
        let reqObj = {
          payment_type: this.getPaymentType.payment_type,
          card_number: form.card_number,
          currency: this.getBasketQueries.currecy
            ? this.getBasketQueries.currecy
            : 'TL',
          use_wallet_points: this.getBasketQueries.is_use_wallet_points
            ? this.getBasketQueries.is_use_wallet_points
            : false
        }
        this.isInstallmentLoading = true
        let total = this.getBasketDetails?.basketSummary?.grandTotal
        console.log('Nasıl tak diye burdayım 0', this.getLockedBasketDetails)
        console.log('Nasıl tak diye burdayım 1', reqObj)
        //let basketPrice = total.substring(1, total.length).replace(',', '.')

        console.log('Nasıl tak diye burdayım ', this.basketDetails)
        if (this.getLockedBasketDetails.basketSummary)
          if (
            this.getLockedBasketDetails.basketSummary.document_type &&
            this.getLockedBasketDetails.basketSummary.document_number
          ) {
            reqObj = {
              ...reqObj,
              basket_type: 'kilit',
              document_type: this.getLockedBasketDetails.basketSummary
                .document_type,
              document_number: this.getLockedBasketDetails.basketSummary
                .document_number
            }
          }
        console.log('Nasıl tak diye burdayım 2', reqObj)

        this.postCheckoutInstallments({
          ...reqObj
        }).then(response => {
          console.log('price...', response)
          if (response?.installmentDetails?.length) {
            let tableMap = response.installmentDetails[0][
              'installmentPrices'
            ].map(item => {
              return [
                { component: 'TableRadio', data: item },
                item.installmentNumber,
                item.installmentPrice,
                item.totalPrice
              ]
            })

            this.tablePayment.rows = tableMap
            this.isBlur = false
          }
          this.isInstallmentLoading = false
        })
      } catch (error) {
        console.log(error)
        this.isInstallmentLoading = false
      }
    },
    selectInstallment(item) {
      if (item) {
        this.setPaymentType({ installment: item[0] })
      }
    },
    setIsNewCard(value) {
      this.isNewCard = value
    },
    selectBank(item) {
      // console.log(item)
    },
    selectPaymentTab(index) {
      this.activePaymentTab = index
    },

    async getRemittanceReport() {
      this.isLoading = true
      if (Object.keys(this.fetchRemittanceReport).length) return
      await this.fetchRemittanceReport()
      let tableMap = this.getRemittanceReportList.map(item => {
        return [item.name, item.branch, item.currency, item.iban]
      })
      this.isLoading = false

      this.tableTransfer.rows = tableMap
    },
    async getOpenAccount() {
      this.isLoading = true
      await this.fetchFinanceInfo().then(response => {
        if (response) {
          let currency = this.currencySymbol[response.currency]
          this.tableBalance.rows = [
            ['Mevcut Bakiye', currency + response.balance],
            ['Bekleyen Siparişler', currency + response.pending_orders],
            ['Müsait Limit', currency + response.available_limits]
          ]
        }
      })
      this.isLoading = false
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
    if (this.getPaymentType.payment_type == 'cheque') {
      this.fetchCheques()
    } else if (this.getPaymentType.payment_type == 'open_account_30_day') {
      this.getOpenAccount()
    } else {
      this.getSavedCards()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../styles/Basket/wizard-component.scss';
</style>
