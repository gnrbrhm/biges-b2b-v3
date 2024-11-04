<template>
  <div
    v-loading="{ loading: false, text: 'Yükleniyor' }"
    class="wizard-component"
  >
    <ConfirmModal
      title="Emin misiniz?"
      @handleButton="handleButton"
      :isActive="isModalActive"
    />
    <div class="wizard-component__header">
      <div
        :class="{ 'not-active': !isCompleted && !isActive }"
        class="wizard-component__header__title"
      >
        Teslimat Bilgileri
      </div>
      <div v-if="isCompleted" class="wizard-component__completed-summary">
        <button
          v-if="step != 3"
          :disabled="isWizardLoading"
          @click="$emit('setStep', step)"
          class="btn-text-simple"
        >
          <img src="@/assets/svg/edit.svg" />
          Değiştir veya Düzenle
        </button>
        <span class="split-v"></span>
        <label disabled class="radio" style="margin-left: 10px">
          <input
            :disabled="true"
            type="radio"
            :checked="true"
            name="summary-cargo"
          />
          {{ deliveryType.options[deliveryType.value] }}
          <span class="radio-check"></span>
        </label>
      </div>

      <div v-if="isActive" class="wizard-component__header__actions">
        <label
          v-for="(cargoType, key) in deliveryType.options"
          :key="key"
          class="radio"
          style="margin-left: 20px"
        >
          <input
            v-model="deliveryType.value"
            :value="key"
            type="radio"
            name="radio-free"
          />
          {{ cargoType }} <span class="radio-check"></span>
        </label>
      </div>
    </div>

    <div v-if="isActive" class="wizard-component__content --address">
      <div
        class="pt-20 pl-20 pr-20 is-flex is-align-items-center"
        style="cursor: pointer; width: 200px"
        @click="
          isNewAddress = true
          newAddressType = 'shipping'
        "
      >
        <img src="@/assets/svg/add-light.svg" />
        <label class="wizard-component__content__add_label"
          >Yeni Adres Ekle</label
        >
      </div>
      <div
        style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: flex-start;
          justify-content: flex-start;
          grid-column-gap: 30px;
          padding: 20px;
        "
      >
        <div
          v-for="(address, key) in address"
          :key="key"
          class="wizard-component__content__item"
        >
          <div class="wizard-component__content__item__title">
            {{ address.label }}
          </div>
          <div class="wizard-component__content__item__selected">
            <div class="wizard-component__content__item__selected__address">
              <div
                v-if="optionsAddress.length"
                @click="selectType = key"
                class="text-primary flex"
              >
                {{ address.value.contact_name }}
                <img
                  v-if="
                    deliveryType.value != 'delivery_from_warehouse' ||
                      address.label != 'Teslimat Adresi'
                  "
                  class="address-arrow"
                  :class="{ 'is-active': selectType == key }"
                  src="@/assets/svg/collapser-arrow.svg"
                />
              </div>
              <div
                v-if="optionsAddress.length"
                @click="selectType = key"
                class="text-secondary"
              >
                {{ address.value.address_line }}
                <br />
                {{ address.value.district }}/{{ address.value.city }}
              </div>

              <details
                @click="onToggle"
                v-if="selectType == key"
                :open="
                  (deliveryType.value != 'delivery_from_warehouse' ||
                    address.label != 'Teslimat Adresi') &&
                    selectType == key
                "
                class="address-details"
              >
                <summary></summary>
                <div class="address-details__item-content">
                  <ul>
                    <li
                      v-for="item in optionsAddress"
                      :key="item.address_number + '-item-line'"
                    >
                      <div class="radio">
                        <div class="is-flex is-justify-content-space-between">
                          <input
                            @change="selectType = null"
                            v-model="address.value"
                            :value="item"
                            type="radio"
                            name="radio"
                          />
                          <span class="radio-check"></span>
                          {{ item.contact_name }}

                          <div style="text-align: right; width: 100%">
                            <div
                              class="is-flex is-align-items-center"
                              style="
                                justify-content: flex-end;
                                align-items: center;
                              "
                            >
                              <div @click="updateAddress(item)" class="mr-10">
                                <Icon
                                  name="edit"
                                  pathFill="transparent"
                                  width="18"
                                  height="18"
                                />
                              </div>

                              <div
                                @click="
                                  deleteAddressConfirm(item.address_number)
                                "
                              >
                                <Icon name="trash" strokeColor="red" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="text-secondary">
                          {{ item.address_line }}
                          <br />
                          {{ item.district }}/{{ item.city }}
                        </div>
                      </div>
                    </li>
                  </ul>
                  <!-- <button
                  @click="
                    isNewAddress = true
                    newAddressType = key
                    selectType = null
                  "
                  class="btn-new"
                >
                  <img
                    src="@/assets/svg/add-light.svg"
                    style="stroke:black"
                    alt=""
                  />
                  Yeni Adres Ekle
                </button> -->
                </div>
              </details>

              <AddressNew
                v-if="isNewAddress && newAddressType == key"
                :is-show="isNewAddress"
                @onClose="
                  isNewAddress = false
                  newAddressType = null
                "
                @onSuccess="fetchAddresses"
              ></AddressNew>

              <AddressUpdate
                v-if="isUpdateAddress && updateAddressType == key"
                :is-show="isUpdateAddress"
                @onClose="isUpdateAddress = false"
                @onSuccess="fetchAddresses"
                :form="updateForm"
              ></AddressUpdate>
            </div>
            <!-- <div class="wizard-component__content__item__actions">
            <button @click="selectType = key" class="btn-text-simple">
              <img src="@/assets/svg/edit.svg" />
              Düzenle
            </button>
            <button
              @click="
                isNewAddress = true
                newAddressType = key
              "
              class="btn-text-simple"
            >
              <img src="@/assets/svg/add-light.svg" />
              Yeni ekle
            </button>
          </div> -->
          </div>
        </div>
      </div>
    </div>
    <div v-if="isActive" class="step-action-grid">
      <button :disabled="isWizardLoading" @click="nextStep" class="flat-button">
        DEVAM ET
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import endpoints from '@/api/endpoints'
import AddressNew from './AddressNew.vue'
import AddressUpdate from './AddressUpdate.vue'
import Icon from '@/components/Icon.vue'
import ConfirmModal from '@/components/common/ConfirmModal.vue'

