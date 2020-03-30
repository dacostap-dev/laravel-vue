<template>
  <div>
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
        <Nota v-for="(nota, index) in notes" :key="index" :nota="nota"></Nota>
      </tbody>
    </table>
  </div>
</template>
<script>
import {mapState} from "vuex";
export default {
  data() {
    return {
      nota: { nombre: "", descripcion: "" },
    };
  },
  computed:{
    ...mapState(['notes', 'message', 'editar','modelEdit']),
  },
};
</script>