<template>
    <div>   
        <h1>Lista de Modulos</h1>
        <h3 v-for="modul in moduls" :key="modul" >{{modul.name}}</h3>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    mounted() {
          console.log(this.$route.params.studentId);
        if(this.$route.params.studentId){
             console.log(this.$route.params.studentId);
        }
    },
    computed: {
        ...mapState(['moduls'])
    }
}
</script>