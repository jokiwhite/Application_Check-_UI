<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { submitTimeline } from "@/api/system/currentprojectinformation";

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
      arrNum:[],
      arrNumName:[]
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
 
      submitTimeline().then(response =>{
        this.testd= JSON.parse(JSON.stringify(response.data.list))
      //  console.log( JSON.parse(JSON.stringify(this.testd)) )
       
        for(var i=0;i<this.testd.length; i++){
                           this.arrNum.push(JSON.parse(JSON.stringify(this.testd))[i].countSubmitTime)
                           this.arrNumName.push(JSON.parse(JSON.stringify(this.testd))[i].submitTime)
                       }
      // console.log( JSON.parse(JSON.stringify(this.arrNum)))

      

      this.chart = echarts.init(this.$el, 'macarons')  
      this.chart.setOption({

         title: {
        text: '最近七日申请数量',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
     xAxis: {
        type: 'category',
        data: this.arrNumName
    },
    yAxis: {
        type: 'value'
    },
    series: [{
       name: '申请数量',
        data:this.arrNum,
        type: 'line',
        smooth: true
    }]

      })
      });
     
    }
  }
}
</script>
