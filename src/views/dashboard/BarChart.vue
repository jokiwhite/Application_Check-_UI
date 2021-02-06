<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { fundingTypePie } from "@/api/system/currentprojectinformation";

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
 
      fundingTypePie().then(response =>{
        this.testd= JSON.parse(JSON.stringify(response.data.list))
      //  console.log( JSON.parse(JSON.stringify(this.testd)) )
       
        for(var i=0;i<this.testd.length; i++){
                           this.arrNum.push({"value": JSON.parse(JSON.stringify(this.testd))[i].countFundingType,"name":JSON.parse(JSON.stringify(this.testd))[i].fundingType});
                           this.arrNumName.push(JSON.parse(JSON.stringify(this.testd))[i].fundingType)
                       }
      // console.log( JSON.parse(JSON.stringify(this.arrNum)))

      

      this.chart = echarts.init(this.$el, 'macarons')  
      this.chart.setOption({

         title: {
        text: '本年度申请项目类型',
       
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data:   JSON.parse(JSON.stringify(this.arrNumName)),
    },
    series: [
        {
            name: '项目类型',
            type: 'pie',
            radius: '65%',
            center: ['40%', '50%'],
            data: JSON.parse(JSON.stringify(this.arrNum)),
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
    //      title: {
    //     text: '本年度项目类型',
    //     left: 'center'
    // },
    // tooltip: {
    //     trigger: 'item',
    //     formatter: '{a} <br/>{b} : {c} ({d}%)'
    // },
    // legend: {
    //     orient: 'vertical',
    //     left: 'left',
    //     data: []
    // },
    // series: [
    //     {
    //         name: '访问来源',
    //         type: 'pie',
    //         radius: '55%',
    //         center: ['50%', '60%'],
    //          data:JSON.parse(JSON.stringify(this.arrNum)),
    //         emphasis: {
    //             itemStyle: {
    //                 shadowBlur: 10,
    //                 shadowOffsetX: 0,
    //                 shadowColor: 'rgba(0, 0, 0, 0.5)'
    //             }
    //         }
    //     }
    // ]
      })
      });
     
    }
  }
}
</script>
