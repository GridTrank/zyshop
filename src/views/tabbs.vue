<template>
  <div>
    <!-- 下面是页面主体 -->
    <div id="components-layout-demo-basic">
      <a-layout>
        <!-- 首页头部 -->
        <a-layout-header>
          <div class="boxOne heder">
            <el-menu mode="horizontal">
            <el-submenu index="2" v-if="$route.path=='/'">
              <template slot="title">产品选择</template>
              <el-menu-item
                v-for="(item, index) in messageAllclass"
                :key="index"
                :index="2 + '-' + (index + 1)"
                @click="openFor(item.sid)"
                >{{ item.name }}</el-menu-item
              >
            </el-submenu>
        </el-menu>
            <div class="child1">
              <a-input-search
                placeholder="请输入内容"
                style="width: 200px"
                @search="onSearch"
              />
            </div>
            <div class="child2">
              <!-- <div class="gouwuIcon">
                <img src="../assets/客服.png" alt="" class="bannIcon" />
                <span href="#" class="lianXi">&nbsp;&nbsp;联系我们</span>
              </div> -->
              <div class="gouwuIcon" @click="shopp()" v-if="$route.path!='/ShoppingCart'">
                <img src="../assets/3.1购物车.png" alt="" class="bannIcon" />
                <span href="#" class="gouWu" >&nbsp;&nbsp;购物车</span>
              </div>
              <div class="dengluIcon">
                <div  v-if="username==''">
                    <img src="../assets/登录.png" class="bannIcon" />
                    <a @click="Login()" href="#" class="dengLu">&nbsp;&nbsp;登录</a>
                </div>
                <el-dropdown v-else>
                  <span class="el-dropdown-link">
                    <img src="../assets/登录.png" class="bannIcon" />
                    <span>{{username.nickname}}</span>
                    <i class="el-icon-arrow-down el-icon--right" ></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item ><p @click="Login()">退出登录</p></el-dropdown-item>
                    <el-dropdown-item ><p @click="toUser">个人中心</p></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </a-layout-header>
      </a-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: "VscHome",

  data() {
    return {
      tabdata: "",
      imgData:[
      ],
      messageAllclass:[],
      username:''
    };
  },

  mounted() {
    this.open2();
    let a=window.localStorage.getItem("username")
    if (a!=null) {
      this.username=JSON.parse(a)
    }
    this.findallclass()
  },

  methods: {
    async open2() {
      const { data: res } = await this.$axios.post(
        "/Commoditys/findAllCommoditys"
      );
      this.tabdata = res;
    },
    toUser(){
      this.$router.push({path:"/User/info"})
    },
    // 跳转购物车
    shopp(){
      this.$router.push({path:"/ShoppingCart"})
    },
    //搜索框
    onSearch(value) {
      console.log(value);
    },
    openFor(id) {
      this.$router.push({ path: "/2488Hv6", query: { id } });
    },
    //第一级
    async findallclass() {
      await this.$axios.get("/classificationtable/findAll").then((res) => {
        this.messageAllclass = res.data;
      });
    },
    Login() {
      console.log(this.$route);
      window.localStorage.setItem('path_tiao',this.$route.path)
      // console.log(window.sessionStorage.getItem("path_tiao"));
      this.username=''
      window.localStorage.removeItem('username')
      window.localStorage.removeItem('token')
      this.$router.push("/Login");
    },
  },
};
</script>

<!-- <link rel="stylesheet" href="https://fe.faisys.com/fkService_1_0/css/fk_service.min.css?v=201908151449"> -->
<style lang="less" scoped>
.heder .el-menu{
  float: left;
  margin-left: 100px;
}
/deep/.heder .el-submenu__title{
  height: 3.125vw;
  line-height: 3.125vw;
}
#qywxJpg {
  width: 250px;
}
/deep/.el-dropdown{
  cursor: pointer
}

