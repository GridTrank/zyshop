<template>
    <div class="page-wrap">
        <tabbs></tabbs>
        <div class="back">
            <p @click="$router.push({path:'/'})">返回首页</p>
        </div>
        <div class="user-wrap">
            <div class="user-left">
                <p @click="$router.push('/User/Info')">个人信息</p>
                <p @click="$router.push('/User/Address')">我的地址</p>
                <p @click="$router.push('/User/Collection')">我的收藏</p>
            </div>
            <div class="user-right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import router from "../router";
import tabbs from "./tabbs.vue";
export default {
   data(){
        return {
        }
    },
    components:{
        tabbs 
    },
    created(){},
    computed:{},
    methods:{},
}
</script>
<style lang="less" scoped>
.page-wrap{
    margin-top: 80px;
    .back{
        padding-left: 50px;
        height: 60px;
        line-height: 60px;
        width: 100%;
        color: #fff;
        background-color: #000;
        p{
            cursor: pointer;
        }
    }
    .user-wrap{
        max-width: 50vw;
        margin: auto;
        margin-top: 20px;
        display: flex;
        align-items: baseline;
        .user-left{
            margin-right: 100px;
            p{
                cursor: pointer;
                &:hover{
                    color: #409eff;
                }
            }
        }
        .user-right{
            flex: 1;
        }
    }
}

</style>