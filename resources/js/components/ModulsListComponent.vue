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
          xd
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
    ...mapState(["moduls", "datasets", "modulSelected"])
  },
  methods: {
  }
};
</script>