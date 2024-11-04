<template>
  <TabMenu
    @onTab="$emit('handleTab', $event)"
    :title="title"
    :tab="tab"
    :items="items"
    :isLoading="isLoading"
  >
    <div class="management-content">
      <template v-if="tab == 0">
        <div class="mt-35 mb-35 ml-25 mr-25">
          <div class="flex col">
            <div>
              <div class="flex row align-center">
                <label class="h-14 font-600 min-w-120">Firma Adı</label>
                <label class="h-14 font-normal word-wrap">{{
                  companyInfo.firm_name
                }}</label>
              </div>
            </div>
            <div class="mt-10">
              <div class="flex row align-center">
                <label class="h-14 font-600 min-w-120">Bayi Kodu</label>
                <label class="h-14 font-normal">{{
                  companyInfo.reseller_code
                }}</label>
              </div>
            </div>
            <div class="mt-10">
              <div class="flex row align-center">
                <label class="h-14 font-600 min-w-120">Şehir</label>
                <label class="h-14 font-normal">{{ companyInfo.city }}</label>
              </div>
            </div>
            <div class="mt-10">
              <div class="flex row align-center">
                <label class="h-14 font-600 min-w-120">İlçe</label>
                <label class="h-14 font-normal">{{
                  companyInfo.district
                }}</label>
              </div>
            </div>
            <div class="mt-10">
              <div class="flex row align-center">
                <label class="h-14 font-600 min-w-120">Email</label>
                <label class="h-14 font-normal word-wrap">{{
                  companyInfo.email
                }}</label>
              </div>
            </div>
            <div class="mt-10">
              <div class="flex row align-center">
                <label class="h-14 font-600 min-w-120">Adres</label>
                <label class="h-14 font-normal">{{
                  companyInfo.address_line
                }}</label>
              </div>
            </div>
            <div class="mt-10">
              <div class="flex row align-center">
                <label class="h-14 font-600 min-w-120">Telefon</label>
                <label class="h-14 font-normal">{{ companyInfo.phone }}</label>
              </div>
            </div>
            <div class="mt-10">
              <div class="flex row align-center">
                <label class="h-14 font-600 min-w-120">Vergi Dairesi</label>
                <label class="h-14 font-normal">{{
                  companyInfo.tax_department
                }}</label>
              </div>
            </div>
            <div class="mt-10">
              <div class="flex row align-center">
                <label class="h-14 font-600 min-w-120">Vergi No</label>
                <label class="h-14 font-normal">{{
                  companyInfo.tax_number
                }}</label>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="tab == 1">
        <div class="mt-35 mb-35 ml-25 mr-25">
          <Table
            :warnText="warnText"
            @handleRow="clickRow($event)"
            class="mt-50"
            :data="table"
            :key="'m' + table.rows.length + new Date().getTime()"
            :isClickable="true"
          >
            <template #title>
              <div class="flex row-reverse width-100">
                <div
                  @click="clickItem('user')"
                  class="new-user flex row align-center clickable"
                >
                  <span class="mr-10 flex align-center">
                    <img src="@/assets/svg/add.svg" alt=""
                  /></span>
                  Yeni Kullanıcı Ekle
                </div>
              </div>
            </template>
          </Table>
          <BCPuanPagination
            v-if="table.count > 27"
            :options="{ total: table.count, per: 27 }"
            @onChange="usersTableChange($event)"
          ></BCPuanPagination>
        </div>
      </template>
      <template v-if="tab == 2">
        <div class="mt-35 mb-35 ml-25 mr-25">
          <Table
            @handleRow="clickRow($event)"
            class="mt-50"
            :warnText="warnText"
            :data="tableAdress"
            :key="'m' + tableAdress.rows"
            :isClickable="true"
          >
            <template #title>
              <div class="flex row-reverse width-100">
                <div
                  @click="clickItem('adress')"
                  class="new-user flex row align-center clickable"
                >
                  <span class="mr-10 flex align-center">
                    <img src="@/assets/svg/add.svg" alt=""
                  /></span>
                  Yeni Adres Ekle
                </div>
              </div>
            </template>
          </Table>
          <BCPuanPagination
            v-if="tableAdress.count > 27"
            :options="{ total: tableAdress.count, per: 27 }"
            @onChange="addressesTableChange($event)"
          ></BCPuanPagination>
        </div>
      </template>
      <DrawerMenu
        v-if="isDrawer"
        :title="drawerTitle"
        @close="close"
        :buttonText="drawerButtonName"
        @handleTrash="handleTrash"
        @add="sendForm"
      >
        <template v-if="tab == 1" #content>
          <div class="p-25">
            <form
              v-loading="{ loading: isLoading2, text: 'Gönderiliyor' }"
              :class="
                getLayout == 'mobile' ? 'grid row-gap-10' : 'form-input-grid'
              "
            >
              <div
                :class="
                  getLayout == 'mobile' ? 'grid row-gap-10' : 'grid col-2'
                "
              >
                <InputText
                  :placeholder="'Ad'"
                  name="first_name"
                  :isError="errors.indexOf('first_name')"
                  @input="handleInput($event)"
                  v-model="form.first_name"
                ></InputText>
                <InputText
                  :placeholder="'Soyad'"
                  name="last_name"
                  :isError="errors.indexOf('last_name')"
                  @input="handleInput($event)"
                  v-model="form.last_name"
                ></InputText>
              </div>
              <div
                :class="
                  getLayout == 'mobile' ? 'grid row-gap-10' : 'grid col-2'
                "
              >
                <InputText
                  :placeholder="'Telefon'"
                  name="phone"
                  @input="handleInput($event)"
                  v-model="form.phone"
                  :disableError="false"
                ></InputText>
                <InputDate
                  :placeholder="'Doğum Tarihi'"
                  name="birth_date"
                  @input="handleInput($event)"
                  v-model="form.birth_date"
                  :disableError="false"
                ></InputDate>
              </div>
              <div
                :class="
                  getLayout == 'mobile' ? 'grid row-gap-10' : 'grid col-2'
                "
              >
                <InputText
                  :placeholder="'Email'"
                  name="email"
                  :isError="errors.indexOf('email')"
                  @input="handleInput($event)"
                  v-model="form.email"
                ></InputText>
                <InputText
                  :placeholder="'Parola'"
                  name="password"
                  :isError="errors.indexOf('password')"
                  @input="handleInput($event)"
                  v-model="form.password"
                ></InputText>
              </div>
            </form>
            <div v-if="!new_user" class="p-20 border mt-25">
              <div class="title-md">İzinler</div>
              <div
                :key="checkListKey"
                :class="
                  getLayout == 'mobile'
                    ? 'grid col-2 mt-20'
                    : 'grid col-3 mt-20'
                "
              >
                <Checkbox
                  @onChange="handleCheckPerm($event)"
                  v-for="(item, index) in permissionList"
                  :key="item + '-' + index"
                  :isCheck="item.has_permission"
                  :item="{
                    name: item.name,
                    code: item.codename
                  }"
                ></Checkbox>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="tab == 2" #content>
          <div class="m-25 border-bottom pb-20">
            <form
              v-loading="{ loading: isLoading2, text: 'Gönderiliyor' }"
              :class="
                getLayout == 'mobile' ? 'grid row-gap-10' : 'form-input-grid'
              "
            >
              <div
                :class="
                  getLayout == 'mobile' ? 'grid row-gap-10' : 'grid col-2'
                "
              >
                <InputText
                  :placeholder="'İlgili Kişi'"
                  name="contact_name"
                  :isError="errors.indexOf('contact_name')"
                  @input="handleInput($event)"
                  v-model="newAddress.contact_name"
                ></InputText>
                <InputText
                  :placeholder="'Firma Adı'"
                  name="firm_name"
                  :isError="errors.indexOf('firm_name')"
                  @input="handleInput($event)"
                  v-model="newAddress.firm_name"
                ></InputText>
              </div>
              <div
                :class="
                  getLayout == 'mobile' ? 'grid row-gap-10' : 'grid col-2'
                "
              >
                <!-- <Dropdown
                  name="city"
                  @selected="handleInput($event)"
                  v-model="newAddress.city"
                  placeholder="İl"
                  :isError="errors.indexOf('city')"
                >
                  <option
                    v-for="(item, index) in getLocationList"
                    :key="item + index"
                    :value="item"
                  >
                    {{ item }}
                  </option>
                </Dropdown>
                <Dropdown
                  name="district"
                  v-model="newAddress.district"
                  @selected="handleInput($event)"
                  placeholder="İlçe"
                  :isError="errors.indexOf('district')"
                >
                  <option
                    v-for="(item, index) in getDistrictLocationList"
                    :key="item + index"
                    :value="item"
                  >
                    {{ item }}
                  </option>
                </Dropdown> -->
                <InputText
                  :placeholder="'Şehir'"
                  name="city"
                  :isError="errors.indexOf('city')"
                  @input="handleInput($event)"
                  v-model="newAddress.city"
                ></InputText>
                <InputText
                  :placeholder="'İlçe'"
                  name="district"
                  :isError="errors.indexOf('district')"
                  @input="handleInput($event)"
                  v-model="newAddress.district"
                ></InputText>
              </div>
              <div
                :class="
                  getLayout == 'mobile' ? 'grid row-gap-10' : 'grid col-2'
                "
              >
                <InputText
                  :placeholder="'Telefon'"
                  name="phone"
                  :isError="errors.indexOf('phone')"
                  @input="handleInput($event)"
                  v-model="newAddress.phone"
                ></InputText>
                <InputText
                  :placeholder="'Posta Kodu'"
                  name="zip_street"
                  :isError="errors.indexOf('zip_street')"
                  @input="handleInput($event)"
                  v-model="newAddress.zip_street"
                ></InputText>
              </div>
              <div class="grid">
                <Textarea
                  :placeholder="'Adres'"
                  name="address_line"
                  :isError="errors.indexOf('address_line')"
                  @input="handleInput($event)"
                  v-model="newAddress.address_line"
                ></Textarea>
              </div>
              <div class="grid">
                <Checkbox
                  :item="{ name: 'Varsayılan Adres' }"
                  :isCheck="newAddress.is_default_address"
                  @onChange="handleCheck($event)"
                ></Checkbox>
              </div>
            </form>
          </div>
        </template>
      </DrawerMenu>
    </div>
    <ConfirmModal
      title="Emin misiniz?"
      @handleButton="handleButton"
      :isActive="isModalActive"
    />
  </TabMenu>
