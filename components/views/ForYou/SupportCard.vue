<template>
  <div
    @click="$emit('onClick', item)"
    class="doc-card flex col center m-10"
    @mouseout="isMouseOver = false"
    @mouseover="mouseOver"
  >
    <div>
      <template v-if="isMouseOver">
        <Icon
          name="folder-file2"
          width="30"
          height="30"
          icon-color="transparent"
        />
      </template>
      <template v-else>
        <Icon name="folder" icon-color="transparent" />
      </template>
    </div>
    <div class="text">
      {{ item.name }}
    </div>
    <div class="count">({{ item.document_count }})</div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
  name: 'SupportCard',
  components: { Icon },
  props: {
    item: { type: Object, default: () => {} }
  },
  data() {
    return {
      isMouseOver: false
    }
  },
  methods: {
    mouseOver() {
      this.isMouseOver = true
    }
  }
}
</script>

<style lang="scss" scoped>
.doc-card {
  width: 162px;
  height: 168px;
  cursor: pointer;

  background: rgba(31, 31, 31, 0.05);
  border-radius: 3px;

  .text {
    margin-top: 23px;

    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;

    text-align: center;

    color: #1f1f1f;
  }

  .count {
    margin-top: 10px;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;

    color: rgba(31, 31, 31, 0.5);
  }

  &:hover {
    background: #ffffff;
    border: 1px solid rgba(31, 31, 31, 0.1);
    box-sizing: border-box;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }
}
</style>