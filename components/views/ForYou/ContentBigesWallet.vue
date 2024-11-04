<template>
  <TabMenu :isLoading="isLoading" title="Biges Cüzdan" height="80px" weight="500" :tab="tab" :isTab="false">
    <div class="profile-content">
      <div class="grid col-4-gap10">
        <div class="simple-card1">
          <div class="simple-card-content-grid">
            <h3 class="simple-card1-title">Faturadan Kazanılan <br /> Para Puan</h3>
            <p class="simple-card1-amount">
              {{ Intl.NumberFormat('de-DE')
            .format(walletMovements.earningTotal) }}
            </p>
          </div>
        </div>
        <div class="simple-card1">
          <div class="simple-card-content-grid">
            <h3 class="simple-card1-title">Tanımlanan Bonus <br /> Para Puan</h3>
            <p class="simple-card1-amount">
              {{Intl.NumberFormat('de-DE')
            .format(walletMovements.manuelTotal)  }}
            </p>
          </div>
        </div>
        <div class="simple-card2">
          <div class="simple-card-content-grid">
            <h3 class="simple-card2-title">Harcanan <br /> Para Puan</h3>
            <p class="simple-card2-amount">
              {{ Intl.NumberFormat('de-DE')
            .format(
                    walletMovements.spendTotal
                )}}
            </p>
          </div>
        </div>
        <div class="simple-card3">
          <div class="simple-card-content-grid">
            <h3 class="simple-card3-title">Kullanılabilir <br /> Para Puan</h3>
            <p class="simple-card3-amount">
              {{Intl.NumberFormat('de-DE')
            .format(bigesWallet.wallet_points)  }}
            </p>
          </div>
        </div>
      </div>
      <TableWallet :key="'w-' + table.rows.length + new Date().getTime()" class="mt-50" title="Para Puan Hareketleri"
        :warnText="warnText" :data="table" @dateHandle="dateHandle($event)" @handleRow="rowClick($event)"
        :isClickable="true">
      </TableWallet>
      <BCPuanPagination @onChange="handlePagination" :options="{ total: datalength, per: 20 }"> </BCPuanPagination>
    </div>
  </TabMenu>
</template>

