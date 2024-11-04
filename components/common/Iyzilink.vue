<template>
  <div class="flex col">
    <div :class="getLayout == 'mobile' ? 'grid ' : 'grid col-2'">
      <div
        class="input-grid"
        :data-error="errors.includes('price') ? errorMessage : null"
      >
        <input
          v-model="form.price"
          class="flat-input"
          type="text"
          @input="handleValue('price', $event.target.value)"
          placeholder="Ödeme Miktarı (ör:2.000,00)"
        />
      </div>
    </div>
    <div :class="getLayout == 'mobile' ? 'grid mt-20' : 'grid col-2 mt-20'">
      <div
        class="input-grid"
        :data-error="errors.includes('description') ? errorMessage : null"
      >
        <textarea
          v-model="form.description"
          class="textarea"
          @input="handleValue('description', $event.target.value)"
          placeholder="Açıklama"
        />
      </div>
    </div>
    <div class="grid col-2 mt-20">
      <Button @onSubmit="sendForm" text="Oluştur"></Button>
    </div>
    <div class="mt-40 border radius-5 p-20">
      <Table :data="table" :key="'f' + table.rows"> </Table>
    </div>
  </div>
</template>

<script>
import InputText from '@/components/common/form/InputText'
import Textarea from '@/components/common/form/Textarea'
import Button from '@/components/common/Button'
import { mapActions, mapGetters } from 'vuex'
import Table from '@/components/views/ForYou/Table'

import { mixinNumberFormatTr } from '@/utils'

export default {
  name: 'Iyzilink',
  components: { InputText, Textarea, Button, Table },
  data() {
    return {
      errors: [],
      errorMessage: 'Lütfen bu alanı kontrol ediniz.',
      form: { price: '', description: '' },
      iyzilink: null,
      table: {
        headers: ['', 'Ödeme Tutarı', 'Açıklama', 'URL'],
        rows: [
          // [
          //   '',
          //   'Ödeme Tutarı 2',
          //   'Açıklama 2',
          //   {
          //     component: 'CopyButton',
          //     text: 'https://biges.com/somelinkdeneme',
          //   }
          // ],
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['getLayout'])
  },
  methods: {
    ...mapActions({
      postBalancePaymentLink: 'foryou/postBalancePaymentLink',
      fetchIyzilinkLog: 'foryou/fetchIyzilinkLog'
    }),
    handleValue(key, value) {
      if (key == 'price') {
        let replaced = value?.toString()?.replaceAll('.', '')
        this.form.price = replaced
          ?.toString()
          ?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      }
    },
    async sendForm() {
      Object.entries(this.form).forEach(([key, value]) => {
        if (value) {
          let findIndex = this.errors.findIndex((val) => val == key)
          this.errors.splice(findIndex, 1)
        } else {
          this.errors.push(key)
        }
      })
      if (!this.errors.length) {
        await this.postBalancePaymentLink({
          ...this.form,
          price: this.form?.price?.toString()?.replaceAll('.', '')
        }).then((response) => {
          this.getIyzilinkLogs()
          this.form = { price: '', description: '' }
          this.$notify({
            type: 'success',
            title: 'İşlem Başarılı!',
            text: '',
            duration: 5000
          })
        })
      }
    },
    async getIyzilinkLogs() {
      this.isLoading = true
      if (Object.keys(this.fetchIyzilinkLog).length) return
      await this.fetchIyzilinkLog().then((response) => {
        let tableMap = response.map((item) => {
          return [
            item.id,
            mixinNumberFormatTr(item.price),
            item.description,
            (item.url = { component: 'CopyButton', text: item.url })
            // item.url.map((i) => {
            //   return { component: 'CopyButton', text: i.text }
            // })
          ]
        })
        this.table.rows = tableMap
      })
    }
  },
  created() {
    this.getIyzilinkLogs()
  }
}
</script>


<style lang="scss" scoped>
textarea {
  background: #f2f2f2;
  border-radius: 3px;
}
</style>