<template>
  <div id="app">
    <div class="c">
      <pop-nav/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav.vue';

export default {
  components: {
    'pop-nav': Nav,
  },
};
</script>


<style>
* {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
}

#app {
  padding: 10px;
  display: flex;
}

.c {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 0 9px black;
  overflow-y: auto;
}
</style>