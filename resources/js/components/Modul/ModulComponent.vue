<template>

  <b-card
    :header="modul.name"
    class="text-center"
    @click="select"
    :border-variant="selected ? 'primary': ''"
    :header-bg-variant="selected  ? 'primary': ''"
    :header-text-variant="selected  ? 'white': ''"
  >
    <chartjs-doughnut :bind="true" :datasets="data" :labels="labels" :option="option" />
  </b-card>
  

</template>
<script>
import { mapState } from "vuex";
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
  computed: {
    ...mapState(["moduls", "datasets", "modulSelected"]),
    data(){
         return [
           {
            data: [this.modul.items_complete, this.modul.total_items - this.modul.items_complete],
            backgroundColor: ["#185190", "#f36e60"],
            hoverBackgroundColor: ["#d1e3f7", "#fbd2cd"]
          }
          ]
    },
    selected() {
      if (this.modulSelected != null) {
        return this.modul == this.modulSelected;
      }
      return false;
    }
  },
  methods: {
    select() {
      this.$store.commit("ModulSelected", this.modul);
    },
    cambiar() {
      this.$store.commit("UpdateDataset");
    }
  }
};
</script>