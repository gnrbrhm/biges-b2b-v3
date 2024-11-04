<template>
  <div>
    <div class="back flex row ml-10">
      <div class="clickable" @click="$emit('handleBack')">
        <Icon
          name="left-arrow"
          icon-color="transparent"
          strokeColor="rgba(13, 47, 129, 0.7)"
          height="12"
          width="13"
        ></Icon>
      </div>
      <div @click="$emit('handleBack')" class="ml-5">Geri Dön</div>
    </div>
    <div>
      <div class="has-background-white" style="padding: 1rem">
        <h1 class="title">Makbuz&nbsp;</h1>
        <div class="box">
          <table class="table is-striped is-bordered">
            <tbody>
              <tr>
                <td class="has-text-weight-bold">Bayi</td>
                <td>{{ item.firm_name }}</td>
              </tr>
              <tr>
                <td class="has-text-weight-bold">Tarih</td>
                <td>{{ item.created_at | formatDate }}</td>
              </tr>

              <tr>
                <td class="has-text-weight-bold">Ödeme Yöntemi</td>
                <td>{{ item.payment_method }}</td>
              </tr>
              <tr>
                <td class="has-text-weight-bold">Taksit Sayısı</td>
                <td>{{ item.installment_number }}</td>
              </tr>
              <tr>
                <td class="has-text-weight-bold">Banka İşlem No</td>
                <td>{{ item.process_no }}</td>
              </tr>
              <tr>
                <td class="has-text-weight-bold">Miktar</td>
                <td>₺{{ item.total_payment | numberFormatTr }}</td>
              </tr>
              <tr>
                <td class="has-text-weight-bold">Ödeme Durumu</td>
                <td>{{ item.payment_status }}</td>
              </tr>
              <tr>
                <td colspan="2">
                  Sanal POS ile Kredi kartımdan çekilen
                  <strong>₺{{ item.total_payment | numberFormatTr }}</strong>
                  tutarının <strong>{{ item.firm_name }}</strong> firması adına
                  Biges Güvenli Hayat Teknolojileri A.Ş.'ye ödemiş bulunduğumu,
                  ilgili firma ile aramda oluşabilecek anlaşmazlıktan dolayı
                  Biges Güvenli Hayat Teknolojileri A.Ş.'yi sorumlu
                  tutmayacağımı beyan ve taahhüt ederim.
                </td>
              </tr>
              <tr>
                <td colspan="2" class="has-text-centered has-text-weight-bold">
                  Kredi Kartı Sahibinin İmzası:
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  2.BÖLÜM (Bu bölüm Biges Güvenli Hayat Teknolojileri A.Ş. 'nin
                  müşterisi olan firma tarafından doldurulacaktır.) Sanal POS
                  ile kredi kartından çekilen
                  <strong>₺{{ item.total_payment | numberFormatTr }}</strong>
                  tutarın Biges Güvenli Hayat Teknolojileri A.Ş.'nin nezdindeki
                  cari hesabımıza alacak kaydedilmesini, çekilen tutara kredi
                  kartı sahibinin isteği doğrultusunda banka tarafından bloke
                  konur ve Biges Güvenli Hayat Teknolojileri A.Ş.'nin
                  hesaplarına aktarılmaz ise; ilgili tutarı her türlü gecikme
                  faizleri ile birlikte Biges Güvenli Hayat Teknolojileri
                  A.Ş.'nin talep ettiği tarihte nakit olarak Biges Güvenli Hayat
                  Teknolojileri A.Ş.'ye ödeyeceğimizi beyan ve taahhüt ederiz.
                </td>
              </tr>
              <tr>
                <td colspan="2" class="has-text-centered">
                  <div class="columns">
                    <div class="column">
                      <span class="has-text-weight-bold">Müşteri İmzası</span>
                    </div>
                    <div class="column">
                      <span class="has-text-weight-bold"
                        >Bilgilerin doğruluğunu kabul ve tasdik eden<br />Bayi
                        İmza ve Kaşesi:</span
                      >
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                </td>
              </tr>
            </tbody>
          </table>

          <div class="button is-primary" @click="clickViewPdf">
            PDF Görüntüle
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import { dateFormatLLLL } from '@/utils/date'
export default {
  name: 'CreditCardDetail',
  components: { Icon },
  props: {
    item: { type: Object, default: () => {} },
    cardId: { type: Number, default: 0 },
    isOld: { type: Boolean, default: false }
  },
  computed: {
    token() {
      return this.$auth?.strategy?.token?.get()?.split(' ')?.[1]
    }
  },
  filters: {
    formatDate(value) {
      if (value) {
        let date = dateFormatLLLL(String(value))
        let dateArray = date.toString().split(',')[1]
        return dateArray
      }
    }
  },
  methods: {
    clickViewPdf() {
      let url = `${this.$axios.defaults.baseURL}for_you/payment_history_pdf/${this.cardId}?key=${this.token}`
      if (this.isOld) {
        url = `${this.$axios.defaults.baseURL}for_you/payment_history_old_pdf/${this.cardId}?key=${this.token}`
      }
      window.open(url, '_blank')
    }
  }
}
</script>

<style>
</style>