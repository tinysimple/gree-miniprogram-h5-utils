<template>
  <div id="app">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import commonUtil from './utils/index';
import { isGreeMiniProgram } from './utils/index'
console.log(commonUtil);
console.log(isGreeMiniProgram)
console.log(isGreeMiniProgram('https://127.0.0.1/url?passThroughParams=greeapp&test=1'))
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
