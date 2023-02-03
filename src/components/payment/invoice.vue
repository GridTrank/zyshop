// 发票
<template>
  <div class="contain">
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form
              :model="ruleForm2"
              :rules="rules2"
              ref="ruleForm2"
              :label-position="'top'"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="发票寄送地址" prop="identical">
                <el-radio-group
                  v-model="ruleForm2.identical"
                  @change="handchange"
                >
                  <el-radio label="0">与收货地址相同</el-radio>
                  <el-radio label="1">使用其他地址和联系方式</el-radio>
                </el-radio-group>
              </el-form-item>

              <!-- 使用其他收货地址 -->
              <div v-if="ruleForm2.identical == 1">
                <el-form-item label="收件人" prop="recipients">
                  <el-input v-model="ruleForm2.recipients"></el-input>
                </el-form-item>
                <el-form-item
                  label="省/直辖市"
                  prop="province"
                  class="province"
                >
                  <el-input v-model="ruleForm2.province"> </el-input>
                </el-form-item>
                <el-form-item label="市/县（区）" prop="town" class="province">
                  <el-input v-model="ruleForm2.town"> </el-input>
                </el-form-item>
                <el-form-item
                  label="县区、街道名称(例如：中山区大众路) "
                  prop="section"
                  class="province"
                >
                  <el-input v-model="ruleForm2.section"></el-input>
                </el-form-item>
                <el-form-item
                  label="小区、楼层号(例如：XX小区1号楼1单元101) "
                  prop="detailed"
                >
                  <el-input v-model="ruleForm2.detailed"></el-input>
                </el-form-item>
                <el-form-item
                  label="邮政编码（如不清楚邮编请填 000000） "
                  prop="postcode"
                >
                  <el-input v-model="ruleForm2.postcode"></el-input>
                </el-form-item>
                <el-form-item
                  label="收件人手机号码或固定电话号码"
                  prop="phone"
                  class="province"
                >
                  <el-input v-model="ruleForm2.phone"></el-input>
                </el-form-item>
                <el-form-item
                  label="电子邮件地址"
                  prop="email"
                  class="province"
                >
                  <el-input v-model="ruleForm2.email"></el-input>
                </el-form-item>
              </div>
              <el-form-item label="发票类型" prop="invoices">
                <p>如遇增票信息填写问题请致电：0592-8188277</p>
                <el-radio-group
                  v-model="ruleForm2.invoices"
                  @change="hangechange"
                >
                  <el-radio :label="0">个人普通发票</el-radio>
                  <el-radio :label="1">公司普通发票</el-radio>
                  <el-radio :label="2">公司增值税专用发票</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>

            <!-- 个人普通发票 -->
            <div v-if="ruleForm2.invoices == '0'">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                :label-position="'top'"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="发票名称 " prop="name" class="province">
                  <el-input v-model="ruleForm.name"> </el-input>
                </el-form-item>
                <el-form-item
                  label="税号 (可选填）"
                  prop="paragraph"
                  class="province"
                >
                  <el-input v-model="ruleForm.paragraph"> </el-input>
                </el-form-item>
              </el-form>
            </div>
            <!-- 公司普通发票 -->
            <div v-if="ruleForm2.invoices == '1'">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                :label-position="'top'"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="发票名称 " prop="name" class="province">
                  <el-input v-model="ruleForm.name"> </el-input>
                </el-form-item>
                <el-form-item
                  label="税号 (可选填）"
                  prop="paragraph"
                  class="province"
                >
                  <el-input v-model="ruleForm.paragraph"> </el-input>
                </el-form-item>
              </el-form>
            </div>
            <!-- 公司增值税专用发票 -->
            <div v-if="ruleForm2.invoices == '2'">
              <el-form
                :model="ruleForm3"
                :rules="rules3"
                ref="ruleForm3"
                :label-position="'top'"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="发票名称" prop="recipients">
                  <el-input v-model="ruleForm3.recipients"></el-input>
                </el-form-item>
                <el-form-item
                  label="省/直辖市"
                  prop="province"
                  class="province"
                >
                  <el-input v-model="ruleForm3.province"> </el-input>
                </el-form-item>
                <el-form-item label="市/县（区）" prop="town" class="province">
                  <el-input v-model="ruleForm3.town"> </el-input>
                </el-form-item>
                <el-form-item
                  label="县区、街道名称(例如：中山区大众路) "
                  prop="section"
                  class="province"
                >
                  <el-input v-model="ruleForm3.section"></el-input>
                </el-form-item>
                <el-form-item
                  label="小区、楼层号(例如：XX小区1号楼1单元101) "
                  prop="detailed"
                >
                  <el-input v-model="ruleForm3.detailed"></el-input>
                </el-form-item>
                <el-form-item
                  label="邮政编码（如不清楚邮编请填 000000） "
                  prop="postcode"
                >
                  <el-input v-model="ruleForm3.postcode"></el-input>
                </el-form-item>
                <el-form-item
                  label="公司注册电话"
                  prop="companytel"
                  class="province"
                >
                  <el-input v-model="ruleForm3.companytel"></el-input>
                </el-form-item>
                <el-form-item
                  label="公司增值税号码"
                  prop="numbercompany"
                  class="province"
                >
                  <el-input v-model="ruleForm3.numbercompany"></el-input>
                </el-form-item>
                <el-form-item
                  label="银行名称 "
                  prop="bankname"
                  class="province"
                >
                  <el-input v-model="ruleForm3.bankname"></el-input>
                </el-form-item>
                <el-form-item
                  label="银行账号"
                  prop="bankaccount"
                  class="province"
                >
                  <el-input v-model="ruleForm3.bankaccount"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <!-- <el-form-item> -->
            <el-button type="primary" @click="submitForm()">保存</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            <!-- </el-form-item> -->
          </el-col>
          <el-col :span="8">
            <!-- <el-card class="box-card">
              <p>总计</p>
              <el-button @click="$router.push({path:'/method'})">下一步</el-button><br />
            </el-card> -->
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <!-- 价格窗口 -->
  </div>
