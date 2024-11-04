<template>
  <div class="has-background-white" style="padding: 1rem">
    <h1 class="title">Teknik Servis Detayları</h1>

    <div class="field">
      <label class="label">Servis No</label>
      <div class="control">
        <input
          class="input"
          type="text"
          :value="detail.service_no"
          readonly=""
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Tarih</label>
      <div class="control">
        <input class="input" type="text" :value="detail.date" readonly="" />
      </div>
    </div>
    <div class="field">
      <label class="label">Ürün Adı</label>
      <div class="control">
        <input
          class="input"
          type="text"
          :value="detail.product_name"
          readonly=""
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Seri No</label>
      <div class="control">
        <input class="input" type="text" :value="detail.serie_no" readonly="" />
      </div>
    </div>
    <div class="field">
      <label class="label">Durumu</label>
      <div class="control">
        <input class="input" type="text" :value="detail.status" readonly="" />
      </div>
    </div>
    <div class="field">
      <label class="label">Sorun</label>
      <div class="control">
        <input class="input" type="text" :value="detail.problem" readonly="" />
      </div>
    </div>
    <div class="field">
      <label class="label">Servis Detayları</label>
      <div class="control">
        <input
          class="input"
          type="text"
          :value="detail.service_detail"
          readonly=""
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Çözüm</label>
      <div class="control">
        <input class="input" type="text" :value="detail.solution" readonly="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceDetail',
  props: { detail: { type: Object, required: true } }
}
</script>

<style>
</style>