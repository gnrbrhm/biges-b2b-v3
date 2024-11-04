import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()

  // Dinamik olarak OpenReplay modülünü import et
  const { default: OpenReplay } = await import('@openreplay/tracker')

  // OpenReplay'i başlat ve yapılandır
  const tracker = new OpenReplay({
    projectKey: config.public.openreplay_key,
    ingestPoint: 'https://openreplay.hybrone.com/ingest',
    __DISABLE_SECURE_MODE: true
  })

  // OpenReplay tracker'ı başlat
  tracker.start()

  // OpenReplay'i global olarak sağlayın
  nuxtApp.provide('openReplay', tracker)
})
