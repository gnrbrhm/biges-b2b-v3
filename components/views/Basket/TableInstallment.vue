<template>
  <div class="foryou-table">
    <div class="table-container">
      <div class="table-container__title flex row space-between">
        <div v-if="title">{{ title }}</div>
        <slot name="title"></slot>
      </div>
      <slot name="custom-title"></slot>
      <slot name="subtitle-tab"></slot>
      <div class="table-container__table" :style="'margin-top:' + marginTitle">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th
                v-for="(head, index) in data.headers"
                :key="head + '-' + index"
                :style="thWidth(index)"
              >
                <span>{{ head }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="!isChequesTable">
              <tr
                @click="clickRow(index, row)"
                v-for="(row, index) in data.rows"
                :key="row + '-' + index"
                :class="{ clickable: isClickable }"
              >
                <td
                  :style="{
                    border:
                      data.rows.length - 1 == index && !isLastRowBorder
                        ? 'none'
                        : null,
                    'line-height': colHeight
                  }"
                  v-for="(col, colIndex) in row"
                  :key="col + '-' + colIndex"
                >
                  <template v-if="colIndex == 0 && isInstallment">
                    <input
                      class="mr-10"
                      type="radio"
                      :checked="activeRow == index ? true : false"
                    />
                    {{ col == 1 ? 'Tek Çekim' : col + ' Taksit' }}
                  </template>
                  <template v-else>
                    <template v-if="title == 'Taksit Seçenekleri'">
                      {{ col | numberFormatTr }}</template
                    >
                    <template v-else> {{ col }}</template>
                  </template>
                </td>
              </tr>
            </template>

            <template v-else>
              <tr
                v-for="(row, index) in data.rows"
                :key="row + '-' + index"
                :class="{ clickable: isClickable }"
              >
                <td>
                  <img :src="row[0]" class="chequeImg" />
                </td>

                <td>{{ row[1] }}</td>
                <td
                  align="right"
                  class="is-justify-content-center is-align-content-center	"
                >
                  <span
                    v-if="!isActiveCheque || row[2] !== isActiveCheque"
                    @click="$emit('chooseCheque', row)"
                    class="chooseCheque"
                    >SEÇ</span
                  >
                  <span v-else class="chooseCheque active">SEÇİLDİ</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TableRadio from '@/components/common/TableRadio.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Table',
  components: {
    TableRadio
  },
  props: {
    title: { type: String, default: null },
    isInstallment: { type: Boolean, default: false },
    widthFirstTh: { type: String, default: null },
    data: { type: Object, default: () => {} },
    isLastRowBorder: { type: Boolean, default: false },
    isChequesTable: { type: Boolean, default: false },
    isClickable: { type: Boolean, default: false },
    colHeight: { type: String, default: null },
    marginTitle: { type: String, default: '25px' },
    isActiveCheque: { type: Number }
  },
  data() {
    return {
      activeRow: null,
      activeHeadIndex: null
    }
  },
  computed: {},
  methods: {
    thWidth(index) {
      if (this.widthFirstTh && index == 0) {
        return 'width:' + this.widthFirstTh + ';'
      } else {
        return null
      }
    },
    clickRow(index, row) {
      this.$emit('handleRow', row)
      this.activeRow = index
    }
  },
  mounted() {
    if (this.data.rows.length == 1) {
      this.clickRow(0, this.data.rows[0])
    }
  }
}
</script>

<style lang="scss" scoped>
.chequeImg {
  width: 50px;
  height: 30px;
}

.chooseCheque {
  margin-right: 10px;
  color: #24ce95;
  cursor: pointer;
  user-select: none;
  text-align: right;
  border: 1px solid rgba(31, 31, 31, 0.1);
  padding: 5px;
  font-size: 0.7rem;
}

.active {
  background: #24ce95 !important;
  color: white !important;
  font-weight: bold;
}

.foryou-table {
  .active-head {
    background: rgba(183, 224, 235, 0.4);
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
      position: relative;
      thead {
        th {
          border: none;
          border-bottom: 1px solid rgba(31, 31, 31, 0.1);
          padding: 15px 0;

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
        padding: 15px 0;
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 120%;

        color: #1f1f1f;
      }

      .is-blur {
        position: absolute;
        top: 80px;
        width: 100%;
        text-align: center;

        .text {
          margin-top: 15px;
          font-family: Inter;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 17px;

          color: #1f1f1f;
        }
      }
    }
  }
}
</style>
