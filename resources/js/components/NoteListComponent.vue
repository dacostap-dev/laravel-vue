<template>
  <div>
    
    <MessageComponent />

    <form @submit.prevent="editarNota()" v-if="editar">
      <h3>Editar Nota</h3>
      <input type="text" class="form-control my-2" placeholder="Nombre" v-model="modelEdit.nombre" />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Descripcion"
        v-model="modelEdit.descripcion"
      />
      <b-button class="btn-warning my-2 btn-block" type="submit">Editar</b-button>
      <b-button class="my-2 btn-block" @click="cancelarEditar()">Cancelar</b-button>
    </form>

    <form @submit.prevent="agregarNota()" v-if="!editar">
      <h3>Agregar nueva nota</h3>
      <input type="text" class="form-control my-2" placeholder="Nombre" v-model="nota.nombre" />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Descripcion"
        v-model="nota.descripcion"
      />
      <b-button class="btn-success my-2 btn-block" type="submit">Agregar</b-button>
    </form>

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <note v-for="(nota, index) in notes" :key="index" :nota="nota"></note>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      nota: { nombre: "", descripcion: "" }
    };
  },
  created() {
    // en mejor que mounted para cargar desde api
    this.$store.dispatch("getNotes");
  },
  computed: {
    ...mapState(["notes", "message", "editar", "modelEdit"])
  },
  methods: {
    agregarNota() {
      this.$store
        .dispatch("postNotes", this.nota)
        .then(res => {
          this.nota.nombre = "";
          this.nota.descripcion = "";
          this.$store.commit("SetMessage", {
            texto: "Nota Agregada",
            color: "success"
          });
        })
        .catch(e => {
          console.log(e.response);
          this.$store.commit("SetMessage", {
            texto: "Algo falló",
            color: "danger"
          });
        });
    },
    editarNota() {
      this.$store
        .dispatch("updateNote", this.modelEdit)
        .then(res => {
          this.$store.commit("SetMessage", {
            texto: "Nota Actualizada",
            color: "success"
          });
          this.$store.state.editar = false;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    cancelarEditar() {
      this.$store.state.editar = false;
      this.$store.commit("ModelEdit", null);
    }
  }
};
</script>