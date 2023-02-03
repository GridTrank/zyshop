<template>
  <div id="app">
    <router-view :key="key"/>
  </div>
</template>
<script>
export default {
  computed:{
    key(){
      return this.$route.fullPath
    }
  },
  created() {
    // var link = document.querySelector("link[rel*='icon']") || document.createElement('link')
    // link.type = 'image/x-icon'
    // link.rel = 'shortcut icon'
    // link.href = './assets/登录.png'
    // document.getElementsByTagName('head')[0].appendChild(link)
  },
  mounted() {
    // document.title='数字'
    // var link = document.querySelector("link[rel*='icon']") || document.createElement('link')
    // link.type = 'image/x-icon'
    // link.rel = 'shortcut icon'
    // link.href = './assets/登录.png'
    // document.getElementsByTagName('head')[0].appendChild(link)
  },
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
</style>
