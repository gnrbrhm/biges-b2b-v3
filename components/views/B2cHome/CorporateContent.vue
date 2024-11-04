<template>
    <div class="container">
      <div class="corporate-content" v-if="activeCategory">
        <img class="card-img" :src="image" />
        <div class="shape"></div>
        <div class="card-text">
          <div v-if="corporate" class="text">
            <div class="text__title">{{ title }}</div>
            <div class="text__header">{{ corporate.title }}</div>
            <div class="text__p" v-html="corporate.excerpt"></div>
            <div
              @click="
                $router.push(
                  corporate.title === 'Biges Group'
                    ? '/kurumsal?menu=İŞTİRAKLERİMİZ'
                    : `/kurumsal?menu=${corporate.title}`
                )
              "
              class="clickable flex row hd-12 font-bold"
            >
              <p style="color: rgba(31, 31, 31, 0.5); margin-right: 2px">
                {{ footerSymbol }}
              </p>
              {{ footer }}
            </div>
          </div>
          <div class="menu">
            <div class="menu-container">
              <div
                class="menu-item"
                v-for="(item, index) in categoryList"
                :key="item.id"
                :class="{ active: activeCategory === item.id }"
                @click="changeCategory(item.id, item.name, item.top_photo)"
              >
                <p>{{ item.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  
  export default {
    name: 'CorporateContent',
    props: {
      categoryList: { type: Array, default: () => [] },
      corporate: { type: Object, default: () => {} }
    },
    setup(props, { emit }) {
      const image = ref('')
      const activeCategory = ref(0)
      const title = ref('')
      const footerSymbol = ref('>')
      const footer = ref(' Devamı')
  
      const changeCategory = (id, name, img) => {
        image.value = img
        activeCategory.value = id
        title.value = name
        emit('onChange', id)
      }
  
      onMounted(() => {
        if (props.categoryList.length) {
          const firstCategory = props.categoryList[0]
          changeCategory(firstCategory.id, firstCategory.name, firstCategory.top_photo)
        }
      })
  
      return {
        image,
        activeCategory,
        title,
        footerSymbol,
        footer,
        changeCategory
      }
    }
  }
  </script>
  
  <style lang="scss">
  @import '../../../components/styles/B2cHome/corporate-content.scss';
  </style>
  