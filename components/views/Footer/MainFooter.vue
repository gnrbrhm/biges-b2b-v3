<template>
  <div class="main-footer">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="footer-info">
            <span class="footer-subtitle has-text-grey-light"
              >Çağrı Merkezi</span
            >
            <p class="has-text-weight-bold is-size-6 has-text-grey-light">
              <a href="tel:+904440918" class="has-text-grey-light">
                444 0 918
              </a>
            </p>
          </div>
          <div class="footer-info">
            <span class="footer-subtitle has-text-grey-light">Faks</span>
            <p class="has-text-weight-bold is-size-6 has-text-grey-light">
              <a href="tel:+902122108650" class="has-text-grey-light">
                0 212 210 86 50
              </a>
            </p>
          </div>
          <div class="footer-info">
            <span class="footer-subtitle has-text-grey-light">E-posta</span>
            <p class="has-text-weight-bold is-size-6 has-text-grey-light">
              <a href="mailto:info@biges.com" class="has-text-grey-light">
                info@biges.com</a
              >
            </p>
          </div>
          <div class="footer-info">
            <span class="footer-subtitle has-text-grey-light"
              >Sosyal Medyalar
            </span>
            <p class="has-text-weight-bold is-size-6 has-text-grey-light mb-6">
              <a
                href="https://www.instagram.com/biges_guvenlihayat/"
                class="has-text-grey-light gap"
                target="_blank"
              >
                <app-icon name="Instagram" />
              </a>
              <a
                href="https://www.facebook.com/BigesGuvenliHayat/"
                class="has-text-grey-light gap"
                target="_blank"
              >
                <app-icon name="Facebook2" />
              </a>
              <a
                href="https://tr.linkedin.com/company/biges-as"
                class="has-text-grey-light gap"
                target="_blank"
              >
              <app-icon name="Linkedin" />

              </a>
              <a
                href="https://www.youtube.com/biges"
                class="has-text-grey-light gap"
                target="_blank"
              >
              <app-icon name="Youtube" />
              </a>
              <a
                href="https://x.com/biges_guvenlik"
                class="has-text-grey-light gap"
                target="_blank"
              >
              <app-icon name="NewTwitter" />
              </a>
            </p>
          </div>
        </div>
        <div v-if="isAuthenticated" class="column">
          <div class="footer-menu">
            <h3 class="has-text-weight-bold is-size-6 has-text-grey-light">
              Hesap Ayarları
            </h3>
            <ul class="footer-sub-menu">
              <li>
                <nuxt-link
                  to="/size-ozel?active_menu=settings&tab=0"
                  class="is-size-7"
                  >Bilgilerim</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/size-ozel?active_menu=management&tab=0"
                  class="is-size-7"
                  >Firma Bilgileri</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/size-ozel?active_menu=management&tab=1"
                  class="is-size-7"
                  >Yeni Kullanıcılar</nuxt-link
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <div class="footer-menu">
            <h3 class="has-text-weight-bold is-size-6 has-text-grey-light">
              Biges Hakkında
            </h3>
            <ul class="footer-sub-menu">
              <li>
                <nuxt-link to="/kurumsal?menu=HAKKIMIZDA" class="is-size-7"
                  >Hakkımızda</nuxt-link
                >
              </li>
              <li v-if="isAuthenticated">
                <nuxt-link to="/destek" class="is-size-7"
                  >Garanti ve Destek</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/iletisim" class="is-size-7"
                  >İletişim Bilgileri</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/sayfa/kurumsal-icerikler/sirket-bilgilerimiz"
                  class="is-size-7"
                  >Şirket Bilgilerimiz</nuxt-link
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <div class="footer-menu">
            <h3 class="has-text-weight-bold is-size-6 has-text-grey-light">
              Biges.com
            </h3>
            <ul class="footer-sub-menu">
              <li>
                <nuxt-link
                  to="/sayfa/kurumsal-icerikler/site-kullanim-sartlari"
                  class="is-size-7"
                  >Site Kullanım Şartları</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/sayfa/kurumsal-icerikler/cerezler-politikasi"
                  class="is-size-7"
                  >Çerez Politikası</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/sayfa/kurumsal-icerikler/cerezler-hakkinda-aydinlatma-metni"
                  class="is-size-7"
                  >Çerezler Hakkında Aydınlatma Metni</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/sayfa/kurumsal-icerikler/sirket-bilgilerimiz"
                  class="is-size-7"
                  >Şirket Bilgilerimiz</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/sayfa/kurumsal-icerikler/destek-ve-garanti-kosullari"
                  class="is-size-7"
                  >Destek ve Garanti Koşulları</nuxt-link
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <div class="footer-menu">
            <h3 class="has-text-weight-bold is-size-6 has-text-grey-light">
              Kişisel Veriler
            </h3>
            <ul class="footer-sub-menu">
              <li>
                <nuxt-link
                  to="/sayfa/kurumsal-icerikler/kisisel-verilerin-korunmasi-hakkinda-bilgilendirme"
                  class="is-size-7"
                  >Kişisel Verilerin Korunması Hakkında Bilgilendirme</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/sayfa/kurumsal-icerikler/kisisel-veriler-basvuru-formu"
                  class="is-size-7"
                  >Kişisel Veriler Başvuru Formu</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/sayfa/kurumsal-icerikler/gizlilik-politikasi"
                  class="is-size-7"
                  >Gizlilik Politikası</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/sayfa/kurumsal-icerikler/kvkk-bayi-aydinlatma-metni"
                  class="is-size-7"
                  >KVKK Bayi Aydınlatma Metni</nuxt-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Icon from '@/components/icons/index.vue'

export default {
  components: {
    appIcon: Icon
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  }
}
</script>
<style lang="scss">
@import './components/styles/Footer/main-footer.scss';
</style>
