<template>
  <div>
    <svg class="chart" :width="width" :height="height">
      <title v-if="title" id="title">{{ title }}</title>
      <g
        v-for="bar in chartData"
        :key="bar.index"
        :transform="`translate(${bar.x},${graphHeight})`"
      >
        <title>{{ bar.value }}</title>
        <rect :width="partitionWidth - 2" :height="bar.oldHeight" :x="2" :y="-bar.oldHeight">
          <animate
            v-if="animated"
            attributeName="height"
            :from="bar.oldHeight"
            :to="bar.height"
            :dur="animDuration"
            :begin="bar.animBegin"
            fill="freeze"
          ></animate>
          <animate
            v-if="animated"
            attributeName="y"
            :from="-bar.oldHeight"
            :to="-bar.height"
            :dur="animDuration"
            :begin="bar.animBegin"
            fill="freeze"
          ></animate>
        </rect>
        <text
          v-if="showValues"
          :x="bar.midPoint"
          :y="-bar.textOldHeight"
          dy="20px"
          text-anchor="middle"
        >
          {{ bar.value }}
          <animate
            v-if="animated"
            attributeName="y"
            :from="-bar.textOldHeight"
            :to="-bar.textHeight"
            :dur="animDuration"
            :begin="bar.animBegin"
            fill="freeze"
          ></animate>
        </text>
        <text
          v-if="labels[bar.index]"
          :x="bar.midPoint"
          :y="0"
          dy="20px"
          text-anchor="middle"
        >{{ labels[bar.index] }}</text>
      </g>
      <slot name="svg-footer"></slot>
    </svg>
  </div>
</template>

<script>
//inspired by https://github.com/djaxho/pure-vue-chart but doesn't required external libs
export default {
  props: {
    title: { type: String, default: "" },
    points: { type: Array, default: () => [] },
    labels: { type: Array, default: () => [] },
    height: { type: Number, default: 320 },
    width: { type: Number, default: 680 },
    animated: { type: Boolean, default: true },
    showValues: { type: Boolean, default: false },
    animDuration: { type: String, default: "1s" }
  },
  data() {
    return {
      start: Date.now(),
      lastUpdate: 0,
      oldHeights: []
    };
  },
  watch: {
    points(newPoints, oldPoints) {
      this.lastUpdate = Date.now();
      var m = Math.max(...oldPoints);
      this.oldHeights = oldPoints.map(value => {
        return this.yWithMax(value, m);
      });
    }
  },
  computed: {
    graphHeight() {
      if (this.labels.length > 0) {
        return this.height - 20; //Shorten the graph area for labels
      }
      return this.height;
    },
    partitionWidth() {
      return this.width / this.points.length;
    },
    maxDomain() {
      return Math.max(...this.points);
    },
    chartData() {
      return this.points.map((value, index) => {
        let ret = {
          index,
          value,
          midPoint: this.partitionWidth / 2,
          x: index * this.partitionWidth,
          height: this.y(value),
          oldHeight:
            typeof this.oldHeights[index] === "undefined"
              ? 0
              : this.oldHeights[index],
          animBegin:
            this.lastUpdate == 0
              ? "0"
              : (this.lastUpdate - this.start) / 1000 + "s"
        };

        //Override text position
        ret.textHeight = Math.max(24, ret.height);
        ret.textOldHeight = Math.max(24, ret.oldHeight);
        return ret;
      });
    }
  },
  methods: {
    y(val) {
      return this.yWithMax(val, this.maxDomain);
    },
    yWithMax(val, max) {
      return (val / max) * this.graphHeight;
    }
  }
};
</script>

<style lang="css">
.chart rect {
  fill: #42b883;
}
.chart text {
  font: 12px sans-serif;
  color: #35495e;
}
</style>