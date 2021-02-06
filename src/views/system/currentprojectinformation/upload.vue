<template>
    <div  class="app-container">
          <el-upload
              ref="uploadExcel"
              :action="uploadExcel.url"
              :headers="uploadExcel.headers"
              :limit="10"
              :auto-upload="false"
              accept=".pdf"
              :before-upload="beforeUploadFile"
              :on-exceed="exceedFile"
              :on-success="handleSuccess"
              :on-error="handleError"
              :file-list="fileList"
              
            >
              <el-button size="small" plain>选择文件</el-button>
                <el-button type="primary" @click="submitUpload" >确 定</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传pdf文件，且不超过10M
              </div>
            </el-upload>

    </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
   
    data() {
      return {
        uploadExcel: {
  // 是否禁用上传
  isUploading: false,
  // 设置上传的请求头部
  headers: { Authorization: "Bearer " + getToken() },
  // 上传的地址
  url: process.env.VUE_APP_BASE_API + "/common/upload"
},
        fileList: []
      };
    },
    methods: {
          // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      // console.log(file)
      const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      const size = file.size / 1024 / 1024
      if (extension !== 'pdf') {
        this.$notify.warning({
          title: '警告',
          message: `只能上传Excel（即后缀是.xlsx）的文件`
        })
      }
      if (size > 10) {
        this.$notify.warning({
          title: '警告',
          message: `文件大小不得超过10M`
        })
      }
    },
     
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$notify.warning({
        title: '警告',
        message: `只能选择 ${
          this.limitNum
        } 个文件，当前共选择了 ${files.length + fileList.length} 个`
      })
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
     
      this.$message({
        message: '文件上传成功',
        type: 'success'
      })

      this.$refs.uploadExcel.clearFiles()// 清楚上次上传记录
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$message.error(err.msg)
    },

  submitUpload() {
        this.$refs.uploadExcel.submit();
      }
    }
  }
</script>