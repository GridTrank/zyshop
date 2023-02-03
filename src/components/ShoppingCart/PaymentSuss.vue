<template>
  <div>
    <el-result icon="success" title="支付成功" subTitle="请返回首页">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="$router.push({path:'/'})">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>