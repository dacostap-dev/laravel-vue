<template>
  <b-modal
    id="create-promotion"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
    header-text-variant="white"
    header-bg-variant="dark"
    centered
    title="Crear Promoción"
  >
    <b-form class="m-3" ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Nombre:">
        <b-form-input v-model="newPromotion.name" :state="nameState" required></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
</template>
<script>
export default {
  data() {
    return {
      nameState: "",
      newPromotion: {
        name: ""
      }
    };
  },
  methods: {
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      this.$store
        .dispatch("promotions/storePromotion", this.newPromotion)
        .then(res => {})
        .catch(e => {
          this.$bvToast.toast("Algo Salió mal", {
            title: "Error !",
            variant: "danger",
            solid: true
          });
        });

      this.$nextTick(() => {
        this.$bvModal.hide("create-promotion");
      });
    },
    checkFormValidity() {
      // const valid = this.$refs.form.checkValidity();
      let valid = this.newPromotion.name == "" ? false : true;
      this.nameState = this.newPromotion.name == "" ? valid : true;
      return valid;
    },
    resetModal() {
      this.newPromotion.name = "";
      this.nameState = null;
    }
  }
};
</script>