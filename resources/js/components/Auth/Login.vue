<template>
  <div>
    <b-form @submit.prevent="login">
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
        <b-form-input id="password" v-model="user.password" required placeholder="Ingresa tu clave"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      user: {
        email: 'marc.lemke@example.com',
        password: '123'
      }
    };
  },
  components: {},
  created() {
  },
  methods: {
    login() {
      const params = {
        grant_type: "password",
        client_id: 5,
        client_secret: "cm9gnAibToi5gNtyCBbeAAn1JTQsd31mcxoH2k9n",
        username: this.email,
        password: this.password
      };
      this.$store.dispatch("auth/login", params).then(res => {
        console.log('me logié')
        this.$router.push({name: 'promotion'})
      });
    }
  }
};
</script>