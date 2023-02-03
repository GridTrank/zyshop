import axios from 'axios';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 500000
});

// http request 拦截器
service.interceptors.request.use(
    config => {
        // if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        //     config.headers.Authorization = `token ${store.state.token}`;
        // }
        let token = window.localStorage.getItem("token")
        if (token) {
            config.headers.accessToken = token;  
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
// http response 拦截器
service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    // store.commit(types.LOGOUT);
                    localStorage.removeItem(token);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    }
);
// service.interceptors.request.use(
//     config => {
//         let token = window.localStorage.getItem("accessToken")
//         if (token) {
//             config.headers.accessToken = token;    //将token放到请求头发送给服务器
//             //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
//             // config.headers['accessToken'] = Token;
//         }
//         return config;
//     },
//     error => {
//         console.log(error);
//         return Promise.reject(error);
//     }
// );

// service.interceptors.response.use(
//     response => {
//         if (response.status === 200) {
//             return response.data;
//         } else {
//             Promise.reject(error);
//         }
//     },
//     error => {
//         console.log(error);
//         return Promise.reject(error);
//     }
// );

export default service;
