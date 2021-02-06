<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { collegePie } from "@/api/system/currentprojectinformation";
const animationDuration = 3000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      testd:null,
      dataX:[],
      dataY:[]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {


      collegePie().then(response =>{
          this.testd= response.data.list
         
         for(var i=0;i<this.testd.length; i++){
                           this.dataX.push(JSON.parse(JSON.stringify(this.testd))[i].college)
                       }

          console.log(this.dataX)
        for(var i=0;i<this.testd.length; i++){
                           this.dataY.push(JSON.parse(JSON.stringify(this.testd))[i].countCollege)
                       }

         this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
         title: {
        text: '本年度申请学院',
        left: 'center'
    },
        tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} '
    },

    yAxis: {
        type: 'category',
        data: this.dataX
    },
    xAxis: {
        type: 'value'
    },
    series: [{
        data: this.dataY,
        type: 'bar',
         emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
    }]
      })     
      })
     
    }
  }
}
</script>