#components-layout-demo-basic .ant-layout-header {
  height: 60px;
  line-height: 60px;
  background: #fff;
  width: 100%;
  position: absolute;
  top: 0;
  padding:10px 0;
  text-align: center;
}
#components-layout-demo-basic .ant-layout-footer {
  height: 120px;
  width: 100%;
  // position: absolute;
  bottom: 0;
  display: flex;
  background-color: #f6f6f6;
  flex-direction: row;
}
#components-layout-demo-basic .ant-layout-content {
  margin-top: 60px;
  width: 100%;
  overflow: auto;
  top: 60px;
  text-align: center;
  height: 100%;
}
//首页导航栏icon图标
.bannIcon {
  width: 24px;
  height: 23px;
  margin-top: -4px;
}
.box1 {
  height: 100%;
  width: 33.3%;
  position: relative;
}
.sun1 {
  width: 270px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 23px;
}
.box2 {
  height: 100%;
  width: 33.3%;
  position: relative;
}
.box3 {
  height: 100%;
  width: 33.3%;
  position: relative;
}
.icon {
  margin-top: 1px;
  width: 25px;
  height: 25px;
  float: left;
}
.divid {
  height: 75%;
  margin-top: 10px;
}
.imm {
  height: 50px;
  float: left;
}
.imagge {
  margin-top: 6px;
  height: 29px;
  width: 40px;
  border-radius: 120%;
}
.sp {
  font-size: 11px;
}
.sp2 {
  font-size: 16px;
}
//搜索框
.child1 {
  float: left;
  margin-left: 100px;
}
.child2 {
  margin-right: 200px;
  overflow: hidden;
  display: flex;
  float: right;
}
.link1 {
  margin-left: 20px;
}
.link2 {
  margin-left: 36px;
}
//走马灯轮播图
.banNer {
  width: 100%;
  height: 600px;
}
.boxFather {
  height: 100%;
}
.imgB {
  height: 620px;
}
//顶部导航栏盒子
.gouwuIcon {
  margin-left: 25px;
  cursor: pointer
}
.dengluIcon {
  padding-left: 25px;
}
//三个链接
.lianXi {
  color: black;
}
.gouWu {
  color: black;
}
.dengLu {
  color: black;
}
//商品展示链接
.shopLink {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}
//服务器图片
.fuwuqiImg {
  height: 400px;
  width: 400px;
}

//侧边导航栏

