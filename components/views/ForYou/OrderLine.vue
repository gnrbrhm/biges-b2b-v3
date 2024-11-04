<template>
  <div class="line-container flex align-center p-35">
    <div :class="`flex ${getLayout == 'mobile' ? 'col' : 'row'} align-center`">
      <template>
        <img
          :src="require(`@/assets/svg/order/check-${line1.color}.svg`)"
          alt=""
        />
        <div class="text ml-15" :class="line1.color">
          Siparişiniz Onay Bekliyor
        </div>
        <span class="ml-40">
          <Icon name="right-arrow2" :pathFill="colors[line1.color]"></Icon>
        </span>
      </template>
      <template v-if="status != 2">
        <template>
          <img
            class="ml-40"
            :src="
              require(`@/assets/svg/order/shipment-open-${line2.color}.svg`)
            "
            alt=""
          />
          <div class="text ml-15" :class="line2.color">
            Siparişiniz Hazırlanıyor
          </div>
          <span class="ml-40">
            <Icon name="right-arrow2" :pathFill="colors[line2.color]"></Icon>
          </span>
        </template>
        <template>
          <div
            class="flex col center"
            :class="{ 'pt-15': line3.color != 'gray' }"
          >
            <div class="flex rox">
              <img
                class="ml-40"
                :src="require(`@/assets/svg/order/truck-${line3.color}.svg`)"
                alt=""
              />
              <div class="text ml-15" :class="line3.color">
                Siparişiniz Kargoda
              </div>
              <span class="ml-40">
                <Icon
                  name="right-arrow2"
                  :pathFill="colors[line3.color]"
                ></Icon>
              </span>
            </div>
            <div
              v-if="status >= 3"
              @click="$emit('handleTrack')"
              class="order-track-text"
            >
              Sipariş Takip
            </div>
          </div>
        </template>
        <template>
          <img
            class="ml-40"
            :src="
              require(`@/assets/svg/order/shipment-check-${line4.color}.svg`)
            "
            alt=""
          />
          <div class="text ml-15" :class="line4.color">
            Siparişiniz Teslim Edildi
          </div>
        </template>
      </template>

      <template v-else>
        <Icon
          class="ml-40"
          width="20"
          height="20"
          name="close"
          strokeColor="red"
        />
        <div class="text ml-15" style="color: red">Siparişiniz Onaylanmadı</div>
      </template>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import { mapGetters } from 'vuex'

export default {
  name: 'OrderLine',
  components: { Icon },
  props: { status: { type: Number, default: () => {} } },
  data() {
    return {
      colors: {
        gray: '#acadaf',
        green: '#4caf50',
        blue: '#0D2F81'
      },
      line1: {
        color: 'gray',
        url: color => {
          return `@/assets/svg/order/check-${color}.svg`
        }
      },
      line2: {
        color: 'gray',
        url: color => {
          return `@/assets/svg/order/shipment-open-${color}.svg`
        }
      },
      line3: {
        color: 'gray',
        url: color => {
          return `@/assets/svg/order/truck-${color}.svg`
        }
      },
      line4: {
        color: 'gray',
        url: color => {
          return `@/assets/svg/order/shipment-check-${color}.svg`
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getLayout'])
  },
  methods: {
    lineStatus() {
      /***
        0: onay bekliyor,
        1: onaylandı,
        2: iptal edildi,
        3: kargoda
      ***/

      switch (this.status) {
        case 0:
          this.line1 = { color: 'green' }
          this.line2 = { color: 'blue' }
          break
        case 1:
          this.line2 = { color: 'green' }
          this.line3 = { color: 'blue' }
          break
        case 3:
          this.line3 = { color: 'green' }
          this.line4 = { color: 'blue' }
          break
        case 4:
          this.line4 = { color: 'green' }
          break
      }
    }
  },
  created() {
    this.lineStatus()
  }
}
</script>

<style lang="scss" scoped>
.line-container {
  background: #ffffff;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  height: 80px;
}

.text {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  color: #4caf50;
}

.order-track-text {
  cursor: pointer;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-decoration-line: underline;

  color: #1f1f1f;
}

.green {
  color: #4caf50;
}
.gray {
  color: #1f1f1f;
}
.blue {
  color: #0d2f81;
}

@media (max-width: 768px) {
  .line-container {
    height: auto;
  }
}
</style>
