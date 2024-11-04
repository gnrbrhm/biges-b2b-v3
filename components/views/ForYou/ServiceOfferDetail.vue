<template>
  <div
    class="has-background-white"
    style="
      border: 1px solid #eaeaea;
      margin: 1rem;
      padding: 1rem;
      padding: 1rem;
    "
  >
    <h1 class="title">Teknik Servis Teklif Detayları</h1>
    <div class="box">
      <div class="offer-grid-wrapper">
        <div class="doc-no">
          <div class="field">
            <label class="label">Teklif No</label>
            <div class="control">
              <input
                class="input"
                type="text"
                :value="detail.document_number"
                readonly=""
              />
            </div>
          </div>
        </div>
        <!-- <div class="description">
          <div class="field">
            <label class="label">Açıklama</label>
            <textarea class="textarea" rows="8" readonly=""> </textarea>
          </div>
        </div> -->
        <div class="offer-date">
          <div class="field">
            <label class="label">Teklif Tarihi</label>
            <div class="control">
              <input
                class="input"
                type="text"
                :value="dateFormat(detail.document_date)"
                readonly=""
              />
            </div>
          </div>
        </div>
        <div class="recipient">
          <div class="field">
            <label class="label">İlgili Kişi</label>
            <div class="control">
              <input
                class="input"
                type="text"
                :value="detail.document_creator"
                readonly=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <table class="table is-fullwidth is-striped is-bordered offer-detail">
      <thead>
        <tr>
          <th class="has-text-left">Ürün</th>
          <th>Miktar</th>
          <th>Fiyat</th>
          <th>Toplam</th>
          <th>İskonto</th>
          <th>Net</th>
          <th>KDV</th>
          <th>G. Toplam</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in product" :key="item + index">
          <td class="has-text-left">
            <strong>{{ item.stock_code }}</strong
            ><br />
            <p class="is-size-7">
              {{ item.description }}
            </p>
          </td>
          <td style="white-space: nowrap">
            {{ item.count | countFilter }} {{ item.count_unit }}
          </td>
          <td>
            {{ currencySymbol[detail.currency] }}
            {{ item.price | numberFormatTr }}
          </td>
          <td>
            {{ currencySymbol[detail.currency] }}
            {{ item.sub_total | numberFormatTr }}
          </td>
          <td>
            {{ currencySymbol[detail.currency]
            }}{{ item.discount | numberFormatTr }}
          </td>
          <td>
            {{ currencySymbol[detail.currency] }}
            {{ item.sub_total | numberFormatTr }}
          </td>
          <td>
            {{ currencySymbol[detail.currency] }}
            {{ item.tax | numberFormatTr }}
          </td>
          <td>
            {{ currencySymbol[detail.currency] }}
            {{ item.general_total | numberFormatTr }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5"></td>
          <td colspan="2" class="has-text-weight-bold">Brüt Toplam</td>
          <td>
            {{ currencySymbol[detail.currency] }}
            {{ detail.general_gross | numberFormatTr }}
          </td>
        </tr>
        <tr>
          <td colspan="5"></td>
          <td colspan="2" class="has-text-weight-bold">İskonto</td>
          <td>
            {{ currencySymbol[detail.currency] }}
            {{ detail.total_discount | numberFormatTr }}
          </td>
        </tr>
        <tr>
          <td colspan="5"></td>
          <td colspan="2" class="has-text-weight-bold">Net Toplam</td>
          <td>
            {{ currencySymbol[detail.currency] }}
            {{ detail.net_price | numberFormatTr }}
          </td>
        </tr>
        <tr>
          <td colspan="5"></td>
          <td colspan="2" class="has-text-weight-bold">KDV</td>
          <td>
            {{ currencySymbol[detail.currency] }}
            {{ detail.general_tax | numberFormatTr }}
          </td>
        </tr>
        <tr>
          <td colspan="5"></td>
          <td colspan="2" class="has-text-weight-bold">Genel Toplam</td>
          <td>
            {{ currencySymbol[detail.currency]
            }}{{ detail.general_total | numberFormatTr }}
          </td>
        </tr>
      </tfoot>
    </table>
    <div class="box">
      <p class="title">Kazançlar</p>
      <div class="field is-grouped is-grouped-multiline">
        <div class="control">
          <div class="tags has-addons">
            <span class="tag is-warning" title="Biges Statü Puanı"
              ><span class="icon">
                <svg
                  class="svg-inline--fa fa-star fa-w-18"
                  aria-hidden="true"
                  data-prefix="fas"
                  data-icon="star"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  ></path></svg
                ><!-- <i class="fas fa-star"></i> --> </span
              ><span>Statü Puanları</span></span
            >
            <span class="tag">{{ detail.status_point }}</span>
          </div>
        </div>
        <!-- <div class="control">
          <div class="tags has-addons">
            <span class="tag is-info" title="Biges Club Puanları"
              ><span class="icon">
                <svg
                  class="svg-inline--fa fa-gift fa-w-16"
                  aria-hidden="true"
                  data-prefix="fas"
                  data-icon="gift"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm448-288h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40zm-72 320h160c17.7 0 32-14.3 32-32V320H288v160z"
                  ></path></svg
                ></span
              ><span>Biges Club Puanları</span></span
            >
            <span class="tag">{{ detail.club_point }}</span>
          </div>
        </div> -->
        <div class="control">
          <div class="tags has-addons">
            <span class="tag is-danger" title="İskonto"
              ><span class="icon">
                <svg
                  class="svg-inline--fa fa-percent fa-w-14"
                  aria-hidden="true"
                  data-prefix="fas"
                  data-icon="percent"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M112 224c61.9 0 112-50.1 112-112S173.9 0 112 0 0 50.1 0 112s50.1 112 112 112zm0-160c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zm224 224c-61.9 0-112 50.1-112 112s50.1 112 112 112 112-50.1 112-112-50.1-112-112-112zm0 160c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zM392.3.2l31.6-.1c19.4-.1 30.9 21.8 19.7 37.8L77.4 501.6a23.95 23.95 0 0 1-19.6 10.2l-33.4.1c-19.5 0-30.9-21.9-19.7-37.8l368-463.7C377.2 4 384.5.2 392.3.2z"
                  ></path></svg
                ><!-- <i class="fas fa-percent"></i> --> </span
              ><span>İskonto</span></span
            >
            <span class="tag">%{{ detail.discount_rate | filterDecimal }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="box">
      <p class="title">Ödeme Türü</p>
      <div class="order-head-grid-wrapper">
        <div>
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                :value="detail.payment_method"
                readonly=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CURRENCY_SYMBOL } from '@/constants'

export default {
  name: 'ServiceOfferDetail',
  props: { detail: { type: Object, required: true } },
  data() {
    return {
      currencySymbol: { ...CURRENCY_SYMBOL }
    }
  },
  computed: {
    product() {
      return this.detail?.item || []
    }
  },
  methods: {
    dateFormat(value) {
      return value?.split(' ')?.[0]
    },
    getNetPrice(subtotal, discount) {
      return parseFloat(subtotal) - parseFloat(discount)
    }
  },
  filters: {
    countFilter(value) {
      return parseInt(value)
    },
    filterDecimal(value) {
      return parseFloat(value).toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
.offer-grid-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  .doc-no {
    grid-row: 1;
    grid-column: 1;
  }
  .description {
    grid-row: 1 / 4;
    grid-column: 2;
  }
  .offer-date {
    grid-row: 2;
    grid-column: 1;
  }

  .recipient {
    grid-row: 3;
    grid-column: 1;
  }
}

.svg-inline--fa {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;

  &.fa-w-18 {
    width: 1.125rem;
  }
}
</style>
