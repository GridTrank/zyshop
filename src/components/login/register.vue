<template>
  <div class="box">
    <div class="zhuce">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <h1>请进行注册</h1>
        <el-form-item label="用户名" prop="nickname">
          <el-input
            placeholder="请输入用户名"
            v-model="ruleForm.nickname"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            placeholder="请输入本人姓名"
            v-model="ruleForm.name"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="companyname">
          <el-input
            placeholder="请输入与本人相符的公司名称"
            v-model="ruleForm.companyname"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input
            placeholder="请输入本人职位"
            v-model="ruleForm.position"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            placeholder="请输入本人邮箱"
            v-model="ruleForm.email"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input
            placeholder="请输入本人手机号"
            v-model="ruleForm.phone"
            clearable
          ></el-input>
          <span>您输入的手机号码将作为此网站的登录账号</span>
        </el-form-item>
        <!-- 来源渠道 -->
        <el-form-item label="来源渠道" prop="source">
          <el-radio-group v-model="ruleForm.source">
            <el-radio label="公众号"></el-radio><br />
            <el-radio label="头条号"></el-radio><br />
            <el-radio label="百家号"></el-radio><br />
            <el-radio :label="ruleForm.desc">
              <el-input
                type="textarea"
                :rows="1"
                placeholder="其他来源渠道在此输入"
                v-model="ruleForm.desc"
                style="width: 280px"
              ></el-input>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 来源渠道 -->
        <el-form-item label="请输入密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="密码须包含字母,数字,特殊字符,且大于8位"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="请确认密码" prop="checkPass">
          <el-input
            type="password"
            placeholder="请再次确认密码"
            v-model="ruleForm.checkPass"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleFormRef')"
            >注册</el-button
          >
          <el-button @click="returnForm('ruleFormRef')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
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
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleFormRef.validateField("checkPass");
        }
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

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        phone: "",
        password: "",
        checkPass: "",
        source: "",
        companyname: "",
        name: "",
        email: "",
        position: "",
        desc: "",
        nickname:""
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        phone: [{ required: true, validator: checkphone, trigger: "blur" }],
        password: [{ required: true, validator: validatePass, trigger: "blur" }],

        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        source: [
          { required: true, message: "至少选择一个源!", trigger: "change" },
        ],
        name: [{ required: true, message: "请填写内容!", trigger: "blur" }],
        nickname: [{ required: true, message: "请填写内容!", trigger: "blur" }],
        companyname: [{ required: true, message: "请填写内容!", trigger: "blur" }],
        position: [{ required: true, message: "请填写内容!", trigger: "blur" }],
      },
    };
  },
  methods: {
    returnForm(formName) {
      // 返回login界面
      this.$router.push("/login");
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/registration/saveUserByUid", {
              // name: this.ruleForm.name,
              // phone: this.ruleForm.phone,
              // password: this.ruleForm.checkPass,
              // soure: this.ruleForm.source,
              // companyname: this.ruleForm.company,
              // position: this.ruleForm.position,
              // email: this.ruleForm.emeal,
              ...this.ruleForm
            })
            .then(
              (res) => {
                if (res.data.msg=='注册失败') {
                  this.$message.error("注册失败！");
                  return
                }
                if (res.data.msg=="注册成功") {
                  this.grouplist = res.body;
                  this.$message.success("注册成功！");
                  this.$router.push("/login");
                }else{
                  this.$message.error(res.data.msg);
                }
                
              },
              (res) => {
                alert("出问题啦!请联系管理员~");
              }
            );
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.box {
  height: 100%;
  background-color: #2e4e6e;
}
.zhuce {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  height: 450px;
  background-color: #fff;
  border-radius: 3px;
}
.el-form-item {
  margin-top: 30px;
  width: 609px;
}
</style>
