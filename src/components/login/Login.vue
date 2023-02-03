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
        <h1>请进行登录</h1>
        <!--用户名-->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
            placeholder="请输入手机号"
            clearable
            :maxlength="11"
          ></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            placeholder="请输入密码"
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <!--按钮区-->
        <el-form-item class="btns">
          <el-checkbox class="remember" v-model="keepPassword"
            >记住密码</el-checkbox
          >
          <el-button type="text" @click="ForgetThePassword">忘记密码</el-button>
          <br />
          <el-button type="success" @click="login">登录</el-button>
          <el-button type="success" @click="register">注册</el-button>
          <el-button type="danger" @click="resetLoginForm">重置</el-button
          ><br /><br />
          <el-button type="warning" @click="goOut">返回首页</el-button>
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
        callback();
      }
    };
    return {
      keepPassword: false, // 记住密码
      loginForm: {
        // 登录的表单数据的绑定对象
        username: "",
        password: "",
      },
      loginFormRules: {
        // 验证用户名是否合法
        username: [{ required: true, validator: checkphone, trigger: "blur" }],
        password: [{ required: true, validator: validatePass, trigger: "blur" }],
      },
      alladd:[]
    };
  },
  created() {
    sessionStorage.clear();
  },
  mounted() {
    // 读取cookie
    this.findAllVIP()
    // this.getCookie();
  },
  methods: {
    goOut() {
      //返回首页
      this.$router.push("/");
    },
    // 记住密码保存数据
    // setCookie(name, pwd, exdays) {
    //   var exdate = new Date(); // 获取时间
    //   exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); // 保存的天数
    //   // 字符串拼接cookie
    //   window.document.cookie =
    //     "userName" + "=" + name + ";path=/;expires=" + exdate.toGMTString();
    //   window.document.cookie =
    //     "userPwd" + "=" + pwd + ";path=/;expires=" + exdate.toGMTString();
    // },
    // 读取cookie
    // getCookie() {
    //   if (document.cookie.length > 0) {
    //     this.keepPassword = true;
    //     var arr = document.cookie.split("; "); // 这里显示的格式需要切割一下自己可输出看下
    //     for (var i = 0; i < arr.length; i++) {
    //       var arr2 = arr[i].split("="); // 再次切割
    //       // 判断查找相对应的值
    //       if (arr2[0] === "userName") {
    //         this.loginForm.username = arr2[1]; // 保存到保存数据的地方
    //       } else if (arr2[0] === "userPwd") {
    //         this.loginForm.password = arr2[1];
    //       }
    //     }
    //   }
    // },
    // 清除cookie
    // clearCookie: function () {
    //   this.setCookie("", "", -1); // 修改2值都为空，天数为负1天就好了
    // },
    // 多层嵌套无法输入解决方法
    // change(e) {
    //   this.$forceUpdate();
    // },
    resetLoginForm() {
      // 点击重置按钮,重置登录表单
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      // 点击登录按钮，跳转到Home.vue
      this.$refs.loginFormRef.validate((valid) => {
        // 验证登录数据
        if (valid) {
          this.$axios.post(
          "/registration/login",{"phone":this.loginForm.username,
    "password":this.loginForm.password}
        ).then(res=>{
          if (res.data.token) {
            window.localStorage.setItem("username",this.loginForm.username);
            window.localStorage.setItem("password",this.loginForm.password);
            window.localStorage.setItem("token", res.data.token);
            this.alladd.forEach(item => {
              if (item.vid==res.data['当前用户信息'].gradevip) {
                res.data['当前用户信息'].discount=item.discount
              }
            });
            let username=JSON.stringify(res.data['当前用户信息'])
            this.addShopp(res.data['当前用户信息'].id)
            window.localStorage.setItem("username",username );
            let a=window.localStorage.getItem("path_tiao")
            this.$message.success("登录成功")
            this.$router.push(a); // 跳转到home.vue
          }else{
            this.$message.error("登录失败 帐号或密码错误!")
          }
        })
          // 根据登录结果判断是否发起登录请求
          // return (this.loginLoading = false);
        }
      });
    },
    // 用户与游客购物车联动
    addShopp(id){
      let uuid=window.localStorage.getItem("uuid");
      if (uuid==null) {
        return
      }
       this.$axios.post("/Zcart/addAZcart",
          {
            duserid:id,
            uuid:uuid
          }
        ).then(res=>{
        })
    },
    register() {
      // 跳转到注册界面
      this.$router.push("/register");
    },
    async findAllVIP() {
            await this.$axios.get('/discount/findAllDiscount').then((res) => {
                this.alladd = res.data;
            });
        },
    ForgetThePassword(){
      // 跳转到忘记密码界面
      this.$router.push("/ForgetThePassword");
    }
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
