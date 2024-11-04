<template>
  <div class="tabcontent supports">
    <div class="supports-content">
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
            <path
              d="M2.8125 27.1875C2.31522 27.1875 1.83831 26.99 1.48667 26.6383C1.13504 26.2867 0.9375 25.8098 0.9375 25.3125V4.83125C0.939148 4.29635 1.15237 3.78383 1.5306 3.4056C1.90883 3.02737 2.42135 2.81415 2.95625 2.8125H27.0537C27.586 2.81415 28.096 3.02631 28.4723 3.40267C28.8487 3.77903 29.0609 4.289 29.0625 4.82125V25.1688C29.0609 25.7036 28.8476 26.2162 28.4694 26.5944C28.0912 26.9726 27.5786 27.1859 27.0438 27.1875H2.8125Z"
              stroke="#1F1F1F"
              stroke-opacity="0.5"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M29.0625 8.4375H0.9375"
              stroke="#1F1F1F"
              stroke-opacity="0.5"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.625 14.0625L24.375 17.8125L20.625 21.5625"
              stroke="#1F1F1F"
              stroke-opacity="0.5"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.375 14.0625L5.625 17.8125L9.375 21.5625"
              stroke="#1F1F1F"
              stroke-opacity="0.5"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.875 14.0625L13.125 21.5625"
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
              <tspan x="7" y="27.1016">{{ item.platform }}</tspan>
            </text>
          </svg>
        </div>
        <div class="support-list-item__content">
          <p class="support-list-item__content__title">{{ item.title }}</p>
          <p
            class="support-list-item__content__category"
            v-html="item.description"
          ></p>
          <p class="support-list-item__content__text">{{ item.text }}</p>
          <p class="support-list-item__content__date">{{ item.created }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabSoftwares',
  props: {
    product: {
      type: Object,
      default: () => ({})
    },
    docs: {
      type: Array,
      default: () => [
        // {
        //   category: 'Kategori',
        //   title: 'Uygulama Adi',
        //   text: 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
        //   created: new Date(Date.now()),
        //   platform: 'ios'
        // },
        // {
        //   category: 'Kategori',
        //   title: 'Uygulama Adi',
        //   text: 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
        //   created: new Date(Date.now()),
        //   platform: 'android'
        // }
      ]
    }
  },
  mounted() {
    console.log('Doc', this.doc)
  },
  methods: {
    goRoute(url) {
      location.href = url
    }
  }
}
</script>
