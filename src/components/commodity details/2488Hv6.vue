<template>
  <el-container>
    <tabbs class="tabbs"></tabbs>
    <el-header>
      <el-menu
        background-color="#000"
        class="el-menu-demo"
        mode="horizontal"
        @select="open"
      >
        <el-menu-item index="1" @click="Out">返回首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">产品选择</template>
          <el-menu-item
            v-for="(item, index) in messageAllclass"
            :key="index"
            :index="2 + '-' + (index + 1)"
            @click="typeDate(item.sid)"
            >{{ item.name }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
      <div class="line"></div>
    </el-header>
    <!-- 右侧固定栏 -->
    <rightNav></rightNav>
    
    <!-- 详细信息 -->
    <div>
      <el-main>
        <!-- 简略信息 -->
      </el-main>
    </div>
    <!-- 配置选项 -->
    <el-divider>
      <h3 class="el-icon-sold-out">详细配置选择</h3>
    </el-divider>
    <div id="all">
      <div id="content">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-checkbox-group v-model="checkList" @change="compatibilityChange">
            <el-collapse-item
              id="title"
              v-for="(item, index) in messageAll"
              :key="item.id"
              :title="item.classification"
              :name="index + 1"
            >
              <div v-for="v in item.alltableings" :key="v.fid" class="detailed">
                <el-row :gutter="20" v-show="showshow(v.xid)">
                  <el-col :span="3">
                    <p class="deta">{{ v.details }}&nbsp;</p>
                  </el-col>
                  <el-col :span="10">
                    <el-checkbox :label="v.xid" :disabled="v.suibian == 1"
                      ><p class="deta" style="font-size: 10.5px">
                        {{ v.choose }}
                      </p></el-checkbox
                    >
                  </el-col>
                  <el-col :span="5">
                    <div style="padding-left: 10px" v-if="v.judge">
                      数量:
                      <el-input-number
                        :step="v.astrict"
                        size="mini"
                        :min="v.min"
                        :max="v.max"
                        @change="handChange()"
                        v-model="v.number"
                      ></el-input-number>
                    </div>
                    &nbsp;
                  </el-col>
                  <el-col :span="6">
                    <p class="font">
                      价格:
                      <span style="font-weight: 700"
                        >￥ {{ v.price }}
                        <span style="float: right">{{
                          v.cd == 1 ? "包含在价格内" : ""
                        }}</span>
                      </span>
                    </p>
                  </el-col>
                </el-row>

                <!-- <el-radio></el-radio> -->
              </div>
            </el-collapse-item>
          </el-checkbox-group>
        </el-collapse>
        <!-- <el-tree
        :data="messageAll"
        show-checkbox
        node-key="fid"
        ref="selectTree"
        @node-expand="unFoldAll2"
        @node-collapse="collapseAll2"
        @check-change="checkChange"
        default-expand-all
        :props="{label:'classification',children:'alltableings'}"
        :expand-on-click-node="false">
        <div class = "custom-tree-node" slot-scope = " { node, data }">
          <span v-if="data.sid" class="daLei">{{ data.classification }}</span>
          <span v-else class="xiaoLei">{{ data.details }}</span>
          <div v-if="!data.sid">
            <span class="choose">{{data.choose}}</span><br>价格:{{data.price}}<br>
            <div v-if="v.judge">数量:<el-input-number  size="mini" :min="data.min" :max="data.max" v-model="data.number"></el-input-number></div>
          </div>
          <span class="tree-botton-arr" v-if = "data.sysDefault !=1">
          </span> 
        </div>
          </el-tree> -->
      </div>
      <!-- <br />
        <div class="baoxiu">
          <el-descriptions border class="margin-top" title="其他信息" :column="1" :size="size">
            <el-descriptions-item label="尺寸(高x宽x深)
      " class="baoxiun">"3.5英寸硬盘机箱尺寸：86.1 mm×447 mm×748 mm 2.5英寸<br />硬盘机箱尺寸：86.1
              mm×447 mm×708 mm"
            </el-descriptions-item>
            <el-descriptions-item label="管理
      ">⚫ 支持 UEFI <br />⚫ 支持 iBMC <br />⚫ 支持 NC-SI <br />⚫
              支持被第三方管理系统集成 挂耳提供 iBMC 直连管理接口（如选择2288H
              V6-32DIMM，则需要再加此条）
            </el-descriptions-item>
            <el-descriptions-item label="工作温度
      ">5℃ - 45℃ / 41℉ - 113℉（符合ASHRAE A3和A4标准）
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <br /> -->
    </div>
    <br />
    <!-- 价格窗口 -->
    <el-card class="box-card" style="top: 220px">
      <span>购买数量</span><br />
      <p>
        <el-input-number
          size="small"
          :min="1"
          :max="stock"
          v-model="totalquantity"
        ></el-input-number>
      </p>
      <!-- <p style="color: 409eff">多台采购询价</p> -->
      <p>库存：{{ stock }}</p>
      <p>价格：</p>
      <p class="text">￥ {{ discountprice }}</p>
      <p class="zhe">￥ {{ getTotal }}</p>
      <el-button
        @click="shopp"
        type="primary"
        round
        style="width: 100%; margin-bottom: 10px"
        >加入购物车</el-button
      >
    </el-card>
    <!-- 底部 -->
    <div class="footer">
      <div class="box1">
        <div class="sun1">
          <div class="imm">
            <img src="../../assets/image.png" class="icon" />
          </div>
          <span class="sp">&nbsp;&nbsp;&nbsp;采购咨询专线</span><br />
          <span class="sp">&nbsp;&nbsp;&nbsp;13357905372</span>
        </div>
      </div>
      <div class="box2">
        <div class="sun1">
          <div class="imm">
            <img src="../../assets/QQQQ.png" class="icon" />
          </div>
          <span class="sp">&nbsp;&nbsp;&nbsp;在线顾问</span><br />
          <span class="sp">&nbsp;&nbsp;&nbsp;需要立即获得帮助?</span>
          <el-link :underline="false" style="color: #0085bf"
            >&nbsp;&nbsp;&nbsp;联系我们解决方案专家</el-link
          >
        </div>
        <el-divider direction="vertical" class="divid"></el-divider>
      </div>
      <div class="box3">
        <div class="sun1">
          <div class="imm">
            <img src="../../assets/iconP.png" class="imagge" />
          </div>
          <span class="sp">&nbsp;&nbsp;&nbsp;我有购买意向</span><br />
          <span class="sp">&nbsp;&nbsp;&nbsp;获取专业的咨询及购买帮助</span>
          <el-link :underline="false" style="color: #0085bf"
            >&nbsp;&nbsp;&nbsp;填写项目咨询单</el-link
          >
        </div>
        <el-divider direction="vertical" class="divid"></el-divider>
      </div>
    </div>
  </el-container>
</template>
  
  <script>
import tabbs from "../../views/tabbs.vue";
import rightNav from '@/components/rightNav'
export default {
  name: "Vsc1288H",
  components: { tabbs,rightNav },
  data() {
    return {
      tabdata: "",
      num4: [],
      messageAll: "",
      messageAllclass: "",
      messageAllTable: "",
      selectData: [],
      // 二级数据
      classDetail: [],
      // 选中
      checkList: [],
      // min:"",
      // max:"",
      money: "",
      size: "",
      width: "",
      radio: "",
      message2: "",
      type: "",

      // 全部详细
      dataData: [],

      // 兼容性
      compatibilityData: [],
      //复制项

      disabled1: true,
      //警告信息显示隐藏
      tck: false,

      myxiangqing: [],
      myxiangqing2: [],

      disabled: "",
      activeNames: [],
      // 总价格
      totalprice: 0,
      // 数量
      totalquantity: 1,
      uuid: null,
      username: null,
      findAllCommoditysData: [],
      stock: 0,
      // 当前产品的所有详细
      det: [],

      // 产品兼容的数据
      checkData: [],
    };
  },
  computed: {
    getTotal() {
      let total = 0;
      for (let index = 0; index < this.messageAll.length; index++) {
        const element = this.messageAll[index];
        element.alltableings.map((item, index) => {
          if (this.checkList.includes(item.xid)) {
            total += item.price * item.number;
          }
        });
      }
      total = total * this.totalquantity;
      
      return parseFloat((total).toFixed(2)) || 0;
    },
    discountprice() {
      let total = this.getTotal;
      if (this.username == null) {
        return parseFloat((total).toFixed(2));
      }
      if (typeof this.username.discount == "undefined") {
        return parseFloat((total).toFixed(2));
      }

      let num = this.percentToValue(this.username.discount);
      total = this.accMul(total, num);
      console.log(total);
      return parseFloat((total).toFixed(2));
    },
  },
  // comments:{
  //   username:{}
  // },
  mounted() {
    let a = window.localStorage.getItem("username");
    this.username = JSON.parse(a);
    this.uuid = window.localStorage.getItem("uuid");
    this.type = this.$route.query.id;
    this.findAllCommoditys();
    this.compatibility();
    this.findall();
    this.findallclass();
    // this.findDetail()
    // this.findallTable();
  },

  methods: {
    showshow(i) {
      // console.log(i);
      let ddd = true;
      this.checkData.some((a, b) => {
        if (a.bid == i) {
          ddd = false;
          return true;
        }
      });
      return ddd;
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
      return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m)
      );
    },
    percentToValue(value) {
      if (value.indexOf("%") > 0) {
        var str = value.replace("%", "");
        str = str / 100;
        return str;
      }
      return value;
    },
    compatibilityChange(i) {
      // if (this.compatibilityData.length > 0) {
      //   this.compatibilityData.forEach((item) => {
      //     if (this.checkList.includes(item.aid)) {
      //       console.log(item.aid);
      //       this.det.forEach((j) => {
      //         if (item.judge == 0) {
      //           // if (j.xid == item.aid) {
      //           //   if (j.number==item.anumber) {
      //           //     let ddd={}
      //           //     this.det.forEach(dd=>{
      //           //       if (dd.xid==item.bid) {
      //           //         ddd=dd
      //           //       }
      //           //     })
      //           //     for (let index = 0; index < this.messageAll.length; index++) {
      //           //       const element = this.messageAll[index];
      //           //       for (let i = 0; i < element.alltableings.length; i++) {
      //           //         if (ddd.xid==element.alltableings[i].xid) {
      //           //           element.alltableings[i].number=item.bmin
      //           //           element.alltableings[i].max=item.bnumber;
      //           //           element.alltableings[i].min=item.bmin;
      //           //           element.alltableings[i].astrict=item.bstringent;
      //           //         }
      //           //       }
      //           //     }
      //           //   }
      //           // }
      //         } else if (item.judge == 1) {
      //           if (j.xid == item.bid) {
      //             console.log(j);
      //             let a = this.checkList.indexOf(j.xid);
      //             if (a != -1) {
      //               this.checkList.splice(a, 1);
      //             }
      //             if (this.checkData.length == 0) {
      //               this.checkData.push({ aid: item.aid, bid: item.bid });
      //             } else {
      //               console.log(this.checkData);
      //               this.checkData.some((a, b) => {
      //                 console.log(a);
                      
      //                 console.log(this.checkData.includes(a.aid));
      //                 if (!this.checkData.includes(a.aid)) {
      //                   console.log(a);
      //                   this.checkData.push({ aid: item.aid, bid: item.bid });
      //                   return true;
      //                 }
      //               });
      //             }
      //           }
      //         }
      //       });
      //     }
      //   });
      // }
      // let ddd = true;
      // let ind = "";

      // this.checkData.some((item, index) => {
      //   if (this.checkList.includes(item.aid)) {
      //     ind = index;
      //     // this.checkList.splice(index, 1);
      //     ddd = false;
      //     return true;
      //   }
      // });
      // if (ddd) {
      //   console.log(ind);
      //   this.checkData.splice(ind, 1);
      // }
      // this.compatibility();
      this.findall();
    },
    // 全部展开
    unFoldAll2() {
      // let self = this;
      // this.messageAll.forEach((el) => {
      //   self.$refs.selectTree.store.nodesMap[el.fid].expanded = true;
      // });
    },
    // 全部折叠
    collapseAll2() {
      // let self = this;
      // this.messageAll.forEach((el) => {
      //   self.$refs.selectTree.store.nodesMap[el.fid].expanded = false;
      // });
    },
    checkChange() {},
    typeDate(id) {
      this.type = id;
      this.findAllCommoditysData.forEach((item) => {
        if (this.type == item.sid) {
          this.stock = item.stock;
          if (this.stock == null) {
            this.stock = 0;
          }
        }
      });
      this.checkList = [];
      this.compatibility();
      this.findall();
    },
    handChange() {
      if (this.compatibilityData.length > 0) {
        // console.log('23333');
        this.compatibilityData.forEach((item) => {
          if (this.checkList.includes(item.aid)) {
            console.log(item.aid);
            this.det.forEach((j) => {
              if (item.judge == 0) {
                if (j.xid == item.aid) {
                  if (j.number == item.anumber) {
                    let ddd = {};
                    this.det.forEach((dd) => {
                      if (dd.xid == item.bid) {
                        ddd = dd;
                      }
                    });
                    console.log(ddd);
                    console.log(item);
                    for (
                      let index = 0;
                      index < this.messageAll.length;
                      index++
                    ) {
                      const element = this.messageAll[index];
                      for (let i = 0; i < element.alltableings.length; i++) {
                        if (ddd.xid == element.alltableings[i].xid) {
                           if (element.alltableings[i].number<item.bmin) {
                                this.$set(this.messageAll[index].alltableings[i],'number',item.bmin)
                              }
                              if (element.alltableings[i].number>item.bnumber) {
                                this.$set(this.messageAll[index].alltableings[i],'number',item.bnumber)
                              }
                          this.$set(
                            element.alltableings[i],
                            "max",
                            item.bnumber
                          );
                          this.$set(element.alltableings[i], "min", item.bmin);
                          this.$set(
                            element.alltableings[i],
                            "astrict",
                            item.bstringent
                          );
                          // element.alltableings[i]['number']=item.bmin
                          // element.alltableings[i]['max']=item.bnumber;
                          // element.alltableings[i]['min']=item.bmin;
                          // element.alltableings[i]['astrict']=item.bstringent;
                        }
                      }
                    }
                  }
                }
              } else if (item.judge == 1) {
                // if (i.xid == item.bid) {
                //   element.alltableings.some((a, b) => {
                //     if (a.xid == i.xid) {
                //       let j = this.checkList.indexOf(a.xid);
                //       if (j != -1) {
                //         this.checkList.splice(j, 1);
                //       }
                //       element.alltableings.splice(b, 1);
                //       return true; //当内部return true时跳出整个循环
                //     }
                //   });
                // }
              }
            });
            // let ddd={}
            // let ddd={}
            // for (let index = 0; index < this.messageAll.length; index++) {
            //   const element = this.messageAll[index];

            //   let ttt=element.alltableings.findIndex(j => j.xid=== item.aid)
            //   if (ttt>-1) {
            //     ddd=element.alltableings[ttt]
            //   }
            //   console.log(ddd);
            //   element.alltableings.forEach((i) => {
            //     console.log(i);
            //     if (item.judge == 0) {
            //       if (i.xid == item.bid) {
            //         if (ddd.number==item.anumber) {
            //           console.log(ddd,'ddd');
            //           for (let j = 0; j < element.alltableings.length; j++) {
            //             const ttt = element.alltableings[j];
            //             console.log(ttt,'ttt');
            //             ttt.number=item.bmin
            //             ttt.max=item.bnumber;
            //             ttt.min=item.bmin;
            //             ttt.astrict=item.bstringent;
            //           }
            //         }
            //       }
            //     } else if (item.judge == 1) {
            //       if (i.xid == item.bid) {
            //         element.alltableings.some((a, b) => {
            //           if (a.xid == i.xid) {
            //             let j = this.checkList.indexOf(a.xid);
            //             if (j != -1) {
            //               this.checkList.splice(j, 1);
            //             }
            //             element.alltableings.splice(b, 1);
            //             return true; //当内部return true时跳出整个循环
            //           }
            //         });
            //       }
            //     }
            //   });
            // }
          }
        });
      }
      console.log(this.messageAll);
    },
    open(i) {},
    Out() {
      this.$router.push("/");
    },
    niubi() {},
    handleChange(val) {},
    // 查库存
    async findAllCommoditys() {
      await this.$axios.get(`/Commoditys/findAllCommoditys`).then((res) => {
        this.findAllCommoditysData = res.data;
        this.findAllCommoditysData.forEach((item) => {
          if (this.type == item.sid) {
            this.stock = item.stock;
            if (this.stock == null) {
              this.stock = 0;
            }
          }
        });
      });
    },
    // 查询兼容性条件
    async compatibility() {
      await this.$axios
        .get(`/Compatibility/findAllCompatibility?productid=${this.type}`)
        .then((res) => {
          this.compatibilityData = res.data;
        });
    },
    async findall() {
      await this.$axios.get("/commodity/findAllCommodity").then((res) => {
        console.log(res);
        let a = [];
        res.data.forEach((item) => {
          if (this.type == item.sid) {
            item.alltableings.forEach((i) => {
              a.push(i);
            });
          }
        });
        a.forEach((item) => {
          if (item.suibian == 1) {
            this.checkList.push(item.xid);
          }
        });
        this.messageAll = [];
        res.data.forEach((item) => {
          if (this.type == item.sid) {
            // item.classification=item.classification.replace(/\n/g,' \n ')
            this.messageAll.push(item);
          }
        });
        this.det = [];
        this.messageAll.forEach((item) => {
          item.alltableings.forEach((a) => {
            this.det.push(a);
          });
        });
        console.log(this.det);
        for (let index = 0; index < this.messageAll.length; index++) {
          this.messageAll[index].alltableings.sort((a, b) => {
            return a.nid - b.nid;
          });
          for (
            let i = 0;
            i < this.messageAll[index].alltableings.length - 1;
            i++
          ) {
            if (
              this.messageAll[index].alltableings[i].nid ==
              this.messageAll[index].alltableings[i + 1].nid
            ) {
              this.messageAll[index].alltableings[i + 1].details = "";
            }
          }
          this.activeNames.push(index + 1);
        }
        if (this.compatibilityData.length > 0) {
          this.compatibilityData.forEach((item) => {
            if (this.checkList.includes(item.aid)) {
              console.log(item.aid);
              let ddd = {};
              for (let index = 0; index < this.messageAll.length; index++) {
                const element = this.messageAll[index];
                let ttt = element.alltableings.findIndex(
                  (j) => j.xid === item.aid
                );
                if (ttt > -1) {
                  ddd = element.alltableings[ttt];
                }
                element.alltableings.forEach((i) => {
                  if (item.judge == 0) {
                    if (i.xid == item.bid) {
                      if (ddd.number == item.anumber) {
                        for (let j = 0; j < element.alltableings.length; j++) {
                          const ttt = element.alltableings[j];
                          ttt.number = item.bmin;
                          ttt.max = item.bnumber;
                          ttt.min = item.bmin;
                          ttt.astrict = item.bstringent;
                        }
                      }

                      // i.min = 0;
                    }
                  } else if (item.judge == 1) {
                    if (i.xid == item.bid) {
                      element.alltableings.some((a, b) => {
                        if (a.xid == i.xid) {
                          let j = this.checkList.indexOf(a.xid);
                          if (j != -1) {
                            this.checkList.splice(j, 1);
                          }
                          element.alltableings.splice(b, 1);
                          return true; //当内部return true时跳出整个循环
                        }
                      });
                    }
                  }
                });
              }
            }
          });
        }
      });
    },
    //第一级
    async findallclass() {
      await this.$axios.get("/classificationtable/findAll").then((res) => {
        this.messageAllclass = res.data;
      });
    },
    //第二层
    async findDetail() {
      await this.$axios.get("/Detailstable/findAll").then((res) => {
        this.classDetail = [];
        res.data.forEach((item) => {
          if (this.productAttr.sid == item.comm_id) {
            this.classDetail.push(item);
          }
        });
        this.findallTable();
      });
    },
    //第三级
    async findallTable() {
      await this.$axios.get("/AllTable/findAllAllTable").then((res) => {
        this.dataData = [];
        res.data.forEach((item) => {
          this.classDetail.forEach((i) => {
            i.choose = i.classification;
            i.xid = i.fid;
            for (let a = 0; a < i.detailss.length; a++) {
              const element = i.detailss[a];
              element.choose = element.details;
              element.xid = element.nid;
              if (
                item.classes_id == element.classes_id &&
                item.co_id == element.co_id &&
                item.nid == element.nid
              ) {
                element.detailss = [];
                element.detailss = item.allTabless;
              }
            }
          });
        });
        this.dataData = this.classDetail;
        console.log(this.dataData);
      });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 加入购物车
    async shopp() {
      if (this.checkList.length == 0) {
        this.$message.error("请选择商品");
        return;
      }
      if (this.stock == 0) {
        this.$message.error("暂无库存,请选购其他商品");
        return;
      }
      let a = JSON.stringify(this.messageAll);
      let data = JSON.parse(a);
      // data.forEach(item=>{
      //   item.alltableings=[]
      // })
      data.forEach((item) => {
        item.alltableings.forEach((i, b) => {
          if (!this.checkList.includes(i.xid)) {
            item.alltableings.splice(b, 1);
          }
        });
      });
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        for (let i = 0; i < element.alltableings.length; i++) {
          // if (!this.checkList.includes(element.alltableings[i].xid)) {
          //     let d=element.alltableings.lastIndexOf(element.alltableings[i].xid)
          //     if (d!=-1) {
          //       element.alltableings.splice(d, 1)
          //     }
          // }
          element.alltableings = element.alltableings.filter((item) =>
            this.checkList.includes(item.xid)
          );
        }
      }
      let json = JSON.stringify(data);
      if (this.username != null) {
        await this.$axios
          .post("/Zcart/addAZcart1", {
            url: this.messageAll[0].picture,
            name: this.messageAll[0].name,
            totalprice: this.getTotal,
            totalquantity: this.totalquantity,
            configurations: json,
            duserid: this.username.id,
          })
          .then((res) => {
            this.$message({
              message: "加入成功",
              type: "success",
            });
          });
        return;
      }
      await this.$axios
        .post("/ShoppingCart/addShoppingCart", {
          url: this.messageAll[0].picture,
          name: this.messageAll[0].name,
          totalprice: this.getTotal,
          totalquantity: this.totalquantity,
          configurations: json,
          duserid: null,
          uuid: this.uuid,
        })
        .then((res) => {
          if (this.uuid == null) {
            window.localStorage.setItem("uuid", res.data.uuid);
          }
          this.$message({
            message: "加入成功",
            type: "success",
          });
        });

      // this.$router.push({path:"/ShoppingCart"})
    },
  },
  created() {},
};
</script>
  <style lang="less" scoped>
