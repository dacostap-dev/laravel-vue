<template>
  <div>
    <label for="cardElement">Credit or debit card</label>
    <div ref="card"></div>
    <!-- Used to display form errors. -->
    <small class="form-text text-muted" id="card-errors" role="alert"></small>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stripe: null,
      elements: null,
      card: undefined
    };
  },
  created() {
    (this.stripe = Stripe(`pk_test_FZHPqECijAHnyA6NEcpyGjmb00CtHUPe2Y`)),
      (this.elements = this.stripe.elements());
  },
  mounted() {
    this.card = this.elements.create("card");
    this.card.mount(this.$refs.card);

    this.card.addEventListener("change", function(event) {
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
      await this.stripe.createPaymentMethod("card", this.card, {}).then(res => {
        // billing_details: { "name": "Dany","email": "dani@hotmail.com"}
        if (res.error) {
          console.log(res);
          //var displayError = document.getElementById("card-errors");
          //   displayError.textContent = event.error.message; */
        } else {
          this.$store.commit("payment/STRIPE_TOKEN", res.paymentMethod.id);
        }
      });
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