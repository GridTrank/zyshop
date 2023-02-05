<template>
  <div>
    <el-container>
      <tabbs class="tabbs"></tabbs>
      <el-header>
        <el-menu
          background-color="#000"
          class="el-menu-demo"
          mode="horizontal"
          @select="open"
        >
          <el-menu-item index="1" @click="Out">返回</el-menu-item>
        </el-menu>
      </el-header>
      <el-main  class="contain">
        <el-table
          :row-key='typeID'
          :expand-row-keys="expands"
          :data="tableData"
          style="width: 100%"
          :height="tableData.length>5?650:''"
          border
        >
          <el-table-column type="expand" align="right">
            <template slot-scope="props">
              <div v-for="item in props.row.configuration" :key="username==null?item.id:item.zid" >
                <p style="font-weight:700">{{ item.classification }}</p>
                <p
                  style="margin-left: 10px"
                  v-for="i in item.alltableings"
                  :key="i.xid"
                >
                  {{ i.choose }}
                  <span style="margin-left: 10px">数量：{{i.number}}</span>
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商品">
            <template slot-scope="scope">
              <img style="width: 100px" :src="scope.row.url" alt="" srcset="" />
              <div style="display: inline-block">
                <p>{{ scope.row.name }}</p>
                <el-button
                  class="table_button"
                  size="mini"
                  type="text"
                  @click="expandRow(scope.row)"
                  ><i
                    :class="`${
                      username==null?scope.row.id != expands[0]
                        ? 'el-icon-caret-right'
                        : 'el-icon-caret-bottom':scope.row.zid != expands[0]
                        ? 'el-icon-caret-right'
                        : 'el-icon-caret-bottom'
                    } 'el-icon--right'`"
                  />产品详情</el-button
                ><br />
              </div>
              <!-- <el-button
                                class="table_button"
                                size="mini"
                                type="text"
                                @click="expandRow2(scope.row)"
                                ><i :class="`${!expands2.length ? 'el-icon-caret-right' : 'el-icon-caret-bottom'} 'el-icon--right'`" />优惠详情</el-button> -->
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="totalquantity">
            <template slot-scope="scope">
              <el-input-number
                @change="modify(scope.row)"
                :min="1"
                v-model="scope.row.totalquantity"
              ></el-input-number
              ><br />
              <el-button type="text" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column label="价格" prop="totalprice">
            <template slot-scope="scope">
              <div>
                <span class="text">￥  {{discountprice(scope.row.totalprice)}}</span>
                <p class="zhe" >￥  {{scope.row.totalprice}}</p>

              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <!-- 价格窗口 -->
    <el-card class="box-card" style="  top: 120px;">
      <p class="text">总计  </p>
      <p class="text" >￥ {{discountprice(getTotal)}}</p>
      <p class="zhe">￥ {{getTotal}}</p>
      <!-- <p>批量购买有优惠</p> -->
      <p @click="dialogVisible = true" style="color:#409EFF;cursor: pointer">批量购买有优惠</p
      ><br />
      <el-button @click="payment" style="margin-top: 10px">去结算</el-button
      ><br />
      <!-- <el-button style="margin-top: 10px">去支付</el-button><br /> -->
      <el-button @click="shopp" style="margin-top: 10px">继续购物</el-button>
    </el-card>
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%">
  <span>请添加下方微信咨询优惠详情</span><br/>
  <img style="width:50%" id="qywxJpg" src="../../assets/微信联系/企业微信.jpg" alt="" />
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script >
import { openUriWithTimeoutHack } from "@/utils/utils.js";
import tabbs from '../../views/tabbs.vue'

export default {
  components: {
    // Name
    tabbs
  },
  data() {
    return {
      tableData: [],
      expands: [],
      expands2: [],
      uuid:null,
      username:null,
      typeID:"zid",
      dialogVisible:false
    };
  },
  computed: {
    getTotal() {
      let total = 0;
      for (let index = 0; index < this.tableData.length; index++) {
        const item = this.tableData[index];
        total += item.totalprice
        // total += item.totalprice * item.totalquantity;
      }
      return parseFloat((total).toFixed(2)) 
    },
    getTotal2() {
      let total = 0;
      for (let index = 0; index < this.tableData.length; index++) {
        const item = this.tableData[index];
        total += item.discountprice * item.totalquantity;
      }
      return parseFloat((total).toFixed(2)) 
    },
    
  },
  methods: {
    open(i) {
    },
    discountprice(value){
      let total = value
      if (this.username==null) {
        return total
      }
      if (typeof(this.username.discount)=='undefined') {
        return total
      }
      let num=this.percentToValue(this.username.discount)
      total=this.accMul(total,num)
      console.log(12312313,total);
      return parseFloat((total).toFixed(2)) 
    },
    accMul(arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {}
      try {
        m += s2.split(".")[1].length;
      } catch (e) {}
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    percentToValue(value) {
      if (value.indexOf("%")>0) {
        var str=value.replace("%","");
          str= str/100;
        return str;
      }
        return value
    },
    Out() {
      this.$router.back();
    },
    expandRow(row) {
      let index=null
      if(this.expands.length>0){
        index=this.expands.findIndex(el=>{
          return row.zid==el
        })
      }
      
      if (this.expands.indexOf(row.zid) == -1) {
          this.expands.push(row.zid);
      }else{
        this.expands.splice(index,1)
      }
      return
      if (this.username!=null) {
        if (this.expands.indexOf(row.zid) < 0) {
          this.expands = [];
          this.expands.push(row.zid);
        } else {
          this.expands = [];
        }
        return
      }
      if (this.expands.indexOf(row.id) < 0) {
          this.expands = [];
          
        } else {
          this.expands = [];
        }
    },
    expandRow2(row) {
        if (this.expands2.indexOf(row.zid) < 0) {
          this.expands2 = [];
          this.expands2.push(row.zid);
        } else {
          this.expands2 = [];
        }
    },
    // 修改
    modify(row) {
      let data = row;
      delete data.configuration;
      if (this.username!=null) {
        this.$axios
        .put(`/Zcart/updateZcart`, {
          ...data,
        })
        .then((res) => {
          // this.$message({
          //   type: "success",
          //   message: "修改成功!",
          // });
          this.shoppCha();
        });
      }else if (this.uuid!=null){
        this.$axios
        .put(`/ShoppingCart/updateShoppingCart`, {
          ...data,
        })
        .then((res) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.shoppCha();
        });
      }
      
    },
    // 删除
    del(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.username!=null) {
            this.$axios
            .delete(`/Zcart/deleteZcart?zid=${row.zid}`)
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.shoppCha();
            });
          }else if (this.uuid!=null){
            this.$axios
            .delete(`/ShoppingCart/deleteShoppingCart?id=${row.id}`)
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.shoppCha();
            });
          }
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 去企业微信
    tiao() {
      let ip = window.location.host + "/";
      openUriWithTimeoutHack(
        "NetVideoPlant:Command[" + 1 + "]",
        (e) => {
          this.$confirm("请下载 企业微信.pc端", "提示", {
            confirmButtonText: "下载",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              window.open(
                "http://" +
                  ip +
                  "wxwork://message?uin=1688850522843493&source=100"
              );
            })
            .catch(() => {
            });
        },
        (ex) => {
        }
      );
    },
    // 去详情页面
    shopp() {
      this.$router.push({ path: "/" });
    },
    // 查询
    async shoppCha() {
      if (this.username!=null) {
        await this.$axios
        .post(`/Zcart/findAllZcart?duserid=${this.username.id}`)
        .then((res) => {
          this.tableData = res.data;
          this.tableData.forEach((item) => {
            item.configuration = JSON.parse(item.configurations);
          });
        });
        return
      }else if (this.uuid!=null) {
        await this.$axios
        .post( `/ShoppingCart/findAllShoppingCart?uuid=${this.uuid}`)
        .then((res) => {
          this.tableData = res.data;
          this.tableData.forEach((item) => {
            item.configuration = JSON.parse(item.configurations);
          });
        });
      }
      
    },
    // 去支付页面
    payment() {
      let a = window.localStorage.getItem("username");
      if (a==null) {
        this.$message.error("请登录后完成后续操作！")
        return
      }
      if (this.tableData.length==0) {
        this.$message.error("未选购商品！")
        return
      }
      this.$router.push({ path: "/payment",query:{pic:this.discountprice(this.getTotal)} });
    },
  },
  mounted() {
    let a = window.localStorage.getItem("username");
    this.username=JSON.parse(a)
    this.uuid = window.localStorage.getItem("uuid");
    if (this.username==null) {
      this.typeID='id'
    }
    this.shoppCha();
  },
};
</script>

<style lang="less" scoped>
.contain {
  width: 1300px;
  margin-left: 12%;
}
.zhe{
  text-decoration:line-through;
  font-weight:400;
  word-wrap: break-word;
	word-break: break-all;
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
  background: #f9f9f9;
}
.text {
  font-weight: 700;
  font-size: 20px;
}
.el-menu--horizontal>.el-menu-item{
  color: #fff;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{
  color: #fff;
}
/deep/.el-menu--horizontal>.el-submenu .el-submenu__title{
  color: #fff;
}
.el-menu--horizontal>.el-submenu:focus .el-submenu__title, .el-menu--horizontal>.el-submenu:hover .el-submenu__title{
  color: #fff;
}
.el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title{
  color: #fff;
}
.tabbs {
  height: 66px;
}
</style>