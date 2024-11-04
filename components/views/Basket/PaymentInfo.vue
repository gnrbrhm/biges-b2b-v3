<template>
  <div class="payment-container flex col">
    <div class="payment-title">{{ title }}</div>
    <div class="flex row flex-1">
      <div class="flex-1 payment-form">
        <div class="payment-content__form">
          <!-- v-loading="{ loading: isLoading, text: 'Gönderiliyor' }" -->

          <form class="form-input-grid">
            <div class="grid">
              <div
                class="input-grid"
                :data-error="
                  errors.includes('card_holder_name') ? errorMessage : null
                "
              >
                <input
                  v-model="form.card_holder_name"
                  class="flat-input"
                  type="text"
                  @input="handleValid('card_holder_name')"
                  placeholder="Kart Sahibi"
                />
              </div>
            </div>
            <div class="grid">
              <div
                class="input-grid"
                :data-error="
                  errors.includes('card_number') ? errorMessage : null
                "
              >
                <input
                  v-mask="'#### #### #### ####'"
                  v-model="form.card_number"
                  class="flat-input"
                  type="text"
                  @input="handleValid('card_number', $event.target.value)"
                  placeholder="Kart Numarası"
                />
              </div>
            </div>
            <div class="grid">
              <div class="flex row">
                <div
                  class="input-grid"
                  :data-error="
                    errors.includes('expiration_date') ? errorMessage : null
                  "
                >
                  <input
                    v-mask="'##/##'"
                    :value="form.expiration_date"
                    class="flat-input mr-20"
                    type="text"
                    @input="handleValid('expiration_date', $event.target.value)"
                    placeholder="Son Kullanma Tarihi"
                  />
                </div>
                <div
                  class="input-grid w-120"
                  :data-error="errors.includes('cvc') ? errorCVV : null"
                >
                  <input
                    v-model="form.cvc"
                    v-mask="'###'"
                    class="flat-input w-120"
                    type="text"
                    @input="handleValid('cvc', $event.target.value)"
                    placeholder="CVC"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="flex-1 payment-preview mt-50 pl-54">
        <div class="payment-preview__card flex col">
          <div class="payment-preview__card__shape mb-40"></div>
          <div class="flex row ml-30">
            <div class="flex row">
              <div class="card-number">{{ form.card_number[0] }}</div>
              <div class="card-number">{{ form.card_number[1] }}</div>
              <div class="card-number">{{ form.card_number[2] }}</div>
              <div class="card-number">{{ form.card_number[3] }}</div>
            </div>
            <div class="flex row ml-25">
              <div class="card-number">{{ form.card_number[5] }}</div>
              <div class="card-number">{{ form.card_number[6] }}</div>
              <div class="card-number">{{ form.card_number[7] }}</div>
              <div class="card-number">{{ form.card_number[8] }}</div>
            </div>
            <div class="flex row ml-25">
              <div class="card-number">{{ form.card_number[10] }}</div>
              <div class="card-number">{{ form.card_number[11] }}</div>
              <div class="card-number">{{ form.card_number[12] }}</div>
              <div class="card-number">{{ form.card_number[13] }}</div>
            </div>
            <div class="flex row ml-25">
              <div class="card-number">{{ form.card_number[15] }}</div>
              <div class="card-number">{{ form.card_number[16] }}</div>
              <div class="card-number">{{ form.card_number[17] }}</div>
              <div class="card-number">{{ form.card_number[18] }}</div>
            </div>
          </div>
          <div class="mt-34 ml-30 flex row">
            <div class="name col-5">{{ form.card_holder_name }}</div>
            <div class="name col-3">{{ form.expiration_date }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Payment',
  props: {
    title: { type: String, default: null }
  },
  data() {
    return {
      errors: [],
      errorMessage: 'Lütfen bu alanı kontrol ediniz.',
      errorCVV: 'Zorunlu Alan',
      isLoading: false,
      form: {
        expiration_date: '',
        card_holder_name: null,
        card_number: '',
        expire_month: 0,
        expire_year: 0,
        cvc: null
      }
    }
  },
  watch: {
    'form.card_number': function (value) {
      this.installmentData()
    },
    'form.price': function (value) {
      this.installmentData()
    }
  },
  methods: {
    installmentData() {
      if (this.form.card_number.length >= 19) {
        this.$emit('installmentHandle', {
          price: this.form.price,
          card_number: this.form?.card_number
            ?.split(' ')
            ?.join('')
            ?.substring(0, 6)
        })
      }
    },
    handleValid(key, value) {
      if (key == 'expiration_date') {
        this.form[key] = value
        let splitValue = value?.split('/')
        this.form.expire_month = splitValue[0]
        this.form.expire_year = splitValue[1]
      }
      if (key == 'card_number') {
        this.form[key] = value
      }
      if (key == 'cvc') {
        this.form[key] = value
      }
      if (this.form[key] && this.errors.includes(key))
        this.errors.splice(this.errors.indexOf(key), 1)
      if (!this.form[key] && !this.errors.includes(key)) this.errors.push(key)

      let errors = Object.keys(this.form).filter((item) => !this.form[item])
      if (!errors.length) {
        this.$emit('formHandle', this.form)
      }
    },
    isValid(form) {
      this.errors = []
      let errors = Object.keys(form).filter((item) => !form[item])
      if (errors.length) {
        this.errors = errors
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-container {
  .payment-title {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #1f1f1f;
  }

  .payment-form {
    .payment-content {
      margin-top: 50px;
      margin-left: 25px;
      margin-right: 92px;
      padding-bottom: 60px;

      &__title {
        &__first {
          font-family: Inter;
          font-style: normal;
          font-weight: 500;
          font-size: 20px;
          line-height: 24px;
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
          padding-right: 0;
          width: 100%;
          display: grid;
          align-items: center;
          justify-content: flex-start;
          display: flex;
          flex-direction: row-reverse;

          &__left {
            font-family: Inter;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 17px;
            color: rgba(31, 31, 31, 0.7);
          }
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
            color: white;

            &:hover {
              background: rgba(31, 31, 31, 0.7);
            }
            &:disabled {
              opacity: 0.5;
            }
          }
        }
      }
    }
  }

  .payment-preview {
    &__card {
      height: 220px;
      background: linear-gradient(107.66deg, #f4f4f4 0.6%, #e0e0e0 100%);
      box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.05);
      border-radius: 5px;

      &__shape {
        width: 60px;
        height: 45px;
        margin-top: 35px;
        margin-left: 30px;

        background: linear-gradient(
          124.38deg,
          rgba(31, 31, 31, 0.1) -75.89%,
          rgba(31, 31, 31, 0) 100%
        );
        border-radius: 10px;
      }

      .name {
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;

        color: rgba(31, 31, 31, 0.2);
      }
      .card-number {
        width: 10px;
        height: 10px;
        background: linear-gradient(
          124.38deg,
          rgba(31, 31, 31, 0.2) -75.89%,
          rgba(31, 31, 31, 0) 100%
        );
        border-radius: 10px;
        color: rgba(31, 31, 31, 0.6);
        margin-right: 5px;
      }
    }
  }
}
</style>
