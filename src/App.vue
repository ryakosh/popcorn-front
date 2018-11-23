<template>
  <div id="app">
    <div class="c">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
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
}
</style>