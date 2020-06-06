<template>
  <b-modal
    id="create-student"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
    header-text-variant="white"
    header-bg-variant="dark"
    centered
    title="Crear Alumno"
  >
    <b-form class="m-3" ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Nombre:">
        <b-form-input v-model="newStudent.name" :state="nameState" required></b-form-input>
      </b-form-group>
      <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Email:">
        <b-form-input v-model="newStudent.email" type="email" :state="emailState" required></b-form-input>
      </b-form-group>
      <b-form-group label-cols="3" label="Genero:">
        <b-form-radio-group
          class="my-2"
          v-model="newStudent.gender"
          :options="generos"
          name="radio-options"
          :state="genderState"
        ></b-form-radio-group>
      </b-form-group>
    </b-form>
  </b-modal>
</template>
<script>
export default {
  data() {
    return {
      nameState: "",
      emailState: "",
      genderState: "",
      newStudent: {
        name: "",
        email: "",
        gender: ""
      },
      generos: [
        { text: "Masculino", value: "male" },
        { text: "Femenino", value: "female" }
      ]
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
        .dispatch("students/storeStudent", {
            'name': this.newStudent.name,
            'email': this.newStudent.email,
            'gender': this.newStudent.gender,
            'promotion_id': this.$route.params.promotionId
        })
        .then(res => {})
        .catch(e => {
          this.$bvToast.toast("Algo Salió mal", {
            title: "Error !",
            variant: "danger",
            solid: true
          });
        });

      this.$nextTick(() => {
        this.$bvModal.hide("create-student");
      });
    },
    checkFormValidity() {
      // const valid = this.$refs.form.checkValidity();
      let valid =
      this.newStudent.name == "" || this.newStudent.email == "" ||  this.newStudent.gender == ""  ? false  : true;
      this.nameState = this.newStudent.name == "" ? valid : true;
      this.emailState = this.newStudent.email == "" ? valid : true;
      this.genderState = this.newStudent.gender == "" ? valid : true;
      return valid;
    },
    resetModal() {
      this.nameState = null;
      this.emailState = null;
      this.genderState = null;

      this.newStudent.name = "";
      this.newStudent.email = "";
      this.newStudent.gender = "";
    }
  }
};
</script>