</template>

<script>
import TabMenu from '@/components/views/ForYou/TabMenu'
import SearchModal from '@/components/views/ForYou/SearchModal'
import Table from '@/components/views/ForYou/Table'
import DrawerMenu from '@/components/views/ForYou/DrawerMenu'
import Icon from '@/components/Icon'
import InputText from '@/components/common/form/InputText'
import InputDate from '@/components/common/form/InputDate'
import Dropdown from '@/components/common/form/Dropdown'
import Textarea from '@/components/common/form/Textarea'
import Checkbox from '@/components/common/Checkbox'
import ConfirmModal from '@/components/common/ConfirmModal'
import BCPuanPagination from '@/components/views/ForYou/BCPuanPagination'

import { dateFormat } from '@/utils/date'

import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ContentManagement',
  components: {
    TabMenu,
    SearchModal,
    Table,
    Icon,
    DrawerMenu,
    InputText,
    InputDate,
    Dropdown,
    Checkbox,
    Textarea,
    ConfirmModal,
    BCPuanPagination
  },
  props: {
    tab: { type: Number, default: 0 },
    page: { type: Number, default: 1 }
  },
  computed: {
    ...mapGetters(['getLayout']),
    ...mapGetters({
      getLocationList: 'core/getLocationList',
      getDistrictLocationList: 'core/getDistrictLocationList'
    })
  },
  data() {
    return {
      isModalActive: false,
      warnText: '',
      newAddress: {
        address_line: null,
        district: '',
        city: '',
        contact_name: null,
        phone: null,
        zip_street: null,
        firm_name: null
      },
      companyInfo: {
        address_line: null,
        address_line_extra: [],
        city: null,
        district: null,
        email: null,
        firm_name: null,
        phone: null,
        reseller_code: null,
        tax_department: null,
        tax_number: null
      },
      searchModal: false,
      checkListKey: 0,
      permissionList: [],
      new_user: false,
      new_group: false,
      isLoading: false,
      isLoading2: false,
      group: {
        group_name: '',
        user: ''
      },
      form: {
        first_name: null,
        last_name: null,
        phone: null,
        birth_date: null,
        email: null,
        password: null
      },
      errors: [],
      searchText: '',
      isUpdate: false,
      isDrawer: false,
      drawerTitle: '',
      drawerButtonName: 'Ekle',
      title: 'Yönetim',
      items: [
        { text: 'FİRMA BİLGİLERİ' },
        { text: 'KULLANICILAR' },
        { text: 'ADRESLER' }
      ],
      table: {
        count: 0,
        headers: ['Ad', 'Soyad', 'Telefon Numrası', 'Doğum Tarihi', 'Email'],
        rows: []
      },
      tableAdress: {
        count: 0,
        headers: ['Adres Adı', 'İl', 'İlçe', 'Adres', ''],
        rows: []
      }
    }
  },
  methods: {
    ...mapActions({
      fetchResellerGeneralInfo: 'foryou/fetchResellerGeneralInfo',
      // fetchUserAdress: 'foryou/fetchUserAdress',
      postUserAdress: 'foryou/postUserAdress',
      putUserAdress: 'foryou/putUserAdress',
      // fetchSubUser: 'foryou/fetchSubUser',
      postSubUser: 'foryou/postSubUser',
      updateSubUser: 'foryou/updateSubUser',
      fetchSubUserPermissions: 'foryou/fetchSubUserPermissions',
      updateSubUserPermissions: 'foryou/updateSubUserPermissions',
      deleteSubUser: 'foryou/deleteSubUser',
      deleteAddress: 'foryou/deleteAddress',
      fetchUserAdressById: 'foryou/fetchUserAdressById',
      fetchSubUserByEmail: 'foryou/fetchSubUserByEmail',
      fetchLocations: 'core/fetchLocations',
      fetchDistrictLocation: 'core/fetchDistrictLocation'
    }),
    async getDistrictLocation(value) {
      await this.fetchDistrictLocation(value)
    },
    async handleTrash() {
      this.isModalActive = true
    },
    async handleButton(value) {
      if (value) {
        if (this.tab == 1) {
          let resp = await this.deleteSubUser(this.form.email)
          if (resp) {
            this.$notify({
              type: 'success',
              title: 'Başarılı',
              text: 'Kullanıcı silindi.',
              duration: 5000
            })
            this.isModalActive = false
            location.reload()
          }
        } else if (this.tab == 2) {
          let resp = await this.deleteAddress(this.newAddress.address_number)
          if (resp) {
            this.$notify({
              type: 'success',
              title: 'Başarılı',
              text: 'Kullanıcı silindi.',
              duration: 5000
            })
            this.isModalActive = false
            location.reload()
          }
        }
      } else {
        this.isModalActive = false
      }
    },
    async getUserAdress(page) {
      this.isLoading = true
      this.warnText = ''
      // if (Object.keys(this.fetchUserAdress).length) return
      await this.$store
        .dispatch('foryou/fetchUserAdress', page || 1)
        .then(response => {
          if (response) {
            let tableMap = response.results.map(item => {
              if (item.is_default_address) {
                return [
                  item.contact_name,
                  item.city,
                  item.district,
                  item.address_line,
                  { component: 'GreenColumn', text: 'Varsayılan' },
                  { item }
                ]
              } else {
                return [
                  item.contact_name,
                  item.city,
                  item.district,
                  item.address_line,
                  '',
                  { item }
                ]
              }
            })
            this.isLoading = false

            this.tableAdress.rows = tableMap
            this.tableAdress.count = response?.count || 0
            this.warnText = this.tableAdress.rows.length
              ? ''
              : 'Seçili tarih aralığında kayıt bulunamadı.'
          }
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    async getSubUserPermissions(email) {
      if (Object.keys(this.fetchSubUserPermissions).length) return
      await this.fetchSubUserPermissions(email).then(response => {
        this.checkListKey = new Date().getTime()
        this.permissionList = response
      })
    },
    async getResellerGeneralInfo() {
      this.isLoading = true
      if (Object.keys(this.fetchResellerGeneralInfo).length) return
      await this.fetchResellerGeneralInfo()
        .then(response => {
          if (response) {
            this.companyInfo = response
          }
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    usersTableChange(page) {
      this.getSubUser(page)
      if (window) {
        this.$nextTick(() => {
          window.scrollTo(0, 300)
        })
      }
    },
    addressesTableChange(page) {
      this.getUserAdress(page)
      if (window) {
        this.$nextTick(() => {
          window.scrollTo(0, 300)
        })
      }
    },
    async getSubUser(page) {
      this.isLoading = true
      this.warnText = ''
      //if (Object.keys(this.fetchSubUser).length) return
      await this.$store
        .dispatch('foryou/fetchSubUser', page || 1)
        .then(response => {
          let tableMap = response.results
            .map(item => {
              if (item.email) {
                return [
                  item.first_name || '',
                  item.last_name || '',
                  item.phone || '',
                  item.birth_date || '',
                  item.email || '',
                  { item }
                ]
              }
            })
            .filter(item => item)

          this.table.rows = tableMap
          this.table.count = response?.count || 0
          this.warnText = this.table.rows.length
            ? ''
            : 'Seçili tarih aralığında kayıt bulunamadı.'
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    async handleCheckPerm(value) {
      await this.updateSubUserPermissions({
        ...value.item,
        isChecked: value.isChecked,
        email: this.form.email
      }).then(response => {
        console.log(response)
        this.checkListKey = new Date().getTime()
        this.permissionList = response
      })
    },
    async getSubUserByEmail(findItem) {
      let result = await this.fetchSubUserByEmail(findItem.email)
      this.form = result
      await this.getSubUserPermissions(this.form.email)
    },
    async clickRow(item) {
      this.errors = []
      let findItem = item.find(value => value.item)?.item
      this.new_user = false
      this.isUpdate = true
      if (this.tab == 1) {
        await this.getSubUserByEmail(findItem)

        this.drawerTitle = this.form.first_name + ' ' + this.form.last_name
      } else if (this.tab == 2 && findItem) {
        //await this.fetchLocations()

        let result = await this.fetchUserAdressById(findItem.address_number)
        this.newAddress = result
        this.new_group = false
        this.drawerTitle = 'Adres Detay'
      }

      this.drawerButtonName = 'GÜNCELLE'
      this.isDrawer = true
    },
    handleCheck(item) {
      if (item.isChecked) {
        this.newAddress = { ...this.newAddress, is_default_address: true }
      } else {
        this.newAddress = { ...this.newAddress, is_default_address: false }
      }
    },
    handleInput(item) {
      if (this.tab == 1) {
        this.form[item.name] = item.value
      } else if (this.tab == 2) {
        this.newAddress[item.name] = item.value
      }
      //  else if (this.tab == 2) {
      //   this.group[item.name] = item.value
      // }
    },
    clickItem(item) {
      this.isUpdate = false
      this.errors = []

      this.drawerButtonName = 'EKLE'

      if (item == 'user') {
        Object.entries(this.form).forEach(([key, value], index) => {
          this.form[key] = null
        })
        this.new_user = true
        this.drawerTitle = 'Yeni Kullanıcı Ekle'
      }
      if (item == 'grup') {
        this.new_user = false
        this.new_group = true
        this.drawerTitle = 'Yeni Grup Ekle'
      }
      if (item == 'drawer_user') {
        this.drawerButtonName = 'GÜNCELLE'

        this.searchModal = true
      }
      if (item == 'adress') {
        this.fetchLocations()
        this.drawerTitle = 'Yeni Adres Ekle'
        this.newAddress = {
          address_line: null,
          district: '',
          city: '',
          contact_name: null,
          phone: null,
          zip_street: null,
          firm_name: null
        }
      }
      this.isDrawer = true
    },
    close() {
      this.isDrawer = false
    },
    modalClose() {
      this.searchModal = false
    },
    goSearch() {
      console.log('search')
    },
    isValid(form) {
      let noRequiredFields = ['phone', 'birth_date']
      this.errors = []
      let errors = Object.keys(form).filter(
        item =>
          !form[item] &&
          typeof form[item] != 'boolean' &&
          noRequiredFields.indexOf(item) < 0
      )
      if (errors.length) {
        this.errors = errors
        return false
      }
      return true
    },
    async sendForm() {
      this.isLoading2 = true
      if (!this.form?.birth_date) delete this.form.birth_date
      if (!this.form?.phone) delete this.form.phone
      let sendingForm = this.form
      if (this.tab == 2) {
        sendingForm = this.newAddress
        sendingForm.address_line_extra = '-'
      }
      if (!this.isValid(sendingForm)) {
        this.isLoading2 = false
        return
      }

      if (this.tab == 1) {
        if (this.isUpdate) {
          await this.updateSubUser(this.form).then(response => {
            if (response.status == 200) {
              let foundedIndex = this.table.rows.findIndex(
                item => item[4] == this.form.email
              )

              this.table.rows.splice(foundedIndex, 1, [
                this.form.first_name || '',
                this.form.last_name || '',
                this.form.phone || '',
                this.form.birth_date || '',
                this.form.email || ''
              ])
              this.$notify({
                type: 'success',
                title: 'İşlem Başarılı!',
                text: 'Güncelleme Başarılı.'
              })
              this.getSubUserByEmail(this.form)
              this.getSubUser()
            } else {
              this.$notify({
                type: 'error',
                title: 'İşlem Başarısız!',
                text: 'Güncelleme Başarısız.'
              })
            }
            this.isLoading2 = false
          })
        } else {
          await this.postSubUser(this.form).then(response => {
            if (response) {
              this.table.rows = [
                ...this.table.rows,
                [
                  response.data.first_name || '',
                  response.data.last_name || '',
                  response.data.phone || '',
                  response.data.birth_date || '',
                  response.data.email || '',
                  { item: response?.data }
                ]
              ]
              // this.isDrawer = false
              this.new_user = false
              this.getSubUserPermissions(response?.data?.email)
            }
            this.isLoading2 = false
          })
        }
      } else if (this.tab == 2) {
        if (this.isUpdate) {
          await this.putUserAdress(sendingForm).then(response => {
            this.getUserAdress()
            this.isDrawer = false
            this.isLoading2 = false
          })
        } else {
          await this.postUserAdress(sendingForm).then(response => {
            this.getUserAdress()
            this.isDrawer = false
            this.isLoading2 = false
          })
        }
      }
    }
  },
  created() {
    if (this.tab == 0) {
      this.getResellerGeneralInfo()
    } else if (this.tab == 1) {
      this.getSubUser(1)
    } else if (this.tab == 2) {
      this.getUserAdress()
    }
  }
}
</script>

<style lang="scss" scoped>
.management-content {
  min-height: 600px;

  .open-modal {
    position: relative;
  }

  .user {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 120%;
    color: #1f1f1f;
    padding: 15px 0;
    margin: 0 25px;
  }

  .title-md {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #1f1f1f;
  }
  .new-user {
    height: 17px;

    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;

    color: #0d2f81;
  }

  .settings {
    height: 17px;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: rgba(31, 31, 31, 0.5);
  }

  .search-input {
    width: 200px;
    height: 40px;
    input {
      width: 200px;
      height: 40px;
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
      color: rgba(31, 31, 31, 0.5);
      border-radius: 3px;

      background: rgba(31, 31, 31, 0.05);

      outline: none;
      border: none;
      box-shadow: none;
    }
  }
}

@media only screen and (max-width: 768px) {
  .word-wrap {
    word-wrap: break-word;
    max-width: 183px;
  }
}
</style>