<script>
import TabMenu from '@/components/views/ForYou/TabMenu'
import TableWallet from '@/components/views/ForYou/TableWallet'
import DrawerMenu from '@/components/views/ForYou/DrawerMenu'
import Checkbox from '@/components/common/Checkbox'
import CKEditor from '@/components/common/CKEditor'
import OfferDetail from './OfferDetail'
import Pagination from '@/components/Pagination.vue'
import DateInput from '@/components/common/DateInput'
import { mixinNumberFormatTr } from '@/utils'
import { mapActions } from 'vuex'
import BCPuanPagination from '@/components/views/ForYou/BCPuanPagination'
import { dateFormat2, dateOfBeginningOfYear, currentDateStartYear } from '@/utils/date'
export default {
  name: 'SizeOzel',
  components: {
    Pagination,
    BCPuanPagination,
    TabMenu,
    OfferDetail,
    TableWallet,
    DrawerMenu,
    DateInput,
    Checkbox,
    CKEditor,
  },
  props: {
    tab: { type: Number, default: 0 }
  },
  data() {
    return {
      title: 'Biges Cüzdan',
      bigesWallet: {
        wallet_points: null
      },
      walletMovements: {
        earningTotal: null,
        spendTotal: null,
        manuelTotal:null
      },
      datalength: null,
      successResponse: null,
      isLoading: false,
      isLoaded: false,
      errors: [],
      warnText: '',
      isOfferDetail: false,
      editorContent: '',
      isUploadFile: false,
      drawerButtonText: null,
      isDrawer: false,
      drawerTitle: '',
      fileName: 'Dosya Seçilmedi',
      fileUrl: '',
      isDiscountShow: false,
      isLogoShow: false,
      drawerType: null,
      startDate: '',
      endDate: '',
      table: {
        headers: [
          'İşlem Tarihi',
          'Döküman No / Açıklama',
          'Kazanılan / Harcanan Para Puan',
          'Durum',
          'Son Kullanım Tarihi'
        ],
        rows: [
          // [
          //   '01.09.2023',
          //   'OS-0003535',
          //   '-90, +100',
          //   'Harcandı,Beklemede,Kazanıldı',
          //   '01.09.2030',
          // ],
        ]
      }
    }
  },
  computed: {
    // ...mapGetters({
    //   getBigesWallet: 'foryou/getBigesWallet'
    // })
  },
  methods: {
    handlePagination(index) {
      let pagData = [...this.table.data].splice((index - 1) * 20, 20)
      this.table.rows = pagData
      this.warnText = this.table.rows.length
        ? ''
        : 'Seçili tarih aralığında kayıt bulunamadı.'
    },
    rowClick() {
      // console.log(value)
    },
    ...mapActions({
      fetchWalletMovements: 'foryou/fetchWalletMovements',
      fetchWalletPoint: 'foryou/fetchWalletPoint'
    }),
    changeQuery(index) {
      this.$router.push({
        name: 'size-ozel',
        query: { ...this.$route.query, tab: index }
      })
    },
    isValid(form) {
      let noRequiredFields = ['phone', 'birth_date']
      this.errors = []
      let errors = Object.keys(form).filter(
        (item) => !form[item] && noRequiredFields.indexOf(item) < 0
      )
      if (errors.length) {
        this.errors = errors
        return false
      }
      return true
    },
    async getWalletPoint() {
      this.isLoading = true
      if (Object.keys(this.fetchWalletPoint).length) return
      await this.fetchWalletPoint()
        .then(response => {
          if (response) {
            this.bigesWallet = response
          }
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    async getWalletMovements() {
      this.isLoading = true
      if (Object.keys(this.fetchWalletMovements).length) return
      this.startDate = dateOfBeginningOfYear(),
      this.endDate = currentDateStartYear()
      await this.fetchWalletMovements({
        startDate: this.startDate,
        endDate: this.endDate
      }).then(response => {
        if (response) {
          this.datalength = response.length
          this.table.data = response.map(res => {
            if (res.wallet_type == 'KazanımToplam') {
              this.walletMovements.earningTotal = parseInt(res.point)
            } else if (res.wallet_type == 'HarcamaToplam') {
              this.walletMovements.spendTotal =
                res.point === '0' ? res.point : res.point.split('-')[1]
            }else if(res.wallet_type == 'ManuelToplam'){
                this.walletMovements.manuelTotal = res.point

            }
            if (res?.wallet_type !== 'KazanımToplam' && res?.wallet_type !== 'HarcamaToplam' && res?.wallet_type !== 'ManuelToplam' ) {
              return {
                valid_from: res?.valid_from ? dateFormat2(res?.valid_from) : '',
                document_number:res.document_type ? 
                  res?.document_type + '-' + res?.document_number ?? '' : res?.description,
                  point: res?.point ? res?.point : '-', 
                //   point: res?.point.split('-').length== 1 ? res?.point.split('-')[0] : res?.point.split('-')[1]  ?? '',
                wallet_type: { walletType: res?.wallet_type ?? '' },
                valid_until: res?.valid_until
                  ? dateFormat2(res?.valid_until)
                  : ''
              }
            }
          })
          this.table.rows = this.table.data
      
          // console.log('datalength: ', this.datalength)
          console.log('this.table.data: ', this.table.data)
        }
        this.isLoading = false
      })
    }
  },
  created() {
    this.getWalletPoint()
    this.getWalletMovements()
  }
}
</script>
<style lang="scss" scoped>
// @import '@/assets/css/variables.scss/';
.profile-content {
  margin-top: 15px;
  margin-left: 25px;
  margin-right: 15px;
  padding-bottom: 60px;
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
  &__form {
    margin-top: 30px;
    &__button {
      margin-top: 30px;
      width: 100%;
      display: grid;
      align-items: center;
      justify-content: flex-start;
      .form-button {
        justify-self: end;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 144px;
        height: 55px;
        border: none;
        cursor: pointer;
        background: #0d2f81;
        border-radius: 3px;
        text-align: center;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        color: $white;
        &:hover {
          background: $primary-dark-3x;
        }
        &:disabled {
          opacity: 0.5;
        }
      }
    }
  }
}
.simple-card1 {
  width: 100%;
  min-height: 100px;
  background: #E7EAF1;
  border-radius: 3px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 40px;
  align-items: center;
  justify-content: center;
  .simple-card-content-grid {
    width: 100%;
    display: grid;
    margin: 0px 0px 5px 15px;
    .simple-card1-title {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #0D2B81;
      font-style: normal;
    }
    .simple-card1-amount {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: #0D2B81;
      font-style: normal;
      margin-top: 6px;
    }
  }
}
.simple-card2 {
  width: 100%;
  min-height: 100px;
  background: #F8E2E8;
  border-radius: 3px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 40px;
  align-items: center;
  justify-content: center;
  .simple-card-content-grid {
    width: 100%;
    display: grid;
    margin: 0px 0px 5px 15px;
    .simple-card2-title {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #F71E3F;
      font-style: normal;
    }
    .simple-card2-amount {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: #F71E3F;
      font-style: normal;
      margin-top: 6px;
    }
  }
}
.simple-card3 {
  width: 100%;
  min-height: 100px;
  background: #24CE951A;
  border-radius: 3px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 40px;
  align-items: center;
  justify-content: center;
  .simple-card-content-grid {
    width: 100%;
    display: grid;
    margin: 0px 0px 5px 15px;
    .simple-card3-title {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #4CAF50;
      font-style: normal;
    }
    .simple-card3-amount {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: #4CAF50;
      font-style: normal;
      margin-top: 6px;
    }
  }
}
@media only screen and (max-width: 768px) {
  /* For tablets: */
  .profile-content {
    margin-top: 25px;
    margin-left: 0;
    margin-right: 0;
    padding-bottom: 30px;
    padding: 10px;
    &__title {
      &__first {
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.1rem;
        color: #1f1f1f;
      }
      &__second {
        margin-top: 5px;
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 0.9rem;
        line-height: 1rem;
        color: rgba(31, 31, 31, 0.5);
      }
    }
    &__form {
      margin-top: 30px;
      &__button {
        margin-top: 30px;
        width: 100%;
        display: grid;
        align-items: center;
        justify-content: flex-start;
        .form-button {
          justify-self: end;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 9rem;
          height: 3.4rem;
          border: none;
          cursor: pointer;
          background: #0d2f81;
          border-radius: 3px;
          text-align: center;
          font-weight: normal;
          font-size: 0.9rem;
          line-height: 1rem;
          color: $white;
          &:hover {
            background: $primary-dark-3x;
          }
          &:disabled {
            opacity: 0.5;
          }
        }
      }
    }
    .grid {
      &.col-2 {
        grid-template-columns: 1fr;
        grid-row-gap: 25px;
      }
    }
  }
}
.grid {
  &.col-4-gap10 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 10px;
  }
}
.search-button {
  height: 40px;
  width: 70px;
}
.pt-20 {
  padding-top: 20px;
}
</style>