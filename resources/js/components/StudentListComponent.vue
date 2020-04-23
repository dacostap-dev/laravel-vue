<template>
  <div>
    <b-card header="Lista Alumnos">
      <b-card-body>
        <b-row class="justify-content-md-center">
          <b-col cols="12">

            <SearchComponent module="students"/>
     
            <b-table
              id="students-list"
              show-empty
              empty-text="No tiene Alumnos"
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
                  <b-progress-bar
                    :value="row.item.count_moduls != 0 ? row.item.moduls_complete * 100 / row.item.count_moduls : 0"
                    :label="(row.item.count_moduls != 0 ? row.item.moduls_complete * 100 / row.item.count_moduls : 0).toString()+'%'"
                  ></b-progress-bar>
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

            <PaginateComponent modul="students" />
            
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
      nombre: "",
      nameState: "",
      email: "",
      emailState: ""
    };
  },
  created() {
    this.getStudents(); //Evalua si viene de una promocion o si son todos
  },
  computed: {
    ...mapState(["modelEdit"]),
    ...mapState("students", ["students"]),
  },
  methods: {
    getStudents() {
      if (this.$route.params.promotionId) {
        this.$store.dispatch(
          "students/getStudentsByPromotion",
          this.$route.params.promotionId
        );
      } else {
        this.$store.dispatch("students/getStudents");
      }
    },
    onRowSelected(items) {
      console.log(items[0].id);
      this.$store
        .dispatch("modules/getModulsByStudent", items[0].id)
        .then(res => {
          this.$router.push("/modulos/" + items[0].id); //Esperar que de carguen los modulos, para que tenga la data para crear los graficos al llegar a esa ruta
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
    color(cantidadModulos, completados) {
      let $color;
      let value = (completados * 100) / cantidadModulos;
      if (value <= 25) {
        $color = "danger";
      } else if (value > 25 && value <= 50) {
        $color = "warning";
      } else if (value > 50 && value <= 75) {
        $color = "info";
      } else if (value > 75 && value <= 100) {
        $color = "primary";
      }

      if (value === 100 && cantidadModulos == 5) {
        $color = "success";
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
        .dispatch("students/updateStudent", this.modelEdit)
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
  },
};
</script>