<template>
  <div>
    <b-row align-h="center" class="mt-5">
      <b-card header="Regístrate">
        <b-card-body>
          <b-form @submit.prevent="register">
            <b-form-group id="input-group-1" label="Name :" label-for="name">
              <b-form-input
                id="name"
                v-model="user.name"
                type="text"
                required
                placeholder="Ingresa tu Nombre"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-1" label="Email :" label-for="email">
              <b-form-input
                id="email"
                v-model="user.email"
                type="email"
                required
                placeholder="Ingresa tu email"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="password" label="Contraseña:" label-for="input-2">
              <b-form-input
                id="password"
                v-model="user.password"
                required
                placeholder="Ingresa tu clave"
              ></b-form-input>
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
      }
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("auth/register", this.user)
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>