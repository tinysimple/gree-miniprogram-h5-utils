<template>
  <div id="app">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import commonUtil from "./utils/index";
import { isGreeMiniProgram, getMac, getParams } from "./utils/index";
console.log(commonUtil);
console.log(isGreeMiniProgram);
console.log(
  isGreeMiniProgram("https://127.0.0.1/url?passThroughParams=greeapp&test=1")
);
console.log(
  isGreeMiniProgram(
    "https://iot.cloud.tencent.com/scf/h5panel/?%21debug=0&deviceId=KNR0SMK6SQ%2F294906&familyId=&passthrough=greeapp%26mac%3D12345678&ticket=t_08dba794423947209999324591634d68&uin=greetest",
    "passthrough"
  )
);
console.log(
  getParams(
    "https://iot.cloud.tencent.com/scf/h5panel/?%21debug=0&deviceId=KNR0SMK6SQ%2F294906&familyId=&passthrough=%5Borigin%3Dgreeapp%26mac%3D123456%5D&ticket=t_82ad69d3cd6043c49deb50ca5bbc47d2&uin=greetest",
    "passthrough"
  )
);

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
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
