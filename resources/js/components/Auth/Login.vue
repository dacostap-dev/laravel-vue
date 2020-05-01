<template>
  <div>
    <b-row align-h="center" class="mt-5">
      <b-card header="Iniciar Sesión">
        <b-card-body>
          <b-form @submit.prevent="login">
            <b-alert variant="danger" show v-if="error">{{ error }}</b-alert>

            <b-form-group label="Email :" label-for="email">
              <b-form-input
                id="email"
                v-model="user.username"
                type="email"
                required
                placeholder="Ingresa tu email"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="password" label="Contraseña:" label-for="password">
              <b-form-input
                id="password"
                v-model="user.password"
                required
                placeholder="Ingresa tu clave"
              ></b-form-input>
            </b-form-group>

            <b-overlay
              :show="busy"
              rounded
              opacity="0.6"
              spinner-small
              spinner-variant="primary"
              class="d-inline-block"
              @hidden="onHidden"
            >
              <b-button ref="button" type="submit" variant="primary">Entrar</b-button>
            </b-overlay>

            <div class="mt-3">
              <router-link :to="{name: 'register'}">No tienes cuenta Registrate!</router-link>
            </div>
          </b-form>
        </b-card-body>
      </b-card>
    </b-row>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  props: {
    messagesuccess: String,
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      busy: false
    };
  },
  mounted() {
    if (this.messagesuccess) { //Podría ser desde Register nada más pero para practicar props
      this.$bvToast.toast(this.messagesuccess, {
        title: "Completado",
        variant: "success",
        solid: true
      });
    }
  },
  computed: {
    ...mapState("auth", ["error"])
  },
  methods: {
    onHidden() {
      // Return focus to the button once hidden
      this.$refs.button.focus();
    },
    login() {
      this.busy = true;
      this.$store
        .dispatch("auth/login", this.user)
        .then(() => {
          this.busy = false;
          this.$router.push({ name: "Promociones" });
        })
        .catch(e => {
          this.busy = false;
          console.log(e);
        });
    }
  }
};
</script>