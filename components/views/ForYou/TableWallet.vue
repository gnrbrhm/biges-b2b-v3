<template>
  <div class="foryou-table">
    <div class="table-container">
      <div class="table-container__title flex row space-between">
        <div v-if="title">{{ title }}</div>
        <slot name="title"></slot>
      </div>
      <slot name="custom-title"></slot>
      <slot name="subtitle-tab"></slot>
      <div class="table-container__table">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th v-for="(head, index) in columns" :style="thWidth(index)" :key="head + '-' + index"
                class="clickable no-white-space">
                <div class="flex row width-100 space-between">
                  <span>{{ head }}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody :style="isBlur ? 'filter:blur(8px)' : null">
            <tr @click="clickRow(index, row)" v-for="(row, index) in rows" :key="row + '-' + index"
              :class="{ clickable: isClickable }">
              <td v-for="(col, colIndex) in row" v-show="col.data && !col.component ? false : true"
                :key="col + '-' + colIndex" :style="{
                  border:
                    data.rows.length - 1 == index && !isLastRowBorder
                      ? 'none'
                      : null,
                  'line-height': colHeight
                }">
                <template v-if="col && typeof col == 'object'">
                  <div v-if="col.walletType" v-html="getWalletType(col)"></div>
                  <div v-else>{{ Intl.NumberFormat('de-DE')
            .format(col.text) 
                }}</div>

                </template>
                <template v-else>
                  {{ col }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="!isBlur" class="width-100 h-16 font-normal flex center">
          <span> {{ warnText }}</span>
        </div>

        <div v-if="isBlur" class="is-blur">
          <img src="@/assets/svg/task-list-warning.svg" alt="" />
          <p class="text">{{ warningMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  components: {},
  props: {
    title: { type: String, default: null },
    warningMessage: { type: String, default: null },
    widthFirstTh: { type: String, default: null },
    data: { type: Object, default: () => { } },
    isLastRowBorder: { type: Boolean, default: false },
    isClickable: { type: Boolean, default: false },
    isBlur: { type: Boolean, default: false },
    colHeight: { type: String, default: null },
    query: { type: String, default: null },
    isSort: { type: Boolean, default: true },
    warnText: { type: String, default: '' },
    fromTableInstallment: { type: Boolean, default: false }
  },
  data() {
    return {
      activeRow: null,
      activeHeadIndex: null,
      sort: {
        index: 0,
        desc: false
      }
    }
  },
  computed: {
    columns() {
      return this.data.headers
    },
    rows() {
      return this.data.rows
    }
  },
  mounted() {
    if (this.fromTableInstallment) {
      if (this.rows.length > 2) {
        this.clickRow(2, this.rows[2])
        return
      }
      this.clickRow(0, this.rows[0])
    }
  },
  methods: {
    getWalletType(col) {
      if (col.walletType == 'Harcama') {
        return `<span style="color: #F71E3F;">Harcandı</span>`
      } else if (col.walletType == 'Kazanım') {
        return `<span style="color: #0D2B81;">Kazanıldı</span>`
      } else if (col.walletType == 'Manuel') {
        return `<span style="color: #FFB300;">Tanımlanan</span>`
      } else {
        return `<span>${col.walletType}</span>`
      }
    },
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
  }
}
</script>

<style lang="scss" scoped>
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

      tr {
        &:hover {
          background-color: rgba(31, 31, 31, 0.05);
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
