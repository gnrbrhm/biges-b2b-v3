<template>
  <div class="column is-9">
    <div class="product-content">
      <!-- START: payment methods -->
      <div
        v-if="
          getLockedBasketDetails &&
            getLockedBasketDetails.paymnetOptions &&
            getLockedBasketDetails.paymnetOptions.length > 0
        "
        :class="`payments col${getLockedBasketDetails.paymnetOptions.length}`"
      >
        <div
          v-for="(payment, index) in getLockedBasketDetails.paymnetOptions"
          v-show="
            (payment.paymentDetails.paymentMethodName.includes('cheque') &&
              hasCheque) ||
              (payment.paymentDetails.paymentMethodName == 'bank_transfer' &&
                hasBankTransfer) ||
              (payment.paymentDetails.paymentMethodName == 'credit_card' &&
                hasCreditCart)
          "
          :key="payment.paymentDetails.paymentMethodName + '-' + index"
          class="payment-option"
          @click="
            () => {
              $emit(
                'onChangePaymentMethod',
                payment.paymentMethodName == 'cheque'
                  ? 'cheque_30'
                  : payment.paymentDetails.paymentMethodName
              )
            }
          "
          :class="{
            disabled:
              paymentMethodName == payment.paymentDetails.paymentMethodName
            // disabled: true
          }"
        >
          <PaymentOptionItem
            :isInstallment="isInstallment"
            :payment="payment"
            :paymentMethodName="paymentMethodName"
            @handleInstallment="selectInstallment"
            @handleCheque="selectCheque"
            :selectedCheque="selectedCheque"
            :creditCardTitle="creditCardTitle"
            :disabled="true"
          ></PaymentOptionItem>
        </div>
      </div>
      <!-- END: payment methods -->
      <div class="product-list-basket">
        <div class="table-container">
          <table class="product-table ">
            <thead>
              <tr class="bug-fix">
                <th style="margin-right: 245px;text-align:left;">Ürün</th>
                <th>Miktar</th>
                <th>Birim Fiyatı</th>
                <th>Satır Toplamı</th>
              </tr>
            </thead>
            <tbody v-if="getLockedBasketDetails">
              <tr
                v-for="(productLine,
                index) in getLockedBasketDetails.productList"
                :key="productLine + '-' + index"
                class="bug-fix"
              >
                <td class="product-detail">
                  <template>
                    <img
                      class="product-img"
                      :src="productLine.imageURL"
                      alt=""
                    />
                  </template>
                  <div class="product-detail-content">
                    <div
                      style="display: flex;
                            align-items: center;
                            gap: 0.5vw;
                           "
                    >
                      <template
                        style=" font-size: 16px;
                            font-weight: 500;
                            line-height: 19.36px;"
                      >
                        {{ productLine.stockCode }}
                      </template>
                    </div>
                    <span class="description">
                      {{ productLine.description }}</span
                    >
                  </div>
                </td>
                <td class="quantity">
                  <div class="field input-field bg-none">
                    <span>
                      {{ productLine.quantity }}
                    </span>
                  </div>
                </td>
                <td class="sm product-prices">
                  <div class="retail-price">
                    <span>LİSTE FİYATI</span>
                    {{ productLine.unitPrice }}
                  </div>
                  <div class="total-line">
                    <span>SİZE ÖZEL</span>
                    {{ productLine.subTotal }}
                  </div>
                </td>
                <td class="md lg center">
                  <div class="retail-price">
                    {{ productLine.unitPrice }}
                  </div>
                </td>
                <td class="md lg center">
                  <div class="total-line">
                    {{ productLine.subTotal }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="basket-control">
        <div class="control locked-basket-desc">
          <div class="locked-icon">
            <Icons name="GrayLocked" />
          </div>
          <p class="locked-text">
            Kilitli sepet, size özel bir teklif veya vereceğiniz özel bir
            sipariş için hazırlanmıştır. İçeriği ve detayları değiştirilemez.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Icon from '@/components/Icon.vue'
import Icons from '@/components/icons'

import ModalInstallment from './ModalInstallment.vue'
import PaymentOptionItem from './PaymentOptionItem.vue'

export default {
  components: {
    appIcon: Icon,
    Icons,
    ModalInstallment,
    PaymentOptionItem
  },
  props: {
    selectedPaymentMethodName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      paymentMethodName: this.selectedPaymentMethodName,
      isInstallment: true,
      creditCardInstallment: {},
      creditCardTitle: 'TAKSİTLİ FİYAT',
      selected: [],
      paymentOptions: [
        {
          paymentMethodName: 'open_account_30_day'
        },
        {
          paymentMethodName: 'cheque'
        },
        {
          paymentMethodName: 'credit_card'
          //   paymentMethodName: 'credit_card_installment'
        },
        {
          paymentMethodName: 'bank_transfer'
        }
      ],
      selectedCheque: ''
    }
  },
  computed: {
    ...mapGetters({
      getLockedBasketDetails: 'basket/getLockedBasketDetails',
      getPaymentType: 'payment/getPaymentType',
      getSelectedCurrency: 'payment/getSelectedCurrency',
      getLayout: 'getLayout'
    }),

    creditCardSubTotal() {
      return this.creditCardInstallment?.paymentDetails?.subTotal
    },
    creditCardEarn() {
      return this.creditCardInstallment?.paymentDetails?.earningAmountDetail
    },
    hasCheque() {
      return this.$auth?.user?.profile?.is_cheque
    },
    hasBankTransfer() {
      return this.$auth?.user?.profile?.is_bank_transfer
    },
    hasCreditCart() {
      return this.$auth?.user?.profile?.is_credit_card
    }
    // paymentOptions() {
    //   return this.getLockedBasketDetails?.paymnetOptions
    //     ?.map((item) => {
    //       if (item.paymentMethodName != 'credit_card') {
    //         return item
    //       } else {
    //         this.creditCardInstallment = item
    //       }
    //     })
    //     .filter((value) => value)
    // }
  },
  watch: {
    selectedPaymentMethodName(value) {
      console.log('LOG::::selectedPaymentMethodName', value)
      this.paymentMethodName = value
      this.checkMethodName(value)
    }
  },
  methods: {
    ...mapActions({
      setPaymentType: 'payment/setPaymentType'
    }),
    selectCheque(cheque) {
      let selectionCheque = this.getLockedBasketDetails.paymnetOptions.filter(
        op => {
          return op.paymentMethodName == cheque
        }
      )[0]
      this.selectedCheque = selectionCheque.paymentDetails.paymentMethodName
      this.paymentOptions = [
        ...this.paymentOptions.map(item => {
          if (item.paymentTypeName == 'Çek')
            return {
              ...item,
              paymentDetails: selectionCheque.paymentDetails
            }
          else
            return {
              ...item
            }
        })
      ]
      this.$emit('onChangePaymentMethod', cheque)
    },
    selectInstallment(installment) {
      this.isInstallment = installment
      if (installment) {
        let findItem = this.getLockedBasketDetails?.paymnetOptions.find(
          item => item.paymentMethodName == 'credit_card_installment'
        )
        let findIndex = this.paymentOptions.findIndex(
          item => item.paymentMethodName == 'credit_card'
        )
        this.paymentOptions.splice(findIndex, 1, findItem)
        this.creditCardTitle = 'TAKSİTLİ FİYAT'
        this.$emit('onChangePaymentMethod', findItem.paymentMethodName)
      } else {
        let findItem = this.getLockedBasketDetails?.paymnetOptions.find(
          item => item.paymentMethodName == 'credit_card'
        )
        let findIndex = this.paymentOptions.findIndex(
          item => item.paymentMethodName == 'credit_card_installment'
        )
        this.paymentOptions.splice(findIndex, 1, findItem)
        this.creditCardTitle = 'TEK ÇEKİM'
        this.$emit('onChangePaymentMethod', findItem.paymentMethodName)
      }

      // this.isInstallment = !this.isInstallment
      // if (!this.isInstallment) {
      //   let findItem = this.getLockedBasketDetails?.paymnetOptions.find(
      //     (item) => item.paymentMethodName == 'credit_card_installment'
      //   )

      //   this.creditCardTitle = 'TAKSİTLİ FİYAT'
      // } else {
      //   this.creditCardTitle = 'TEK ÇEKİM'
      // }
      // let findIndex=this.basketDetails?.paymentOptions.findIndex(val=>val.paymentMethodName==item.paymentMethodName)
      // if (item.paymentMethodName=="credit_card") {

      // }
    },
    async checkMethodName(value) {
      console.log('checkMethodName:', value)
      if (value == 'open_account_30_day') {
        for await (let item of this.getLockedBasketDetails?.paymnetOptions) {
          if (!item.status) {
            consol.log('İf İçi Anam')
            this.paymentMethodName = 'bank_transfer'
            // this.$emit('onChangePaymentMethod', 'bank_transfer')
          } else {
            console.log('Else içi Anam')
          }
        }
        // this.getLockedBasketDetails?.paymnetOptions.forEach((item) => {
        //   if (!item.status) {
        //     this.paymentMethodName = 'bank_transfer'
        //     this.$emit('onChangePaymentMethod', 'bank_transfer')
        //   }
        // })
      } else {
        console.log('Deneme 12')
      }
    }
  },
  created() {
    this.checkMethodName(this.selectedPaymentMethodName)

    this.getLockedBasketDetails?.paymnetOptions.forEach((rpo, array) => {
      console.log('RPOOO:', rpo)
      console.log(
        'splittedd:::',
        rpo.paymentDetails.paymentMethodName.split('_')[0]
      )
      if (rpo.paymentDetails.paymentMethodName.split('_')[0] != 'cheque') {
        this.paymentOptions = [
          ...this.paymentOptions.map(po => {
            return rpo.paymentDetails.paymentMethodName == po?.paymentMethodName
              ? {
                  ...po,
                  ...rpo
                }
              : { ...po }
          })
        ]
      } else if (
        rpo.paymentDetails.paymentMethodName.split('_')[0] == 'cheque'
      ) {
        this.paymentOptions[1] = {
          ...this.paymentOptions[1],
          chequeOptions: this.getLockedBasketDetails?.paymnetOptions
            .map(t => {
              if (t.paymentDetails.paymentMethodName.split('_')[0] == 'cheque')
                return {
                  name: t?.paymentDetails?.paymentMethodName,
                  price: t?.paymentDetails?.subTotal
                }
            })
            .filter(item => item),
          paymentDetails: this.getLockedBasketDetails?.paymnetOptions.filter(
            item => {
              if (
                item.paymentDetails.paymentMethodName.split('_')[0] == 'cheque'
              )
                if (this.selectedPaymentMethodName.split('_')[0] == 'cheque')
                  return (
                    item.paymentDetails.paymentMethodName ==
                    this.selectedPaymentMethodName
                  )
                else {
                  return (
                    item.paymentDetails.paymentMethodName.split('_')[0] ==
                    'cheque'
                  )
                }
            }
          )[0]?.paymentDetails,
          paymentTypeName: 'Çek',
          status: true
        }
      }
    })

    if (
      this.selectedPaymentMethodName.split('_')[0] == 'cheque' &&
      this.selectedPaymentMethodName.split('_').length == 2
    ) {
      console.log('LOG::::İf')
      this.selectedCheque = this.selectedPaymentMethodName
      this.selectedPaymentMethodName = 'cheque'
    } else {
      console.log('LOG::::else')
      const filterOption = this.getLockedBasketDetails?.paymnetOptions.filter(
        item => {
          console.log('itemmm ELSE:', item)
          return item.paymentDetails.paymentMethodName.split('_')[0] == 'cheque'
        }
      )
      console.log('filterOption:', filterOption)
      if (filterOption?.length > 0) {
        this.selectedCheque = filterOption?.[0].paymentDetails.paymentMethodName
      }

      if (this.selectedPaymentMethodName === 'cheque')
        this.$emit('onChangePaymentMethod', this.selectedCheque)
    }

    if (!this.hasBankTransfer && !this.hasCreditCart) {
      this.paymentMethodName = 'cheque'
      this.payment_type = 'cheque_30'
      this.setPaymentType({ payment_type: this.payment_type })
    }

    this.paymentOptions = this.paymentOptions.filter(val => val?.status)

    if (
      this.getLockedBasketDetails &&
      this.getLockedBasketDetails.availableCampaignProductsCount
    )
      this.$emit('openCampaign')
  }
}
</script>

