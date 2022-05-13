<template>
  <div style="background: #f6f8f9; padding-top: 4vh">
    <div class="top">
      <div class="title">图片上传</div>
      <div class="content">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
    </div>
    <div class="btm"><div class="title">上传信息</div></div>
    <div class="btn"><el-button round>确认上传</el-button></div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .top,
  .btm {
    width: 70%;
    height: 35vh;
    background: #ffffff;
    box-shadow: 0px 2px 17px 0px rgba(219, 219, 219, 0.5);
    border-radius: 15px;
    margin: 0 auto;
    .title {
      height: 42px;
      font-size: 22px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 45px;
      border-bottom: 1px solid rgba(221, 221, 221, 1);
      padding-left: 40px;
    }
    .content {
      height: calc(35vh - 45px);
    }
  }
  .top {
    margin-bottom: 5vh;
    .content {
      text-align: center;
      padding-top: 3vh;
    }
  }
  .btm {
    height: 28vh;
  }
  .btn {
    height: 10vh;
    text-align: center;
  }
  ::v-deep {
    .el-upload {
      width: 60%;
    }
    .el-upload-dragger {
      width: 100%;
      border: 3px dashed #d9d9d9;
      background: #f3f3f3;
    }
    .el-upload__tip {
      margin-top: 20px !important;
    }
    .el-button {
      margin-top: 2vh;
      height: 6vh;
      background: #2e71ff;
      border-color: #2e71ff;
      width: 400px;
      color: #fff;
      font-size: 22px;
      border-radius: 40px !important;
    }
  }
</style>
