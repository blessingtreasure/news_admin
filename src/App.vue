<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
//导入icontfont图标
@import "//at.alicdn.com/t/font_1719542_6mtfmeb2aea.css";
//公共样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
[v-cloak] {
  display: none;
}
a {
  color: inherit;
  width: inherit;
  text-decoration: none;
  font-size: inherit;
}

a:hover {
  color: inherit;
}
li,
ol {
  list-style: none;
}
i,
em {
  font-style: normal;
}
img {
  vertical-align: middle;
  width: inherit;
}
</style>
