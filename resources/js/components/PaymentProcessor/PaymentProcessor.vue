<template>
  <div>
    <b-card header="Procesar pago">
      <b-card-body>
        <b-form class @submit.prevent="pagar()">
          <b-row>
            <b-col cols="6">
              <b-form-group label-align="left" label="Ingresa el monto a pagar:">
                <b-form-input
                  type="text"
                  required
                  name="value"
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
            <b-col cols="6">
              <b-form-group
                label="Eliga un medio de pago: "
                label-align="left"
                label-for="mediopago"
              >
                <b-button-group>
                  <b-button
                    class="p-1 ml-2"
                    v-for="(pago, idx) in platforms"
                    :key="idx"
                    variant="outline-primary"
                    @click="select(pago.id)"
                    v-b-toggle="`accordion-${pago.id}`"
                  >
                    <b-img v-bind="mainProps" :src="`../${pago.image}`"></b-img>
                  </b-button>
                </b-button-group>
              </b-form-group>
              <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                <h1>1</h1>
              </b-collapse>
              <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
                <h1>2</h1>
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
export default {
  data() {
    return {
      mainProps: { width: 95, height: 50 },
      btn: false,
      value: "",
      platform_select: "",
      currency: "eur",
    };
  },
  computed: {
    ...mapState("payment", ["currencies", "platforms"])
  },
  created() {
    this.$store.dispatch("payment/getCurrencies");
    this.$store.dispatch("payment/getPlatforms");
  },
  methods: {
    pagar() {
      let pay = {
        currency: this.currency,
        platform: this.platform_select,
        value: this.value
      };
      console.log(pay);
      this.$store.dispatch("payment/pay", pay);
    },
    select(id) {
      this.platform_select = id;
      console.log(id);
    }
  }
};
</script>