export default {
  components: {
    AddressNew,
    Icon,
    ConfirmModal,
    AddressUpdate
  },
  props: {
    step: { type: Number, default: null },
    isActive: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    isWizardLoading: { type: Boolean, default: false }
  },
  data() {
    return {
      isNewAddress: false,
      updateAddressType: false,
      isUpdateAddress: false,
      newAddressType: null,
      isModalActive: false,
      selectedAddressNumber: null,
      isLoading: true,
      updateForm: null,
      optionsAddress: [],
      selectType: null, // shipping, billing
      address: {
        shipping: {
          label: 'Teslimat Adresi',
          value: {}
        },
        billing: {
          label: 'Fatura Adresi',
          value: {}
        }
      },
      deliveryType: {
        value: 'counterpayment_cargo',
        options: {
          counterpayment_cargo: 'Kargoyla Gönderim',
          delivery_from_warehouse: 'Depodan Teslim'
        }
      }
    }
  },
  watch: {
    deliveryType: {
      deep: true,
      handler(data) {
        if (data.value == 'delivery_from_warehouse') {
          this.address.shipping.value = {
            address_line: 'Piyalepaşa Bulvarı No:77 Famas Plaza B Blok',
            address_line_extra: '',
            address_number: 0,
            city: 'İstanbul',
            contact_name: 'Biges Merkez Ofis Depo',
            district: 'Şişli',
            firm_name: 'Biges Güvenli Hayat Teknolojileri',
            id: 0,
            is_default_address: false,
            phone: '',
            zip_street: '34384'
          }
          return
        }

        this.fetchAddresses()
      }
    }
  },
  computed: {
    ...mapGetters({
      getBasketQueries: 'basket/getBasketQueries',
      getPaymentType: 'payment/getPaymentType'
    })
  },
  methods: {
    ...mapActions({
      showBuyButton: 'payment/showBuyButton'
    }),
    onToggle(event) {
      if (
        event.target &&
        event.target.tagName == 'SUMMARY' &&
        event.target.getAttribute('open') != ''
      ) {
        this.selectType = null
      }
    },
    updateAddress(address) {
      this.updateAddressType = 'shipping'
      this.selectType = null
      this.updateForm = address
      this.isUpdateAddress = true
    },
    deleteAddressConfirm(address_number) {
      this.selectedAddressNumber = address_number
      this.isModalActive = true
    },
    async handleButton(value) {
      if (value && this.selectedAddressNumber) {
        this.isModalActive = false
        this.deleteAddress(this.selectedAddressNumber)
      } else {
        this.isModalActive = false
      }
    },
    async deleteAddress(address_number) {
      this.isLoading = true

      try {
        let res = await this.$axios({
          ...endpoints.user.address.delete,
          url: endpoints.user.address.delete.url(address_number)
        })

        if (res.status == 204) {
          this.$notify({
            type: 'success',
            title: 'İşlem Başarılı!',
            text: `Adres başarılı bir şekilde silindi.`,
            duration: 5000
          })
          await this.fetchAddresses()
          this.isLoading = false
        } else {
          this.$notify({
            type: 'error',
            title: 'İşlem Hatası!',
            text: `Lütfen daha sonra tekrar deneyin.`,
            duration: 5000
          })
          this.isLoading = false
        }
      } catch (error) {
        console.log(error)
        this.$notify({
          type: 'error',
          title: 'İşlem Hatası!',
          text: `Lütfen daha sonra tekrar deneyin. ${error}`,
          duration: 5000
        })
        this.isLoading = false
      }
    },

    async fetchAddresses(lastAddress) {
      try {
        this.isLoading = true
        this.$emit('onLoading', true)
        let { status, data } = await this.$axios(endpoints.user.address.get_all)
        if (status == 200) {
          this.optionsAddress = data
          let defaultAddress = this.optionsAddress.find(
            r => r.is_default_address
          )

          this.address.billing.value = lastAddress || defaultAddress
          this.address.shipping.value = lastAddress || defaultAddress

          this.isLoading = false
        }
      } catch (error) {
        this.isLoading = false
      }
      this.$emit('onLoading', false)
    },
    nextStep() {
      this.$emit('onChange', {
        delivery_type: this.deliveryType.value,
        shipping_address_number: this.address.shipping.value.address_number,
        billing_address_number: this.address.billing.value.address_number
      })
      this.$emit('setStep', this.step + 1)
    }
  },
  async created() {
    //if (this.isActive) this.fetchAddresses()
    this.showBuyButton(false)
    await this.fetchAddresses()
    this.deliveryType.value =
      this.getPaymentType?.delivery_type || 'counterpayment_cargo'

    if (this.getPaymentType.delivery_type == 'delivery_from_warehouse') {
      this.address.shipping.value = {
        address_line: 'Piyalepaşa Bulvarı No:77 Famas Plaza B Blok',
        address_line_extra: '',
        address_number: 0,
        city: 'İstanbul',
        contact_name: 'Biges Merkez Ofis Depo',
        district: 'Şişli',
        firm_name: 'Biges Güvenli Hayat Teknolojileri',
        id: 0,
        is_default_address: false,
        phone: '',
        zip_street: '34384'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../styles/Basket/wizard-component.scss';

.radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 50%;
  height: 30px;
}
</style>
