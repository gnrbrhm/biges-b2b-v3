<template>
  <component v-if="name" :is="name" :options="options" />
</template>

<script>
export default {
  name: 'Icons',
  props: {
    name: { type: String, default: null },
    options: { type: Object, default: () => {} }
  },
  components: {
    Info: () => import('./Info.vue'),
    Hybrone: () => import('./Hybrone.vue'),
    Close: () => import('./Close.vue'),
    Check: () => import('./Check.vue'),
    Heart: () => import('./Heart.vue'),
    Left: () => import('./Left.vue'),
    Right: () => import('./Right.vue'),
    Up: () => import('./Up.vue'),
    Down: () => import('./Down.vue'),
    Locked: () => import('./Locked.vue'),
    GrayLocked: () => import('./GrayLocked.vue'),
    TargetCenter: () => import('./TargetCenter.vue'),
    Calendar: () => import('./Calendar.vue'),
    KeyboardRightArrow: () => import('./KeyboardRightArrow.vue'),
    Facebook: () => import('./Facebook.vue'),
    Facebook2: () => import('./Facebook2.vue'),
    Twitter: () => import('./Twitter.vue'),
    NewTwitter: () => import('./newTwitter.vue'),
    Instagram: () => import('./Instagram.vue'),
    Youtube: () => import('./Youtube.vue'),
    Linkedin: () => import('./Linkedin.vue'),
    Cargo: () => import('./Cargo.vue'),
    CargoDetail: () => import('./CargoDetail.vue'),
    Manufacture: () => import('./Manufacture.vue'),
    ManufactureDetail: () => import('./ManufactureDetail.vue'),
    // AdminAnnouncement: () => import('./AdminAnnouncement.vue'),
    // PaymentOk: () => import('./PaymentOk.vue'),
    // Campaign: () => import('./Campaign.vue'),
    // Information: () => import('./Information.vue'),
    Bag: () => import('./Bag.vue'),

    /**  Bildirim Tipleri */
    Admin_Duyuru: () => import('./notifications/duyuru.vue'),
    Admin_Bilgilendirme: () => import('./notifications/bilgilendirme.vue'),
    Kampanya: () => import('./notifications/kampanya.vue'),
    Eposta: () => import('./notifications/eposta.vue'),
    Kullanıcı: () => import('./notifications/kullanici.vue'),
    Indirim: () => import('./notifications/indirim.vue'),
    Etkinlik: () => import('./notifications/etkinlik.vue'),
    Uyarı: () => import('./notifications/uyarı.vue'),
    Döküman: () => import('./notifications/döküman.vue'),
    Sipariş_Kargoda: () => import('./notifications/kargo_takip.vue'),
    /** Bildirim Tipleri Bitiş */

    /** Badges */
    isEco: () => import('./badges/isEco.vue'),
    isAlternative: () => import('./badges/isAlternative.vue'),
    isCampaigned: () => import('./badges/isCampaigned.vue'),
    isOutlet: () => import('./badges/isOutlet.vue'),
    isDiscounted: () => import('./badges/isDiscounted.vue'),
    isSpecialOffer: () => import('./badges/isSpecialOffer.vue')
  }
}
</script>

<style></style>
