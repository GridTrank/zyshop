<template>
    <div class="con-wrap">
        <div class="title">个人信息</div>
        <div class="info">
            <div class="info-wrap">
                <div class="i-label">姓名</div>
                <div class="i-val">姓名</div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
   data(){
        return {
        }
    },
    created(){},
    computed:{},
    methods:{},
}
</script>
<style lang="less" scoped>
.con-wrap{
    padding: 20px;
    border-style: solid;
    border-color: #f1f1f1;
    border-width: 1px;
    .title{
        color: #000;
        font-weight: 600;
    }
    .info{
        margin-top: 30px;
        .info-wrap{
            display: flex;
            align-items: center;
            .i-label{
                margin-right: 10px;
            }
            .i-val{

            }
        }
    }
}
</style>