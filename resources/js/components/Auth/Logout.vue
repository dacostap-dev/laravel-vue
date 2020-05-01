<template>
  <div></div>
</template>
<script>
export default {
  created() {
    this.$store
      .dispatch("auth/logout")
      .then(() => {
        this.$store.commit("CLEAR_DATA");
        this.$router.push({ name: "login" });
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>