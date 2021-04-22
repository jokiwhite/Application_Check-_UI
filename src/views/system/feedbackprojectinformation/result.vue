<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" >
     
      <el-form-item  prop="projectname">
        <el-input
          v-model="queryParams.projectname"
          placeholder="项目名称"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="personname">
        <el-input
          v-model="queryParams.personname"
          placeholder="申请人"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     
      </el-form-item>
      <el-form-item  prop="fundingtype">
        <el-select v-model="queryParams.fundingtype" placeholder="项目类型">
          <el-option v-for="item in condition.allFundingType"
                  :key="item"
                  :label="item"
                  :value="item">
                  </el-option>
        </el-select>
      </el-form-item>
       <el-form-item  prop="college">
          <el-select v-model="queryParams.college" placeholder="所在院系">
           <el-option v-for="item in condition.allCollege"
                  :key="item"
                  :label="item"
                  :value="item">
                  </el-option>
              </el-select>   
      </el-form-item>

       <el-form-item  prop="applyyear">
          <el-select v-model="queryParams.applyyear" placeholder="年份">
           <el-option v-for="item in condition.applyyear"
                  :key="item"
                  :label="item"
                  :value="item">
                  </el-option>
              </el-select>   
      </el-form-item>
     
      <!-- <el-form-item  prop="statusweb">
        <el-input
          v-model="queryParams.statusweb"
          placeholder="查重状态"
        
          @keyup.enter.native="handleQuery"
        /> 
      </el-form-item> -->

  
      

      <el-form-item>
        <el-button type="primary" icon="el-icon-search"  @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh"  @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>



    <el-table v-loading="loading" :data="feedbackprojectinformationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
     
      <el-table-column label="项目名称" align="center" prop="projectname" />
      <el-table-column label="申请人" align="center" prop="personname" />
     
      <el-table-column label="项目类型" align="center" prop="fundingtype" />
     
      <el-table-column label="所在学院" align="center" prop="college" />
      
      <el-table-column label="申请年份" align="center" prop="applyyear" />
    
      <el-table-column label="查重状态" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.statusweb | statusFilter">
          {{ scope.row.statusweb | formatStata }}
        </el-tag>
      </template>
    </el-table-column>
      <el-table-column label="操作" align="center" >


        <template slot-scope="scope"> 
     <el-button type="primary" size="mini" icon="el-icon-delete" @click="dialog(scope.row)" >查看详情</el-button></el-button>
        </template>
      </el-table-column>
    </el-table>


       <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" >
        <el-form-item label="科学号" prop="sciencenumber">
          <span>{{form.sciencenumber}}</span>
          <!-- <el-input v-model="form.sciencenumber" placeholder="无" /> -->
        </el-form-item>
          <el-form-item label="项目名称" prop="projectname">
             <span>{{form.projectname}}</span>
          <!-- <el-input v-model="form.projectname" placeholder="无" /> -->
        </el-form-item>
         <el-form-item label="申请人" prop="personname">
           <span>{{form.personname}}</span>
          <!-- <el-input v-model="form.personname" placeholder="无" /> -->
        </el-form-item>
        <el-form-item label="申请年份" prop="applyyear">
           <span>{{form.applyyear}}</span>
          <!-- <el-input v-model="form.applyyear" placeholder="无" /> -->
        </el-form-item>
        <el-form-item label="资助类型" prop="fundingtype">
           <span>{{form.fundingtype}}</span>
          <!-- <el-input v-model="form.fundingtype" placeholder="无" /> -->
        </el-form-item>
      <el-form-item label="所属院系" prop="college">
        <span>{{form.college}}</span>
          <!-- <el-input v-model="form.college" placeholder="无" /> -->
        </el-form-item>
       
        <el-form-item label="申请代码" prop="applycode1">
           <span>{{form.applycode1}}</span>
          <!-- <el-input v-model="form.applycode1" placeholder="无" /> -->
        </el-form-item>

        <el-form-item label="资助金额" prop="money">
           <span>{{form.money}}</span>
          <!-- <el-input v-model="form.money" placeholder="无" /> -->
        </el-form-item>
        <el-form-item label="申请人职称" prop="jobtitle">
          <span>{{form.jobtitle}}</span>
          <!-- <el-input v-model="form.jobtitle" placeholder="无" /> -->
        </el-form-item>
        
        <el-form-item label="项目英文名" prop="projectenglishname">
          <span>{{form.projectenglishname}}</span>
          <!-- <el-input v-model="form.projectenglishname" placeholder="无" /> -->
        </el-form-item>
       
        <!-- <el-form-item label="项目号" prop="projectapprovaldocumentnumber">
          <el-input v-model="form.projectapprovaldocumentnumber" placeholder="无" />
        </el-form-item> -->
        
        
        <!-- <el-form-item label="职称" prop="jobtitle">
          <el-input v-model="form.jobtitle" placeholder="无" />
        </el-form-item> -->
       
        <!-- <el-form-item label="起止时间" prop="startendtime">
          <el-input v-model="form.startendtime" placeholder="无" />
        </el-form-item> -->
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        
        <el-button @click="cancel">关闭</el-button>
      </div>
    </el-dialog>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    
  </div>
