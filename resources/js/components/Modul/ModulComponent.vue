<template>
  <b-card
    :header="modul.name"
    class="text-center"
    @click="select"
    :border-variant="selected ? 'primary': ''"
    :header-bg-variant="selected  ? 'primary': ''"
    :header-text-variant="selected  ? 'white': ''"
  >
    <chartjs-doughnut :bind="true" :datasets="drawByModul" :labels="labels" :option="option" />
  </b-card>
</template>
<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  props: ["modul"],
  data() {
    return {
      variant: {
        border: "",
        header_bg: "",
        header_text: ""
      },
      labels: ["Completo", "Incompleto"],
      option: {
        title: {
          display: true,
          position: "bottom",
          text: "Modul"
        }
      }
    };
  },
  components: {},
  created() {
    this.$store.commit("SetDraw", this.modul);  //primero todos envian su data al store, luego se obtiene su respetivo grafico por modul_id
  },
  computed: {
    ...mapGetters([
      'getGraphic',
    ]),
    drawByModul(){
      return [this.getGraphic(this.modul.id)] //se retorna en forma de arreglo porque sino no funciona el grafico
    },
    ...mapState(["modulSelected"]),
    selected() {
      if (this.modulSelected != null) {
        return this.modul.id == this.modulSelected.id;
      }
      return false;
    }
  },
  methods: {
    select() {
      this.$store.commit("ModulSelected", Object.assign({}, this.modul));
    },
  }
};
</script>