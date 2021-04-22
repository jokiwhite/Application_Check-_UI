<template>
    <div class="app-container">
      <!-- <el-form  :model="currentInformation" >
  <el-form-item label="项目名称:" >
    <span>{{currentInformation.projectname}}</span>
    <el-input v-model="currentInformation.projectname" ></el-input>
  </el-form-item>

</el-form> -->
      <el-form :inline="true" :model="currentInformation" >

         <el-form-item label="项目名称:" >
    <span>{{currentInformation.projectname}}</span>
    <!-- <el-input v-model="currentInformation.projectname" ></el-input> -->
  </el-form-item>
 
  </el-form-item>
  <el-form-item label="申请人:" >
    <span>{{currentInformation.personname}}</span>
    <!-- <el-input v-model="currentInformation.personname" ></el-input> -->
  </el-form-item>
  <el-form-item label="项目类型:" >
    <span>{{currentInformation.fundingtype}}</span>
    <!-- <el-input v-model="currentInformation.fundingtype" ></el-input> -->
  </el-form-item>
  <el-form-item label="所属学院:" >
    <span>{{currentInformation.college}}</span>
    <!-- <el-input v-model="currentInformation.college" ></el-input> -->
  </el-form-item>
  <el-form-item label="申请年份:" >
    <span>{{currentInformation.applyyear}}</span>
    <!-- <el-input v-model="currentInformation.applyyear" ></el-input> -->
  </el-form-item>
</el-form>
 <el-button type="info" round v-on:click="backHistory">返回</el-button>
 <router-link :to="'/feedbackprojectinformation/detection/'+Cid">
<el-button type="primary" round>详情报告书</el-button>
 </router-link>

 <el-divider></el-divider>
      <!-- <el-button  size="small" type="success"  icon="el-icon-delete" @click="updateStatus(articleID)" >通过审核</el-button>
         <el-button  size="small" type="primary"  icon="el-icon-delete" @click="returnMain" >返回</el-button> -->
    <el-table
     v-loading="loading"
      element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :data = "list"
    :span-method="objectSpanMethod"
      border
      
      style="width: 100%">

      <!-- <el-table-column prop="article1Name"  header-align="center" label="原文名称" ></el-table-column> -->

        <el-table-column prop="article2Name" align="center"  header-align="center" label="相似文章名称"  ></el-table-column>
        <el-table-column prop="personName" align="center"  header-align="center" label="申请人"  ></el-table-column>
        <el-table-column prop="fundingType" align="center"  header-align="center" label="项目类型"  ></el-table-column>
        <el-table-column prop="college" align="center"  header-align="center" label="所属学院"  ></el-table-column>
        <el-table-column prop="applyYear" align="center"  header-align="center" label="申请年份"  ></el-table-column>
        <el-table-column prop="comparedNum" align="center"  header-align="center" width="100"  label="相似段落数"  ></el-table-column>
        



         <!-- <el-table-column label="操作" align="center"   width="200"  >
        <template slot-scope="scope">
          <router-link :to="'/feedbackprojectinformation/detection/'+Cid">
            <el-button  type="primary" size="mini" icon="el-icon-edit">结果详情</el-button>
        </router-link>
        </template>
      </el-table-column> -->


        <!-- <el-table-column prop="result" header-align="center"  label="相似度"  width="100">
            <template slot-scope="scope">
               {{Number(scope.row.result*100).toFixed()+'%'}}
            </template>
        </el-table-column> -->

    </el-table>  

    </div>
                                          
</template>


<script>
import detection from '@/api/system/detection'
import {updateStatusAll,updateStatus } from "@/api/system/currentprojectinformation";
export default {
    data() {
         return{
           loading: true,
             spanArr:[],
             isShow:true,
             article2Name:null,
             articleID :'',
             Cid:'',

            list:[{}],
            currentInformation: {
              projectname:'',
              applycode1:''
            }       
         }
    },

    created(){
       
         this.init()
         
    },
   
    methods:{
       backHistory(){
    this.$router.go(-1);//返回上一层
  },
       updateStatus(id){
        updateStatus(id)
                .then(response => {
                   //提示信息
                    this.$message({
                    type: 'success',
                    message: '修改成功!'
                    });
                    this.$router.push({ path: '/feedbackprojectinformation/NoAndYes' })
                })
      },

      init(){
            if (this.$route.params && this.$route.params.id){
            const id = this.$route.params.id
            this.findByIdSurvey(id)
            }else{
                this.findByIdSurvey(10)
                console.log("################")
            }
        },
      

        toPercent(point){
　      　var str=Number(point*100).toFixed();
　      　str+="%";
　      　this.list.point = str
},

         getSpanArr(data) {　
             
             if(data==null){console.log("######null")}
            for (var i = 0; i < data.length; i++) {
            if (i === 0) {
              this.spanArr.push(1);
              this.pos = 0
            } else {
              // 判断当前元素与上一个元素是否相同
            if (data[i].articleID2 === data[i - 1].articleID2) {
                this.spanArr[this.pos] += 1;
                this.spanArr.push(0);
              } else {
                this.spanArr.push(1);
                this.pos = i;
              }
            }
            
        }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 0||columnIndex === 1||columnIndex===2||columnIndex===3) {
            const _row = this.spanArr[rowIndex];
            const _col = _row > 0 ? 1 : 0;

            return { // [0,0] 表示这一行不显示， [2,1]表示行的合并数
                  rowspan: _row,
                  colspan: _col
            }
          }
        },
       

        findByIdSurvey(id1){
            var args
            detection.findByIdSurvey(id1)
                    .then(response =>{
                        this.article2Name = response.data.article2Name
                        this.list = response.data.article2Name
                        this.Cid = response.data.currentInformation.id
                        this.currentInformation = response.data.currentInformation
                        
                       this.getSpanArr(this.list)
                        this.loading = false
                        this.articleID = response.data.result[0].currentArticleID
                    })
        }
    }
}
</script>