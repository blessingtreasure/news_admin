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
          :action="$axios.defaults.baseURL + '/upload'"
          :headers="{
                        Authorization: token
                    }"
          :limit="1"
          :on-remove="handleVideoRemove"
          :on-success="handleVideoSuccess"
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
          :action="$axios.defaults.baseURL + '/upload'"
          :headers="{
                        Authorization: token
                    }"
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
    // 视频移除的事件
    handleVideoRemove(file, fileList) {
      this.fileList = fileList;
    },
    // 视频上传成功的事件
    handleVideoSuccess(response, file, fileList) {
      // 视频文章的content只需要一个视频的链接
      this.form.content = response.data.url;
    },
    // 发布文章
    onSubmit() {
      // 处理栏目中的数据
      this.form.categories = this.form.categories.map(item => {
        return {
          id: item
        };
      });
      // 处理封面图片
      this.form.cover = this.fileList.map(item => {
        return {
          id: item.response.data.id
        };
      });
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
        this.$router.replace("/post-list");
      });
    },
    // 移除图片
    handleRemove(file, fileList) {
      // 把当前的图片列表赋值给data
      this.fileList = fileList;
    },
    // 图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片上传
    uploadSuccesss(response, file, fileList) {
      // 把当前的图片列表赋值给data
      this.fileList = fileList;
      console.log(fileList);
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