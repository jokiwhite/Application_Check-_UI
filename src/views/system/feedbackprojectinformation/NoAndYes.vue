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
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      
      <el-form-item  prop="college">
        <el-input
          v-model="queryParams.college"
          placeholder="所在院系"
          
          @keyup.enter.native="handleQuery"
        />
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
      <el-table-column type="selection" width="55" align="center" />
     
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
            <el-button :disabled="scope.row.statusweb== 2 ? false : true" type="primary" size="mini" icon="el-icon-edit">详情</el-button>
        </router-link>
     <el-button :disabled="scope.row.statusweb== 2 ? false : true"  type="success" size="mini" icon="el-icon-delete" @click="updateStatus(scope.row.id,scope.row,'1')" >通过审核</el-button>
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
import {updateStatusAll,updateStatus, listCurrentprojectinformationAfter, getCurrentprojectinformation, delCurrentprojectinformation, addCurrentprojectinformation, updateCurrentprojectinformation, exportCurrentprojectinformation } from "@/api/system/currentprojectinformation";

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
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询本年度项目书列表 */
    getList() {
      this.loading = true;
      listCurrentprojectinformationAfter(this.queryParams).then(response => {
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