/deep/.el-collapse-item__header {
  font-size: 26px;
  font-weight: 600;
}

.zhe {
  text-decoration: line-through;
  font-weight: 400;
  word-wrap: break-word;
  word-break: break-all;
}
.text {
  font-weight: 700;
  font-size: 20px;
}
/deep/.el-collapse-item__header {
  white-space: pre-wrap;
  height: auto;
}
/deep/.el-radio {
  margin: 0 0 0 10px;
}
.font {
  font-size: 20px;
}
.deta {
  font-size: 16px;
  font-weight: 600;
  white-space: pre-wrap;
  height: auto;
}
/deep/.el-checkbox__input.is-disabled + span.el-checkbox__label .deta {
  color: #409eff;
}
.box-card {
  width: 260px;
  position: fixed;
  right: 20px;
  z-index: 999;
  background: #f9f9f9;
}
.detailed {
  margin-bottom: 10px;
  padding-left: 10px;
  // display: flex;
  // justify-content: space-around;
}
.daLei {
  font-size: 26px;
  font-weight: 700;
}
.xiaoLei {
  font-size: 20px;
  font-weight: 700;
}
.choose {
  font-size: 20px;
}
.detailed p {
  margin: 0;
  padding: 0;
}
#qywxJpg {
  width: 250px;
}
#Allclass {
  // background-color: red;
  // height: 100px;
}
.messageClass {
  // margin-top: 120px;
  background-color: red;
  height: 100px;
}
#einb {
  float: left;
}
/deep/ .el-radio__label {
  width: 100% !important;
  // text-overflow: ellipsis;
  white-space: normal;
  // line-height: 18px;
  word-break: break-all;
}

