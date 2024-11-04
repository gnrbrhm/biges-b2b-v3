<template>
  <div class="column is-9">
    <div class="product-content">
      <div
        v-if="
          getBasketDetails && getBasketDetails.availableCampaignProductsCount
        "
        class="campaign"
      >
        <span class="icon">
          <app-icon name="gift-box" icon-color="transparent" />
        </span>
        <p>
          Sepetinize tanımlı kazanmış olduğunuz
          {{ getBasketDetails.availableCampaignProductsCount }} Adet kampanyalı
          ürün var
        </p>

        <a href="#" @click="$emit('openCampaign')"
          >Kampanyaları Gör

          <span>({{ getBasketDetails.availableCampaignProductsCount }})</span>
        </a>
      </div>
      <!-- START: payment methods -->
      <div
        v-if="
          getBasketDetails &&
            getBasketDetails.paymentOptions &&
            getBasketDetails.paymentOptions.length > 0
        "
        :class="`payments col${paymentOptions.length}`"
      >
        <div
          v-for="(payment, index) in paymentOptions"
          v-show="
            (payment.paymentMethodName == 'cheque' && hasCheque) ||
              (payment.paymentMethodName == 'bank_transfer' &&
                hasBankTransfer) ||
              (payment.paymentMethodName == 'credit_card' && hasCreditCart)
          "
          :key="payment.paymentMethodName + '-' + index"
          class="payment-option"
          @click="
            () => {
              $emit(
                'onChangePaymentMethod',
                payment.paymentMethodName == 'cheque'
                  ? 'cheque_30'
                  : payment.paymentMethodName
              )
            }
          "
          :class="{
            'is-active': paymentMethodName == payment.paymentMethodName
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
          ></PaymentOptionItem>
        </div>
      </div>
      <!-- END: payment methods -->
      <div class="product-list-basket">
        <div class="table-container">
          <table class="product-table">
            <thead :class="selected.length > 0 ? 'selected' : ''">
              <tr v-if="selected.length < 1">
                <th>
                  <label class="checkbox">
                    <input
                      class="checkbox"
                      type="checkbox"
                      v-model="selectAll"
                    />
                    <span class="checkmark"></span>
                  </label>
                </th>
                <th>Ürün</th>
                <th>Miktar</th>
                <th>Birim Fiyatı</th>
                <th>Satır Toplamı</th>
              </tr>
              <tr v-else class="selected_items">
                <th>
                  <label class="checkbox">
                    <input
                      class="checkbox"
                      type="checkbox"
                      v-model="selectAll"
                    />
                    <span class="checkmark"></span>
                  </label>
                </th>
                <th>{{ selected.length }} Ürün Seçili</th>
                <th>
                  <span class="garbage" @click="deleteSelectedItems()">
                    <app-icon name="garbage" icon-color="transparent" />
                    <span>Seçili Ürünü Sil</span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody v-if="getBasketDetails && getBasketDetails.productList">
              <tr
                v-for="(productLine, index) in getBasketDetails.productList"
                :key="productLine + '-' + index"
              >
                <td class="product-checkbox">
                  <label class="checkbox">
                    <input
                      class="checkbox"
                      type="checkbox"
                      :value="productLine"
                      v-model="selected"
                    />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td class="product-detail">
                  <template v-if="productLine.additionalProduct.success">
                    <img
                      class="product-img"
                      :src="productLine.imageURL"
                      alt=""
                    />
                  </template>
                  <template v-else>
                    <nuxt-link
                      :to="
                        productLine.isOutlet.success
                          ? `/urunler/outlet/${productLine.isOutlet.outletNo}`
                          : `/urunler/${productLine.stockCode}`
                      "
                      class="product-img"
                    >
                      <img :src="productLine.imageURL" alt="" />
                    </nuxt-link>
                  </template>
                  <div class="product-detail-content">
                    <div style="display: flex; align-items: center; gap: 0.5vw">
                      <template v-if="productLine.additionalProduct.success">
                        {{ productLine.stockCode }}
                      </template>
                      <template v-else>
                        <nuxt-link
                          :to="
                            productLine.isOutlet.success
                              ? `/urunler/outlet/${productLine.isOutlet.outletNo}`
                              : `/urunler/${productLine.stockCode}`
                          "
                          >{{ productLine.stockCode }}
                          {{
                            productLine.isOutlet.success
                              ? '- ' + productLine.isOutlet.outletNo
                              : ''
                          }}</nuxt-link
                        ></template
                      >

                      <div
                        style="
                          display: flex;
                          flex-wrap: wrap;
                          gap: 0.1vw;
                          justify-content: flex-end;
                        "
                      >
                        <div
                          v-if="productLine.isDiscounted.success"
                          class="isDiscounted"
                        >
                          <Icons name="isDiscounted" width="12" height="12" />
                          {{
                            productLine.isDiscounted.labelText
                              ? productLine.isDiscounted.labelText.toUpperCase()
                              : 'İNDİRİMLİ ÜRÜN'
                          }}
                        </div>

                        <div
                          v-if="productLine.isOutlet.success"
                          class="isOutlet"
                        >
                          <Icons name="isOutlet" width="12" height="12" />
                          {{
                            productLine.isOutlet.labelText
                              ? productLine.isOutlet.labelText.toUpperCase()
                              : 'OUTLET ÜRÜN'
                          }}
                        </div>

                        <div v-if="productLine.isEco.success" class="isEco">
                          <Icons name="isEco" width="12" height="12" />
                          {{
                            productLine.isEco.labelText
                              ? productLine.isEco.labelText.toUpperCase()
                              : 'EKO ÜRÜN'
                          }}
                        </div>

                        <div
                          v-if="productLine.isCampaigned.success"
                          class="isCampaigned"
                        >
                          <Icons name="isCampaigned" width="12" height="12" />
                          {{
                            productLine.isCampaigned.labelText
                              ? productLine.isCampaigned.labelText.toUpperCase()
                              : 'KAMPANYALI ÜRÜN'
                          }}
                        </div>

                        <div
                          v-if="productLine.isAlternative.success"
                          class="isAlternative"
                        >
                          <Icons name="isAlternative" width="12" height="12" />
                          {{
                            productLine.isAlternative.labelText
                              ? productLine.isAlternative.labelText.toUpperCase()
                              : 'ALTERNATİF ÜRÜN'
                          }}
                        </div>
                      </div>
                    </div>
                    <span class="description">
                      {{ productLine.description }}</span
                    >
                    <div
                      style="color: rgba(31, 31, 31, 0.5)"
                      v-if="productLine.variant.status"
                    >
                      {{ productLine.variant.description }}
                    </div>
                  </div>
                </td>
                <td class="quantity">
                  <div
                    class="input-field campaign-input"
                    v-if="
                      productLine.isCampaigned &&
                        productLine.isCampaigned.success
                    "
                  >
                    <input
                      type="number"
                      :value="productLine.quantity"
                      readonly
                    />
                  </div>
                  <div class="field input-field" v-else>
                    <button
                      class="button decrement"
                      @click="decrement(productLine)"
                    >
                      <app-icon name="minus" stroke-color="transparent" />
                    </button>
                    <input
                      type="number"
                      :value="productLine.quantity"
                      @change="
                        handleChangeQuantity({
                          event: $event,
                          product: productLine
                        })
                      "
                    />
                    <button
                      class="button increment"
                      @click="increment(productLine)"
                    >
                      <app-icon name="plus" stroke-color="transparent" />
                    </button>
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
                <td class="md lg">
                  <div class="retail-price">
                    {{ productLine.unitPrice }}
                  </div>
                </td>
                <td class="md lg">
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
        <div class="control keep-shopping">
          <!-- <span class="icon">
            <app-icon name="left-arrow" icon-color="transparent" />
          </span> -->
          <nuxt-link to="/urunler">
            {{ '&larr;' }} Alışverişe Devam Et</nuxt-link
          >
        </div>
        <div
          role="button"
          :disabled="
            getBasketDetails &&
              getBasketDetails.productList &&
              !getBasketDetails.productList.length
          "
          @click="$emit('openClearModal')"
          class="control clean-basket"
        >
          <span class="icon">
            <app-icon name="garbage" icon-color="transparent" />
          </span>
          <p>Sepeti Temizle</p>
        </div>
      </div>
    </div>
    <!-- <ModalInstallment
      :isActive="isInstallmentModal"
      @close="isInstallmentModal = false"
      @onSave="selectInstallment"
    ></ModalInstallment> -->
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
  watch: {
    selectedPaymentMethodName(value) {
      console.log('LOG::::selectedPaymentMethodName', value)
      this.paymentMethodName = value
      this.checkMethodName(value)
    }
  },
  computed: {
    ...mapGetters({
      getBasketDetails: 'basket/getBasketDetails',
      getPaymentType: 'payment/getPaymentType',
      getSelectedCurrency: 'payment/getSelectedCurrency'
    }),
    selectAll: {
      get() {
        if (
          this.getBasketDetails.productList &&
          this.getBasketDetails.productList.length > 0
        ) {
          let allChecked = true

          for (const product of this.getBasketDetails.productList) {
            if (!this.selected.includes(product)) {
              allChecked = false
            }

            // Break out of loop if mismatch already found
            if (!allChecked) break
          }

          return allChecked
        }

        return false
      },
      set(value) {
        const checked = []

        if (value) {
          this.getBasketDetails.productList.forEach(product => {
            checked.push(product)
          })
        }

        this.selected = checked
      }
    },
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
    //   return this.getBasketDetails?.paymentOptions
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
  methods: {
    ...mapActions({
      setPaymentType: 'payment/setPaymentType'
    }),
    selectCheque(cheque) {
      let selectionCheque = this.getBasketDetails.paymentOptions.filter(op => {
        return op.paymentMethodName == cheque
      })[0]
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
        let findItem = this.getBasketDetails?.paymentOptions.find(
          item => item.paymentMethodName == 'credit_card_installment'
        )
        let findIndex = this.paymentOptions.findIndex(
          item => item.paymentMethodName == 'credit_card'
        )
        this.paymentOptions.splice(findIndex, 1, findItem)
        this.creditCardTitle = 'TAKSİTLİ FİYAT'
        this.$emit('onChangePaymentMethod', findItem.paymentMethodName)
      } else {
        let findItem = this.getBasketDetails?.paymentOptions.find(
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
      //   let findItem = this.getBasketDetails?.paymentOptions.find(
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
    async deleteSelectedItems() {
      await this.$store.dispatch('basket/delBasket', this.selected)
      await this.$store.dispatch('basket/getBasket')
    },
    async handleChangeQuantity(data) {
      let { event, product } = data
      let quantity = event.target.value

      if (quantity) {
        await this.$store.dispatch('basket/updateProductInBasket', {
          stock_code: product.stockCode,
          quantity
        })
        await this.$store.dispatch('basket/getBasket', {
          payment_type:
            this.paymentMethodName != 'cheque'
              ? this.paymentMethodName
              : this.selectedCheque,
          currency: this.getSelectedCurrency
        })
      }
    },
    async increment(product) {
      await this.$store.dispatch('basket/updateProductInBasket', {
        stock_code: product.stockCode,
        quantity: product.quantity + 1
      })
      await this.$store.dispatch('basket/getBasket', {
        payment_type:
          this.paymentMethodName != 'cheque'
            ? this.paymentMethodName
            : this.selectedCheque,
        currency: this.getSelectedCurrency
      })
      // this.$notify({
      //   type: 'success',
      //   text: product.stockCode + ' sepete eklendi.',
      //   duration: 5000
      // })
    },
    async decrement(product) {
      let req = {
        stock_code: product.stockCode,
        quantity: product.quantity - 1
      }
      if (product?.isOutlet?.outletNo) {
        req['outlet_no'] = product?.isOutlet?.outletNo
      }

      if (product?.variant?.status) {
        req['variant_code'] = product?.variant?.code
      }

      await this.$store.dispatch('basket/updateProductInBasket', req)
      await this.$store.dispatch('basket/getBasket', {
        payment_type:
          this.paymentMethodName != 'cheque'
            ? this.paymentMethodName
            : this.selectedCheque,
        currency: this.getSelectedCurrency
      })
    },
    async checkMethodName(value) {
      if (value == 'open_account_30_day') {
        for await (let item of this.getBasketDetails?.paymentOptions) {
          if (!item.status) {
            console.log('İf İçi Anam')
            this.paymentMethodName = 'bank_transfer'
            // this.$emit('onChangePaymentMethod', 'bank_transfer')
          } else {
            console.log('Else içi Anam')
          }
        }
        // this.getBasketDetails?.paymentOptions.forEach((item) => {
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
    // if (this.paymentMethodName == 'credit_card') {
    //   this.isInstallment = false
    //   this.creditCardTitle = 'TEK ÇEKİM'
    //   let findIndex = this.paymentOptions.findIndex(
    //     item => item.paymentMethodName == 'credit_card_installment'
    //   )
    //   this.paymentOptions[findIndex].paymentMethodName = 'credit_card'
    // }

    this.getBasketDetails?.paymentOptions.forEach((rpo, array) => {
      if (rpo.paymentMethodName.split('_')[0] != 'cheque') {
        this.paymentOptions = [
          ...this.paymentOptions.map(po => {
            return rpo.paymentMethodName == po?.paymentMethodName
              ? {
                  ...po,
                  ...rpo
                }
              : { ...po }
          })
          //   .filter(item => item.status)
        ]
      } else if (rpo.paymentMethodName.split('_')[0] == 'cheque') {
        this.paymentOptions[1] = {
          ...this.paymentOptions[1],
          chequeOptions: this.getBasketDetails?.paymentOptions
            .map(t => {
              if (t.paymentMethodName.split('_')[0] == 'cheque')
                return {
                  name: t?.paymentDetails?.paymentMethodName,
                  price: t?.paymentDetails?.subTotal
                }
            })
            .filter(item => item),
          paymentDetails: this.getBasketDetails?.paymentOptions.filter(item => {
            if (item.paymentDetails.paymentMethodName.split('_')[0] == 'cheque')
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
          })[0]?.paymentDetails,
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
      this.selectedCheque = this.getBasketDetails?.paymentOptions.filter(
        item => {
          return item.paymentMethodName.split('_')[0] == 'cheque'
        }
      )[0].paymentDetails.paymentMethodName
      if (this.selectedPaymentMethodName === 'cheque')
        this.$emit('onChangePaymentMethod', this.selectedCheque)
    }

    // for (let index = 0; index < this.paymentOptions.length; index++) {
    //   console.log('Index', index)
    //   let findItem = this.getBasketDetails?.paymentOptions.find(
    //     item =>
    //       item.paymentMethodName ==
    //         this.paymentOptions?.[index]?.paymentMethodName &&
    //       item.paymentMethodName.split('_')[0] != 'cheque'
    //   )
    //   if (findItem) {
    //     if (findItem.paymentMethodName.split('_')[0] == 'cheque')
    //       this.paymentOptions[index] = {
    //         ...findItem
    //       }
    //     else this.paymentOptions[index] = { ...findItem }
    //   } else {
    //     // this.paymentOptions[index] = { ...findItem }

    //     delete this.paymentOptions[index]
    //   }
    // }
    if (!this.hasBankTransfer && !this.hasCreditCart) {
      this.paymentMethodName = 'cheque'
      this.payment_type = 'cheque_30'
      this.setPaymentType({ payment_type: this.payment_type })
    }

    this.paymentOptions = this.paymentOptions.filter(val => val?.status)

    if (
      this.getBasketDetails &&
      this.getBasketDetails.availableCampaignProductsCount
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
