<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 富文本编辑 -->
      <el-form-item label="内容" class="edit" v-if="form.type==1">
        <vue-editor v-model="form.content"></vue-editor>
      </el-form-item>
      <!-- 视频上传 -->
      <el-form-item label="视频" v-if="form.type==2">
        <!-- action：上传链接 -->
        <!-- limit：限制上传文件的数量 -->
        <!-- on-remove：移除文件的事件 -->
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          :on-remove="handleRemove"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传mp4,avi文件，且不超过2m</div>
        </el-upload>
      </el-form-item>
      <!-- 栏目数据 -->
      <el-form-item label="栏目">
        <el-checkbox-group v-model="form.categories">
          <el-checkbox
            v-for="(item,index) in menus"
            :key="index"
            :label="item.id"
            name="type"
          >{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 文件上传 action 可以将请求提交到服务器-->
      <el-form-item label="封面">
        <el-upload
          action="http://127.0.0.1:3000/upload"
          :headers="{Authorization:token}"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="uploadSuccesss"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// vue 富文本编辑器
import { VueEditor } from "vue2-editor";
export default {
  mounted() {
    
    const { token } = JSON.parse(localStorage.getItem("user_info")) || {};
    this.token = token;
    // 获取栏目列表
    this.$axios({
      url: "/category"
    }).then(res => {
      this.menus = res.data.data.splice(1, res.data.data.length);
    });
  },
  components: {
    VueEditor
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      token: "",
      //   表单
      form: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1
      },
      // 栏目列表
      menus: [],
      content: ""
    };
  },
  methods: {
    // 发布文章
    onSubmit() {
      // 验证表单数据
      if (this.form.title.trim() === "") {
        this.$message.warning("标题不能为空");
        return;
      }
      if (this.form.content.trim() === "") {
        this.$message.warning("内容不能为空");
        return;
      }
      if (this.form.categories.length === 0) {
        this.$message.warning("栏目不能为空");
        return;
      }
      if (this.form.cover.length === 0) {
        this.$message.warning("封面不能为空");
        return;
      }
      // console.log(this.form);
      this.$axios({
        url: "/post",
        method: "POST",
        headers: {
          Authorization: this.token
        },
        data: this.form
      }).then(res => {
        console.log(res);

        this.$message({
          message: "恭喜你，文章发布成功！",
          type: "success"
        });
      });
    },
    // 移除图片
    handleRemove(file, fileList) {
      this.form.cover = fileList.map(item => {
        return item.response.data.id;
      });
      // console.log(this.form.cover);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片上传
    uploadSuccesss(response, file, fileList) {
      // 将成功的响应追加到cover数组中
      const id = response.data.id;
      this.form.cover.push(id);
      console.log(response);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.el-form {
  text-align: left;
}
/deep/.edit .el-form-item__content {
  line-height: 0px;
}
</style>