.fk_service {
  max-height: 232px;
  position: fixed;
  right: 2px;
  top: 50.2%;
  /* 垂直位置 */
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  color: #243558;
  z-index: 10000;
}
.fk_service ul {
  margin: 0;
  padding: 0;
  position: absolute;
  right: 0;
}
.fk_service li {
  list-style-type: none;
}
.fk_service li > div {
  box-sizing: border-box;
  box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.1);
}
.fk_service_box {
  width: 40px;
  height: 40px;
  background: #fff;
  margin-bottom: 10px;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.1);
}
.fk_service_triangle {
  top: 12px;
  right: -11px;
  position: absolute;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 11px solid #e1e6ec;
  z-index: 1010;
}
.fk_service_triangle:after {
  content: "\20";
  top: -6px;
  right: 1px;
  position: absolute;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 10px solid #fff;
  z-index: 1000;
}
.fk_service_triangle:before {
  content: "\20";
  width: 80px;
  height: 45px;
  top: -20px;
  right: -52px;
  position: absolute;
  background: rgba(0, 0, 0, 0);
}
@keyframes fade-in {
  0% {
    opacity: 0.4;
    right: 82px;
  }
  100% {
    opacity: 1;
    right: 62px;
  }
}
.fk_service_consult {
  background: url("../assets/QQQQ.png") no-repeat #fff center center;
  background-size: 70% 70%;
  z-index: 1;
}
// .fk_service_consult:hover {
//   border: 0;
//   background: url(../assets/客服.png) no-repeat -410px -16px #4f7cfc;
//   background-size: 40%40%;
// }
.fk_service_consult:hover .fk_service_consult_cont {
  display: block;
  opacity: 1;

  transition: linear 0.2s;
  animation-name: fade-in;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0s;
}
.fk_service_consult_cont {
  width: 200px;
  min-height: 210px;
  max-height: 268px;
  border-radius: 3px;
  background: #fff;
  right: 62px;
  position: absolute;
  text-align: center;
  border: 1px solid #e1e6ec;
  display: none;
  opacity: 0;
}
.fk_service_consult_cont1 {
  width: 70px;
  height: 40px;
  line-height: 40px;
  background: #fff;
  border-radius: 5px;
  right: 62px;
  text-align: center;
  position: absolute;
  display: none;
  border: 1px solid #e1e6ec;
}
.fk_service_consult_cont1 .fk_service_triangle:before {
  width: 0 !important;
}
.fk_service_consult_cont > .fk_service_triangle:after {
  border-left: 10px solid #f6f8fb !important;
}
.fk_service_consult_cont span {
  float: left;
}
.fk_service_consult_cont_top {
  width: 100%;
  height: 100%;
  background: #f6f8fb;
  border-radius: 3px;
  border-bottom: 1px solid #eef2f8;
}
.fk_service_hint {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  color: #9aa8c2;
  text-align: center;
}
.fk_service_hint > .fk_service_icon {
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20190827-5d652476ab305.png)
    no-repeat -460px -25px;
  width: 15px;
  height: 15px;
  margin: 13px 2px 0 18px;
}
.fk_service_button {
  width: 160px;
  height: 38px;
  line-height: 38px;
  background: #4f7cfc;
  border-radius: 18px;
  text-align: center;
  color: #fff;
  margin: 5px 0 10px 20px;
  cursor: pointer;
}
// .fk_service_button:hover {
//   background: #618aff;
// }
.fk_service_phone {
  width: 100%;
  height: 53px;
  line-height: 53px;
  font-size: 14px;
  text-align: center;
}
.fk_service_check_site {
  width: 100%;
  height: 48px;
  line-height: 48px;
  color: #3b6bf4;
  border-top: 1px solid #eaeef5;
  cursor: pointer;
}
.fk_service_check_site > .fk_service_icon {
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20190827-5d652476ab305.png)
    no-repeat -461px -75px;
  width: 20px;
  height: 20px;
  margin: 15px 2px 0 45px;
}
.fk_service_feedback {
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20190827-5d652476ab305.png)
    no-repeat -363px -64px #fff;
}
.fk_service_feedback:hover {
  border: 0;
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20190827-5d652476ab305.png)
    no-repeat -407px -64px #4f7cfc;
  cursor: pointer;
}
.fk_service_feedback:hover .fk_service_feedback_cont {
  display: block;
  opacity: 1;
  transition: linear 0.2s;
  animation-name: fade-in;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0s;
}
.fk_service_feedback_cont {
  width: 264px;
  height: 40px;
  line-height: 40px;
  background: #fff;
  border-radius: 5px;
  right: 62px;
  text-align: center;
  position: absolute;
  display: none;
  border: 1px solid #e1e6ec;
}
.fk_service_qr {
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20190827-5d652476ab305.png)
    no-repeat -365px -113px #fff;
}
.fk_service_qr:hover {
  border: 0;
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20190827-5d652476ab305.png)
    no-repeat -409px -113px #4f7cfc;
}
.fk_service_qr:hover .fk_service_qr_cont {
  display: block;
  opacity: 1;
  transition: linear 0.2s;
  animation-name: fade-in;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0s;
}
.fk_service_qr_cont {
  width: 143px;
  height: 202px;
  border-radius: 3px;
  background: #fff;
  right: 62px;
  position: absolute;
  text-align: center;
  border: 1px solid #e1e6ec;
  background-color: #f6f8fb;
  display: none;
  opacity: 0;
}
.fk_service_qr_cont > .fk_service_triangle:after {
  border-left: 10px solid #f6f8fb !important;
}
.fk_service_qr_cont > .fk_service_qrimg {
  width: 100%;
  height: 164px;
  float: left;
}
.fk_service_qrimg_site {
  width: 119px;
  height: 119px;
  float: left;
  margin: 12px 12px 5px 12px;
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20190827-5d652476ab305.png)
    no-repeat -41px -26px;
}
.fk_service_qrimg_hd {
  width: 119px;
  height: 119px;
  float: left;
  margin: 12px 12px 5px 12px;
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20190827-5d652476ab305.png)
    no-repeat -198px -26px;
}
.fk_service_qrimg_wxast {
  width: 119px;
  height: 119px;
  float: left;
  margin: 12px 12px 5px 12px;
  //报错
  // background: url(../image/fk_service.png?v=201905151200) no-repeat -198px -328px;
}
.fk_service_qrimg_flyer {
  width: 119px;
  height: 119px;
  float: left;
  margin: 12px 12px 5px 12px;
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20190827-5d652476ab305.png)
    no-repeat -41px -177px;
}
.fk_service_qrimg_wxapp {
  width: 119px;
  height: 119px;
  float: left;
  margin: 12px 12px 5px 12px;
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20190827-5d652476ab305.png)
    no-repeat -198px -177px;
}
.fk_service_qrimg_fkmall {
  width: 119px;
  height: 119px;
  float: left;
  margin: 12px 12px 5px 12px;
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20190827-5d652476ab305.png)
    no-repeat -41px -326px;
}
.fk_service_qr_cont > .fk_service_qrtext {
  width: 100%;
  height: 35px;
  font-size: 12px;
  color: #7b89a6;
  background-color: #fff;
  float: left;
  bottom: 0;
  display: table;
}
.fk_service_qr_cont > .fk_service_qrtext > span {
  display: table-cell;
  vertical-align: middle;
}
.fk_service_upward {
  display: none;
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20190827-5d652476ab305.png)
    no-repeat -363px -159px #fff;
}
.fk_service_upward:hover {
  border: 0;
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20190827-5d652476ab305.png)
    no-repeat -407px -159px #4f7cfc;
  cursor: pointer;
}
.fk_service_upward:hover .fk_service_upward_cont {
  display: block;
  opacity: 1;
  transition: linear 0.2s;
  animation-name: fade-in;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0s;
}
.fk_service_upward_cont {
  width: 84px;
  height: 40px;
  line-height: 40px;
  border-radius: 3px;
  background: #fff;
  right: 62px;
  position: absolute;
  text-align: center;
  border: 1px solid #e1e6ec;
  display: none;
  opacity: 0;
}
.fk_service_upward_cont span {
  font-size: 14px;
}
/* ----------------------------------------------------------------------- */
/* 新增图标->zmki 开始*/
.fk_service_jk {
  /* 前景图标 */
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20191218-c9feba3074fcf.png)
    no-repeat center center #fff;
  background-size: 40%40%;
}
.fk_service_jk:hover {
  border: 0;
  /* 鼠标悬浮图标 */
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20191218-9e8acd5341cdc.png)
    no-repeat center center #4f7cfc;
  background-size: 40%40%;
  cursor: pointer;
}
.fk_service_jk:hover .fk_service_jk_cont {
  display: block;
  opacity: 1;
  transition: linear 0.2s;
  animation-name: fade-in;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0s;
}
.fk_service_jk_cont {
  width: 264px;
  height: 40px;
  line-height: 40px;
  background: #fff;
  border-radius: 5px;
  right: 62px;
  text-align: center;
  position: absolute;
  display: none;
  border: 1px solid #e1e6ec;
}
/* 新增图标->zmki 结束*/
/* 新增图标->zmki 开始*/
.fk_service_ws {
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20191218-61b4baac98ee7.png)
    no-repeat center center #fff;
  background-size: 50%50%;
}
.fk_service_ws:hover {
  border: 0;
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20191218-8ded04c01bb3c.png)
    no-repeat center center #4f7cfc;
  background-size: 50%50%;
  cursor: pointer;
}
.fk_service_ws:hover .fk_service_ws_cont {
  display: block;
  opacity: 1;
  transition: linear 0.2s;
  animation-name: fade-in;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0s;
}
.fk_service_ws_cont {
  width: 264px;
  height: 40px;
  line-height: 40px;
  background: #fff;
  border-radius: 5px;
  right: 62px;
  text-align: center;
  position: absolute;
  display: none;
  border: 1px solid #e1e6ec;
}
/* 新增图标->zmki 结束*/
/* 闪电 新增图标->zmki 开始*/
.fk_service_sd {
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20191218-94664bd399372.png)
    no-repeat center center #fff;
  background-size: 50%50%;
}
.fk_service_sd:hover {
  border: 0;
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20191218-fab840acee28b.png)
    no-repeat center center #4f7cfc;
  background-size: 50%50%;
  cursor: pointer;
}
.fk_service_sd:hover .fk_service_sd_cont {
  display: block;
  opacity: 1;
  transition: linear 0.2s;
  animation-name: fade-in;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0s;
}
.fk_service_sd_cont {
  width: 264px;
  height: 40px;
  line-height: 40px;
  background: #fff;
  border-radius: 5px;
  right: 62px;
  text-align: center;
  position: absolute;
  display: none;
  border: 1px solid #e1e6ec;
}
// 订单图标
.fk_service_ax2 {
  background: url(https://tse2-mm.cn.bing.net/th/id/OIP-C.ROK1e0ZN6iaAk0KVHySZawD6D6?w=161&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7)
    no-repeat center center #fff;
  background-size: 40%40%;
}
.fk_service_ax2:hover {
  border: 0;
  background: url(https://tse2-mm.cn.bing.net/th/id/OIP-C.ROK1e0ZN6iaAk0KVHySZawD6D6?w=161&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7)
    no-repeat center center #4f7cfc;
  background-size: 40%40%;
  cursor: pointer;
}
.fk_service_ax2:hover .fk_service_ax_cont2 {
  display: block;
  opacity: 1;
  transition: linear 0.2s;
  animation-name: fade-in;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0s;
}
.fk_service_ax_cont2 {
  width: 264px;
  height: 40px;
  line-height: 40px;
  background: #fff;
  border-radius: 5px;
  right: 62px;
  text-align: center;
  position: absolute;
  display: none;
  border: 1px solid #e1e6ec;
}
/*闪电 新增图标->zmki 结束*/
/* 导航 新增图标->zmki 开始*/
.fk_service_dh {
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20191218-711bcdc875f32.png)
    no-repeat center center #fff;
  background-size: 60%60%;
}
.fk_service_dh:hover {
  border: 0;
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20191218-8d9cf4c72a239.png)
    no-repeat center center #4f7cfc;
  background-size: 60%60%;
  cursor: pointer;
}
.fk_service_dh:hover .fk_service_dh_cont {
  display: block;
  opacity: 1;
  transition: linear 0.2s;
  animation-name: fade-in;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0s;
}
.fk_service_dh_cont {
  width: 264px;
  height: 40px;
  line-height: 40px;
  background: #fff;
  border-radius: 5px;
  right: 62px;
  text-align: center;
  position: absolute;
  display: none;
  border: 1px solid #e1e6ec;
}
/*导航 新增图标->zmki 结束*/
/* 爱心 新增图标->zmki 开始*/
.fk_service_ax {
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20191218-bf1792e790a39.png)
    no-repeat center center #fff;
  background-size: 40%40%;
}
.fk_service_ax:hover {
  border: 0;
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20191218-f379809ce7aef.png)
    no-repeat center center #4f7cfc;
  background-size: 40%40%;
  cursor: pointer;
}
.fk_service_ax:hover .fk_service_ax_cont {
  display: block;
  opacity: 1;
  transition: linear 0.2s;
  animation-name: fade-in;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0s;
}
.fk_service_ax_cont {
  width: 264px;
  height: 40px;
  line-height: 40px;
  background: #fff;
  border-radius: 5px;
  right: 62px;
  text-align: center;
  position: absolute;
  display: none;
  border: 1px solid #e1e6ec;
}
/*爱心 新增图标->zmki 结束*/
/* 点赞 新增图标->zmki 开始*/
.fk_service_dz {
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20191218-3d077e8df0bf0.png)
    no-repeat center center #fff;
  background-size: 50%50%;
}
.fk_service_dz:hover {
  border: 0;
  background: url(https://www.zmki.cn/wp-content/uploads/2019/20191218-986a9393f3e9e.png)
    no-repeat center center #4f7cfc;
  background-size: 50%50%;
  cursor: pointer;
}
.fk_service_dz:hover .fk_service_dz_cont {
  display: block;
  opacity: 1;
  transition: linear 0.2s;
  animation-name: fade-in;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-delay: 0s;
}
.fk_service_dz_cont {
  width: 264px;
  height: 40px;
  line-height: 40px;
  background: #fff;
  border-radius: 5px;
  right: 62px;
  text-align: center;
  position: absolute;
  display: none;
  border: 1px solid #e1e6ec;
}
</style>
