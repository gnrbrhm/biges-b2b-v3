<template>
  <div class="flex row add-basket">
    <div
      v-if="
        !data.price_mask &&
          data.available_stock &&
          Object.keys(data.prices).length > 0
      "
      class="field input-field"
    >
      <button class="button decrement" @click="decrement">
        <Icon name="minus" stroke-color="transparent" />
      </button>
      <input
        type="number"
        :max="data.available_stock"
        :min="1"
        v-model="count"
      />
      <button class="button increment" @click="increment">
        <Icon name="plus" stroke-color="transparent" />
      </button>
    </div>

    <div class="field button-field">
      <button
        v-if="renderButtons == 'add-basket'"
        @click="addToBasket"
        class="blue-button min-w-120 min-h-60"
      >
        Sepete At
      </button>
      <button
        v-if="renderButtons == 'stock-info'"
        class="blue-button min-w-120 min-h-60"
        @click="
          infoModal.isStock = true
          infoModal.isActive = true
        "
      >
        STOK BİLGİSİ ALIN
      </button>

      <button
        v-if="renderButtons == 'price-info'"
        @click="infoModal.isActive = true"
        class="blue-button min-w-120 min-h-60"
      >
        FİYAT BİLGİSİ ALIN
      </button>
    </div>
    <Modal
      :width="'400px'"
      :height="'200px'"
      :isActive="infoModal.isActive"
      @close="infoModal.isActive = false"
    >
      <div class="getInfoModal">
        <div class="getInfoModal_title">
          {{ data.stock_code }} ürünü için
          {{ infoModal.isStock ? 'stok' : 'fiyat' }} bilgisi istiyorum.
        </div>

        <div class="getInfoModal_form">
          <Button @onSubmit="sendInfoMail" text="GÖNDER" />
          <Button @onSubmit="infoModal.isActive = false" text="VAZGEÇ" />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'
export default {
  props: {
    data: { type: Object, default: () => {} },
    renderButtons: {
      type: String,
      default: 'stock-info'
    }
  },
  components: {
    Icon,
    Modal,
    Button
  },
  data() {
    return {
      count: 1,
      infoModal: {
        isActive: false,
        isStock: false
      }
    }
  },
  methods: {
    async sendInfoMail() {
      try {
        const url = `/products/${
          this.infoModal.isStock ? 'stock_information' : 'price_information'
        }/${this.data.stock_code}`
        const result = await this.$axios({ method: 'GET', url })

        if (result.status == 200) {
          this.$notify({
            type: 'success',
            title: 'İşlem Başarılı!',
            text: result?.data?.message,
            duration: 2000
          })
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.infoModal.isActive = false
      }
    },
    async addToBasket() {
      await this.$store
        .dispatch('basket/addBasket', {
          stock_code: this.data.stock_code,
          quantity: this.count
        })
        .then(resp => {
          if (resp) {
            this.$notify({
              type: 'success',
              title: 'İşlem Başarılı!',
              text: this.data?.stock_code + ' sepete eklendi.',
              duration: 5000
            })
            this.count = 1
          }
        })
    },
    increment() {
      this.count++
    },
    decrement() {
      if (this.count > 1) this.count--
    }
  }
}
</script>

<style lang="scss" scoped>
.ask-price-button {
  width: 100%;
  height: 100%;
  background: #a2a2a2;
  color: black;
  border: none;
  cursor: default;
  opacity: 0.5;
}

.field:not(:last-child) {
  margin-bottom: 0 !important;
}

.add-basket {
  width: 100%;

  .input-field {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    background: #e9e9e9;
    input {
      text-align: center;
      width: 53px;
      padding: 10px 0;
      border: none;
      border-radius: 3px;
      font-size: 15px;
    }
    button {
      background: transparent;
      border: none;
      color: rgba(31, 31, 31, 0.5);
    }
  }
}

.blue-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.button-field {
  height: 60px;
  width: 100%;
}
.add-basket-button-disabled {
  width: 100%;
  height: 100%;
  background: $primary;
  color: $white;
  border: none;
  cursor: pointer;
  opacity: 0.5;
}
</style>
