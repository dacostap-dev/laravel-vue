<template>
  <div>
    <b-card header="Lista de Modulos">
      <b-card-body>
        <b-row class="justify-content-md-center">
          <b-col cols="12">
            <b-card-group deck>
              <ModulComponent v-for="(modul, index) in moduls" :key="index" :modul="modul" />
            </b-card-group>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <b-card v-if="modulSelected" :header="`Detalle del ${modulSelected.name}`">
      <b-card-body>
        <b-row class="justify-content-md-center">
          <b-col cols="12">
            <b-form class @submit.prevent="updateModul()">
              <b-form-group label-align="left" label="Nombre:">
                <b-form-input
                  type="text"
                  required
                  name="name"
                  v-model="modulSelected.name"
                  placeholder="Ingresa el asesor de la promoción"
                ></b-form-input>
              </b-form-group>

              <b-form-group label-align="left" label="Fecha de Solicitud:">
                <b-form-input
                  type="text"
                  name="text"
                  v-model="modulSelected.solicitud"
                  placeholder="dd/mm/yyyy"
                ></b-form-input>
              </b-form-group>

              <b-form-group label-align="left" label="Fecha de Memorandum:">
                <b-form-input
                  type="text"
                  name="text"
                  v-model="modulSelected.memorandum"
                  placeholder="dd/mm/yyyy"
                ></b-form-input>
              </b-form-group>

              <b-form-group label-align="left" label="Fecha de Informe:">
                <b-form-input
                  type="text"
                  name="text"
                  v-model="modulSelected.informe"
                  placeholder="dd/mm/yyyy"
                ></b-form-input>
              </b-form-group>
              <b-button :disabled="btn" class="ml-2" type="submit" variant="primary">
                Guardar
                <i class="fas fa-save"></i>
              </b-button>
            </b-form>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
import ModulComponent from "../components/Modul/ModulComponent.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      btn: false
    };
  },
  components: {
    ModulComponent
  },
  mounted() {
    console.log(this.$route.params.studentId);
    if (this.$route.params.studentId) {
      this.$store.dispatch("getModulsByStudent", this.$route.params.studentId);
    }
  },
  computed: {
    ...mapState(["moduls", "modulSelected"])
  },
  methods: {
    updateModul() {
      this.btn = true;
      this.$store.dispatch("updateModul", this.modulSelected).then(res => {
        this.btn = false;
      });
    }
  }
};
</script>