<template>
  <div>
    <el-container>
      <el-header>
        <el-menu background-color="#000" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1" @click="Out">返回</el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="contain">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="paper" label="产品名称"> </el-table-column>
          <el-table-column prop="number" label="快递单号"> </el-table-column>
          <el-table-column prop="logistics" label="物流状态">
            <template slot-scope="scope">
              <div>
                {{
                  scope.row.logistics == null ? "未发货" : scope.row.logistics
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleCopy(scope.$index, scope.row)"
                >复制单号</el-button
              >
              <el-button size="mini" @click="handsele">查询</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script >
export default {
  components: {
    // Name
  },
  data() {
    return {
      tableData: [],
      expands: [],
      expands2: [],
      uuid: null,
      username: null,
      typeID: "zid",
    };
  },

  methods: {
    Out() {
      this.$router.push("/");
    },
    // 复制
    handleCopy(index, row) {
      this.copyData = row.number;
      this.copy(this.copyData);
    },
    copy(data) {
      let url = data;
      let oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        message: "复制成功",
        type: "success",
      });
      oInput.remove();
    },
    // 跳转
    handsele() {
      window.open("https://www.aikuaidi.cn/");
    },
    cha() {
      this.$axios
        .post(`/Orders/findOneOrders?userid=${this.username.id}`)
        .then((res) => {
          this.tableData = [];
          res.data.forEach((item) => {
            if (item.username != null && item.paper != null) {
              this.tableData.push(item);
            }
            // item.configuration = JSON.parse(item.configurations);
          });
        });
    },
  },
  mounted() {
    let a = window.localStorage.getItem("username");
    this.username = JSON.parse(a);
    this.cha();
  },
};
</script>

<style lang="less" scoped>
.contain {
  width: 1400px;
  margin: auto;
}
.el-header{
    padding: 0;
}
/deep/.el-table__expand-icon {
  visibility: hidden;
}
.box-card {
  width: 260px;
  position: fixed;
  right: 20px;
  top: 126px;
  background: #f9f9f9;
}
.text {
  font-weight: 700;
  font-size: 20px;
}
.el-menu--horizontal > .el-menu-item {
  color: #fff;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: #fff;
}
</style>