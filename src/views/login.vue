<template>
  <div class="container">
    <div class="box">
      <img src="../assets/images/login_bg2.png" alt />
    </div>
    <!-- model: 表示声明当前表单的数据对象（这个表单最终的数据存放到data的form对象里面） -->
    <div class="content">
      <el-form :model="form" label-width="80px" class="form" :rules="rules" ref="form">
        <h3>管理员登录界面</h3>
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="login">登录</el-button>
          <el-button class="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单的数据对象
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输正确的手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 11个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  .box {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #3b8aec;
    width: 600px;
    text-align: center;

    img {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 70%;
      height: auto;
    }
  }
  .content {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 600px;

    display: flex;
    justify-self: center;
    align-items: center;
  }
  .form {
    h3 {
      text-align: center;
      margin: 20px 0 20px 60px;
    }
    width: 300px;
    // box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    .el-button--primary,
    .el-button--default {
      margin: 5px 0;
      width: 220px;
    }
  }
}
</style>