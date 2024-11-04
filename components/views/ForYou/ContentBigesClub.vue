<template>
  <TabMenu
    :tab="tab"
    :items="items"
    :is-loading="isLoading"
    height="80px"
    @onTab="$emit('handleTab', $event)"
  >
    <div class="club-content" :class="{ 'club-content-2': tab == 0 }">
      <!-- <template v-if="tab == 0">
        <div class="grid col-3 col-gap-15 row-gap-15 p-25">
          <div>
            <InfoCard
              :isReverseText="false"
              firstText="Faturadan Kazanılan"
              :secondText="clubData.earned_from_bill"
            ></InfoCard>
          </div>
          <div>
            <InfoCard
              firstText="İadeden Düşen"
              :secondText="clubData.falling_from_return"
            ></InfoCard>
          </div>
          <div>
            <InfoCard
              firstText="Yüklenen Son Bonus"
              :secondText="clubData.bonus"
            ></InfoCard>
          </div>
          <div>
            <InfoCard
              firstText="Aktarılan"
              :secondText="clubData.transmitted"
            ></InfoCard>
          </div>
          <div>
            <InfoCard
              firstText="Harcanan"
              :secondText="Math.abs(clubData.spent_from_basket) || '0.0'"
            ></InfoCard>
          </div>
          <div>
            <InfoCard
              firstText="Kullanılabilir Toplam"
              :secondText="clubData.total_available_point"
            ></InfoCard>
          </div>
        </div>

        <div class="p-25">
          <Table
            :isLastRowBorder="false"
            :warnText="warnText"
            title="Puan Hareketleri"
            :data="clubStatusData"
            :key="clubStatusData.rows + new Date().getTime()"
          >
            <template #custom-title>
              <div class="flex row pt-15">
                <Checkbox
                  class="pr-20"
                  v-for="(item, index) in checkList"
                  :key="item + index"
                  :item="item"
                  :isCheck="item.isChecked"
                  @onChange="onChangeFilter"
                ></Checkbox>
              </div>
            </template>
          </Table>
          <div class="mt-20">
            <BCPuanPagination
              @onChange="handlePaginationTab2"
              :options="{ total: paginationLength, per: 20 }"
            ></BCPuanPagination>
          </div>
        </div>
      </template> -->
      <template v-if="tab == 0">
        <div>
          <div class="border-bottom">
            <div class="flex col mrb-25 mtb-15 width-100">
              <div class="club-financial-header flex row">
                <div class="flex center col-px-70 radius-35 border">
                  <img src="@/assets/svg/currency-dollar.svg" alt="" />
                </div>
                <div class="flex col ml-20 justify-center">
                  <div class="title">
                    {{ financialSections.balance }}
                  </div>
                  <div class="subtitle">
                    TOPLAM TL BAKİYE DURUMU
                    <span class="ml-5">
                      <img
                        v-tooltip="
                          'Farklı para birimi bakilerinizin toplam TL karşılığıdır'
                        "
                        src="@/assets/svg/info-icon.svg"
                        alt=""
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div class="border m-20 p-20">
                <Table
                  :key="financialTable1.rows.length"
                  width-first-th="221px"
                  :is-last-row-border="false"
                  title="Bakiye Durumu"
                  :data="financialTable1"
                ></Table>
              </div>
            </div>
          </div>
          <div class="border-bottom">
            <div class="flex col mrb-25 mtb-15 width-100">
              <div class="club-financial-header flex row">
                <div class="flex center col-px-70 radius-35 border">
                  <img src="@/assets/svg/currency-dollar.svg" alt="" />
                </div>
                <div class="flex col ml-20 justify-center">
                  <div class="title">{{ totalBill }}</div>
                  <div class="subtitle">
                    FATURALAR TOPLAMI
                    <span class="ml-5">
                      <img src="@/assets/svg/info-icon.svg" alt="" />
                    </span>
                  </div>
                </div>
              </div>
              <div class="border m-20 p-20">
                <Table
                  :key="financialTable2.rows.length"
                  width-first-th="221px"
                  :is-last-row-border="false"
                  title="Fatura Durumu"
                  :data="financialTable2"
                ></Table>
              </div>
            </div>
          </div>
          <div>
            <div class="flex col mrb-25 mtb-15 width-100">
              <div class="club-financial-header flex row">
                <div class="flex center col-px-70 radius-35 border">
                  <img src="@/assets/svg/currency-dollar.svg" alt="" />
                </div>
                <div class="flex col ml-20 justify-center">
                  <div class="title">{{ totalLimit }}</div>
                  <div class="subtitle">
                    LİMİTLERİN Toplamı
                    <span class="ml-5">
                      <img src="@/assets/svg/info-icon.svg" alt="" />
                    </span>
                  </div>
                </div>
              </div>
              <div class="border m-20 p-20">
                <Table
                  :key="financialTable3.rows.length"
                  width-first-th="221px"
                  :is-last-row-border="false"
                  title="Limit Durumu"
                  :data="financialTable3"
                ></Table>
              </div>
            </div>
          </div>
          <div>
            <div class="flex col mrb-25 mtb-15 width-100">
              <div class="club-financial-header flex row">
                <div class="flex center col-px-70 radius-35 border">
                  <img src="@/assets/svg/currency-dollar.svg" alt="" />
                </div>
                <div class="flex col ml-20 justify-center">
                  <div class="title">{{ totalRisk }}</div>
                  <div class="subtitle">
                    RİSK PUANI
                    <span class="ml-5">
                      <img src="@/assets/svg/info-icon.svg" alt="" />
                    </span>
                  </div>
                </div>
              </div>
              <div class="border m-20 p-20">
                <Table
                  :key="'finansal' + financialTable4.rows.length"
                  width-first-th="221px"
                  :is-last-row-border="false"
                  title="Risk Durumu"
                  :data="financialTable4"
                ></Table>
              </div>
            </div>
          </div>
          <div class="info-bar ml-25 mr-25">
            <div class="title mb-15">Bakiye Durumu Nedir?</div>
            <div class="text">
              1 Ekim 2018 tarihinde TL işleme geçilmiştir. Alışverişinizi hangi
              para birimi ile yaparsanız yapın, bakiyeler TL cinsinden
              tutulmaktadır. Döviz bakiyesi bu tarihten öncesine aittir.
              Alacaklı bakiyede olan firmalar, bu alacaklı oldukları tutar kadar
              alımlarında kredi kartı taksitli indirim oranından
              yararlanabilecektir.
            </div>
          </div>
          <div class="info-bar mr-25 ml-25 mt-20">
            <div class="title mb-15">Fatura Durumu Nedir?</div>
            <div class="text">
              Açık hesap ödeme vadesi, fatura bazlı olarak 30 gün olarak
              belirlenmiştir. Bu bölümde vadesi geçmiş ve kapatılmamış fatura
              toplamınızı görebilirsiniz. Dilerseniz “Detaylar için Tıklayın”
              butonuna basarak tüm fatura işlemlerinizi ve durumlarını
              görüntüleyebilir, faturalarınız hakkında detaylı bilgi
              alabilirsiniz.
            </div>
          </div>
        </div>
      </template>
      <template v-if="tab == 1">
        <div class="grid">
          <!-- <TargetCampaignCard
            v-for="(item, index) in getBigesClubTargetList"
            :key="item + '-' + index"
            :item="item"
          ></TargetCampaignCard> -->
          <TargetCampaignCard
            v-for="(campaign, idx) in getBigesClubTargetList"
            :key="campaign + idx"
            :target-campaign="campaign"
          />
        </div>
        <!-- <article class="article">
          <div class="article__header">Hakkında</div>
          <div class="article__content">
            Mauris posuere arcu metus, non blandit libero vulputate quis. Donec
            ipsum dui, tempus in orci ut, maximus sollicitudin massa. Proin
            consequat nunc lacus, non hendrerit eros maximus a. Donec eleifend a
            velit eu hendrerit. Praesent fringilla aliquam dolor sit amet
            fringilla. Proin tristique mauris ac libero dictum, vitae laoreet
            tortor consectetur. Sed eget hendrerit arcu.
          </div>
        </article>
        <div class="flex col mt-80">
          <div class="flex row mb-25 space-between">
            <div class="title">İlginizi Çekebilecek Diğer Kampanyalar</div>
            <div class="title">> Tüm Kampanyalar</div>
          </div>
          <div class="flex row">
            <InfoCard type="footer" class="mr-19"></InfoCard>
            <InfoCard type="footer"></InfoCard>
          </div>
        </div> -->
      </template>
      <template v-if="tab == 2">
        <div class="grid col-3 col-gap-15 row-gap-15">
          <div>
            <InfoCard
              :is-icon="true"
              :is-reverse-text="true"
              first-text="Ciro"
              :second-text="
                currencySymbol[
                  earnData.current_year_total_endorsement_currency
                ] + formatNumber(earnData.current_year_total_endorsement)
              "
            >
              <template #icon>
                <div
                  class="flex center mr-20"
                  style="
                    width: 60px;
                    height: 60px;
                    border-radius: 30px;
                    background: rgba(13, 47, 129, 0.05);
                    border: 1px solid rgba(13, 47, 129, 0.1);
                    box-sizing: border-box;
                  "
                >
                  <img src="@/assets/svg/accounting-coin-stack.svg" alt="" />
                </div>
              </template>
            </InfoCard>
          </div>
          <!-- <div>
            <InfoCard
              :isIcon="true"
              firstText="Biges Club Puanları"
              :secondText="earnData.total_biges_point"
            >
              <template #icon>
                <div
                  class="flex center mr-20"
                  style="
                    width: 60px;
                    height: 60px;
                    border-radius: 30px;
                    background: rgba(13, 47, 129, 0.05);
                    border: 1px solid rgba(13, 47, 129, 0.1);
                    box-sizing: border-box;
                  "
                >
                  <img src="@/assets/svg/video-game-magic-active.svg" alt="" />
                </div>
              </template>
            </InfoCard>
          </div> -->
          <div>
            <!--  ilk etapta olmayacak -->
            <!-- <InfoCard
              :isIcon="true"
              :isReverseText="true"
              firstText="Satış Sonrası Kazançlar"
              :secondText="
                earnData.current_year_total_endorsement_currency +
                earnData.status_point
              "
            >
              <template #icon>
                <div
                  class="flex center mr-20"
                  style="
                    width: 60px;
                    height: 60px;
                    border-radius: 30px;
                    background: rgba(13, 47, 129, 0.05);
                    border: 1px solid rgba(13, 47, 129, 0.1);
                    box-sizing: border-box;
                  "
                >
                  <img src="@/assets/svg/accounting-coin-stack-2.svg" alt="" />
                </div>
              </template>
            </InfoCard> -->
          </div>
        </div>
        <div class="mt-50">
          <Table
            :key="'e-' + earnData.rows.length"
            :is-last-row-border="false"
            title="Kazanç Raporu"
            :data="earnData"
            :warn-text="warnText"
          ></Table>
          <div class="mt-20">
            <BCPuanPagination
              :options="{ total: paginationLength, per: 20 }"
              @onChange="handlePaginationTab3"
            ></BCPuanPagination>
          </div>
        </div>
      </template>
    </div>
  </TabMenu>
