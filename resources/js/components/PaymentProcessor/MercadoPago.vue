<template>
  <div>
    <label>Card Details:</label>

    <b-form id="mercadopago">
      <b-row>
        <b-col cols="12" md="6" sm="8">
          <b-form-group>
            <b-form-input
              type="text"
              v-model="card"
              id="cardNumber"
              data-checkout="cardNumber"
              placeholder="Card Number"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4" md="2" sm="4">
          <b-form-group>
            <b-form-input
              type="text"
              v-model="cvc"
              placeholder="CVC"
              data-checkout="securityCode"
              id="securityCode"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4" md="2" sm="6">
          <b-form-group>
            <b-form-input
              type="text"
              v-model="month"
              placeholder="MM"
              data-checkout="cardExpirationMonth"
              id="cardExpirationMonth"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4" md="2" sm="6">
          <b-form-group>
            <b-form-input
              type="text"
              v-model="year"
              placeholder="YY"
              data-checkout="cardExpirationYear"
              id="cardExpirationYear"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6" md="3" sm="6">
          <b-form-group>
            <b-form-input
              type="text"
              v-model="name"
              data-checkout="cardholderName"
              id="cardholderName"
              placeholder="Nombre y Apellido"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="3" sm="6">
          <b-form-group>
            <b-form-input
              type="email"
              v-model="email"
              placeholder="example@gmail.com"
              name="email"
              id="email"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="3" sm="6">
          <b-form-group>
            <b-form-input
              type="text"
              v-model="doc_number"
              data-checkout="docNumber"
              id="docNumber"
              placeholder="Número de documento"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="3" sm="6">
          <b-form-group>
            <b-form-select
              v-model="doctype"
              id="doctype"
              size="md"
              value-field="iso"
              text-field="iso"
              data-checkout="docType"
            ></b-form-select>
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
      mercadopago: null,
      name: "",
      email: "",
      card: "",
      cvc: "",
      month: "",
      year: "",
      doc_number: "",
      doctype: ""
    };
  },
  created() {
    this.mercadopago = window.Mercadopago;
    this.mercadopago.setPublishableKey(this.$parent.$parent.mercadopago_key); //accedemos al prop del padre
    this.mercadopago.getIdentificationTypes();
  },
  methods: {
    getCardNetword() {
      var vm = this; //Importante para referenciar la instancia de vue dentro de una funcion como parametro
      return new Promise(function(resolve, reject) {
        vm.mercadopago.getPaymentMethod(
          { bin: vm.card.substring(0, 6) },
          function(status, response) {
            if (status == 200) {
              vm.$store.commit("payment/MERCADOPAGO_CARD", response[0].id); //Aquí referenciamos la clase
              resolve();
            } else {
              reject(response.error);
            }
          }
        );
      });
    },

    getToken() {
      var vm = this; //Importante para referenciar la instancia de vue dentro de una funcion como parametro
      return new Promise(function(resolve, reject) {
        var mercadoPagoForm = document.querySelector("#mercadopago");
        vm.mercadopago.createToken(mercadoPagoForm, function(status, response) {
          if (status != 200 && status != 201) {
            reject("La data es invalida");
          } else {
            console.log(response.id);
            vm.$store.commit("payment/MERCADOPAGO_TOKEN", response.id); //Aquí referenciamos la clase
            resolve();
          }
        });
      });
    }
  }
};
</script>
