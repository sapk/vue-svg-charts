<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" @click="changeData" style="margin-bottom: 4rem;">
    <h3>Simple</h3>
    <bar-graph :points="dataPoints"/>
    <hr>
    <h3>Advanced</h3>
    <bar-graph
      title="Test Bar Graph"
      animDuration="1s"
      :showValues="true"
      :animated="true"
      :points="dataPoints"
      :labels="dataLabels"
      :width="1024"
      :height="320"
    />
    <hr>
    <h3>Custom CSS (+slot for gradient)</h3>
    <bar-graph class="custom-style" :points="dataPoints">
      <template slot="svg-footer">
        <linearGradient id="custom-style-gradient-vertical" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--color-stop-1)"></stop>
          <stop offset="50%" stop-color="var(--color-stop-2)"></stop>
          <stop offset="100%" stop-color="var(--color-stop-3)"></stop>
        </linearGradient>
      </template>
    </bar-graph>
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
      dataLabels: [
        "Label 1",
        "Label 2",
        "Label 3",
        "Label 4",
        "Label 5",
        "Label 6",
        "Label 7",
        "Label 8",
        "Label 9"
      ]
    };
  },
  created: function() {
    window.setInterval(this.changeData, 5000);
  },
  methods: {
    changeData() {
      this.dataPoints = this.dataPoints.map(() => {
        return Math.floor(Math.random() * Math.max(180)) + 1;
      });
    }
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
  margin: 60px 0px;
}
hr {
  margin: 4rem 8rem;
}

#custom-style-gradient-vertical {
  --color-stop-1: #00c3ff;
  --color-stop-2: #77e190;
  --color-stop-3: #42b883;
}
.custom-style .chart rect {
  fill: url(#custom-style-gradient-vertical) gray;
}
</style>