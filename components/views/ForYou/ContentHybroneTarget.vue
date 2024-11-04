<template>
  <TabMenu
    :isLoading="isLoading"
    title="Hybrone Hedeflerim"
    height="80px"
    weight="500"
    :tab="tab"
    :isTab="false"
  >
    <div class="content">
      <span class="content-title">{{ 'Güncel Durum'.toUpperCase() }}</span>
      <div class="content-current-status">
        <div
          v-for="(item, index) in Object.values(current_status)"
          v-if="item.key != 'training'"
          :key="index"
          class="content-current-status-box"
        >
          <img
            :src="require(`@/assets/svg/hybrone-target/${item.key}-badge.svg`)"
          />
          <span class="label">{{ item.label }}</span>
          <span class="value">{{ item.value }}</span>
        </div>
      </div>
      <span class="content-title">{{ 'Hedefler'.toUpperCase() }}</span>

      <div
        v-for="level in all_level_info"
        :key="level.levelOrder"
        class="content-target-box"
      >
        <div class="content-target-box-header">
          <div class="content-target-box-header-title">
            {{ `Hedefinizi Tamamlayın ${level.bonusPoint} Bonus Kazanın!` }}
          </div>
          <div
            :class="
              `content-target-box-header-status-${
                level.status ? 'success' : 'fault'
              }`
            "
          >
            <span>{{
              `${level.status ? 'Tamamlandı' : 'Tamamlanmadı'}`.toUpperCase()
            }}</span>
          </div>
        </div>
        <div class="content-target-box-content">
          <div class="content-target-box-content-status">
            <div
              v-for="(item, index) in Object.values(current_status)"
              v-if="level[`${item.key}Count`] != '0'"
              :key="index"
              class="content-target-box-content-status-item"
            >
              <div class="content-target-box-content-status-item-badge">
                <img
                  :src="
                    require(`@/assets/svg/hybrone-target/${item.key}-badge.svg`)
                  "
                />
              </div>
              <span class="content-target-box-content-status-item-label">
                {{ item.label }}
              </span>
              <div class="content-target-box-content-status-item-progress">
                <ProgressBar
                  :percentage="
                    calculatePertentage(item.value, level[`${item.key}Count`])
                  "
                  :barWidth="150"
                />
              </div>
              <div class="content-target-box-content-status-item-value">
                <span
                  class="content-target-box-content-status-item-value-current"
                >
                  {{ `${item.value}` }}
                </span>
                /
                <span
                  class="content-target-box-content-status-item-value-target"
                >
                  {{ `${level[`${item.key}Count`]}` }}
                </span>
              </div>
            </div>
          </div>
          <div class="content-target-box-content-arrow">
            <img src="@/assets/svg/hybrone-target/arrow-right.svg" />
          </div>
          <div class="content-target-box-content-earn">
            <div class="content-target-box-content-earn-bonus">
              <img src="@/assets/svg/hybrone-target/earn-bonus.png" />
              <div class="content-target-box-content-earn-bonus-content">
                <span class="label">BONUS</span>
                <span class="value">{{ level.bonusPoint }}</span>
              </div>
            </div>

            <div class="content-target-box-content-earn-extra">
              <img src="@/assets/svg/hybrone-target/earn-extra.png" />
              <div class="content-target-box-content-earn-extra-content">
                <span class="label">EKSTRA KAZANÇ</span>
                <span class="value">{{
                  `% ${level.bonusPercent.split('.')[0]} `
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="content-target-box-regulation">
          <span class="content-target-box-regulation-title">Koşullar</span>
          <div v-html="level.terms"></div>
        </div>
      </div>
    </div>
  </TabMenu>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue'

import TabMenu from '@/components/views/ForYou/TabMenu'
import { mapActions } from 'vuex'
export default {
  name: 'SizeOzel',
  components: {
    ProgressBar,
    TabMenu
  },
  props: {
    tab: { type: Number, default: 0 }
  },
  data() {
    return {
      title: 'Hybrone Hedeflerim',
      current_status: {
        premise: {
          label: 'Mekanlar',
          value: '0',
          target: '50',
          key: 'premise'
        },
        customer: {
          label: 'Müşteriler',
          value: '0',
          target: '40',
          key: 'customer'
        },
        device: {
          label: 'Cihazlar',
          value: '0',
          target: '10',
          key: 'device'
        },
        addOn: {
          label: 'Eklentiler',
          value: '0',
          target: '50',
          key: 'addOn'
        },
        digitalProduct: {
          label: 'Dijital Ürünler',
          value: '0',
          target: '50',
          key: 'digitalProduct'
        },
        training: {
          label: 'Sertifikalar',
          value: '0',
          target: '0',
          key: 'training'
        }
      },
      all_level_info: null
    }
  },
  computed: {},
  methods: {
    ...mapActions({
      fetchHybroneAccountCompaign: 'foryou/fetchHybroneAccountCompaign'
    }),
    calculatePertentage(current, target) {
      // if (target == '0')
      return parseInt(current) > parseInt(target)
        ? 100
        : (parseInt(current) / parseInt(target)) * 100
      // else return 0
    },

    calculateStatus(level) {
      let result = true
      Object.keys(this.current_status).forEach(item => {
        result =
          result &&
          parseInt(this.current_status[item].value) >=
            parseInt(level[`${item}Count`])
      })
      return result
    },

    async getLevels() {
      const {
        all_level_info,
        hybrone_integrator_level
      } = await this.fetchHybroneAccountCompaign()
      Object.values(this.current_status).forEach((item, index) => {
        console.log('test', hybrone_integrator_level.premiseCount)
        this.current_status[item.key].value =
          hybrone_integrator_level[`${item.key}Count`]
      })
      this.all_level_info = all_level_info
        .map(l => {
          return {
            ...l,
            status: this.calculateStatus(l),
            order: parseInt(l.levelOrder)
          }
        })
        .sort((item, item2) => item.order - item2.order)
      console.log('All Level Info', this.all_level_info)
    }
  },
  created() {
    this.getLevels()
  }
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  padding: 30px 20px;

  &-title {
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 16.94px;
    text-align: left;
    color: #1f1f1f80;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 50px;
    /* padding-left: 20px; */
  }
  &-current-status {
    display: flex;
    flex-direction: row;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    padding: 20px 0;
    margin-bottom: 40px;

    &-box {
      width: 157px;
      height: 150px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      border: 1px solid #1f1f1f1a;
      .label {
        font-family: Inter;
        font-size: 11.52px;
        font-weight: 400;
        line-height: 13.95px;
        text-align: center;
        color: #007db7;
      }

      .value {
        font-family: Inter;
        font-size: 23.05px;
        font-weight: 700;
        line-height: 27.89px;
        text-align: center;

        color: #007db7;
      }
    }
  }
  &-target-box {
    display: flex;
    flex-direction: column;
    border: 1px solid #1f1f1f1a;
    margin-bottom: 30px;
    &-header {
      height: 70px;
      display: flex;
      flex-direction: row;
      padding: 20px;

      justify-content: space-between;
      border-bottom: 1px solid #1f1f1f1a;

      &-title {
        font-family: Inter;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        text-align: left;
        color: #1f1f1f;
      }
      &-status {
        &-success {
          height: 22px;
          padding: 5px 7px 5px 7px;
          gap: 5px;
          border-radius: 3px;
          border: 1px;
          display: flex;
          align-items: center;
          background: #24ce950d;
          border: 1px solid #24ce951a;

          span {
            font-family: Inter;
            font-size: 10px;
            font-weight: 600;
            line-height: 12.1px;
            text-align: left;

            color: #24ce9580;
          }
        }
        &-fault {
          height: 22px;
          padding: 5px 7px 5px 7px;
          gap: 5px;
          border-radius: 3px;
          border: 1px;
          display: flex;
          align-items: center;
          background: #1f1f1f0d;
          border: 1px solid #1f1f1f1a;
          span {
            font-family: Inter;
            font-size: 10px;
            font-weight: 600;
            line-height: 12.1px;
            text-align: left;

            color: #1f1f1f80;
          }
        }
      }
    }
    &-content {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      /* gap: 10px; */
      padding: 30px 10px;

      &-status {
        width: 650px;
        border: 1px solid #1f1f1f1a;
        padding: 20px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 10px;

        &-item {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          gap: 65px;
          padding: 10px 10px 10px 10px;

          &-badge {
            img {
              width: 32px;
              height: 37px;
            }
          }

          &-label {
            width: 100px;
            font-family: Inter;
            font-size: 12px;
            font-weight: 400;
            line-height: 18px;
            text-align: left;
            color: #0d2f81;
          }

          &-value {
            font-family: Inter;
            font-size: 19.57px;
            font-weight: 500;
            line-height: 29.35px;
            text-align: left;

            &-current {
              display: inline-flex;
              width: 45px;
              color: #24ce95;
            }
            &-target {
              display: inline-flex;
              width: 25px;
              margin-left: 5px;
              color: #0d2f81b2;
            }
          }
        }
      }

      &-earn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;

        &-extra {
          display: flex;
          flex-direction: row;
          width: 200px;
          height: 110px;
          &-content {
            width: 176px;
            height: 110px;
            border: 1px solid #1f1f1f1a;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding-left: 26px;
            .label {
              font-family: Inter;
              font-size: 10px;
              font-weight: 600;
              line-height: 15px;
              text-align: left;

              color: #0d2f81;
            }

            .value {
              font-family: Inter;
              font-size: 24px;
              font-weight: 600;
              line-height: 29.05px;
              text-align: left;
              background: -webkit-linear-gradient(
                241.56deg,
                #ffd600 40.64%,
                #d9b600 64.89%
              );
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
          img {
            width: 47px;
            height: 53px;
            position: relative;
            top: 25%;
            left: 22px;
          }
        }

        &-bonus {
          @extend .content-target-box-content-earn-extra;
          &-content {
            /* width: auto; */
            padding: 0px 5px 0px 25px;

            @extend .content-target-box-content-earn-extra-content;
          }

          img {
            width: 47px;
            height: 53px;
            position: relative;
            top: 25%;
            left: 22px;
          }
        }
        &-extra {
          @extend .content-target-box-content-earn-extra;
          &-content {
            /* width: auto; */
            padding: 0px 5px 0px 25px;

            @extend .content-target-box-content-earn-extra-content;
          }

          img {
            width: 47px;
            height: 53px;
            position: relative;
            top: 25%;
            left: 22px;
          }
        }
      }
    }
    &-regulation {
      padding: 30px;
      &-title {
        font-family: Inter;
        font-size: 12px;
        font-weight: 500;
        line-height: 24px;
        text-align: left;
        color: #1f1f1f;
      }
      ol {
        list-style-type: none;
        li {
          font-family: Inter;
          font-size: 12px;
          font-weight: 400;
          line-height: 24px;
          text-align: left;
          color: #1f1f1f80;
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .content {
    display: flex;
    flex-direction: column;
    padding: 30px 20px;

    &-title {
      font-family: Inter;
      font-size: 14px;
      font-weight: 400;
      line-height: 16.94px;
      text-align: left;
      color: #1f1f1f80;
    }
    &-current-status {
      display: flex;
      flex-direction: row;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 30px;
      padding: 20px 0;
      margin-bottom: 40px;

      &-box {
        width: 157px;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        border: 1px solid #1f1f1f1a;
        .label {
          font-family: Inter;
          font-size: 11.52px;
          font-weight: 400;
          line-height: 13.95px;
          text-align: center;
          color: #007db7;
        }

        .value {
          font-family: Inter;
          font-size: 23.05px;
          font-weight: 700;
          line-height: 27.89px;
          text-align: center;

          color: #007db7;
        }
      }
    }
    &-target-box {
      display: flex;
      flex-direction: column;
      border: 1px solid #1f1f1f1a;
      &-header {
        height: 70px;
        display: flex;
        flex-direction: row;
        padding: 20px;

        justify-content: space-between;
        border-bottom: 1px solid #1f1f1f1a;

        &-title {
          width: 200px;
          font-family: Inter;
          font-size: 12px;
          font-weight: 500;
          line-height: 14px;
          text-align: left;
          color: #1f1f1f;
        }
        &-status {
          width: 83px;
          height: 22px;
          padding: 5px 7px 5px 7px;
          gap: 5px;
          border-radius: 3px;
          border: 1px;

          background: #24ce950d;
          border: 1px solid #24ce951a;
          span {
            font-family: Inter;
            font-size: 10px;
            font-weight: 600;
            line-height: 12.1px;
            text-align: left;

            color: #24ce9580;
          }
        }
      }

      &-content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 5px;

        &-arrow {
          display: none;
        }

        &-status {
          width: 100%;
          border: 1px solid #1f1f1f1a;
          padding: 5px;

          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 10px;

          &-item {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            gap: 8px;
            padding: 10px 0px;

            &-badge {
              img {
                width: 25px;
                height: 32px;
              }
            }

            &-label {
              width: 70px;
              font-family: Inter;
              font-size: 10px;
              font-weight: 400;
              line-height: 18px;
              text-align: left;
              color: #0d2f81;
            }

            &-value {
              font-family: Inter;
              font-size: 12px;
              line-height: 18px;
              text-align: left;

              &-current {
                color: #24ce95;
                width: 20px;
              }
              &-target {
                color: #0d2f81b2;
                margin-left: 0px;
                width: 15px;
              }
            }
          }
        }

        &-earn {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;

          &-extra {
            display: flex;
            flex-direction: row;
            width: 200px;
            height: 110px;
            &-content {
              width: 176px;
              height: 110px;
              border: 1px solid #1f1f1f1a;

              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              padding-left: 26px;
              .label {
                font-family: Inter;
                font-size: 10px;
                font-weight: 600;
                line-height: 15px;
                text-align: left;

                color: #0d2f81;
              }

              .value {
                font-family: Inter;
                font-size: 24px;
                font-weight: 600;
                line-height: 29.05px;
                text-align: left;
                background: -webkit-linear-gradient(
                  241.56deg,
                  #ffd600 40.64%,
                  #d9b600 64.89%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            img {
              width: 47px;
              height: 53px;
              position: relative;
              top: 25%;
              left: 22px;
            }
          }

          &-bonus {
            display: flex;
            flex-direction: row;
            width: 200px;
            height: 110px;
            &-content {
              width: 176px;
              height: 110px;
              border: 1px solid #1f1f1f1a;

              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              padding-left: 26px;
              .label {
                font-family: Inter;
                font-size: 10px;
                font-weight: 600;
                line-height: 15px;
                text-align: left;

                color: #0d2f81;
              }

              .value {
                font-family: Inter;
                font-size: 24px;
                font-weight: 600;
                line-height: 29.05px;
                text-align: left;
                background: -webkit-linear-gradient(
                  241.56deg,
                  #ffd600 40.64%,
                  #d9b600 64.89%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }

            img {
              width: 47px;
              height: 53px;
              position: relative;
              top: 25%;
              left: 22px;
            }
          }
        }
      }
      &-regulation {
        padding: 30px;
        &-title {
          font-family: Inter;
          font-size: 14px;
          font-weight: 500;
          line-height: 24px;
          text-align: left;
          color: #1f1f1f;
        }
        ol {
          list-style-type: none;
          li {
            font-family: Inter;
            font-size: 10px;
            font-weight: 400;
            line-height: 16px;
            text-align: left;
            color: #1f1f1f80;
          }
        }
      }
    }
  }
}
</style>
