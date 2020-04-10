<template>
  <div>
    <b-card header="Lista Alumnos">
      <b-card-body>
        <b-row class="justify-content-md-center">
          <b-col cols="12">
            <b-table
              outlined
              responsive
              stacked="md"
              hover
              head-variant="light"
              :items="students"
              :fields="cabeceras"
              selectable
              select-mode="single"
              @row-selected="onRowSelected"
            >
              <template v-slot:cell(avatar)="row">
                <b-avatar variant="ligth" :src="`img/avatars/${row.item.image}`" class="ml-3"></b-avatar>
              </template>
              <template v-slot:cell(name)="row">
                <div>{{row.item.name}}</div>
                <div class="small text-muted">Registrado: {{row.item.created_at}}</div>
              </template>
              <template v-slot:cell(modulStatus)="row">
                <div class="clearfix">
                  <div class="float-right">
                    <small class="text-muted">Tiene {{row.item.count_moduls}} módulos</small>
                  </div>
                </div>
                <b-progress
                  :variant="color(row.item.count_moduls, row.item.moduls_complete)"
                  animated
                >
                  <b-progress-bar :value="row.item.porcentaje" :label="`${row.item.porcentaje}%`"></b-progress-bar>
                </b-progress>
              </template>
              <template v-slot:cell(edit)="row">
                <div class="text-center">
                  <b-button variant="outline-primary" @click="editar(row.item)">Editar</b-button>
                </div>
              </template>
              <template v-slot:cell(destroy)="row">
                <b-button variant="outline-danger" @click="eliminar(row.item)">Eliminar</b-button>
              </template>
            </b-table>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <!--  -->

    <b-modal
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      header-text-variant="white"
      header-bg-variant="dark"
      ref="modal_update"
      centered
      title="Editar Alumno"
    >
      <b-form class="m-3" ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Nombre:">
          <b-form-input v-model="modelEdit.name" :state="nameState" required></b-form-input>
        </b-form-group>

        <b-form-group label-align="left" label-cols="4" label-cols-lg="3" label="Email:">
          <b-form-input
            v-model="modelEdit.email"
            type="email"
            :state="emailState"
            placeholder="example@hotmail.com"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      cabeceras: [
        {
          key: "avatar",
          label: "",
          thStyle: "width: 6rem",
          class: "text-center"
        },
        { key: "name", label: "Nombre", thStyle: "width: 22rem" },
        {
          key: "promotion_name",
          label: "Promoción",
          class: "text-center",
          thStyle: "width: 18rem"
        },
        {
          key: "modulStatus",
          label: "Modulos Aprobados",
          class: "text-center"
        },
        {
          key: "edit",
          label: "Editar",
          class: "text-center",
          thStyle: "width: 6rem"
        },
        {
          key: "destroy",
          label: "Eliminar",
          class: "text-center",
          thStyle: "width: 6rem"
        }
      ],
      show: false,
      nombre: "",
      nameState: "",
      email: "",
      emailState: ""
    };
  },
  created() {
    this.$store.dispatch("getStudents");
  },
  computed: {
    ...mapState(["students", "modelEdit"])
  },
  methods: {
    onRowSelected(items) {
      console.log(items[0].id);
      this.$store.dispatch("getModulsByStudent", items[0].id); //Puede que ya no se necesite, evaluar tiempos de carga
      this.$router.push("/modulos/" + items[0].id);
    },
    editar(model) {
      this.$store.commit("ModelEdit", Object.assign({}, model));
      this.$refs["modal_update"].show();
      console.log(model);
    },
    eliminar(id) {
      console.log(id);
    },
    color(total, completados) {
      let $color;
      let value = (completados * 100) / total;

      /*    if(value == 100){
         $color = "success";
      } */

      if (value <= 25) {
        $color = "danger";
      } else if (value > 25 && value <= 50) {
        $color = "warning";
      } else if (value > 50 && value <= 75) {
        $color = "info";
      } else if (value > 75 && value <= 100) {
        if (total == 5) {
          $color = "success";
        }
        $color = "primary";
      }
      return $color;
    },
    handleOk(bvModalEvt) {
      this.nameState = null;
      this.emailState = null;
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
        .dispatch("updateStudent", this.modelEdit)
        .then(res => {})
        .catch(e => {
          console.log(e.response);
        });

      /*    this.nombreCompleto = this.apellido + " " + this.nombre;
      this.$store.dispatch("postStudent", {
        name: this.nombreCompleto,
        email: this.email,
        genero: this.genero,
        promotion_id: this.promotionSelected.id
      }); */

      this.$nextTick(() => {
        this.$refs.modal_update.hide();
      });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();

      this.nameState = this.modelEdit.name == "" ? valid : true;
      this.emailState = this.modelEdit.email == "" ? valid : true;

      console.log(this.modelEdit);
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
      this.email = "";
      this.emailState = null;
    }
  }
};
</script>