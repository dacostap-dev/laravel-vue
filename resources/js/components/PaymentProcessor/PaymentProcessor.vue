<template>
  <div>
    <b-card header="Procesar pago">
      <b-card-body>
        <b-form id="payment-form" @submit.prevent="pagar()">
          <b-row>
            <b-col cols="6">
              <b-form-group label-align="left" label="Ingresa el monto a pagar:">
                <b-form-input
                  type="text"
                  required
                  v-model="value"
                  placeholder="use valores en decimales separados con '.'"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="4">
              <b-form-group label="Moneda" label-align="left" label-for="SelectCurrency">
                <b-form-select
                  v-model="currency"
                  id="SelectCurrency"
                  size="sm"
                  value-field="iso"
                  text-field="iso"
                  :options="currencies"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-form-group
                label="Eliga un medio de pago: "
                label-align="left"
                label-for="mediopago"
              >
                <b-button-group>
                  <b-button
                    class="p-1 ml-2"
                    v-for="(platform, idx) in platforms"
                    :key="idx"
                    variant="outline-primary"
                    @click="select(platform)"
                    v-b-toggle="`accordion-${platform.id}`"
                  >
                    <b-img v-bind="mainProps" :src="`../${platform.image}`"></b-img>
                  </b-button>
                </b-button-group>
              </b-form-group>
              <b-collapse class="mb-2" id="accordion-1" accordion="my-accordion" role="tabpanel"></b-collapse>
              <b-collapse class="mb-2" id="accordion-2" accordion="my-accordion" role="tabpanel">
                <Stripe ref="stripe" />
              </b-collapse>
              <b-collapse class="mb-2" id="accordion-3" accordion="my-accordion" role="tabpanel">
                <MercadoPago ref="mercadopago" />
              </b-collapse>
              <b-collapse class="mb-2" id="accordion-4" accordion="my-accordion" role="tabpanel">
                <PayU ref="payu" />
              </b-collapse>
            </b-col>
          </b-row>

          <b-button :disabled="btn" class="ml-2" type="submit" variant="primary">
            Pagar
            <i class="fas fa-save"></i>
          </b-button>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Stripe from "./Stripe";
import MercadoPago from "./MercadoPago";
import PayU from "./PayU";
export default {
  props: ["mercadopago_key", "mercadopago_currency"], //key desde la configuracion, para ser usando en el component de mercadopago
  data() {
    return {
      mainProps: { width: 95, height: 50 },
      btn: false,
      value: "",
      platform_select: "",
      currency: "eur"
    };
  },
  components: {
    Stripe,
    MercadoPago,
    PayU
  },
  computed: {
    ...mapState("payment", [
      "currencies",
      "platforms",
      "stripe_token",
      "mercadopago",
      "payu_data"
    ])
  },
  created() {
    this.$store.dispatch("payment/getCurrencies");
    this.$store.dispatch("payment/getPlatforms");
  },
  methods: {
    pagar() {
      switch (this.platform_select.name.toLowerCase()) {
        case "paypal":
          this.PaypalPay();
          break;
        case "stripe":
          this.obtenerToken("stripe").then(() => {
            this.StripePay();
          });
          break;
        case "mercadopago":
          this.obtenerTarjeta("mercadopago")
            .then(() => {
              this.obtenerToken("mercadopago")
                .then(() => {
                  this.MercadopagoPay();
                })
                .catch(e => {
                  alert(e); //ejemplo que vieje del reject
                });
            })
            .catch(e => {
              alert("La tarjeta es inválida");
            });

          break;
        case "payu":
          this.getData("payu").then(() => {
            console.log('datita')
             this.PayUPay();
          });
          break;
      }
    },
    async obtenerToken(platform) {
      await this.$refs[platform].getToken();
    },

    async obtenerTarjeta(platform) {
      await this.$refs[platform].getCardNetword();
    },

    async getData(platform) {
      await this.$refs[platform].getData();
    },

    PaypalPay() {
      var pay = {
        currency: this.currency,
        platform: this.platform_select.id,
        value: this.value
      };

      this.$store.dispatch("payment/pay", pay);
    },
    StripePay() {
      var pay = {
        currency: this.currency,
        platform: this.platform_select.id,
        value: this.value,
        token: this.stripe_token
      };
      this.$store.dispatch("payment/pay", pay);
    },

    MercadopagoPay() {
      var pay = {
        currency: this.currency,
        platform: this.platform_select.id,
        value: this.value,
        token: this.mercadopago.token,
        card_network: this.mercadopago.card_network
      };
      this.$store.dispatch("payment/pay", pay);
    },

    PayUPay() {
      var pay = {
        currency: this.currency,
        platform: this.platform_select.id,
        value: this.value,
        name: this.payu_data.name,
        email: this.payu_data.email,
        card: this.payu_data.card,
        cvc: this.payu_data.cvc,
        card_network: this.payu_data.card_network,
        month: this.payu_data.month,
        year: this.payu_data.year,
      };

      this.$store.dispatch("payment/pay", pay);
    },

    select(platform) {
      this.platform_select = platform;
      console.log(platform);
    }
  }
};
</script>