</template>

<script>
import TabMenu from '@/components/views/ForYou/TabMenu'
import BCPuanPagination from '@/components/views/ForYou/BCPuanPagination'
import Checkbox from '@/components/common/Checkbox'
import PieChart from '@/components/common/PieChart'
import SemiPieChart from '@/components/common/SemiPieChart'
import TargetCampaignCard from '@/components/TargetCampaignCard'

import InfoCard from '@/components/views/ForYou/InfoCard'
import Table from '@/components/views/ForYou/Table'
import { CURRENCY_SYMBOL } from '@/constants'
import { mapActions, mapGetters } from 'vuex'
import { mixinNumberFormatTr } from '@/utils'

export default {
  name: 'ContentProfile',
  components: {
    TabMenu,
    InfoCard,
    Table,
    BCPuanPagination,
    Checkbox,
    PieChart,
    SemiPieChart,
    TargetCampaignCard
  },
  props: {
    tab: { type: Number, default: 0 }
  },
  data() {
    return {
      currencySymbol: { ...CURRENCY_SYMBOL },
      checkList: [
        { name: 'Kazanılan', code: 'earn', isChecked: true, id: 1 },
        { name: 'İade', code: 'return', isChecked: true, id: 2 },
        { name: 'Harcanan', code: 'spent', isChecked: true, id: 0 }
      ],
      isLoading: false,
      warnText: '',
      title: 'Biges Club',
      items: [
        // { text: 'BİGES CLUB DURUMU', order: 2 },
        { text: 'FİNANSAL DURUM', order: 3 },
        // { text: '2022 HEDEFLERİ', order: 4 },
        { text: 'KAZANÇLAR', order: 5 }
      ],
      table: {
        headers: [
          'Başlama Tarihi',
          'Bitiş Tarihi',
          'Döküman No',
          'Kazanılan Statü Puanları',
          'Biges Club Puan Katsayısı'
        ],
        rows: [
          ['01.09.2019', '01.09.2030', 'Devir', '15.000,00', '15.000,00'],
          ['01.09.2019', '01.09.2030', 'Devir', '15.000,00', '15.000,00']
        ]
      },

      financialSections: {},
      financialTable1: {
        headers: ['Para Birimi', 'Bakiye'],
        rows: []
      },
      financialTable2: {
        headers: ['Fatura Tipi', 'Miktar'],
        rows: [
          // ['Açık Faturalar', '₺33,000'],
          // ['Onay Bekleyen Siparişler', '₺33,000'],
          // ['Onaylanmış Siparişler', '₺33,000']
        ]
      },
      financialTable3: {
        headers: ['Limit Tipi', 'Miktar'],
        rows: [
          // ['Kredi Limiti', '₺33,000'],
          // ['Müsait Limit', '₺33,000']
        ]
      },
      totalRisk: 0,
      financialTable4: {
        headers: ['Risk Tipi', 'Miktar'],
        rows: []
      },
      clubStatusData: {
        data: [],
        headers: ['İşlem Tarihi', 'Döküman No', 'Kazanılan-Harcanan-İade Puan'],
        rows: []
      },
      earnData: {
        current_year_total_endorsement_currency: 'TL',
        current_year_total_endorsement: '0',
        status_point: '0',
        total_biges_point: '0',
        headers: [
          'Yıl',
          'Ay',
          'Ciro',
          // 'Biges Club Puanları',
          'Satış Sonrası Hizmetlerden Kazançlar'
        ],
        rows: []
      },
      clubData: {},
      paginationLength: 0,
      totalLimit: 0,
      totalBill: 0
    }
  },
  computed: {
    ...mapGetters({
      getBigesClubTargetList: 'foryou/getBigesClubTargetList'
    })
  },
  methods: {
    ...mapActions({
      // fetchBigesClubDetailInfo: 'foryou/fetchBigesClubDetailInfo',
      fetchFinanceInfo: 'foryou/fetchFinanceInfo',
      fetchBigesClubEarn: 'foryou/fetchBigesClubEarn',
      fetchBigesClubTarget: 'foryou/fetchBigesClubTarget'
    }),
    formatNumber(value) {
      return mixinNumberFormatTr(value)
    },
    convertInt(point) {
      return parseInt(point.toString().replace('.', ''))
    },
    onChangeFilter(filter) {
      let findItemIndex = this.checkList.findIndex(
        item => filter.item.code == item.code
      )
      this.checkList[findItemIndex] = {
        ...filter.item,
        isChecked: filter.isChecked
      }
      let filterTypes = this.checkList
        .map(item => {
          if (item.isChecked) {
            return item.id
          }
        })
        .filter(val => val != undefined)

      this.getBigesClubDetailInfo(filterTypes.join(','))
    },
    handlePaginationTab2(index) {
      let pagData = [...this.clubStatusData.data].splice((index - 1) * 20, 20)
      this.paginationLength = this.clubStatusData.data.length
      this.clubStatusData.rows = pagData
      this.warnText = this.clubStatusData.rows.length
        ? ''
        : 'Kayıt Bulunamadı...'

      if (window && index != 1) {
        this.$nextTick(() => {
          window.scrollTo(0, 650)
        })
      }
    },
    handlePaginationTab3(index) {
      let pagData = [...this.earnData.data].splice((index - 1) * 20, 20)
      this.paginationLength = this.earnData.data.length
      this.earnData.rows = pagData
      this.warnText = this.earnData.rows.length ? '' : 'Kayıt Bulunamadı...'

      if (window && index != 1) {
        this.$nextTick(() => {
          window.scrollTo(0, 600)
        })
      }
    },
    async getBigesClubTarget() {
      await this.fetchBigesClubTarget()
    },
    async getBigesClubEarn() {
      this.isLoading = true
      this.warnText = ''

      try {
        await this.fetchBigesClubEarn().then(response => {
          this.earnData = { ...this.earnData, ...response }
          if (response.data) {
            this.earnData.data = response.data.map(item => {
              return [
                item.year,
                item.month,
                mixinNumberFormatTr(item.endorsement),
                // mixinNumberFormatTr(item.club_point),
                mixinNumberFormatTr(item.after_sales_advantage)
              ]
            })
            this.handlePaginationTab3(1)
            this.isLoading = false
          }
        })
      } catch (error) {
        console.error(error)
      }
      this.isLoading = false
    },
    // async getBigesClubDetailInfo(filterList) {
    //   if (Object.keys(this.fetchBigesClubDetailInfo).length) return
    //   this.isLoading = true
    //   this.warnText = ''
    //   await this.fetchBigesClubDetailInfo(filterList).then(response => {
    //     if (response) {
    //       this.clubData = response
    //       this.clubStatusData.data = response?.transactions
    //         ?.map(item => {
    //           let puanComp = {}
    //           if (parseFloat(item.earned_biges_points) > 0) {
    //             puanComp.component = 'GreenColumn'
    //           } else {
    //             puanComp.component = 'RedColumn'
    //           }
    //           puanComp.options = { justText: true }
    //           puanComp.text = item.earned_biges_points
    //           return [
    //             item.start_date ? item.start_date.split(' ')[0] : '',
    //             item.documan_no || '',
    //             puanComp
    //           ]
    //         })
    //         .filter(val => val)
    //       this.handlePaginationTab2(1)
    //       this.isLoading = false
    //     }
    //     this.isLoading = false
    //   })
    // },
    async getFinanceInfo() {
      this.isLoading = true
      try {
        await this.fetchFinanceInfo().then(response => {
          if (response) {
            this.financialSections = {
              ...this.financialSections,
              balance: response.balance
            }
            this.financialTable1.rows = [
              [
                response.balance_status.currency,
                response.balance_status.current_balance
              ]
            ]

            this.totalBill =
              parseFloat(response.open_waybill) +
              parseFloat(response.pending_orders) +
              parseFloat(response.open_approved_orders)

            this.financialTable2.rows = [
              ['Açık Fatularalar', response.open_waybill],
              ['Onay Bekleyen Siparişler', response.pending_orders],
              ['Onaylanmış Siparişler', response.open_approved_orders]
            ]

            this.totalLimit =
              parseFloat(response.credit_limit) +
              parseFloat(response.available_limits)

            this.financialTable3.rows = [
              ['Kredi Limiti', response.credit_limit],
              ['Müsait Limit', response.available_limits]
            ]
            this.totalRisk = response.total_risk
            this.financialTable4.rows = [
              ['Ödenmemiş Çekler', response.unpaid_check],
              ['Ödenmemiş Senetler', response.open_invoice],
              ['Onaylanmış Siparişler', response.open_approved_orders],
              ['Bakiye', response.balance]
            ]
          }
          this.isLoading = false
        })
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
    }
  },
  created() {
    if (this.tab == -1) {
      this.getBigesClubDetailInfo()
    } else if (this.tab == 0) {
      this.getFinanceInfo()
    } else if (this.tab == 1) {
      this.fetchBigesClubTarget()
    } else if (this.tab == 2) {
      this.getBigesClubEarn()
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '@/assets/css/variables.scss/';
.pie-text {
  position: absolute;
  margin-top: 130px;
}
.club-content {
  margin-top: 50px;
  margin-left: 25px;
  margin-right: 25px;
  padding-bottom: 30px;

  &.club-content-2 {
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
    padding-bottom: 30px;
  }

  &__title {
    &__first {
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;

      color: #1f1f1f;
    }
    &__second {
      margin-top: 5px;
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;

      color: rgba(31, 31, 31, 0.5);
    }
  }

  &__common-chart {
    margin-top: 40px;
  }

  &__info-cards {
    margin-top: 40px;

    .card-item {
      margin-right: 15px;
    }
  }

  &__charts {
    border-bottom: 1px solid rgba(31, 31, 31, 0.1);
    padding-bottom: 40px;

    // &__card {}
    // &__left {
    //   border-right: 1px solid rgba(31, 31, 31, 0.1);
    // }
    // &__right {
    //   margin-left: 40px;
    // }
    .top {
      height: 60px;
      margin-bottom: 30px;

      .ticket-icon {
        width: 60px;
        height: 60px;
        background: #ffffff;
        border: 1px solid rgba(31, 31, 31, 0.1);
        box-sizing: border-box;
        border-radius: 30px;
        margin-right: 10px;
      }

      .first {
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #1f1f1f;
      }

      .second {
        margin-top: 5px;
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
        text-decoration-line: underline;

        color: rgba(31, 31, 31, 0.5);
      }
    }
  }

  .article {
    &__header {
      margin-top: 50px;
      margin-bottom: 25px;
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #1f1f1f;
    }
    &__content {
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;

      color: rgba(31, 31, 31, 0.7);
    }
  }

  .info-bar {
    background: rgba(31, 31, 31, 0.05);
    border-radius: 3px;
    padding: 30px;
  }
  .text {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;

    color: rgba(31, 31, 31, 0.7);
  }
  .title {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;

    color: #1f1f1f;
  }
  .subtitle {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;

    color: rgba(31, 31, 31, 0.5);
  }

  .club-financial-header {
    margin-top: 20px;
    height: 70px;
    margin-left: 25px;
  }
}

@media only screen and (max-width: 768px) {
  .pie-text {
    position: absolute;
    margin-top: 130px;
  }
  .club-content {
    margin-top: 25px;
    margin-left: 5px;
    margin-right: 5px;
    padding-bottom: 15px;

    &.club-content-2 {
      margin-top: 0;
      margin-left: 0;
      margin-right: 0;
      padding-bottom: 30px;
    }

    &__title {
      &__first {
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;

        color: #1f1f1f;
      }
      &__second {
        margin-top: 5px;
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;

        color: rgba(31, 31, 31, 0.5);
      }
    }

    &__common-chart {
      margin-top: 40px;
    }

    &__info-cards {
      margin-top: 40px;

      .card-item {
        margin-right: 15px;
      }
    }

    // &__charts {
    //   border-bottom: 1px solid rgba(31, 31, 31, 0.1);
    //   padding-bottom: 40px;

    //   .top {
    //     height: 60px;
    //     margin-bottom: 30px;

    //     .ticket-icon {
    //       width: 60px;
    //       height: 60px;
    //       background: #ffffff;
    //       border: 1px solid rgba(31, 31, 31, 0.1);
    //       box-sizing: border-box;
    //       border-radius: 30px;
    //       margin-right: 10px;
    //     }

    //     .first {
    //       font-family: Inter;
    //       font-style: normal;
    //       font-weight: 500;
    //       font-size: 16px;
    //       line-height: 19px;
    //       color: #1f1f1f;
    //     }

    //     .second {
    //       margin-top: 5px;
    //       font-family: Inter;
    //       font-style: normal;
    //       font-weight: normal;
    //       font-size: 12px;
    //       line-height: 15px;
    //       text-decoration-line: underline;

    //       color: rgba(31, 31, 31, 0.5);
    //     }
    //   }
    // }

    .article {
      &__header {
        margin-top: 50px;
        margin-bottom: 25px;
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #1f1f1f;
      }
      &__content {
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;

        color: rgba(31, 31, 31, 0.7);
      }
    }

    .info-bar {
      background: rgba(31, 31, 31, 0.05);
      border-radius: 3px;
      padding: 30px;
    }
    .text {
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;

      color: rgba(31, 31, 31, 0.7);
    }
    .title {
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;

      color: #1f1f1f;
    }
    .subtitle {
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      line-height: 15px;

      color: rgba(31, 31, 31, 0.5);
    }

    .club-financial-header {
      margin-top: 20px;
      height: 70px;
      margin-left: 25px;
    }
  }

  .grid {
    &.col-3 {
      grid-template-columns: 1fr;
    }
  }
}
</style>
