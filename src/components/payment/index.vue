<template>
  <div class="contain">
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              :label-position="'top'"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="收件人" prop="recipients">
                <el-input v-model="ruleForm.recipients"></el-input>
              </el-form-item>
              <el-form-item label="省/直辖市" prop="province" class="province">
                <el-input
                  v-model="ruleForm.province"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="市/县（区）" prop="town" class="province">
                <el-input v-model="ruleForm.town" >
                </el-input>
              </el-form-item>
              <el-form-item
                label="县区、街道名称(例如：中山区大众路) "
                prop="section"
                class="province"
              >
                <el-input v-model="ruleForm.section"></el-input>
              </el-form-item>
              <el-form-item
                label="小区、楼层号(例如：XX小区1号楼1单元101) "
                prop="detailed"
              >
                <el-input v-model="ruleForm.detailed"></el-input>
              </el-form-item>
              <el-form-item
                label="邮政编码（如不清楚邮编请填 000000） "
                prop="postcode"
              >
                <el-input v-model="ruleForm.postcode"></el-input>
              </el-form-item>
              <el-form-item
                label="收件人手机号码或固定电话号码"
                prop="phone"
                class="postcode"
              >
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="电子邮件地址" prop="email" class="province">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="是否发票" prop="show">
                <el-radio-group v-model="ruleForm.invoice">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >保存</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <!-- <el-button @click="address">地址管理</el-button> -->
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-dialog
      title="地址管理"
      :visible.sync="dialogVisible"
      width="30%"
      class="dialog"
      :before-close="handleClose"
    >
      <el-radio-group v-model="radio" @change="change()">
        <el-radio
          :label="index"
          v-for="(item, index) in addressData"
          :key="item.id"
          >{{ item.recipients }} {{ item.detailed }} </el-radio
        ><br />
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 价格窗口 -->
  </div>
</template>

<script>
export default {
  data() {
    var checkphone = (rule, value, callback) => {
      const regUser = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;
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
        recipients: "",
        province: "",
        town: "",
        section: "",
        postcode: "",
        phone: "",
        email: "",
        detailed: "",
        invoice: 0,
        userids: "",
      },
      dialogVisible: false,
      radio: "",
      rules: {
        recipients: [
          { required: true, message: "请填写收件人名称", trigger: "blur" },
        ],
        province: [
          { required: true, message: "请选择省份", trigger: "change" },
        ],
        town: [{ required: true, message: "请选择省份", trigger: "change" }],
        section: [{ required: true, message: "请选择城市", trigger: "change" }],
        postcode: [{ required: true, message: "请填写邮编", trigger: "blur" }],
        detailed: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        phone: [{ required: true, validator: checkphone, trigger: "blur" }],
        invoice: [
          { required: true, message: "请选择是否发票", trigger: "change" },
        ],
      },
      username: null,
      addressData: [],
      judge: 0,
      ddd:false,
    };
  },
  methods: {
    // 保存
    submitForm(formName) {
      this.ruleForm.userids = this.username.id;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post(`/Picture/addPicture`, { ...this.ruleForm })
            .then((res) => {
              this.ddd=true
              this.$message.success("保存成功")
              this.queryData();
            });
        } else {
          // this.$emit("show", this.ruleForm, false, this.judge);
          return false;
        }
      });
    },
    change() {
      this.ruleForm = this.addressData[this.radio];
    },
    // 查询
    queryData() {
      this.$axios
        .post(`/Picture/findAllPicture?userids=${this.username.id}`)
        .then((res) => {
          if (res.data.length==0) {
            
          }else{
            this.addressData = res.data;
            this.ruleForm = this.addressData[this.addressData.length - 1];
            this.judge = this.ruleForm.invoice;

          }
        });
    },
    show() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.ddd) {
            this.$emit("show", this.ruleForm, true, this.judge);
          }else{
            this.$message.error("请先保存")
            this.$emit("show", this.ruleForm, false, this.judge);
          }
        }else{
          this.$emit("show", this.ruleForm, false, this.judge);
        }
      })
      // this.submitForm("ruleForm");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    Out() {
      this.$router.push("/");
    },
    address() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  mounted() {
    let a = window.localStorage.getItem("username");
    this.username = JSON.parse(a);
    this.queryData();
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
/deep/.dialog .el-radio {
  display: block;
  margin-top: 10px;
}
</style>