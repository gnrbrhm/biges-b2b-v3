<template>
  <li class="accordion__item">
    <div
      class="accordion__trigger"
      :class="{ accordion__trigger_active: visible }"
      @click="open"
    >
      <span class="isOpen icon bordered-icon clickable" v-if="!visible">
        <Icons name="up" />
      </span>
      <span class="isOpen icon bordered-icon clickable" v-else>
        <Icons name="down" />
      </span>
      <slot name="accordion-trigger"></slot>
    </div>

    <transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <div class="accordion__content" v-show="visible">
        <ul>
          <slot name="accordion-content"></slot>
        </ul>
      </div>
    </transition>
  </li>
</template>

<script>
import Icons from '@/components/icons'

export default {
  components: {
    Icons
  },
  inject: ['Accordion'],
  props: {
    selected: { default: null, type: Number }
  },
  data() {
    return {
      index: null
    }
  },
  computed: {
    visible() {
      if (this.Accordion.active == 0 || this.Accordion.active)
        return this.index == this.Accordion.active
      else if (this.selected) {
        return true
      } else return null
    }
  },

  watch: {
    selected(val) {
      console.log('Selected', val)
    }
  },
  methods: {
    open() {
      if (this.visible) {
        this.Accordion.active = null
      } else {
        this.Accordion.active = this.index
      }
    },
    start(el) {
      el.style.height = el.scrollHeight + 'px'
    },
    end(el) {
      el.style.height = ''
    }
  },
  created() {
    this.index = this.Accordion.count++
  }
}
</script>

<style lang="scss" scoped>
.accordion__item {
  border: solid 1px #1f1f1f1a;
  border-radius: 3px;
  position: relative;
  margin-bottom: 15px;
}

.accordion__trigger {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.isOpen {
  font-size: 30px;
  position: absolute;
  right: 10px;
}

.accordion-enter-active,
.accordion-leave-active {
  will-change: height, opacity;
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}
</style>
