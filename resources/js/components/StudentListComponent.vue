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
                  <b-button variant="outline-primary">Editar</b-button>
                </div>
              </template>
              <template v-slot:cell(destroy)="row">
                <b-button variant="outline-danger">Eliminar</b-button>
              </template>
            </b-table>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <!--  -->
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
      ]
    };
  },
  created() {
    this.$store.dispatch("getStudents");
  },
  computed: {
    ...mapState(["students"])
  },
  methods: {
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
        if(total == 5){
         $color = "success";  
        }
         $color = "primary"; 
      }
      return $color;
    }
  }
};
</script>