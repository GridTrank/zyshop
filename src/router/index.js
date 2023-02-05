import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "visitor",
      component: () => import("../views/Home.vue"),
    },

    {
      path: "/Login",
      name: "login",
      component: () => import("../components/login/Login.vue"),
      meta: {
        title: "登录",
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../components/login/register.vue"),
      meta: {
        title: "注册",
      },
    },
    {
      path: "/ForgetThePassword",
      name: "ForgetThePassword",
      component: () => import("../components/login/ForgetThePassword.vue"),
      meta: {
        title: "忘记密码",
      },
    },
    {
      path: "/2488Hv6",
      name: "2488Hv6",
      component: () => import("../components/commodity details/2488Hv6.vue"),
      meta: {
        title: "商品详情",
      },
    },
    {
      path: "/ShoppingCart",
      name: "ShoppingCart",
      component: () => import("../components/ShoppingCart/index.vue"),
      meta: {
        title: "购物车",
      },
    },
    {
      path: "/PaymentSuss",
      name: "PaymentSuss",
      component: () => import("../components/ShoppingCart/PaymentSuss.vue"),
      meta: {
        title: "支付成功",
        auth: true, // 这里设置，当前路由需要校验
      },
    },
    {
      path: "/payment",
      name: "payment",
      component: () => import("../components/payment/step.vue"),
      meta: {
        title: "支付页面",
        auth: true, // 这里设置，当前路由需要校验
      },
    },
    {
      path: "/method",
      name: "method",
      component: () => import("../components/payment/method.vue"),
      meta: {
        title: "支付",
        auth: true, // 这里设置，当前路由需要校验
      },
    },
    {
      path: "/order",
      name: "order",
      component: () => import("../components/order"),
      meta: {
        title: "订单",
        auth: true, // 这里设置，当前路由需要校验
      },
    },
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/User"),
      meta: {
        title: "用户中心",
        auth: true, // 这里设置，当前路由需要校验
      },
      children:[
        {
          path: '/User/Info',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/User/Info'),
          meta: { title: '用户信息',auth: true }
        },
        {
          path: '/User/Address',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/User/Address'),
          meta: { title: '我的地址',auth: true }
        },
        {
          path: '/User/Collection',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/User/Collection'),
          meta: { title: '我的收藏',auth: true }
        },
      ]
    },
  ],
});
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// router.beforeEach((to, from, next) => {
//   const tokenStr = window.localStorage.getItem("token");
//   // console.log(to);
//   if (to.matched.some((m) => m.meta.auth)) {
//     if (tokenStr) {
//       // 已经登陆
//       next();
//     } else {
//       // 未登录,跳转到登陆页面，并且带上 将要去的地址，方便登陆后跳转。
//       next({ path: "/login" });
//     }
//   } else {
//     next();
//   }
// });
export default router;
