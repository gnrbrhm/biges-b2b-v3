<template>
  <div class="tabcontent supports">
    <div class="supports-content --docs">
      <div
        v-for="(item, index) in docs"
        :key="index + '-doc-i'"
        class="support-list-item"
        @click="goRoute(item.ftp_url)"
      >
        <div>
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="30" height="30" fill="#E5E5E500" />
            <path
              d="M6.55753 29.06H2.80753C2.31024 29.06 1.83333 28.8625 1.4817 28.5108C1.13007 28.1592 0.932526 27.6823 0.932526 27.185V2.81C0.932526 2.31272 1.13007 1.8358 1.4817 1.48417C1.83333 1.13254 2.31024 0.934998 2.80753 0.934998H16.0938C16.3401 0.93505 16.5841 0.983651 16.8116 1.07802C17.0392 1.1724 17.2459 1.31069 17.42 1.485L24.7588 8.82375C24.9329 8.99794 25.0709 9.20473 25.1651 9.43229C25.2592 9.65985 25.3076 9.90373 25.3075 10.15V15.935"
              stroke="#1F1F1F"
              stroke-opacity="0.5"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M25.3075 10.31H17.8075C17.3102 10.31 16.8333 10.1125 16.4817 9.76082C16.1301 9.40919 15.9325 8.93228 15.9325 8.435V0.934998"
              stroke="#1F1F1F"
              stroke-opacity="0.5"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <text
              fill="#1F1F1F"
              fill-opacity="0.5"
              xml:space="preserve"
              style="white-space: pre"
              font-size="12"
              letter-spacing="0em"
            >
              <tspan x="7" y="27.1016">PDF</tspan>
            </text>
          </svg>
        </div>
        <div class="support-list-item__content">
          <p class="support-list-item__content__category">
            {{ item.category }}
          </p>
          <p class="support-list-item__content__title">{{ item.title }}</p>
          <p class="support-list-item__content__date">{{ item.created }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabDocuments',
  props: {
    product: {
      type: Object,
      default: () => ({})
    },
    docs: {
      type: Array,
      default: () => [
        // {
        //   category: 'Brosur',
        //   title: 'BLW-213123-123 Kullanim',
        //   created: new Date(Date.now())
        // },
        // {
        //   category: 'Brosur',
        //   title: 'BLW-213123-123 Kullanim',
        //   created: new Date(Date.now())
        // }
      ]
    }
  },
  methods: {
    goRoute(url) {
      location.href = url
    }
  }
}
</script>
