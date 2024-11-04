<template>
    <div class="container">
      <div :class="isAuth ? 'blog-content-b2b' : 'blog-content-b2c'">
        <div class="blog_header">
          <div class="h-12 font-bold flex space-between">
            <p>BLOG</p>
            <router-link to="/blog" class="flex align-center link-color">
              TÜM BLOG YAZILARI
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
          <div class="blog_header__p2">
            <router-link to="/blog">
              Haberler, Yeni Teknolojiler ve Başarı Hikayeleri
            </router-link>
          </div>
        </div>
        <div class="blog_content_mid">
          <div class="blog_content_mid__left">
            <img :src="articles[0].bigger_image" alt="" />
          </div>
          <div class="blog_content_mid__right">
            <div class="blog_content_mid__right__tag">
              <div
                class="blog_content_mid__right__tag__left clickable"
                @click="goToCategory(article.category.id)"
              >
                #{{ article.tag }}
              </div>
              <div class="blog_content_mid__right__tag__right">
                {{ formatDate(article.published_at) }}
              </div>
            </div>
            <div
              @click="goToArticle(article.page_url)"
              class="blog_content_mid__right__title clickable"
            >
              {{ article.title }}
            </div>
            <div
              class="blog_content_mid__right__text"
              v-html="article.excerpt"
            ></div>
            <div
              @click="goToArticle(article.page_url)"
              class="blog_content_mid__right__footer clickable"
            >
              <p style="color: rgba(31, 31, 31, 0.5); margin-right: 2px">
                {{ footerSymbol }}
              </p>
              {{ footer }}
            </div>
          </div>
        </div>
        <div class="blog_footer">
          <BlogCard
            v-for="(article, index) in articles.slice(1, 4)"
            :key="article + 'home' + index"
            :data="article"
            @onClick="goToArticle(article.page_url)"
          ></BlogCard>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { dateFormatLL } from '@/utils/date'
  import BlogCard from './BlogCard'
  import Icon from '@/components/icons'
  import { computed } from 'vue'
  
  const props = defineProps({
    articles: { type: Array, default: () => [] },
    isAuth: { type: Boolean, default: false }
  })
  
  const footerSymbol = '>'
  const footer = ' Devamı'
  
  const router = useRouter()
  
  const article = computed(() => ({
    tag: props.articles?.[0]?.tags?.[0] || '',
    published_at: props.articles?.[0]?.published_at,
    title: props.articles?.[0]?.title,
    excerpt: props.articles?.[0]?.excerpt,
    page_url: props.articles?.[0]?.page_url,
    category: props.articles?.[0]?.category
  }))
  
  const formatDate = (value) => {
    return value ? dateFormatLL(String(value)) : ''
  }
  
  const goToArticle = (url) => {
    router.push(`/blog/${url}`)
  }
  
  const goToCategory = (id) => {
    router.push(`/blog?category_id=${id}`)
  }
  </script>
  
  <style lang="scss" scoped>
  @import '../../../components/styles/B2cHome/blog-content.scss';
  </style>
  