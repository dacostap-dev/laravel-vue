<template>
  <div class="c-app">
    <TheSidebar />
    <CWrapper>
      <TheHeader />
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition :duration="200" 
              name="router-animation"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
              mode="out-in"
            >
              <router-view :key="$route.path"></router-view>
              <!--   <dashboard/> -->
            </transition>
          </CContainer>
        </main>
        <TheFooter />
      </div>
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from "./TheSidebar";
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";

import Dashboard from "../views/Dashboard";

export default {
  name: "TheContainer",
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
    Dashboard
  }
};
</script>

<style lang="css">
  @import url("https://cdn.jsdelivr.net/npm/animate.css@3.5.1");

</style>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
