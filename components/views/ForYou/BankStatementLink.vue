<template>
  <div
    @click.stop="handleClick"
    :class="options.bill_link ? 'statement-link' : ''"
  >
    <span>{{ options.document_type }}-{{ options.document_number }}</span>
  </div>
</template>

<script>
export default {
  name: 'BankStatementLink',
  props: {
    options: { type: Object, default: () => {} }
  },
  computed: {
    token() {
      return this.$auth?.strategy?.token?.get()?.split(' ')?.[1]
    }
  },
  methods: {
    handleClick() {
      if (this.options.bill_link && this.token) {
        let url = this.options.bill_link + '&key=' + this.token
        window.open(url, '_blank')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.statement-link {
  color: #3273dc;
  &:hover {
    text-decoration: underline;
  }
}
</style>