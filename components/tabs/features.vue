<template>
  <div class="tabcontent technical-specifications">
    <div class="technical-content">
      <h5
        v-if="
          product.technical_features && product.technical_features.length > 0
        "
      ></h5>
      <table
        v-if="
          product.technical_features && product.technical_features.length > 0
        "
      >
        <tr
          v-for="(item, index) in product.technical_features"
          :key="index + '-td-item'"
        >
          <td width="20%">
            {{ item.name }}
          </td>
          <td>{{ item.value }}</td>
        </tr>
      </table>

      <h5 v-if="product.documents && product.documents.length > 0">
        Belgeler
      </h5>
      <table v-if="product.documents && product.documents.length > 0">
        <tr
          v-for="(item, index) in product.documents"
          :key="index + '-doc-item'"
        >
          <td width="20%">
            {{ item.title }}
          </td>
          <td>
            <a :href="item.ftp_url">İndir</a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabFeatures',
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
