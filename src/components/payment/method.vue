<template>
  <div class="contain">
    <el-container>
      <!-- <el-header>
        <el-menu
          background-color="#D1E8FC"
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index="1" @click="Out">返回</el-menu-item>
        </el-menu>
      </el-header> -->
      <el-main>
        <h3>付款方式</h3>
        <h3>选择付款方式</h3>
        <el-radio-group v-model="radio" @change="handchange">
            <el-radio :label="3">微信支付</el-radio>
            <el-radio :label="6">支付宝支付</el-radio>
            <el-radio :label="9">银联支付</el-radio>
            <el-radio :label="4">对公支付</el-radio>
        </el-radio-group>
        <div v-if="radio==3">
          <div v-if="messageText==''">
            <qriously id='mycanvas' :value="value" :size="size" :backgroundAlpha="backgroundAlpha"/>
          </div>
          <div v-else>
            {{messageText}}
          </div>
        </div>
        <div v-if="radio==4">
          <div>
            <p style="font-weight:700">增值税开票信息</p>
            <p><span>公司名称：</span>北京中云可信科技有限公司</p>
            <p><span>税号：</span>91110108MA01K4CB4Q</p>
            <p><span>地址：</span>北京市海淀区中关村南大街1号北京友谊宾馆64123房间</p>
            <p><span>开户行：</span>招商银行股份有限公司北京世纪城支行</p>
            <p><span>账号：</span>110938941510801</p>
            <p><span>电话：</span>010-51519818</p>
          </div>
          <el-button @click="open">确认支付</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
    data() {
        return {
            radio:"",
            username:null,
            addressData:{},
            time:"",
            // 可以自定义，必填项。
            value: '',
            // 二维码大小 默认 100
            size: 200, 
            // 背景透明度，默认透明 0
            backgroundAlpha: 1,
            serial:"",
            timer:null,
            messageText:"",
            pic:""
        }
    },
    methods:{
        Out() {
            this.$router.go(-1);
        },
        // 添加订单
        queryData(){
          
          this.$axios
          .post(`/Orders/addOrders`,
          {
            userid:this.username.id,
            pictures:this.addressData.id,
            time:this.time
          })
          .then((res) => {
            this.serial=res.data.outTradeNo
          });
        },
        // 查询地址
        dizhi(){
          this.$axios
          .post(`/Picture/findAllPicture?userids=${this.username.id}`)
          .then((res) => {
              this.addressData = res.data[res.data.length - 1];
              console.log(this.addressData);
              this.queryData()
          });
        },
        queryTime(){
          if (this.timer!=null) {
              clearInterval(this.timer)
              this.timer = null
          }
          
        },
        handchange(){
          clearInterval(this.timer)
          this.timer = null
          if (this.radio==3) {
            this.$axios.get(
                `/weixinPay/createNative?userId=${this.username.id}&&totalAmount=${this.pic}&&outTradeNo=${this.serial}`
            ).then(res=>{
              // console.log(res);
              this.value=res.data.data.codeUrl
              this.timer = setInterval(() => {    // 通过定时器每间隔一会去请求查询微信支付状态（具体参数根据项目需要而定）
                    this.handleQueryWxPayStatus();
                }, 1000);
            })
          }
        },
        handleQueryWxPayStatus(){  // 查询微信支付状态
            this.$axios.get(
                `/weixinPay/queryPayStatus?outTradeNo=${this.serial}`
            ).then(res => {
                if(res.data.message == '支付成功'){    // 当查询到支付成功时
                    this.$message({
                        type: 'success',
                        message: '支付成功！'
                    });
                    clearInterval(this.timer)
                    this.timer = null
                    this.$router.push({path:"/PaymentSuss"})
                    // 关闭支付弹窗
                    // 这里可以加个刷新订单列表的接口请求函数的调用
                }
            })
        },
        // 时间
        timestampToTime() {
          var date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
          var D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
          var h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
          var m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
          var s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
          this.time= Y+M+D+h+m+s;
      },
      open() {
        this.$confirm('是否已支付成功?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '支付成功!'
          });
          this.$router.push({path:"/PaymentSuss"})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '请完成支付'
          });          
        });
      }
    },
    mounted() {
      let a = window.localStorage.getItem("username");
      this.username = JSON.parse(a);
      this.pic=this.$route.query.pic
      this.timestampToTime()
      this.dizhi()
      
      // this.queryData()
      
    },
    destroyed() {
        //清除轮询   
        clearInterval(this.timer)
        this.timer = null
    },
}
</script>

<style   lang="less" scoped>
.contain {
  width: 1400px;
  margin: auto;
}
</style>