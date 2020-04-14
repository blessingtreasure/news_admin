<template>
  <div class="container">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      unique-opened
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      border-right="0"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>文章管理</span>
        </template>
        <router-link to="/post-list">
          <el-menu-item index="1-1" :class="$route.path=='/post-list'? 'is-active':'' ">文章列表</el-menu-item>
        </router-link>
        <router-link to="/post-public">
          <el-menu-item index="1-2" :class="$route.path=='/post-public'? 'is-active':'' ">发布文章</el-menu-item>
        </router-link>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang="less">
.el-menu-vertical-demo {
  border: 0;
}
/deep/.el-submenu__title {
  padding: 0 40px;
}
.is-active {
  color: #46a0fc !important;
}
</style>