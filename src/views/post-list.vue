<template>
  <div class="container">
    <el-table :data="tableData" style="width: 100%" class="table">
      <el-table-column prop="num" label="序号" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{(scope.$index)+1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="560">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type=="1" ?'文章':'视频' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="show" label="显示/隐藏" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.open=="1" ?'显示':'' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->

    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next,jumper,total"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const { token, user } = JSON.parse(localStorage.getItem("user_info")) || {};
    this.token = token;
    this.getList();
  },
  data() {
    return {
      token: "",
      postlist: [],
      pageIndex: 1,
      pageSize: 5,
      tableData: [],
      total: 0
    };
  },
  methods: {
    //   编辑处理
    handleEdit(index, row) {
      // 路由跳转，到文章编辑页面
      this.$router.push({
        path: "/post-edit",
        query: {
          id: row.id
        }
      });
    },
    // 删除文章
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios({
          url: `/post_update/${id}`,
          method: "POST",
          headers: {
            Authorization: this.token
          },
          data: {
            open: 0
          }
        })
          .then(res => {
            this.getList();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(err => {});
      });
    },
    // 修改每页的条数据
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
      console.log(`每页 ${val} 条`);
    },
    // 获取当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.getList();
    },
    // 获取文章列表
    getList() {
      this.$axios({
        url: "/post",
        method: "get",
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          category: 999 // 这个是固定，因为头条栏目会返回所有的文章
        }
      })
        .then(res => {
          const { data, total } = res.data;
          this.postlist = data;
          this.tableData = data;
          //   将列表的长度保存给total
          this.total = total;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.el-table th {
  background-color: #e9ecf0;
}
/deep/.has-gutter {
  line-height: 0;
}
.block {
  text-align: left;
  margin: 20px 0;
}
/deep/ .el-pager {
  line-height: 0;
}
</style>