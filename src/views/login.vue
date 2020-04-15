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
          <el-button class="cancel" @click="onCancel">取消</el-button>
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
        username: "13800138000",
        password: "123"
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
        // 如果条件成立则发送登录请求
        if (valid) {
          this.$axios({
            url: "/login",
            method: "POST",
            data: this.form
          }).then(res => {
            // console.log(res);
            if (res.data.statusCode == 200) {
              // 将登录成功的信息保存到本地
              const { data } = res.data;
              localStorage.setItem("user_info", JSON.stringify(data));
              this.$message({
                message: "登录成功！",
                type: "success"
              });
              // 成功登录跳转首页
              this.$router.replace("/");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onCancel() {
      this.form = "";
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  min-width: 1200px;
  .box {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #3b8aec;
    width: 700px;
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
    width: 500px;
    min-width: 500px;
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