</template>

<script>
export default {
  data() {
    var checkphone = (rule, value, callback) => {
      const regUser = /^((0\d{2,3}-?\d{7,8})|(1[3465789]\d{9}))$/;
      if (regUser.test(value)) {
        return callback();
      }
      callback(new Error("内容为空&格式不正确"));
    };
    var validatePass = (rule, value, callback) => {
      const passwd = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}/;
      if (value === "" || !passwd.test(value)) {
        callback(new Error("密码须包含字母,数字,特殊字符,且大于8位!"));
      } else {
        callback();
      }
    };
    let checkEmail = (rule, value, callback) => {
      //验证邮箱
      const regEmail =
        /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value != "" && !regEmail.test(value)) {
        callback(new Error("请输入有效的邮箱"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name:'',
        paragraph:''
      },
      rules: {
        name: [{ required: true, message: "请填写发票名称", trigger: "blur" }],
      },
      // 发票地址
      ruleForm2: {
        recipients: "",
        province: "",
        town: "",
        section: "",
        postcode: "",
        detailed: "",
        phone: "",
        email: "",
        invoices: "",
        identical: "",
      },
      rules2: {
        recipients: [
          { required: true, message: "请填写收件人名称", trigger: "blur" },
        ],
        province: [{ required: true, message: "请选择省份", trigger: "blur" }],
        town: [{ required: true, message: "请选择省份", trigger: "blur" }],
        section: [{ required: true, message: "请选择城市", trigger: "blur" }],
        postcode: [{ required: true, message: "请填写邮编", trigger: "blur" }],
        detailed: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        phone: [{ required: true, validator: checkphone, trigger: "blur" }],
        invoices: [
          { required: true, message: "请选择发票地址", trigger: "change" },
        ],
        identical: [
          { required: true, message: "请选择发票类型", trigger: "change" },
        ],
      },
      // 公司增值税
      ruleForm3: {
        recipients: "",
        province: "",
        town: "",
        section: "",
        postcode: "",
        detailed: "",
        companytel: "",
        numbercompany: "",
        bankname: "",
        bankaccount: "",
      },
      rules3: {
        recipients: [
          { required: true, message: "请填写收件人名称", trigger: "blur" },
        ],
        province: [
          { required: true, message: "请选择省份", trigger: "blur" },
        ],
        town: [{ required: true, message: "请选择省份", trigger: "blur" }],
        section: [{ required: true, message: "请选择城市", trigger: "blur" }],
        postcode: [{ required: true, message: "请填写邮编", trigger: "blur" }],
        detailed: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
        companytel: [
          { required: true, message: "请填写公司电话", trigger: "blur" },
          [{ required: true, validator: checkphone, trigger: "blur" }],
        ],
        numbercompany: [
          { required: true, message: "请填写公司增值税号", trigger: "blur" },
        ],
        bankname: [
          { required: true, message: "请填写银行账号", trigger: "blur" },
        ],
        bankaccount: [
          { required: true, message: "请填写银行帐号", trigger: "blur" },
        ],
      },
      addressData: [],
      username: null,
    };
  },
  props: {
    address2: {
      type: Object,
      default: {},
    },
    jue: {
      type: Number,
    },
  },
  methods: {
    handchange() {
      let a = this.ruleForm2.invoices;
      let b = this.ruleForm2.identical;
      this.ruleForm2 = { invoices: a, identical: b };
    },
    hangechange() {
      this.ruleForm = {};
      this.ruleForm3 = {};
    },
    submitForm() {
      this.$refs["ruleForm2"].validate((valid2) => {
        console.log(valid2);
        console.log(this.ruleForm2);
        if (valid2) {
          if (this.ruleForm2.invoices == 0) {
            this.ruleForm.personageuserid = this.username.id;
            delete this.ruleForm.companyuserid;
            this.submitForm2();
          } else if (this.ruleForm2.invoices == 1) {
            this.ruleForm.companyuserid = this.username.id;
            delete this.ruleForm.personageuserid;
            this.submitForm2();
          } else if (this.ruleForm2.invoices == 2) {
            this.ruleForm3.taxuserid = this.username.id;
            this.submitForm3();
          }
        } else {
          return false;
        }
      });
    },
    submitForm2() {
      this.$refs["ruleForm"].validate((valid2) => {
        console.log(valid2);
        if (valid2) {
          
          // if (this.ruleForm2.identical == 0) {
            this.Personage();
            this.address();
          // }
        } else {
          return false;
        }
      });
    },
    submitForm3() {
      this.$refs["ruleForm3"].validate((valid2) => {
        if (valid2) {
          this.addedTax();
          this.address();
        } else {
          return false;
        }
      });
    },
    // 增值税查询
    queryData2() {
      this.$axios
        .post(`/Addedtax/findAllAddedtax?taxuserid=${this.username.id}`)
        .then((res) => {
          this.ruleForm3 = res.data[res.data.length - 1];
        });
    },
    // 添加增值税
    addedTax() {
      this.$axios
        .post(`/Addedtax/addAddedtax`, { ...this.ruleForm3 })
        .then((res) => {
          // this.addressData = res.data;
        });
    },
    // 发票地址查询
    queryData() {
      this.$axios
        .post(`/Bill/findAllBill?userids=${this.username.id}`)
        .then((res) => {
          if (res.data.length == 0) {
            return;
          }
          this.ruleForm2 = res.data[res.data.length - 1];
          if (this.ruleForm2.invoices == "0") {
            this.queryData3();
          } else if (this.ruleForm2.invoices == "1") {
            this.queryData4();
          } else if (this.ruleForm2.invoices == "2") {
            this.queryData2();
          }
        });
    },
    //添加发票地址
    address() {
      let obj = {};
      if (this.ruleForm2.invoices == 0) {
        obj = Object.assign(this.ruleForm2, this.address2);
        delete obj.id;
      } else {
        obj = this.ruleForm2;
      }
      this.$axios.post(`/Bill/addBill`, { ...obj }).then((res) => {
      });
      this.$emit('plete',true)
    },
    // 个人税查询
    queryData3() {
      this.$axios
        .post(`/Personage/findAllPersonage?userid=${this.username.id}`)
        .then((res) => {
          if (res.data.length==0) {
            return 
          }
          this.ruleForm = res.data[res.data.length - 1];
          // this.addressData = res.data;
        });
    },
    // 添加个人税
    Personage() {
      this.$axios
        .post(`/Personage/addPersonage`, { ...this.ruleForm })
        .then((res) => {
        });
    },
    // 公司普通税查询
    queryData4() {
      this.$axios
        .post(`/Company/findAllCompany?userid=${this.username.id}`)
        .then((res) => {
          this.ruleForm = res.data[res.data.length - 1];
          // this.addressData = res.data;
        });
    },
    // 添加公司普通税
    Company() {
      this.$axios
        .post(`/Company/addCompany`, { ...this.ruleForm })
        .then((res) => {
          // this.addressData = res.data;
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    let a = window.localStorage.getItem("username");
    this.username = JSON.parse(a);
    if (this.jue == 1) {
      this.queryData();
    }
  },
};
</script>

<style  lang="less" scoped>
.contain {
  width: 1400px;
  margin: auto;
}
.box-card {
  width: 300px;
  position: fixed;
  right: 200px;
  top: 100px;
  background: #f9f9f9;
}
.province {
  display: inline-block;
  margin-right: 20px;
}
</style>