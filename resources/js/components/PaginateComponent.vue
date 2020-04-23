<template>
  <div>
    <b-row>
      <b-col md="4" class="my-1">
        <b-form-group
          label="Por página"
          label-cols-md="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>

      <b-col md="8">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalItems"
          :per-page="perPage"
          align="right"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      pageOptions: [5, 10, 15]
    };
  },
  props: ["modul"],
  created() {
    console.log(this.modul);
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
    ...mapState({
      perPage(state) {
        return state[this.modul].perPage;
      },
      totalItems(state) {
        return state[this.modul].totalItems;
      }
    }),
    currentPage: {
      get() {
        // console.log(this.$store.state.students.currentPage)
        return this.$store.state[this.modul].currentPage;
      },
      set(value) {
        this.$store.commit(this.modul + "/SetCurrentPage", value);
      }
    },
    perPage: {
      get() {
        // console.log(this.$store.state.students.currentPage)
        return this.$store.state[this.modul].perPage;
      },
      set(value) {
        this.$store.commit(this.modul + "/SetPerPage", value);
      }
    }
  },
  watch: {
    currentPage(newVal, OldVal) {
      console.log(this.modul);
      if (this.modul == "students") {
        this.getStudents();
      } else {
        this.$store.dispatch(this.modul + "/getPromotions");
      }
    },
    perPage(newVal, OldVal) {
      if (this.modul == "students") {
        this.getStudents();
      } else {
        this.$store.dispatch(this.modul + "/getPromotions");
      }
    }
  }
};
</script>