<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" @click="changeData">
    <bar-graph title="Test Bar Graph" :showValues="true" :easeIn="true" :points="dataPoints" :width="680" :height="320"/>
  </div>
</template>

<script>
import BarGraph from "./components/bar";
export default {
  name: "app",
  components: {
    BarGraph
  },
  data() {
    return {
      dataPoints: [42, 8, 15, 16, 23, 42, 4, 8, 15],
    };
  },
  methods: {
    changeData() {
      this.dataPoints = this.dataPoints.map(() => {
        return Math.floor(Math.random() * Math.max(42)) + 1
      });
    },
  },
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
</style>