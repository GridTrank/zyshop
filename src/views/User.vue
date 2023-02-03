<template>
    <div class="page-wrap">
        <tabbs></tabbs>
        <div class="back">
            <p @click="$router.push({path:'/'})">返回首页</p>
        </div>
        <div class="user-wrap">
            <div class="user-left">
                <p>个人信息</p>
                <p>我的地址</p>
                <p>我的收藏</p>
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
        max-width: 60vw;
        margin: auto;
        margin-top: 20px;
        .user-left{
            p{
                cursor: pointer;
            }
        }
    }
}

</style>