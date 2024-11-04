export default defineNuxtConfig({
    ssr: true,
    modules: [],
    css: [
      '@/assets/css/main.scss', // Global SCSS dosyanızı buraya ekleyin
    ],
    runtimeConfig: {
        public: {
                baseURL: process.env.API_BASE_URL,
              apiWss: process.env.API_BASE_URL_WS,
              envName: process.env.ENV_NAME,
              openreplay_key: process.env.OPENREPLAY_KEY,
              maintenance_mode: process.env.MAINTENANCE_MODE,
              googleAnalytics: {
                id: 'UA-5585439-1'
              }
        }
      },
    
    vite: {
      plugins: ['~/plugins/vuex.js','~/plugins/vue3-notification.js','~/plugins/openreplay.js'],
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@import "@/assets/css/variables.scss";` // Yolu doğru şekilde belirtin
          }
        }
      }
    },
    vue: {
      config: {
        devtools: true,
        productionTip: false,
      },
    },
  
    compatibilityDate: "2024-09-16"
  })
  