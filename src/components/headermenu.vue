<template>
  <div class="container">
    <div class="left">
      <router-link to="/">
        <h1 class="logo">
          红星头条
          <i class="iconfont icon-logo1"></i>
        </h1>
      </router-link>
    </div>
    <div class="right">
      <img
        :src="$axios.defaults.baseURL+userinfo.head_img"
        alt
        class="user-header"
        :title="userinfo.nickname"
      />
      <!-- 下拉菜单 -->
      <el-dropdown trigger="click">
        <i class="el-dropdown-link title">
          个人中心
          <i class="el-icon-arrow-down el-icon--right"></i>
        </i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">修改个人资料</el-dropdown-item>
          <el-dropdown-item command="a" @click.native="handlelogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const { user } = JSON.parse(localStorage.getItem("user_info")) || {};
    this.userinfo = user;
    console.log(this.userinfo);
  },
  data() {
    return {
      userinfo: {
        user: {}
      }
    };
  },
  methods: {
    //   退出登录
    handlelogout() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          localStorage.removeItem("user_info");
          this.$router.replace("/login");
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  background-color: #3d444c;

  .left {
    width: 150px;
    .logo {
      text-align: center;
      font-size: 20px;
      color: #fff;
      .icon-logo1 {
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    text-align: center;
    // background-color: #fff;
    .user-header {
      width: 30px;
      height: 30px;
      border-radius: 100%;

      margin-right: 10px;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #fff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
</style>