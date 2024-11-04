<template>
  <Modal
    :isActive="isActive"
    :width="`${getLayout == 'mobile' ? '90%' : '485px'}`"
    height="389px"
  >
    <div class="flex col" v-loading="isLoading || saveLoading">
      <div class="h-20 font-500 text-center pt-10">Sepeti Temizle</div>
      <div v-if="items.length" class="pt-30 flex row justify-center">
        <img
          :src="items[0].imageURL"
          height="40"
          width="40"
          alt=""
          class="border radius-2 ml-5"
        />
        <img
          v-if="items.length > 1"
          :src="items[1].imageURL"
          height="40"
          width="40"
          alt=""
          class="border radius-2 ml-5"
        />
        <img
          v-if="items.length > 2"
          :src="items[2].imageURL"
          height="40"
          width="40"
          alt=""
          class="border radius-2 ml-5"
        />
        <div
          v-if="items.length > 3"
          class="min-w-40 border radius-2 flex center ml-5"
        >
          +{{ items.length - 3 }}
        </div>
      </div>
      <div class="h-14 font-normal text-center pt-15 pr-50 pl-50">
        Toplam {{ items.length }} ürünü silmeden önce alışveriş listeleriniz
        arasına eklemek ister misiniz?
      </div>
      <div
        :class="
          `${
            getLayout == 'desktop' ? 'pl-40 pr-40' : ''
          } flex row space-between pt-25`
        "
      >
        <div class="width-100">
          <div class="input-grid">
            <input
              v-model="basketName"
              class="flat-input"
              type="text"
              placeholder="Sepet Adı"
            />
          </div>
        </div>
        <div class="pl-20">
          <button
            @click="save"
            :disabled="basketName.length < 1 || saved"
            class="blue-button min-w-105"
          >
            {{ !saved ? 'KAYDET' : 'LİSTE KAYDEDİLDİ!' }}
          </button>
        </div>
      </div>
      <div :class="`pt-20 ${getLayout == 'desktop' ? 'pl-95 pr-95' : ''}`">
        <button
          @click="$emit('emptyBasket')"
          class="button is-danger is-outlined width-100"
        >
          SEPETİ TEMİZLE
        </button>
      </div>
      <div :class="`pt-20 ${getLayout == 'desktop' ? 'pl-95 pr-95' : ''}`">
        <button @click="$emit('close')" class="button is-outlined width-100">
          VAZGEÇ
        </button>
      </div>
      <!-- <div class="flex center mt-15 width-100">
        <div
          @click="$emit('close')"
          class="clickable h-14 font-normal border pl-95 pr-95 pt-10 pb-10"
        >
          VAZGEÇ
        </div>
      </div> -->
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/common/Modal'
import InputText from '@/components/common/form/InputText'
import { mapGetters } from 'vuex'

export default {
  name: 'ModalDeleteBasket',
  components: { Modal, InputText },
  props: {
    isActive: { type: Boolean, default: false },
    items: {
      type: Array,
      default: () => []
    },
    isLoading: Boolean,
    saveLoading: Boolean,
    saved: Boolean
  },
  data() {
    return {
      basketName: ''
    }
  },
  computed: {
    ...mapGetters(['getLayout'])
  },
  methods: {
    onChange(item) {
      this.basketName = item.value
    },
    save() {
      this.$emit('onSave', this.basketName)
      this.basketName = ''
    }
  }
}
</script>

<style scoped>
.flat-input::-webkit-input-placeholder {
  color: rgba(31, 31, 31, 0.5) !important;
  font-size: 14px;
  line-height: 17px;
}
</style>
