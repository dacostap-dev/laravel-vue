<template>
  <div>
    <b-row align-h="center" class="mt-5">
      <b-card header="Regístrate">
        <b-card-body>
          <b-form @submit.stop.prevent="register">
            <div v-if="server_errors">
              <div v-for="(value, key) in server_errors" :key="key">
                <b-alert variant="danger" show>{{ value[0] }}</b-alert>
              </div>
            </div>
            <b-form-group id="input-group-1" label="Name :" label-for="name">
              <b-form-input
                id="name"
                name="name"
                v-model="user.name"
                type="text"
                placeholder="Ingresa tu Nombre"
                v-validate="{ required: true}"
                :state="validateState('name')"
                data-vv-as="Name"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">{{ veeErrors.first('name') }}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="input-group-1" label="Email :" label-for="email">
              <b-form-input
                id="email"
                name="email"
                v-model="user.email"
                type="email"
                placeholder="Ingresa tu email"
                v-validate="'required|email'"
                :state="validateState('email')"
                data-vv-as="Email"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">{{ veeErrors.first('email') }}</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="password" label="Contraseña:" label-for="password">
              <b-form-input
                id="password"
                name="password"
                v-model="user.password"
                placeholder="Ingresa tu clave"
                v-validate="'required|min:8'"
                :state="validateState('password')"
                data-vv-as="Contraseña"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">{{ veeErrors.first('password') }}</b-form-invalid-feedback>
            </b-form-group>

            <b-button type="submit" variant="primary">Enviar</b-button>
          </b-form>
        </b-card-body>
      </b-card>
    </b-row>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      },
      messagesuccess: "Registro Exitoso"
    };
  },
  computed: {
    ...mapState("auth", ["server_errors"])
  },
  methods: {
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    register() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }

        this.$store
          .dispatch("auth/register", this.user)
          .then(() => {
            this.$router.push({
              name: "login",
              params: { messagesuccess: this.messagesuccess }
            }); 
          })
          .catch(e => {
            console.log(Object.values(e));
          });
      });
    }
  }
};
</script>