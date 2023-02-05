<template>
  <div>
    <!-- 侧边导航栏 -->username
    <rightNav :username="username"></rightNav>
    <!-- 下面是页面主体 -->
    <div id="components-layout-demo-basic" class="page-wrap" ref="pageWrap">
      <a-layout>
        <!-- 首页头部 -->
        <tabbs @selectBrand="selectBrand"></tabbs>
        <a-layout-content>
          <div class="boxFather">
            <div class="imgB">
              <el-carousel trigger="click" class="carous" >
                <el-carousel-item v-for="item in imgData" :key="item.id" >
                  <!-- <h3 class="small">{{ item }}</h3> -->
                  <img class="banNer" :src="item.path" alt="" />
                </el-carousel-item>
              </el-carousel>
              <!-- <a-carousel effect="fade" autoplay>
                <div>
                  <img class="banNer" src="../assets/banner图/1.jpg" alt="" />
                </div>
                <div>
                  <img class="banNer" src="../assets/banner图/2.jpg" alt="" />
                </div>
              </a-carousel> -->
            </div>
            <a-divider>商品信息</a-divider>
            <div :class="tabdata.length==1?'':'shopLink'">
              <el-row style="display: flex;flex-wrap: wrap;">
                <el-col
                  :span="12"
                  v-for="(item, index) in tabdata"
                  :key="index"
                >
                  <el-card :body-style="{ padding: '20px' }" @click.native="openFor(item.sid)">
                    <div class="conllect" @click.stop="toCollect(item)">
                      <i class="el-icon-star-off" ></i>
                      <span>点击收藏</span>
                    </div>
                    <img
                      :src="item.picture"
                      class="fuwuqiImg"
                    />
                    <div style="padding: 24px">
                      <span class="fang">{{ item.name }}</span>
                      <div class="bottom clearfix">
                        <span>{{ item.introduce==''?'&#12288;':item.introduce==null?'&#12288;':item.introduce }}</span>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
              <!-- <a-card
                v-for="item in tabdata"
                hoverable
                @click="openFor(item.sid)"
              >
                <img
                  slot="cover"
                  alt="example"
                  src="../assets/服务器图片/f1.jpeg"
                  class="fuwuqiImg"
                />
                <a-card-meta :title="item.name">
                  <template slot="description">
                    {{ item.introduce }}
                  </template>
                </a-card-meta>
              </a-card> -->
            </div>
            <br /><br /><br /><br /><br />
            <div></div>
          </div>
        </a-layout-content>
        <a-layout-footer>
          <div class="box1">
            <div class="sun1">
              <div class="imm">
                <img src="../assets/iconP.png" class="icon" />
              </div>
              <span class="sp">&nbsp;&nbsp;&nbsp;采购咨询专线</span><br />
              <span class="sp">&nbsp;&nbsp;&nbsp;13357905372</span>
            </div>
          </div>
          <div class="box2">
            <div class="sun1">
              <div class="imm">
                <img src="../assets/QQQQ.png" class="icon" />
              </div>
              <span class="sp">&nbsp;&nbsp;&nbsp;在线顾问</span><br />
              <span class="sp">&nbsp;&nbsp;&nbsp;需要立即获得帮助?</span>
              <el-link class="link1" :underline="false" style="color: #0085bf"
                >&nbsp;&nbsp;&nbsp;联系我们解决方案专家</el-link
              >
            </div>
            <el-divider direction="vertical" class="divid"></el-divider>
          </div>
          <div class="box3">
            <div class="sun1">
              <div class="imm">
                <img src="../assets/image.png" class="imagge" />
              </div>
              <span class="sp">&nbsp;&nbsp;&nbsp;我有购买意向</span><br />
              <span class="sp">&nbsp;&nbsp;&nbsp;获取专业的咨询及帮助</span>
              <el-link class="link2" :underline="false" style="color: #0085bf"
                >&nbsp;&nbsp;&nbsp;填写项目咨询单</el-link
              >
            </div>
            <el-divider direction="vertical" class="divid"> </el-divider>
          </div>
        </a-layout-footer>
          
          <div class="beian">
            <span><a href="http://beian.miit.gov.cn" target="_blank">京ICP备2022027297号-1</a></span><span class="shuheng"></span><span><a href="http://beian.miit.gov.cn" target="_blank">京ICP备2022027297号-2</a></span>
          </div>
      </a-layout>
    </div>
  </div>
</template>

<script>
import tabbs from "./tabbs.vue";
import rightNav from '@/components/rightNav'
export default {
  name: "VscHome",
  components:{
    tabbs,
    rightNav
  },
  data() {
    return {
      tabdata: "",
      imgData:[],
      username:'',
      showTop:false
    };
  },

  mounted() {
    this.open2();
    this.lunbo()
    this.getList()
    let a=window.localStorage.getItem("username")
    if (a!=null) {
      this.username=JSON.parse(a)
    }
    window.addEventListener('scroll', ()=>{
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
	    if(scrollTop>500){
        this.showTop=true
      }else{
        this.showTop=false
      }
    })
  },

  methods: {
    scrollTop(){
      
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    selectBrand(e){

    },
    toCollect(item){
      console.log(123,item)
      this.$axios.post(
        "/commodity/collect/add",{
          userId:localStorage.getItem('username').id,
          sid:item.sid,
          status:1
        }
      ).then(res=>{
        console.log(123123,res)
      })
    },
    getList(){
      this.$axios.get(
        "/commodity/brand/listMapping",{
          brandId:'',
          pageNum:1,
          pageSize:10
        }
      ).then(res=>{
        console.log(123123,res)
      })
    },
    async open2() {
      const { data: res } = await this.$axios.post(
        "/Commoditys/findAllCommoditys"
      );
      
      this.tabdata = res;
    },
    // 轮播图
    async lunbo() {
      const { data: res } = await this.$axios.post(
        "Uploads/findAllUploads"
      );
      this.imgData = res;
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
    Login() {
      this.username=''
      window.localStorage.removeItem('username')
      this.$router.push("/Login");
    },
  },
};
</script>

<!-- <link rel="stylesheet" href="https://fe.faisys.com/fkService_1_0/css/fk_service.min.css?v=201908151449"> -->
<style lang="less" scoped>
#qywxJpg {
  width: 250px;
}
/deep/.el-row{
  width: 100%;
}
.fang{
  font-weight: 700;
  font-size: 20px;
}
/deep/.el-carousel__container{
  height: 600px;
}
.beian{
  padding:10px 0;
  width: 100%;
  text-align: center;
  background: rgb(128, 128, 128);
}
.shuheng{
  margin: 0 10px;
  color: rgb(128, 128, 128);
  
}
.beian a{
  color: rgb(217, 217, 217);
}
// .beian a:hover{
//   color:red
// }
#components-layout-demo-basic .ant-layout-header {
  height: 60px;
  line-height: 60px;
  background: #fff;
  width: 100%;
  position: absolute;
  top: 0;
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
  margin-left: 260px;
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
.el-card{
  height: 100%;
  position: relative;
}
//侧边导航栏

.conllect{
  position: absolute;
  right: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  i{
    font-size: 20px;
  }
  span:hover{
    color: #409EFF;
  }
}
</style>