//其他信息

.baoxiu {
  margin: auto;
  width: 1300px;
}

.warning {
  float: right;
  width: 250px;
}

.allNumber {
  float: left;
  font-size: 19px;
  margin-top: 5px;
}

//总数量选项
.allB {
  float: left;
}

//button提示框
.iconB {
  width: 20px;
  border: none;
}

.sp {
  font-size: 15px;
}

.imagge {
  height: 29px;
  width: 40px;
  border-radius: 120%;
}

.imm {
  height: 50px;
  float: left;
}

//分割线
.divid {
  height: 75%;
  margin-top: 10px;
}

//icon图标
.icon {
  width: 25px;
  height: 25px;
  padding-left: 30px;
  float: left;
}

.box1 {
  height: 100%;
  width: 33.3%;
  position: relative;
}
.wapnone .fk_service {
}
.sun1 {
  width: 250px;
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

.footer {
  display: flex;
  height: 120px;
  background-color: #f6f6f6;
  flex-direction: row;
  justify-content: space-between;
}

.lxwm {
  margin-top: 25px;
  // text-align: center;
  color: black;
}

.menu {
  float: left;
  white-space: normal;
  height: 248px !important;
}

.el-header {
  color: #fff;
  line-height: 40px;
  padding-top: 10px;
  width: 100%;
  margin: auto;
  padding: 0;
}
.el-menu--horizontal > .el-menu-item {
  color: #fff;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: #fff;
}
/deep/.el-menu--horizontal > .el-submenu .el-submenu__title {
  color: #fff;
}
.el-menu--horizontal > .el-submenu:focus .el-submenu__title,
.el-menu--horizontal > .el-submenu:hover .el-submenu__title {
  color: #fff;
}
.el-menu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu .el-submenu__title {
  color: #fff;
}
.bb {
  color: red;
}

.el-main {
  text-align: center;
}

.Tg {
  width: 136px;
  height: 40px;
}

#imm {
  float: left;
  margin-top: 4px;
}

