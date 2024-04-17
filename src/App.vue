<template>
  <main>
    <my_header/>
    <router-view></router-view>
    <my_footer/>
  </main>
</template>

<script>
import my_header from './components/my_header.vue'
import my_footer from './components/my_footer.vue'

export default {
  name: 'App',
  components: {
    my_header,
    my_footer
  }
}
</script>

<style scoped>

@font-face {
  font-family: 'Din Pro';
  src: url("@/assets/DINPro-Regular.woff") format("woff");
  font-weight: normal;
}

@font-face {
  font-family: 'HyliaSerif';
  src: url("@/assets/HyliaSerif.woff") format("woff");
  font-weight: normal;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url("@/assets/white.jpg");
  width: 100%;
  min-height: 100vh;
  font-family: 'Din Pro', sans-serif;
}
</style>
