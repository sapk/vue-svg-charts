<template>
  <div>
    <svg class="chart" :width="width" :height="height">
      <title v-if="title" id="title">{{ title }}</title>
      <g v-for="bar in chartData" :key="bar.index" :transform="`translate(${bar.x},${height})`">
        <title>{{ bar.value }}</title>
        <rect :width="partitionWidth - 2" :height="bar.oldHeight" :x="2" :y="-bar.oldHeight">
          <animate v-if="easeIn"
            attributeName="height"
            :from="bar.oldHeight"
            :to="bar.height"
            dur="1s"
            :begin="bar.animBegin"
            fill="freeze"
          ></animate>
          <animate v-if="easeIn"
            attributeName="y"
            :from="-bar.oldHeight"
            :to="-bar.height"
            dur="1s"
            :begin="bar.animBegin"
            fill="freeze"
          ></animate>
        </rect>
        <text
          v-if="showValues"
          :x="bar.midPoint"
          :y="-bar.oldHeight"
          dy="20px"
          text-anchor="middle"
        >{{ bar.value }}
          <animate v-if="easeIn"
            attributeName="y"
            :from="-bar.oldHeight"
            :to="-bar.height"
            dur="1s"
            :begin="bar.animBegin"
            fill="freeze"
          ></animate></text>
      </g>
    </svg>
  </div>
</template>

<script>
//inspired by https://github.com/djaxho/pure-vue-chart but doesn't required external libs
export default {
  props: {
    title: { type: String, default: "" },
    points: { type: Array, default: () => [] },
    height: { type: Number, default: 100 },
    width: { type: Number, default: 100 },
    easeIn: { type: Boolean, default: true },
    showValues: { type: Boolean, default: false }
  },
  data() {
    return {
      start: Date.now(),
      lastUpdate: 0,
      oldPoints: [],
    };
  },
  watch: {
    points(newPoints, oldPoints) {
      this.lastUpdate = Date.now();
      this.oldPoints = oldPoints; //TODO imrove to store height and not value (as it can be greater than previous)
    }
  },
  computed: {
    partitionWidth() {
      return this.width / this.points.length;
    },
    maxDomain() {
      return Math.max(...this.points);
    },
    chartData() {
      return this.points.map((value, index) => {
        return {
          index,
          value,
          midPoint: this.partitionWidth / 2,
          x: index * this.partitionWidth,
          height: this.y(value),
          oldHeight: (typeof this.oldPoints[index] === "undefined" ? 0 : this.y(this.oldPoints[index])),
          //animBegin:  (this.lastUpdate - this.start + 1) + "s" ,
          animBegin: (this.lastUpdate == 0 ? "0" : ((this.lastUpdate - this.start)/1000) + "s" ),
        };
      });
    }
  },
  //oldPoints[bar.index]
  methods: {
    y(val) {
      return (val / this.maxDomain) * this.height;
    }
  }
};
</script>

<style lang="css">
.chart rect {
  fill: deepskyblue;
}
.chart text {
  font: 12px sans-serif;
}

.chart rect {
  font-size: 14px;
  transition-property: font-size;
  transition-duration: 4s;
  transition-delay: 2s;
}
/* TODO for text also */
</style>