//走马灯
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  margin: 0;
}

#image {
  width: 600px;
  // height: 100px;
  margin-top: 40px;
  float: left;
}

.a1 {
  width: 250px;
  height: 199px;
}

.a2 {
  width: 250px;
  height: 201px;
}

.a3 {
  width: 250px;
  height: 201px;
}

.a4 {
  width: 250px;
  height: 201px;
}

.H1 {
  line-height: 89px;
}

#all {
  margin-left: 12%;
  // width:1800px;
}

#content {
  width: 1300px;
}

.my-label {
  background: #5ac326;
}

#hand {
  width: 100%;
  height: 200px;
}

.size {
  font-size: 21px;
}

.sp2 {
  font-size: 16px;
}

.neir {
  font-size: 15px;
}

.number {
  color: red;
}

.size {
  font-size: 18px;
}
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
.fk_service {
  max-height: 232px;
  position: fixed;
  right: 2px;
  bottom: 50.2%;
  /* 垂直位置 */
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  color: #243558;
  z-index: 2222222222;
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
  background: url("../../assets/QQQQ.png") no-repeat #fff center center;
  background-size: 70% 70%;
  z-index: 1;
}
// .fk_service_consult:hover {
//   border: 0;
//   background: url("../../assets/客服.png") no-repeat -410px -16px #4f7cfc;
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
.fk_service_button:hover {
  background: #618aff;
}
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
.tabbs {
  height: 66px;
}
</style>
  