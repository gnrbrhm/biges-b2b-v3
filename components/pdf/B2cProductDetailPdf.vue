<template>
  <div class="container">
    <!-- <button class="button" @click="print">print</button> -->
    <div id="pdfContent">
      <div class="h-20 pl-30 border-bottom pb-20 pt-20">
        <div
          v-if="brandLogo"
          class="pdf-logo-img"
          :style="`background-image:url(${brandLogo})`"
        ></div>
        <template v-else>
          {{ brand }}
        </template>
      </div>
      <div class="pdf-breadcrumb pl-30">{{ category }}</div>
      <div class="flex row pl-30 border-bottom pb-20">
        <div
          class="pdf-img border radius-5"
          :style="`background-image:url(${photo})`"
        ></div>
        <div class="pl-20 flex col justify-center pr-100">
          <div>
            <div class="pdf-title border">
              {{ brand }}
            </div>
          </div>
          <div class="h-20 font-bold mt-10">
            {{ productData.stock_code }}
          </div>
          <div class="h-14 font-400 mt-10">
            {{ productData.summary }}
          </div>
        </div>
      </div>
      <div class="pl-30 pr-30 pt-20">
        <div class="h-16 font-bold pb-20">Teknik Özellikler</div>
        <ul class="pdf-ul">
          <li
            class="p-5"
            v-for="(item, index) in productData.technical_features"
            :key="item + '-' + index"
          >
            <div class="flex row">
              <div class="li-width">{{ item.name }}</div>
              <div>{{ item.value }}</div>
            </div>
            <div
              v-if="index == 25 && productData.technical_features.length > 26"
              style="margin-bottom: 170px"
            ></div>
          </li>
        </ul>
      </div>
      <!-- <B2cProductDetailPdf
        :data="productData.technical_features"
      ></B2cProductDetailPdf> -->
    </div>
  </div>
</template>

<script>
import endpoints from '@/api/endpoints'

export default {
  props: {
    productId: { type: String, required: true }
  },
  data() {
    return {
      productData: {},
      partnerData: []
    }
  },
  computed: {
    brandLogo() {
      let findBrand = this.partnerData?.find(
        (item) => item.hidden_name == this.brand
      )
      if (findBrand) {
        return findBrand
      } else {
        return null
      }
    },
    category() {
      if (this.productData?.categories?.length) {
        return this.productData.categories[0].name
      } else {
        return null
      }
    },
    brand() {
      if (this.productData && this.productData.brand) {
        return this.productData.brand.name
      } else {
        return null
      }
    },
    photo() {
      if (this.productData?.photos?.length) {
        return this.productData.photos[0].photo
      } else {
        return null
      }
    }
  },
  methods: {
    async getData() {
      try {
        let { data } = await this.$axios({
          ...endpoints.product.product_detail,
          url: endpoints.product.product_detail.url(this.productId)
        })
        this.productData = data
        let partner = await this.$axios({
          ...endpoints.references.brands
        })
        this.partnerData = partner.data.results
      } catch (error) {
        console.log(error)
        this.$notify({
          type: 'error',
          title: 'Bir Hata Oluştu!',
          text: '',
          duration: 5000
        })
      }
    }
    // print() {
    //   var element = document.getElementById('pdfContent')
    //   var opt = {
    //     filename: 'document.pdf',
    //     image: { type: 'png', quality: 0.99 },
    //     html2canvas: {
    //       scale: 2,
    //       dpi: 192,
    //       letterRendering: true,
    //       useCORS: true
    //     },
    //     jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' }
    //   }
    //   html2pdf()
    //     .from(element)
    //     .set(opt)
    //     .toPdf()
    //     .get('pdf')
    //     .then(function (pdf) {
    //       window.open(pdf.output('bloburl'), '_blank')
    //     })
    //   // html2pdf().from(element).set(opt).save()
    // }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
#pdfContent {
  max-width: 215mm;
  height: auto;

  .pdf-logo-img {
    height: 35px;
    width: auto;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .pdf-title {
    display: inline;
    padding: 5px;
    font-size: 12px;
    color: rgba(31, 31, 31, 0.4);
    font-weight: bold;
    border-radius: 3px;
    background: rgba(31, 31, 31, 0.1);
  }

  .pdf-breadcrumb {
    font-size: 16px;
    line-height: 50px;
    color: rgba(31, 31, 31, 0.4);
    font-weight: bold;
  }

  .pdf-img {
    width: 190px;
    height: 140px;
    position: relative;
    display: block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
}
.li-width {
  min-width: 200px;
}
.pdf-ul {
  li {
    font-size: 12px;
    line-height: 15px;
  }
  li:nth-child(odd) {
    background: rgba(31, 31, 31, 0.1);
  }
}
</style>