<template>
  <div class="foryou-order-table">
    <div class="table-container">
      <div class="table-container__title flex row space-between">
        <div>{{ title }}</div>
        <div class="table-container__title_custom-items">
          <slot name="title"></slot>
        </div>
      </div>
      <div :class="getLayout == 'mobile' ? 'flex col mt-10' : 'mt-30 flex row'">
        <div class="support-search-grid">
          <div class="input-grid">
            <input
              v-model="orderNo"
              class="flat-input"
              type="text"
              placeholder="Fatura No"
            />
            <div class="input-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.1316 15.1276C14.9704 13.4961 16.7598 9.06153 15.1284 5.2227C13.4969 1.38386 9.06236 -0.405564 5.22353 1.2259C1.38469 2.85737 -0.404731 7.29192 1.22673 11.1308C2.8582 14.9696 7.29275 16.759 11.1316 15.1276Z"
                  stroke="#1F1F1F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.5176 13.5166L19.3751 19.3749"
                  stroke="#1F1F1F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div :class="getLayout == 'mobile' ? 'flex col' : 'flex row'">
          <div :class="getLayout == 'mobile' ? 'mt-10' : 'ml-10'">
            <DateInput
              v-model="dateStart"
              placeholder="Başlangıç"
              @changeDate="startDate($event)"
            ></DateInput>
          </div>
          <div :class="getLayout == 'mobile' ? 'mt-10 mb-10' : 'ml-10'">
            <DateInput
              v-model="dateEnd"
              placeholder="Bitiş"
              @changeDate="endDate($event)"
            ></DateInput>
          </div>
          <div :class="getLayout == 'mobile' ? 'mt-10' : 'ml-20'">
            <button class="flat-button search-button" @click="searchOrder">
              Ara
            </button>
          </div>
        </div>
      </div>
      <div class="table-container__table">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th
                v-for="(head, index) in data.headers"
                :key="head + '-' + index"
              >
                {{ head }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in data.rows"
              :key="row + '-' + index"
              class="clickable"
              @click="$emit('rowHandle', row)"
            >
              <td
                v-for="(col, colIndex) in row"
                :key="col + '-' + colIndex"
                :style="
                  data.rows.length - 1 == index && !isLastRowBorder
                    ? 'border:none;white-space: nowrap;'
                    : 'white-space: nowrap;'
                "
              >
                <!-- <template v-if="typeof col == 'object'">
                  <div class="table-img-list grid col-4">
                    <template v-for="(img, imgIndex) in col">
                      <div
                        class="table-img last"
                        :key="img + '-' + imgIndex"
                        v-if="imgIndex == col.length - 1"
                      >
                        {{ img }}
                      </div>
                      <img
                        v-else
                        class="table-img"
                        :key="img + '-' + imgIndex"
                        :src="img"
                        alt=""
                      />
                    </template>
                  </div>
                </template> -->
                <div v-order-text="col">{{ col }}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="!data.rows.length"
          class="width-100 h-16 font-normal flex center"
        >
          <span> {{ warnText }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DateInput from '@/components/common/DateInput'
import SearchInput from '@/components/common/SearchInput'
import { dateFormat, dateSubtract, currentDate } from '@/utils/date'

import { mapGetters } from 'vuex'

export default {
  name: 'InvoiceTable',
  components: { DateInput, SearchInput },
  props: {
    title: { type: String, default: null },
    widthFirstTh: { type: String, default: null },
    data: { type: Object, default: () => {} },
    isLastRowBorder: { type: Boolean, default: false },
    warnText: { type: String, default: '' }
  },
  data() {
    return {
      orderNo: '',
      dateStart: null,
      dateEnd: null
    }
  },
  computed: {
    ...mapGetters(['getLayout'])
  },
  directives: {
    orderText: {
      // directive definition
      inserted: function(el, binding, vnode) {
        if (binding.value == 'pending') {
          el.innerHTML =
            '<div class="flex row align-center" style="height:16px"><div style="width:6px;height:6px;background:#24CE95;border-radius:3px;margin-right:5px;"></div>Siparişiniz Onay Bekliyor</div>'
          el.style.background = 'rgba(36, 206, 149, 0.1)'
          el.style.color = '#24CE95'
          el.style.padding = '5px 10px'
          el.style.textAlign = 'center'
          el.style.borderRadius = '1000px'
          el.style.float = 'left'
        } else if (binding.value == 'approved') {
          el.innerHTML =
            '<div class="flex row align-center" style="height:16px"><div style="width:6px;height:6px;background:#24CE95;border-radius:3px;margin-right:5px;"></div>Siparişiniz Hazırlanıyor</div>'
          el.style.background = '#FFB3001A'
          el.style.color = '#FFB300'
          el.style.padding = '5px 10px'
          el.style.textAlign = 'center'
          el.style.borderRadius = '1000px'
          el.style.float = 'left'
        } else if (binding.value == 'canceled') {
          el.innerHTML =
            '<div class="flex row align-center" style="height:16px"><div style="width:6px;height:6px;background:#F71E3F;border-radius:3px;margin-right:5px;"></div>İptal Edildi</div>'
          el.style.background = 'rgba(247, 30, 63, 0.1)'
          el.style.color = '#F71E3F'
          el.style.padding = '5px 10px'
          el.style.textAlign = 'center'
          el.style.borderRadius = '1000px'
          el.style.float = 'left'
        } else if (binding.value == 'cargo') {
          el.innerHTML =
            '<div class="flex row align-center" style="height:16px"><div style="width:6px;height:6px;background:#24CE95;border-radius:3px;margin-right:5px;"></div>Siparişiniz Kargoda</div>'
          el.style.background = 'rgba(36, 206, 149, 0.1)'
          el.style.color = '#24CE95'
          el.style.padding = '5px 10px'
          el.style.textAlign = 'center'
          el.style.borderRadius = '1000px'
          el.style.float = 'left'
        } else if (binding.value == 'delivered') {
          el.innerHTML =
            '<div class="flex row align-center" style="height:16px"><div style="width:6px;height:6px;background:#24CE95;border-radius:3px;margin-right:5px;"></div>Siparişiniz Teslim Edildi</div>'
          el.style.background = 'rgba(36, 206, 149, 0.1)'
          el.style.color = '#24CE95'
          el.style.padding = '5px 10px'
          el.style.textAlign = 'center'
          el.style.borderRadius = '1000px'
          el.style.float = 'left'
        }
      }
    }
  },
  watch: {
    orderNo(value) {
      this.$emit('orderHandle', value)
    },
    data(value) {
      console.log('Test Data', value)
    }
  },
  created() {
    let { startDate, endDate } = this.$route?.query
    this.dateStart = startDate || dateSubtract(2)
    this.dateEnd = endDate || currentDate()
    this.searchOrder()
  },
  methods: {
    searchOrder() {
      this.$emit('dateHandle', {
        start_date: this.dateStart,
        end_date: this.dateEnd
      })
    },
    startDate(value) {
      this.dateStart = value
    },
    endDate(value) {
      this.dateEnd = value
    }
  }
}
</script>

<style lang="scss" scoped>
.support-search-grid {
  width: 100%;
  max-width: 200px;
  display: grid;
  grid-template-rows: auto auto;
  grid-row-gap: 10px;
  position: relative;
  margin-right: 7px;

  input {
    height: 40px;
    background: #1f1f1f0d !important;
    border-radius: 3px;
    border: 1px solid rgba(31, 31, 31, 0.2);
    color: $black;
    &::placeholder {
      color: $text-grey;
    }
  }
  .input-icon {
    position: absolute;
    right: 0px;
    padding: 14px 10px 10px 10px;
    cursor: pointer;
  }
  p {
    color: $white;
  }
}
.search-button {
  height: 40px;
  width: 70px;
}
.foryou-order-table {
  .search-input {
    width: 200px;
    height: 40px;
    input {
      width: 200px;
      height: 40px;
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
      color: rgba(31, 31, 31, 0.5);
      border-radius: 3px;

      background: rgba(31, 31, 31, 0.05);

      outline: none;
      border: none;
      box-shadow: none;
    }
  }
  .table-container {
    &__title {
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;

      color: #1f1f1f;
    }

    &__table {
      margin-top: 25px;
      thead {
        th {
          border: none;
          border-bottom: 1px solid rgba(31, 31, 31, 0.1);
          padding: 15px;

          font-family: Inter;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 120%;
          color: rgba(31, 31, 31, 0.7);
        }
      }

      td {
        border: none;
        border-bottom: 1px solid rgba(31, 31, 31, 0.1);
        padding: 15px;
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 120%;

        color: #1f1f1f;
      }
    }
    .table-img-list {
      width: 190px;
      .table-img {
        width: 40px;
        height: 40px;
        background: #ffffff;
        border: 1px solid rgba(31, 31, 31, 0.1);
        box-sizing: border-box;
        border-radius: 2px;

        &.last {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Inter;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 120%;
          color: #1f1f1f;
        }
      }
    }
  }
}

.order-input {
  height: 40px;
  width: 150px;
  input {
    height: 40px;
  }
}
</style>
