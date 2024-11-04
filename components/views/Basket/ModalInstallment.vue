<template>
  <div>
    <!-- Bu component kullanılmaktan vazgeçildi. -->
    <Modal :isActive="isActive" width="280px" height="370px">
      <div class="flex col">
        <div class="h-18 font-500 text-center pt-10">Tutar : {{ price }}</div>
        <!-- <div class="pt-15 flex row justify-center h-20 font-400">$66</div> -->
        <div class="h-14 font-normal text-center pt-20 pr-40 pl-40">
          <RadioGroup
            :list="radioData"
            @onChange="selectedInstallment($event)"
          ></RadioGroup>
        </div>
        <div class="pt-40 flex row">
          <button @click="save" class="blue-button p-10 col-px-120">
            KAYDET
          </button>
          <div class="flex center ml-5 col-px-110">
            <div @click="$emit('close')" class="clickable h-14 font-normal">
              VAZGEÇ
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/common/Modal'
import InputText from '@/components/common/form/InputText'
import RadioGroup from '@/components/common/form/RadioGroup'
export default {
  name: 'ModalDeleteBasket',
  components: { Modal, InputText, RadioGroup },
  props: {
    isActive: { type: Boolean, default: false },
    price: { type: String, default: null }
  },
  data() {
    return {
      radioData: [
        { value: 1, name: 'Tek Çekim' },
        { value: 3, name: '3 Taksit' },
        { value: 6, name: '6 Taksit' },
        { value: 9, name: '9 Taksit' },
        { value: 12, name: '12 Taksit' }
      ],
      selectedRadio: {}
    }
  },
  methods: {
    selectedInstallment(item) {
      this.selectedRadio = item
    },
    save() {
      this.$emit('onSave', this.selectedRadio)
    }
  }
}
</script>

<style>
</style>