<style lang="scss" scoped>
.isDiscounted {
  padding: 2px 4px;
  background: rgba(35, 209, 96, 0.05);
  border: 1px solid rgba(35, 209, 96, 0.1);
  color: #23d160;
  font-weight: 600;
  font-size: 9px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.bg-none {
  background: none !important;
  font-weight: 600;
}

.locked-basket-desc {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  background: #1f1f1f0d;
  border-radius: 3px;
  width: 540px;
  height: 68px;

  .locked-icon {
    padding: 0px 15px;
  }

  .locked-text {
    font-size: 14px;
    line-height: 17px;
    color: #1f1f1fb2;
  }
}

.bug-fix {
  grid-template-columns: 3fr 1fr 1fr 1fr !important;
}

.product-detail-Locked {
  min-width: 300px;
  width: 100%;
  display: inline !important;
  grid-template-columns: 70px 1fr;
  grid-column-gap: 15px;

  .material {
    display: flex;
    align-items: center;
    gap: 0.5vw;
    color: #1f1f1f;
    line-height: 19px;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 5px;
  }
}

.isOutlet {
  padding: 2px 4px;
  background: rgba(255, 221, 87, 0.05);
  border: 1px solid rgba(255, 221, 87, 0.5);
  color: rgba(31, 31, 31, 0.5);
  font-weight: 600;
  font-size: 9px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.isEco {
  padding: 2px 4px;
  background: rgba(255, 42, 86, 0.05);
  border: 1px solid rgba(255, 42, 86, 0.1);
  color: #ff2a56;
  font-weight: 600;
  font-size: 9px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.isCampaigned {
  padding: 2px 4px;
  background: rgba(51, 116, 220, 0.05);
  border: 1px solid rgba(51, 116, 220, 0.1);
  color: #3374dc;
  font-weight: 600;
  font-size: 9px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.isAlternative {
  padding: 2px 4px;
  background: rgba(0, 209, 178, 0.05);
  border: 1px solid rgba(0, 209, 178, 0.1);
  color: #00d1b2;
  font-weight: 600;
  font-size: 9px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.selected {
  background-color: #ddd !important;
}
.checkbox {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* When the checkbox is checked, add a blue background */
.checkbox input:checked ~ .checkmark {
  background-color: #4caf50;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox .checkmark:after {
  left: 8px;
  top: 0px;
  width: 10px;
  height: 20px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

tr.selected_items {
  grid-template-columns: 0.5fr 1fr 6fr !important;
  & th:last-child {
    text-align: left !important;
    font-weight: 600 !important;
  }
}

.garbage {
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;

  & span {
    padding-left: 10px;
  }
}

.campaign-input {
  width: 130px;
}
</style>
