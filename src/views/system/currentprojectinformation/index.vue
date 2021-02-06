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
     
      <el-form-item  prop="statusweb">
        <el-input
          v-model="queryParams.statusweb"
          placeholder="查重状态"
        
          @keyup.enter.native="handleQuery"
        /> 
      </el-form-item>

  
      

      <el-form-item>
        <el-button type="primary" icon="el-icon-search"  @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh"  @click="resetQuery">重置</el-button>
        <el-button
          type="success"
          icon="el-icon-delete" 
          :disabled="multiple"
          @click="updateStatusAll"
         v-hasPermi="['system:feedbackprojectinformation:statusAll']"
        >批量审核</el-button>
      </el-form-item>
    </el-form>



    <el-table v-loading="loading" :data="currentprojectinformationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" :selectable="canSelect" />
     
      <el-table-column label="项目名称" align="center" prop="projectname" />
      <el-table-column label="申请人" align="center" prop="personname" />
     
      <el-table-column label="项目类型" align="center" prop="fundingtype" />
     
      <el-table-column label="所在学院" align="center" prop="college" />
      
      <el-table-column label="申请年份" align="center" prop="applyyear" width="100" />
    
      <el-table-column label="查重状态" align="center" width="100">
      <template slot-scope="scope">
        <el-tag :type="scope.row.statusweb | statusFilter">
          {{ scope.row.statusweb | formatStata }}
        </el-tag>
      </template>
    </el-table-column>
     <el-table-column label="相似度" align="center" prop="checkrate"  width="100" />
     
      <el-table-column label="操作" align="center"   width="200"  >
        <template slot-scope="scope">
          <router-link :to="'/feedbackprojectinformation/detection2/'+scope.row.id">
            <el-button :disabled="scope.row.statusweb== 2 ? false : true" type="primary" size="mini" icon="el-icon-edit">结果概览</el-button>
        </router-link>
     <!-- <el-button :disabled="scope.row.statusweb== 2 ? false : true"  type="success" size="mini" icon="el-icon-delete" @click="updateStatus(scope.row.id,scope.row,'1')" >通过审核</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    
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
import {updateStatusAll,updateStatus, listCurrentprojectinformation } from "@/api/system/currentprojectinformation";

export default {
   filters: {
    // el-tag类型转换
    statusFilter(statusWeb) {
      const statusMap = {
        1: 'success',
        2:  'danger',
        3: 'info'
      }
      return statusMap[statusWeb]
    },
    // 状态显示转换
    formatStata(statusWeb) {
      const statusMap = {
        1: '查重通过',
        2: '严重重复',
        3: '  待定  ',
      }
      return statusMap[statusWeb]
    }
  },
  name: "Currentprojectinformation",
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
      // 本年度项目书表格数据
      currentprojectinformationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        applycode1: undefined,
        projectname: undefined,
        personname: undefined,
        fundingtype: undefined,
        sciencenumber: undefined,
        versionnumber: undefined,
        college: undefined,
        applyyear: undefined,
        submittime: undefined,
        status: undefined,
        projectenglishname: undefined,
        applycode2: undefined,
        subclassdescription: undefined,
        notedescription: undefined,
        startdata: undefined,
        enddata: undefined,
        base: undefined,
        mainresearch: undefined,
        researchdirection: undefined,
        chineseabstract: undefined,
        englishabstract: undefined,
        chinesekeyword: undefined,
        englishkeyword: undefined,
        supportingunit: undefined,
        unitcontact: undefined,
        unitcontactemail: undefined,
        unitcontactphone: undefined,
        collegecontact: undefined,
        collegecontactemail: undefined,
        collegecontactphone: undefined,
        peaplelistname: undefined,
        peaplelistemail: undefined,
        peaplelistjob: undefined,
        peaplelistunitname: undefined,
        peaplelistwork: undefined,
        totalnumber: undefined,
        advanced: undefined,
        intermediate: undefined,
        primary1: undefined,
        postdoc: undefined,
        phd: undefined,
        master: undefined,
        applypersontype: undefined,
        scientificresearchprojects: undefined,
        scientificproblemattributes: undefined,
        scientificproblemattributescontent: undefined,
        pdfdownloadaddress: undefined,
        processed: undefined,
        detected: undefined,
        statusweb: undefined,
        updatetime: undefined,
        checkrate: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
       condition:{
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
    canSelect(row) {
      console.log(row.statusweb)
      if(row.statusweb=='2'){
        return true
      }else{
        return false
      }
      
    },
    /** 查询本年度项目书列表 */
    getList() {
      this.loading = true;
      listCurrentprojectinformation(this.queryParams).then(response => {
        this.currentprojectinformationList = response.rows;
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
        applycode1: undefined,
        projectname: undefined,
        personname: undefined,
        fundingtype: undefined,
        sciencenumber: undefined,
        versionnumber: undefined,
        college: undefined,
        applyyear: undefined,
        submittime: undefined,
        status: "0",
        projectenglishname: undefined,
        applycode2: undefined,
        subclassdescription: undefined,
        notedescription: undefined,
        startdata: undefined,
        enddata: undefined,
        base: undefined,
        mainresearch: undefined,
        researchdirection: undefined,
        chineseabstract: undefined,
        englishabstract: undefined,
        chinesekeyword: undefined,
        englishkeyword: undefined,
        supportingunit: undefined,
        unitcontact: undefined,
        unitcontactemail: undefined,
        unitcontactphone: undefined,
        collegecontact: undefined,
        collegecontactemail: undefined,
        collegecontactphone: undefined,
        peaplelistname: undefined,
        peaplelistemail: undefined,
        peaplelistjob: undefined,
        peaplelistunitname: undefined,
        peaplelistwork: undefined,
        totalnumber: undefined,
        advanced: undefined,
        intermediate: undefined,
        primary1: undefined,
        postdoc: undefined,
        phd: undefined,
        master: undefined,
        applypersontype: undefined,
        scientificresearchprojects: undefined,
        scientificproblemattributes: undefined,
        scientificproblemattributescontent: undefined,
        pdfdownloadaddress: undefined,
        processed: undefined,
        detected: undefined,
        statusweb: undefined,
        updatetime: undefined,
        checkrate: undefined
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
     //修改审核状态
   updateStatus(id,row,statusweb){
          updateStatus(id)
                .then(response => {
                   //提示信息
                    this.$message({
                    type: 'success',
                    message: '修改成功!'
                    });
                    row.statusweb = statusweb;
                })
      },

    updateStatusAll(row){
        const ids = row.id || this.ids;
      this.$confirm('是否确认批量通过审核，编号为"' + ids + '"的申请书?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
           return updateStatusAll(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("通过审核");
        }).catch(function() {});
    },
  }
};
</script>