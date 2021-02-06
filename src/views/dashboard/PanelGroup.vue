<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="gotoF()">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="import" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            全部样本库
          </div>
          <count-to :start-val="0" :end-val="this.Ftotal" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="gotoC()">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="orcid" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            本年度项目书
          </div>
          <count-to :start-val="0" :end-val="this.Ctotal" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="gotoR()">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="jsfiddle" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            严重重复报告书
          </div>
          <count-to :start-val="0" :end-val="this.Rtotal" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { listCurrentprojectinformation } from "@/api/system/currentprojectinformation";
import {  listFeedbackprojectinformation } from "@/api/system/feedbackprojectinformation";
export default {
  components: {
    CountTo
  },
  data(){
    return{
      queryParams: {
        pageNum: 1,
        pageSize:50,
       
      },
      queryParams2: {
        pageNum: 1,
        pageSize:50,
        statusweb: 2,
      },
      Ftotal:0,
      Ctotal:0,
      Rtotal:0
    }
  },
  created() {
    this.getTotal()
  },
  methods: {

 handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },

    gotoF(){
      this.$router.push('/feedbackprojectinformation/result')
    },
    gotoC(){
      this.$router.push('/feedbackprojectinformation/currentprojectinformation')
    },
    gotoR(){
      this.$router.push('/feedbackprojectinformation/NoAndYes')
    },
   
    getTotal(){
    listFeedbackprojectinformation(this.queryParams).then(response => {
        this.Ftotal = response.total;
      });

    listCurrentprojectinformation(this.queryParams).then(response => {
        this.Ctotal = response.total;
      });
    listCurrentprojectinformation(this.queryParams2).then(response => {
        this.Rtotal = response.total;
      });

    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #36a3f7;
      }

      .icon-shopping {
        background: #f4516c;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #36a3f7;
    }

    .icon-shopping {
      color: #f4516c;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
