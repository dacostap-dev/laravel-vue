<template>
  <div>
    <h4>Card Details:</h4>

    <b-form id="mercadopago">
      <b-form-group label-align="left" label="Card Number:">
        <b-form-input type="text" v-model="card" id="cardNumber" data-checkout="cardNumber"></b-form-input>
      </b-form-group>

      <b-form-group label-align="left" label="CVC:">
        <b-form-input
          type="text"
          v-model="cvc"
          placeholder="CVC"
          data-checkout="securityCode"
          id="securityCode"
        ></b-form-input>
      </b-form-group>

      <b-form-group label-align="left" label="Month:">
        <b-form-input
          type="text"
          v-model="month"
          placeholder="MM"
          data-checkout="cardExpirationMonth"
          id="cardExpirationMonth"
        ></b-form-input>
      </b-form-group>

      <b-form-group label-align="left" label="Year:">
        <b-form-input
          type="text"
          v-model="year"
          placeholder="YY"
          data-checkout="cardExpirationYear"
          id="cardExpirationYear"
        ></b-form-input>
      </b-form-group>

      <b-form-group label-align="left" label="Nombre y apellido:">
        <b-form-input type="text" v-model="name" data-checkout="cardholderName" id="cardholderName"></b-form-input>
      </b-form-group>

      <b-form-group label-align="left" label="email:">
        <b-form-input
          type="email"
          v-model="email"
          placeholder="example@gmail.com"
          name="email"
          id="email"
        ></b-form-input>
      </b-form-group>

      <b-form-group label-align="left" label="Número de documento:">
        <b-form-input type="text" v-model="doc_number" data-checkout="docNumber" id="docNumber"></b-form-input>
      </b-form-group>

      <b-form-group label="Doctype" label-align="left" label-for="doctype">
        <b-form-select
          v-model="doctype"
          id="doctype"
          size="sm"
          value-field="iso"
          text-field="iso"
          data-checkout="docType"
        ></b-form-select>
      </b-form-group>
    </b-form>
    <small class="form-text text-muted" id="card-errors" role="alert">Tu pago será convertido a {{ this.$parent.$parent.mercadopago_currency }}</small>
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
      doctype: "",
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
        vm.mercadopago.getPaymentMethod({ bin: vm.card.substring(0, 6) }, function(status, response) {
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
