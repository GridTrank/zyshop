<template>
  <div>
    <el-steps
      :active="active"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="购物车" @click.native="shop"></el-step>
      <el-step title="收货信息"  @click.native="receiving"></el-step>
      <!-- <el-step title="发票信息"  status="process" @click.native="invoice"></el-step> -->
      <el-step
        title="发票信息"
        :status="
          show == '0'
            ? 'wait'
            : active > 2
            ? 'success'
            : active == 2
            ? 'process'
            : 'wait'
        "
        @click.native="invoice"
      ></el-step>
      <el-step title="付款方式"></el-step>
    </el-steps>
    <receiving v-if="active == 1"  ref="receiving" @show="show2" @toNext="toNext"></receiving>
    <invoice v-else-if="active == 2 && show == '1'" ref="invoice" :jue="jue" :address2="address" @plete="plate"></invoice>
    <method v-else-if="active == 3" ref="method"></method>
    <el-card class="box-card">
      <p>总计：￥  {{pic}}</p>
      <el-button @click="next" v-if="active != 3">下一步</el-button><br />
    </el-card>
  </div>
</template>

<script>
import receiving from "./index";
import method from "./method";
import invoice from "./invoice";
export default {
  components: {
    receiving,
    method,
    invoice,
  },
  data() {
    return {
      active: 3,
      show: 0,
      jump: false,
      // 地址信息
      address:{},
      jue:0,
      pla:false,
      pic:''
    };
  },
  mounted() {
    this.pic=this.$route.query.pic
  },
  methods: {
    toNext(val){
      this.active=2
    },
    next() {
      if (this.active == 1) {
        this.$refs.receiving.show();
      }
      if (this.jump == true) {
        if (this.show == 0) {
          this.active = 3;
        } else {
          this.active += 1;
          if (this.active==3) {
            this.$refs.invoice.submitForm()
            if (this.pla==true) {
              
            }else{
              this.active=2
            }
          }
        }
      }
    },
    plate(i){
      if (i==true) {
        this.pla=i
      }
    },
    invoice() {
      if (this.active > 2 &&this.show != '0') {
        this.$refs.method.queryTime()
        this.active = 2;
      }
      
    },
    receiving() {
      if (this.active==3) {
        this.$refs.method.queryTime()
      }
      this.active = 1;
    },
    show2(i, b,a) {
      this.show = i.invoice;
      this.address=i
      this.jump = b;
      this.jue=a
      console.log(i);
    },
    // 前往购物车
    shop() {
      // this.$refs.method.queryTime()
      this.active = 1;
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .is-success {
  cursor: pointer;
}
.box-card {
  width: 300px;
  position: fixed;
  right: 200px;
  top: 150px;
  background: #f9f9f9;
}
</style>