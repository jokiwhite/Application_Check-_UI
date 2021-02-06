<template>
    <div class="app-container">
      <el-button   type="info" round icon="el-icon-delete" @click="backHistory" >返回</el-button>
      <el-button   type="success" round  icon="el-icon-delete" @click="updateStatus(articleID)" >通过审核</el-button>
    <el-table
     v-loading="loading"
      element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :data = "list"
    :span-method="objectSpanMethod"
      border
      :cell-style="cellStyle" 
      
      style="width: 100%">
      <el-table-column prop="currentArticleParagraphNum"  header-align="center" label="段落号" width="100" ></el-table-column>

      <el-table-column prop="currentArticleParagraphContent"  header-align="center" label="原文" width="400" ></el-table-column>

        <el-table-column prop="comparedArticleID" :formatter="id2Name"  header-align="center" label="相似文章名称"  ></el-table-column>

        <el-table-column prop="comparedArticleParagraphContent" header-align="center"  label="相似文章内容" width="400"  ></el-table-column>

        <el-table-column prop="result" header-align="center"  label="相似度"  width="100">
            <template slot-scope="scope">
               {{Number(scope.row.result*100).toFixed()+'%'}}
            </template>
        </el-table-column>

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
            list:[{}],
            
             
         }
    },

    created(){
        //  this.findById(2),
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
            this.findById(id)
            }else{
                this.findById(10)
                console.log("################")
            }
        },
      
        id2Name(row, column){
            var name = '';
            this.article2Name.forEach(function (item, index){
                if (row.comparedArticleID == item.articleID2) {
                name = item.article2Name;
                }
            });
            return name;
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
            if (data[i].currentArticleParagraphNum === data[i - 1].currentArticleParagraphNum) {
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
          if (columnIndex === 0||columnIndex === 1) {
            const _row = this.spanArr[rowIndex];
            const _col = _row > 0 ? 1 : 0;

            return { // [0,0] 表示这一行不显示， [2,1]表示行的合并数
                  rowspan: _row,
                  colspan: _col
            }
          }
        },
       

        findById(id1){
            var args
            detection.findById(id1)
                    .then(response =>{
                        this.article2Name = response.data.article2Name
                        this.list = response.data.result
                       this.getSpanArr(this.list)
                        this.loading = false
                        this.articleID = response.data.result[0].currentArticleID
                        console.log(this.articleID)
                    })
        },
        cellStyle({row, column, rowIndex, columnIndex}){
        if( columnIndex === 3){ //指定坐标rowIndex ：行，columnIndex ：列
        return 'color:red' //rgb(105,0,7)
            }
        }
    }
}
</script>