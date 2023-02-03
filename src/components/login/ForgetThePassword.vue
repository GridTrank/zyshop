<template>
  <div class="login_container">
    
    <div class="login_box">
      <!--表单提交区域-->

      <el-form
        :rules="loginFormRules"
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
        :model="loginForm"
      >
      <h1>忘记密码</h1>
        <!--用户名-->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
            placeholder="请输入手机号"
            clearable
          ></el-input>
        </el-form-item>
        <!--密码-->
        <!-- <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            placeholder="请输入密码"
            show-password
            clearable
          ></el-input>
        </el-form-item> -->
        <!--按钮区-->
        <el-form-item class="btns">
          <el-button type="success" @click="login">确定修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keepPassword: false, // 记住密码
      loginForm: {
        // 登录的表单数据的绑定对象
        username: "",
        password: "",
      },
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "无内容!", trigger: "blur" },
          {
            min: 1,
            max: 111,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "无内容!", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    sessionStorage.clear();
  },
  mounted() {
    // 读取cookie
    // this.getCookie();
  },
  methods: {
    login() {
      // 点击登录按钮，跳转到Home.vue
      this.$refs.loginFormRef.validate(async (valid) => {
        // 验证登录数据
        if (!valid) {
          // 根据登录结果判断是否发起登录请求
          return (this.loginLoading = false);
        }
        const { data: res } = await this.$axios.post(
          "/registration/login?phone=" +
            this.loginForm.username +
            "&password=" +
            this.loginForm.password
        );
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #2e4e6e;
}
.login_box {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  .login_form {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
  }
  .btns {
    // display: flex;
    // justify-content: flex-end;
  }
}
</style>
