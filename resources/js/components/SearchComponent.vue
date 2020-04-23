<template>
  <div>
    <b-row align-h="end" class="my-2">
      <b-col cols="1">
        <label for="buscador">Buscador</label>
      </b-col>
      <b-col cols="2">
        <b-form-input type="search" id="buscador" v-model="search"></b-form-input>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["module"],
  data() {
    return {};
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
    }
  },
  computed: {
    search: {
      get() {
        return this.$store.state[this.module].search;
      },
      set(value) {
        this.$store.commit(this.module + "/SetSearch", value);
      }
    }
  },
  watch: {
    search(newVal, OldVal) {
     if (this.module == "students") {
        this.getStudents();
      } else {
        this.$store.dispatch(this.module + "/getPromotions");
      }
    }
  }
};
</script>