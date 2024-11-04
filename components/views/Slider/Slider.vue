<template>
  <div class="slider">
    <div class="slider-content">
      <div class="slider-item">
        <div class="slider-img">
          <img :src="getImg(slides[activeIndex].image)" />
          <div class="effect" />
          <div class="effect effect-sm" />
        </div>
        <div class="slider-text">
          <transition name="slide-fade">
            <div v-if="isShowSlide">
              <h2 class="has-text-white">
                {{ slides[activeIndex].title }}
              </h2>
              <p class="has-text-light-grey slider-desc">
                {{ slides[activeIndex].description }}
              </p>
            </div>
          </transition>
          <div class="slider-control">
            <a
              v-for="(slide, key) in slides"
              :key="key + '-desc-item'"
              :class="{ active: activeIndex == key }"
              class="slider-pagination"
              @click="activeIndex = key"
            />
          </div>
          <button
            v-if="$route.name != 'kayit'"
            @click="redirectToRegister"
            class="button"
          >
            BAYİ BAŞVURUSU
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils'

export default {
  name: 'Slider',
  watch: {
    activeIndex() {
      this.isShowSlide = false
      setTimeout(() => {
        this.isShowSlide = true
      }, 0)
    }
  },
  data() {
    return {
      isShowSlide: true,
      activeIndex: 1,
      animationDelay: 5000,
      slides: {
        1: {
          title: 'Biges Çözüm Ortağı Olun',
          description:
            'Güvenlik teknolojilerinin lider şirketinin güvencesiyle çalışmanın konforunu, hizmet kalitesinde farklılığı ve fırsatlardaki bolluğu yaşayın.',
          image: '/slider-item1.jpg'
        },
        2: {
          title: 'Biges B2B ile Kolay Alışveriş',
          description:
            'Biges tarafından özel olarak geliştirilen Biges B2B ve Biges B2B Mobil e-ticaret portalları ile siparişleriniz kolayca ve hızlı bir şekilde oluşturun.',
          image: '/slider-item2.jpg'
        },
        3: {
          title: "Biges'in Sosyal Dünyasına Katılın",
          description:
            "Biges'in Çözüm Ortaklarına özel dünyasına katılın, eğitimlerden seyahatlere, özel buluşmalardan lansmanlara kadar birçok farklı sosyal etkinliğe katılma fırsatı elde edin.",
          image: '/slider-item3.jpg'
        }
      }
    }
  },
  methods: {
    redirectToRegister() {
      this.$router.push('/kayit')
    },
    getImg(pic) {
      return getImgUrl(pic)
    },
    animation() {
      let count = Object.keys(this.slides).length
      setTimeout(() => {
        if (this.activeIndex == count) {
          this.activeIndex = 1
          this.animation()
          return
        }
        this.activeIndex++
        this.animation()
      }, this.animationDelay)
    }
  },
  created() {
    this.animation()
  }
}
</script>

<style lang="scss">
@import '../../../assets/css/transitions.scss';
@import './components/styles/Slider/slider.scss';
</style>
