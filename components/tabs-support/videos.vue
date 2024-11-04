<template>
  <div class="tabcontent supports">
    <div class="supports-content">
      <div
        v-for="(item, index) in docs"
        :key="index + '-doc-i'"
        class="support-list-item --video"
        @click="goRoute(item.youtube_url)"
      >
        <div class="support-list-item__cover-image">
          <img src="@/assets/slider-item.png" alt="" />
        </div>
        <div class="support-list-item__content">
          <!-- <p class="support-list-item__content__category">{{ item.category }}</p> -->
          <p class="support-list-item__content__title">{{ item.title }}</p>
          <p class="support-list-item__content__text">{{ item.text }}</p>
          <p class="support-list-item__content__date">{{ item.created }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabVideos',
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
        //   text:
        //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint cumque qui mollitia odio in alias a veniam omnis ab eius?',
        //   created: new Date(Date.now()),
        //   platform: 'ios'
        // },
        // {
        //   category: 'Kategori',
        //   title: 'Uygulama Adi',
        //   text:
        //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint cumque qui mollitia odio in alias a veniam omnis ab eius?',
        //   created: new Date(Date.now()),
        //   platform: 'android'
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
