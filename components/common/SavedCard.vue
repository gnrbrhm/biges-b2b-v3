<template>
  <div class="saved_card">
    <input
      v-model="form.price"
      @input="handleValid('price', $event.target.value)"
      type="text"
      placeholder="Ödeme Tutarı (ör:2.000,00)"
    />
    <input v-model="form.description" type="text" placeholder="Açıklama" />

    <div class="saved_card_form">
      <input v-model="form.description" type="text" placeholder="Kart Sahibi" />
      <input
        v-model="form.description"
        type="text"
        placeholder="Kart Numarası"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      form: {
        price: null,
        installment: null,
        description: '',
        card_info: {}
      },
      tablePayment: {
        headers: ['', 'Taksit Seçeneği', 'Aylık Ödeme', 'Toplam Ödeme'],
        rows: []
      }
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss">
.saved_card {
  display: grid;
  grid-template-columns: 345px 1fr;
  row-gap: 30px;
  column-gap: 20px;

  input {
    background-color: #f2f2f2;
    border-radius: 3px;
    outline: none;
    border: none;
    box-shadow: none !important;
    padding: 15px !important;
    height: 55px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
  }

  &_form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