</template>

<script>
import {listFeedBack ,getCurrentprojectinformation} from "@/api/system/currentprojectinformation";
export default {
  filters: {
    // el-tag类型转换
    statusFilter(statusWeb) {
      const statusMap = {
        1: 'success',
        2:  'danger',
        0: 'info'
      }
      return statusMap[statusWeb]
    },
    // 状态显示转换
    formatStata(statusWeb) {
      const statusMap = {
        1: '查重通过',
        2: '严重重复',
        0: '  待定  ',
      }
      return statusMap[statusWeb]
    }
  },


  name: "Feedbackprojectinformation",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
      feedbackprojectinformationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize:50,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      condition:{
        "applyyear":[
          2018,
          2019,
          2020
        ],
    "allCollege": [
      "数学与统计学院",
      "自动化学院",
      "协和医院",
      "土木工程与力学学院",
      "船舶与海洋工程学院",
      "航空航天学院",
      "物理学院",
      "电气与电子工程学院",
      "能源与动力工程学院",
      "光学与电子信息学院",
      "School of Physics",
      "武汉光电国家研究中心",
      "材料科学与工程学院",
      "化学与化工学院",
      "药学院",
      "生命科学与技术学院",
      "环境科学与工程学院",
      "公共卫生学院",
      "Materials Science and Engineering",
      "法医学系",
      "人工智能与自动化学院",
      "同济医院",
      "武汉儿童医院",
      "武汉市中心医院",
      "基础医学院",
      "梨园医院",
      "教育科学研究院",
      "儿童消化内科",
      "社会学院",
      "普爱医院",
      "公共管理学院",
      "电子信息与通信学院",
      "水电与数字化工程学院",
      "机械科学与工程学院",
      "建筑与城市规划学院",
      "软件学院",
      "计算机科学与技术学院",
      "管理学院",
      "医药卫生管理学院",
      "经济学院",
      "护理学院",
      "湖北省肿瘤医院",
      "中西医结合医院",
      "精神卫生中心",
      "计划生育研究所",
      "生殖健康研究所",
      "医学影像科 超声影像科",
      "中医科",
      "儿童保健科",
      "儿内呼吸科",
      "湖北妇幼保健院",
      "新闻与信息传播学院",
      "School of Artificial Intelligence and Automation",
      "物理学院/武汉光电国家研究中心",
      "法学院",
      "网络与计算中心",
      "外语学院",
      "同济医学院附属协和医院",
      "网络空间安全学院",
      "校医院"
    ],
    "allFundingType": [
      "青年科学基金项目",
      "国际(地区)合作与交流项目",
      "International (Regional) Cooperation And Exchange Project",
      "优秀青年科学基金项目",
      "国家杰出青年科学基金",
      "专项基金项目",
      "国家重大科研仪器研制项目",
      "重点项目",
      "应急管理项目",
      "面上项目",
      "海外及港澳学者合作研究基金",
      "创新研究群体项目",
      "重大项目",
      "重大研究计划",
      "联合基金项目",
      "专项项目",
      "科学中心项目"
    ]
  }
    };
  },
  created() {
    this.getList();
  },
  methods: {

      dialog(row) {
     this.reset();
      const id = row.id || this.ids
      getCurrentprojectinformation(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "项目详情";
      });
    },
    /** 查询列表 */
    getList() {
      this.loading = true;
      listFeedBack(this.queryParams).then(response => {
        this.feedbackprojectinformationList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        applyyear: undefined,
        sciencenumber: undefined,
        projectname: undefined,
        personname: undefined,
        applycode1: undefined,
        fundingtype: undefined,
        money: undefined,
        projectapprovalnumber: undefined,
        applycode2: undefined,
        projectenglishname: undefined,
        unitname: undefined,
        projectapprovaldocumentnumber: undefined,
        college: undefined,
        cooperativeresearchunit: undefined,
        jobtitle: undefined,
        researchnature: undefined,
        startendtime: undefined,
        statusweb: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
   
   
  }
};
</script>