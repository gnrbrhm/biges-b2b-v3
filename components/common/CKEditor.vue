<template>
  <client-only placeholder="loading...">
      <ckeditor
        :value="value"
        :disabled="disabled"
        @input="(event) => $emit('input', event)"
      ></ckeditor>
  </client-only>
</template>

<script>
let CKEditor

if (process.client) {
  CKEditor = require('ckeditor4-vue')
} else {
  CKEditor = { component: { template: '<textarea></textarea>' } }
}

export default {
  name: 'CKEditor',
  components: {
    ckeditor: CKEditor.component
  },
  props: {
    value: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    uploadUrl: {
      type: String,
      required: false
    },
    config: {
      type: Object,
      required: false
    }
  }
}
</script>