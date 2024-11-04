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
              <th
                v-for="(head, index) in columns"
                :style="thWidth(index)"
                :key="head + '-' + index"
                class="clickable no-white-space"
              >
                <div class="flex row width-100 space-between">
                  <span>{{ head }}</span>
                  <!-- <div v-if="head != '' && isSort">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      width="16px"
                      height="16px"
                      viewBox="0 0 401.998 401.998"
                      style="enable-background: new 0 0 401.998 401.998"
                      xml:space="preserve"
                    >
                      <g>
                        <g>
                          <path
                            v-if="activeHeadIndex != index"
                            fill="rgba(31,31,31,0.4)"
                            d="M73.092,164.452h255.813c4.949,0,9.233-1.807,12.848-5.424c3.613-3.616,5.427-7.898,5.427-12.847    c0-4.949-1.813-9.229-5.427-12.85L213.846,5.424C210.232,1.812,205.951,0,200.999,0s-9.233,1.812-12.85,5.424L60.242,133.331    c-3.617,3.617-5.424,7.901-5.424,12.85c0,4.948,1.807,9.231,5.424,12.847C63.863,162.645,68.144,164.452,73.092,164.452z"
                          />
                          <path
                            fill="rgba(31,31,31,0.4)"
                            d="M328.905,237.549H73.092c-4.952,0-9.233,1.808-12.85,5.421c-3.617,3.617-5.424,7.898-5.424,12.847    c0,4.949,1.807,9.233,5.424,12.848L188.149,396.57c3.621,3.617,7.902,5.428,12.85,5.428s9.233-1.811,12.847-5.428l127.907-127.906    c3.613-3.614,5.427-7.898,5.427-12.848c0-4.948-1.813-9.229-5.427-12.847C338.139,239.353,333.854,237.549,328.905,237.549z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div> -->
                </div>
              </th>
            </tr>
          </thead>
          <tbody :style="isBlur ? 'filter:blur(8px)' : null">
            <tr
              @click="clickRow(index, row)"
              v-for="(row, index) in rows"
              :key="row + '-' + index"
              :class="{ clickable: isClickable }"
            >
              <td
                v-for="(col, colIndex) in row"
                v-show="col.data && !col.component ? false : true"
                :key="col + '-' + colIndex"
                :style="{
                  border:
                    data.rows.length - 1 == index && !isLastRowBorder
                      ? 'none'
                      : null,
                  'line-height': colHeight
                }"
              >
                <template v-if="col && typeof col == 'object'">
                  <component
                    :is="col.component"
                    :text="col.text"
                    :options="col.options"
                    :img="col.img"
                    :isChecked="activeRow == index ? true : false"
                    @handleEvent="
                      $emit('handleCol', { type: $event, item: row })
                    "
                  ></component>
                </template>
                <template v-else>
                  {{ col }}
                  <!-- <template v-if="colIndex == 0"> {{ col }}</template>
                  <template v-else>{{ col | numberFormatTr }}</template> -->
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
  components: {
    TableRadio: () => import('@/components/common/TableRadio'),
    DeleteButton: () => import('@/components/common/DeleteButton'),
    CustomerTableButtonGroup: () =>
      import('@/components/views/offers/CustomerTableButtonGroup'),
    GreenColumn: () => import('@/components/views/ForYou/GreenColumn'),
    RedColumn: () => import('@/components/views/ForYou/RedColumn'),
    BlueColumn: () => import('@/components/views/ForYou/BlueColumn'),
    ProductColumn: () => import('@/components/views/ForYou/ProductColumn'),
    IconColumn: () => import('@/components/views/ForYou/IconColumn'),
    CopyButton: () => import('@/components/views/ForYou/CopyButton'),
    ServiceReportButton: () =>
      import('@/components/views/ForYou/ServiceReportButton'),
    BankStatementLink: () =>
      import('@/components/views/ForYou/BankStatementLink'),
    TableBoldColumn: () => import('@/components/views/ForYou/TableBoldColumn')
  },
  props: {
    title: { type: String, default: null },
    warningMessage: { type: String, default: null },
    widthFirstTh: { type: String, default: null },
    data: { type: Object, default: () => {} },
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
