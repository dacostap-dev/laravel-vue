<template>
  <div>
    <b-card header="Lista de Promociones">
      <b-card-body>
        <b-row class="justify-content-md-center">
          <b-col cols="12">
            <PaginateComponent modul="promotions" />
            <b-table
              outlined
              responsive
              stacked="md"
              hover
              head-variant="light"
              :items="promotions"
              :fields="cabeceras"
              selectable
              select-mode="single"
              @row-selected="onRowSelected"
            >
              <template v-slot:cell(name)="row">
                <div>{{row.item.name}}</div>
                <div class="small text-muted">Registrado: {{row.item.created_at}}</div>
              </template>
              <template v-slot:cell(programa_name)="row">
                <div>Industrias alimentarias</div>
              </template>
              <template v-slot:cell(studentsStatus)="row">
                <div class="clearfix">
                  <div class="float-right">
                    <small class="text-muted">Tiene {{row.item.total_alumnos}} alumnos</small>
                  </div>
                </div>
                <b-progress
                  :variant="color(row.item.total_alumnos, row.item.alumnos_aprobados)"
                  animated
                >
                  <b-progress-bar 
                  :value="row.item.total_alumnos != 0 ? row.item.alumnos_aprobados * 100 / row.item.total_alumnos : 0"
                  :label="(row.item.total_alumnos != 0 ? row.item.alumnos_aprobados * 100 / row.item.total_alumnos : 0).toString()+'%'">
                  </b-progress-bar>
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
        { key: "name", label: "Nombre", thStyle: "width: 22rem" },
        {
          key: "programa_name",
          label: "Programa",
          class: "text-center",
          thStyle: "width: 18rem"
        },
        {
          key: "studentsStatus",
          label: "Alumnos Aprobados",
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
      nombre: "",
      nameState: "",
    };
  },
  created() {
    this.$store.dispatch("promotions/getPromotions");
  },
  computed: {
    ...mapState(["modelEdit"]),
    ...mapState("promotions", ["promotions"]),

  },
  methods: {
    onRowSelected(items) {
      console.log(items[0].id);
      this.$store
        .dispatch("students/getStudentsByPromotion", items[0].id)
        .then(res => {
          this.$router.push("/students/" + items[0].id); //Esperar que de carguen los modulos, para que tenga la data para crear los graficos al llegar a esa ruta
        });
    },
    editar(model) {
      this.$store.commit("ModelEdit", Object.assign({}, model));
      this.$refs["modal_update"].show();
      console.log(model);
    },
    eliminar(model) {
      console.log(model);
      this.$store.dispatch("students/deleteStudent", model);
    },
    color(total, completados) {
      let $color;
      let value = (completados * 100) / total;
      
      $color = "primary";
      return $color;
    },
    handleOk(bvModalEvt) {
      this.nameState = null;
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
        .dispatch("promotions/updatePromotion", this.modelEdit)
        .then(res => {})
        .catch(e => {
          console.log(e.response);
        });

      this.$nextTick(() => {
        this.$refs.modal_update.hide();
      });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();

      this.nameState = this.modelEdit.name == "" ? valid : true;
      console.log(this.modelEdit);
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    }
  },
};
</script>