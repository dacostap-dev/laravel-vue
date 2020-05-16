<template>
  <div>
    <label for="cardElement">Credit or debit card</label>
    <div ref="card"></div>
    <!-- Used to display form errors. -->
    <small class="form-text text-muted" id="card-errors" role="alert"></small>
  </div>
</template>

<script>
let stripe = Stripe(`pk_test_FZHPqECijAHnyA6NEcpyGjmb00CtHUPe2Y`),
  elements = stripe.elements(),
  card = undefined;

export default {
  data() {
    return {};
  },

  /*   created() {
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute('src', 'https://js.stripe.com/v3/') 
    document.head.appendChild(recaptchaScript);
  }, */
  mounted() {
    card = elements.create("card");
    card.mount(this.$refs.card);

    card.addEventListener("change", function(event) {
      var displayError = document.getElementById("card-errors");
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = "";
      }
    });
  },
  methods: {
    async getToken() {
     await stripe.createPaymentMethod('card', card, {}).then( res => {
        if (res.error) {
          console.log(res);
          // Inform the user if there was an error.
          /*    var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message; */
        } else {
          this.$store.commit("payment/STRIPE_TOKEN", res.paymentMethod.id);
        }
      });

      /*       const {paymentMethod, error} = stripe.createPaymentMethod('card', card, {
        billing_details: {
          "name": "Dany",
          "email": "dani@hotmail.com"
        }
      })
      } */
    }
  }
};
</script>

<style lang="css">
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>