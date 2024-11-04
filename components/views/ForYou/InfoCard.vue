<template>
  <div v-if="type == 'small'" class="info-card-container">
    <div class="info-card-container__group flex row">
      <div v-if="isIcon" class="icon">
        <slot name="icon"></slot>
      </div>
      <div class="info-card-container__group__text">
        <template v-if="isReverseText">
          <div class="info-card-container__group__text__second">
            {{ secondText }}
          </div>
          <div class="info-card-container__group__text__first mt-5">
            {{ firstText }}
          </div>
        </template>
        <template v-else>
          <div class="info-card-container__group__text__first">
            {{ firstText }}
          </div>
          <div class="info-card-container__group__text__second">
            {{ secondText | numberFormatTr }}
          </div>
        </template>
      </div>
    </div>
  </div>
  <div v-else-if="type == 'footer'" class="footer-card flex col">
    <div class="m-30 flex col">
      <div class="title-date">02.10.2020</div>
      <div class="title mt-5">Güney Afrika Turu</div>
      <div class="subtitle mt-10">
        Güney afrika'ya gidiyoruz. Bu yıl içerisinde kaçırmadan başvurunuzu
        yapın!
      </div>
      <div class="point mt-20 flex center">PUAN : 20.000</div>
    </div>
    <div class="bottom flex center p-25">
      <div class="footer-button">Hemen Katıl</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    firstText: { type: String, default: null },
    secondText: { type: String | Number, default: null },
    type: { type: String, default: 'small' },
    isReverseText: { type: Boolean, default: false },
    isIcon: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
.info-card-container {
  padding: 17px 20px;
  background: rgba(31, 31, 31, 0.05);
  border-radius: 3px;

  .icon {
    width: auto;
    height: auto;
  }

  &__group {
    &__text {
      &__first {
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 120%;
        color: rgba(31, 31, 31, 0.7);
      }
      &__second {
        margin-top: 5px;
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        color: #1f1f1f;
      }
    }
  }
}
.footer-card {
  background: #ffffff;
  border: 1px solid rgba(31, 31, 31, 0.1);
  box-sizing: border-box;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  .title-date {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 120%;

    color: rgba(31, 31, 31, 0.5);
  }
  .title {
    cursor: pointer;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;

    color: #0d2f81;
  }
  .subtitle {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;

    color: rgba(31, 31, 31, 0.7);
  }
  .point {
    width: 107px;
    height: 35px;
    background: rgba(31, 31, 31, 0.1);
    border-radius: 3px;

    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: rgba(31, 31, 31, 0.7);
  }

  .bottom {
    border-top: 1px solid rgba(31, 31, 31, 0.1);
    .footer-button {
      cursor: pointer;
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 120%;

      color: #0d2f81;
    }
  }
}
</style>