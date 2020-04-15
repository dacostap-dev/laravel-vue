<template>
  <div>
    <b-modal
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      header-text-variant="white"
      header-bg-variant="dark"
      ref="modul_store"
      centered
      title="Crear Modulo"
    >
      <b-form class="m-3" ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Nombre:">
          <b-form-input v-model="newModul.name" :state="nameState" required></b-form-input>
        </b-form-group>
        <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Solicitud:">
          <b-form-input v-model="newModul.solicitud" :state="solicitudState" required></b-form-input>
        </b-form-group>
        <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Memorandum:">
          <b-form-input v-model="newModul.memorandum" :state="memoState" required></b-form-input>
        </b-form-group>
        <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Informe:">
          <b-form-input v-model="newModul.informe" :state="informeState" required></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-card header-tag="header">
      <template v-slot:header>
        <b-row align-h="around">
          <b-col cols="6">
            Lista de módulos
          </b-col>
          <b-col cols="5">
            <div class="float-right">
              <b-button size="sm" variant="outline-primary" @click="storeModul()">
                <b-icon icon="plus-circle"></b-icon> Nuevo
              </b-button>
            </div>
          </b-col>
        </b-row>
      </template>
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
      btn: false,
      newModul: {
        name: "",
        solicitud: "",
        memorandum: "",
        informe: ""
      },
      nameState: "",
      solicitudState: "",
      memoState: "",
      informeState: ""
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
    },
    storeModul() {
      this.$refs["modul_store"].show();
    },
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
        .dispatch("storeModul", {
          student_id: this.$route.params.studentId,
          modul: this.newModul
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
        this.$refs.modul_store.hide();
      });
    },
    checkFormValidity() {
      // const valid = this.$refs.form.checkValidity();
      let valid = this.newModul.name == "" ? false : true;
      console.log(valid);
      this.nameState = this.newModul.name == "" ? valid : true;
      /*      this.solicitudState = this.newModul.solicitud == "" ? valid : true;
      this.memoState = this.newModul.memorandum == "" ? valid : true;
      this.informeState = this.newModul.informe == "" ? valid : true; */
      return valid;
    },
    resetModal() {
      this.newModul.name = "";
      this.newModul.solicitud = "";
      this.newModul.memorandum = "";
      this.newModul.informe = "";
      this.nameState = null;
      this.solicitudState = null;
      this.memoState = null;
      this.informeState = null;
    }
  }
};
</script>