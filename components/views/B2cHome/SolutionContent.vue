<template>
    <div class="container-color">
      <div class="container">
        <div class="solution-content">
          <div class="solution_header">
            <div class="solution_header__p1 h-12 font-bold flex space-between">
              <p>ÇÖZÜMLER</p>
              <router-link to="/cozumler" class="flex align-center link-color">
                TÜM ÇÖZÜMLER
                <Icon
                  class="pl-5"
                  name="KeyboardRightArrow"
                  :options="{
                    fill: '#001163',
                    fillPath: '#001163',
                    stroke: '#001163'
                  }"
                />
              </router-link>
            </div>
            <div class="solution_header__p2 h-46 font-600">
              <router-link to="/cozumler">
                Güvenlik Teknolojileri Geliştiriyoruz.
              </router-link>
            </div>
            <div class="solution_header__p3"></div>
          </div>
          <div class="content_first">
            <div class="first" :style="getImg(solutions[0])"></div>
            <div class="second">
              <div class="second__container">
                <div class="row-1" :style="getIcon(solutions[0])"></div>
                <div
                  class="row-2 clickable"
                  @click="goToSolution(solutions[0].page_url)"
                >
                  {{ solutions[0].title }}
                </div>
                <div class="row-3" v-html="solutions[0].excerpt"></div>
                <div @click="goToSolution(solutions[0].page_url)" class="row-4 clickable">
                  <p style="color: rgba(31, 31, 31, 0.5); margin-right: 2px">
                    {{ footerSymbol }}
                  </p>
                  {{ footer }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="solutions[1]" class="content_first">
            <div class="second">
              <div class="second__container">
                <div class="row-1" :style="getIcon(solutions[1])"></div>
                <div
                  class="row-2 clickable"
                  @click="goToSolution(solutions[1].page_url)"
                >
                  {{ solutions[1].title }}
                </div>
                <div class="row-3" v-html="solutions[1].excerpt"></div>
                <div @click="goToSolution(solutions[1].page_url)" class="row-4 clickable">
                  <p style="color: rgba(31, 31, 31, 0.5); margin-right: 2px">
                    {{ footerSymbol }}
                  </p>
                  {{ footer }}
                </div>
              </div>
            </div>
            <div class="first" :style="getImg(solutions[1])"></div>
          </div>
          <div class="footer-solution">
            <SolutionCard
              @onClick="goToSolution"
              v-if="solutions[2]"
              :data="solutions[2]"
            ></SolutionCard>
            <SolutionCard
              @onClick="goToSolution"
              v-if="solutions[3]"
              :data="solutions[3]"
            ></SolutionCard>
            <div class="footer-more">
              <img class="footer-more__img" src="@/assets/solution-mask.png" />
              <div class="footer-more__content ml-50 mr-66">
                <div class="footer-more__content__text mt-30">
                  İhtiyaçlarınıza uygun diğer çözümlerimizi inceleyin.
                </div>
                <div
                  @click.prevent="moreSolution"
                  class="footer-more__content__button clickable mt-30"
                >
                  TÜM ÇÖZÜMLER
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import SolutionCard from './SolutionCard'
  import Icon from '@/components/icons'
  
  const props = defineProps({
    solutions: { type: Array, default: () => [] }
  })
  
  const footerSymbol = '>'
  const footer = ' Devamı'
  
  const router = useRouter()
  
  const getImg = (solution) => {
    return solution?.big_showcase_image
      ? `background-image:url(${solution.big_showcase_image})`
      : ''
  }
  
  const getIcon = (solution) => {
    return solution?.svg_icon_data?.svg_icon_url
      ? `background-image:url(${solution.svg_icon_data.svg_icon_url})`
      : ''
  }
  
  const goToSolution = (url) => {
    router.push(`/cozumler/${url}`)
  }
  
  const moreSolution = () => {
    router.push('/cozumler')
  }
  </script>
  
  <style lang="scss" scoped>
  @import '../../../components/styles/B2cHome/solution-content.scss';
  </style>
  