<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="message.color"
      @dismiss-count-down="countDownChanged"
    >{{ message.text }}</b-alert>
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState([ "message", "dismissSecs", "dismissCountDown", ])
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.$store.state.dismissCountDown = dismissCountDown;
    }
  }
};
</script>