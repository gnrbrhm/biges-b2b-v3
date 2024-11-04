<template>
    <div class="opportunities_wrapper">
      <span>Biges'in Fırsatlar Dünyası</span>
  
      <div class="opportunities_wrapper__menu">
        <router-link
          class="opportunities_wrapper__menu__item"
          to="/urunler?discount=1"
        >
          <div class="opportunities_wrapper__menu__item_left">
            <img
              src="@/assets/mobile/components/indirimli-urunler.png"
              alt="Biges İndirimli Ürünler"
            />
            İndirimli Ürünler
          </div>
  
          <div class="opportunities_wrapper__menu__item_right">
            <img src="@/assets/mobile/components/arrow-right.png" />
          </div>
        </router-link>
  
        <router-link class="opportunities_wrapper__menu__item" to="/urunler/outlet">
          <div class="opportunities_wrapper__menu__item_left">
            <img
              src="@/assets/mobile/components/outlet-urunler.png"
              alt="Biges Outlet Ürünler"
            />
            Outlet Ürünler
          </div>
  
          <div class="opportunities_wrapper__menu__item_right">
            <img src="@/assets/mobile/components/arrow-right.png" />
          </div>
        </router-link>
  
        <router-link
          class="opportunities_wrapper__menu__item"
          to="/urunler?alternative=1"
        >
          <div class="opportunities_wrapper__menu__item_left">
            <img
              src="@/assets/mobile/components/alternatif-urunler.png"
              alt="Biges Alternatif Ürünler"
            />
            Alternatif Ürünler
          </div>
  
          <div class="opportunities_wrapper__menu__item_right">
            <img src="@/assets/mobile/components/arrow-right.png" />
          </div>
        </router-link>
  
        <router-link
          class="opportunities_wrapper__menu__item"
          to="/urunler?campaign=1"
        >
          <div class="opportunities_wrapper__menu__item_left">
            <img
              src="@/assets/mobile/components/kampanyali-urunler.png"
              alt="Biges Kampanyalı Ürünler"
            />
            Kampanyalı Ürünler
          </div>
  
          <div class="opportunities_wrapper__menu__item_right">
            <img src="@/assets/mobile/components/arrow-right.png" />
          </div>
        </router-link>
  
        <router-link class="opportunities_wrapper__menu__item" to="/urunler?eco=1">
          <div class="opportunities_wrapper__menu__item_left">
            <img
              src="@/assets/mobile/components/eko-urunler.png"
              alt="Biges Eko Ürünler"
            />
            Eko Ürünler
          </div>
  
          <div class="opportunities_wrapper__menu__item_right">
            <img src="@/assets/mobile/components/arrow-right.png" />
          </div>
        </router-link>
  
        <router-link
          class="opportunities_wrapper__menu__item"
          to="/urunler?project=1"
        >
          <div class="opportunities_wrapper__menu__item_left">
            <img
              src="@/assets/mobile/components/project-pencil.png"
              alt="Biges Proje Ürünleri"
            />
            Proje Ürünleri
          </div>
  
          <div class="opportunities_wrapper__menu__item_right">
            <img src="@/assets/mobile/components/arrow-right.png" />
          </div>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {}
  </script>
  
  <style lang="scss" scoped>
  .opportunities_wrapper {
    padding: 20px 15px;
  
    span {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: #1f1f1f;
    }
  
    &__menu {
      border: 1px solid rgba(31, 31, 31, 0.1);
      box-sizing: border-box;
      border-radius: 3px;
      margin-top: 20px;
  
      &__item {
        display: flex;
        border-bottom: 1px solid rgba(31, 31, 31, 0.1);
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;
  
        font-weight: 500;
        font-size: 13px;
        line-height: 16px;
  
        color: rgba(31, 31, 31, 0.8);
  
        &_left {
          display: flex;
          align-items: center;
          padding-left: 10px;
  
          img {
            width: 18px;
            height: 18px;
            margin-right: 10px;
          }
        }
  
        &_right {
          padding-right: 10px;
  
          img {
            width: 5px;
            height: 9px;
          }
        }
      }
  
      &__item:last-child {
        border: 0px;
      }
    }
  }
  </style>
  