<template>
  <tr>
    <th scope="row">{{ nota._id }}</th>
    <td>{{ nota.nombre }}</td>
    <td>{{ nota.descripcion }}</td>
    <td>
      <!--      <b-button @click="alerta">Accion</b-button> -->
      <b-button @click="activarEdicion()" class="btn-warning btn-sm mx-2">Editar</b-button>
      <b-button @click="eliminarNota(nota._id)" class="btn-danger btn-sm">Eliminar</b-button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["nota"],
  data() {
    return {
     
    };
  },
  created() {
    console.log("test");
  },
  methods: {
    eliminarNota(id) {
      console.log(this.nota);
      this.$store
        .dispatch("deleteNotes", this.nota)
        .then(res => {
          this.$store.commit("SetMessage", {
            texto: "Nota Eliminada",
            color: "success"
          });
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    activarEdicion() {
      this.$store.state.editar = true;
      this.$store.commit('ModelEdit', Object.assign( {}, this.nota )) 
    }
  }
};
</script>

<style>
</style>