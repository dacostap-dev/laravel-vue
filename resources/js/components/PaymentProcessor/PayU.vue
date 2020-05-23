<template>
  <div>
    <label>Card Details:</label>

    <b-form id="mercadopago">
      <b-row>
        <b-col cols="12" md="4" sm="8">
          <b-form-group>
            <b-form-input
              type="text"
              v-model="payu.card"
              id="cardNumber"
              data-checkout="cardNumber"
              placeholder="Card Number:"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="3" md="2" sm="4">
          <b-form-group>
            <b-form-input
              type="text"
              v-model="payu.cvc"
              placeholder="CVC"
              data-checkout="securityCode"
              id="securityCode"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="3" md="2" sm="4">
          <b-form-group>
            <b-form-input
              type="text"
              v-model="payu.month"
              placeholder="MM"
              data-checkout="cardExpirationMonth"
              id="cardExpirationMonth"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="3" md="2" sm="4">
          <b-form-group>
            <b-form-input
              type="text"
              v-model="payu.year"
              placeholder="YYYY"
              data-checkout="cardExpirationYear"
              id="cardExpirationYear"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="3" md="2" sm="4">
          <b-form-group>
            <b-form-select
                  v-model="payu.card_network"
                  size="sm"
                  value-field="value"
                  text-field="name"
                  :options="networks"
                ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group>
            <b-form-input
              type="text"
              v-model="payu.name"
              data-checkout="cardholderName"
              id="cardholderName"
              placeholder="Your Name"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group>
            <b-form-input
              type="email"
              v-model="payu.email"
              placeholder="example@gmail.com"
              name="email"
              id="email"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
    <small
      class="form-text text-muted"
      id="card-errors"
      role="alert"
    >Tu pago será convertido a {{ this.$parent.$parent.mercadopago_currency }}</small>
  </div>
</template>

<script>
export default {
  data() {
    return {
      networks: [
        {name: 'VISA', value: 'visa'},
        {name: 'MASTERCARD', value: 'mastercard'}
      ],
      payu: {
        name: "",
        email: "",
        card: "",
        cvc: "",
        card_network: "visa",
        month: "",
        year: ""
      }
    };
  },
  created() {},
  methods: {
    getData() {
      this.$store.commit("payment/PAYU_DATA", this.payu);
    }
  }
};
</script>
