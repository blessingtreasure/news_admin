<template>
  <el-container>
    <!-- 头部组件 -->
    <el-header class="header">
      <headermenu></headermenu>
    </el-header>
    <el-container class="main-content">
      <!-- 侧边栏组件 -->
      <el-aside width="200px">
        <asidemenu></asidemenu>
      </el-aside>
      <!-- main内容区 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import headermenu from "@/components/headermenu";
import asidemenu from "@/components/asidemenu";
export default {
  components: {
    headermenu,
    asidemenu
  },
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {

  }
};
</script>

<style scoped lang="less">
.header {
  background-color: #3d444c;
  height: 70px !important;
  line-height: 70px;
}
// 侧边栏
.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;

}

.el-main {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 160px;
}

div#app > .el-container {
  min-width: 1200px;
  height: 100vh;
}
</style>