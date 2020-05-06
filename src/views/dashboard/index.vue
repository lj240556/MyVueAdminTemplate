<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    //$route为当前router跳转对象，里面可以获取name、path、query、params等
    $route: {
      handler: function(route) {
        //route.query会获取？后面的参数 http://localhost:9528/#/login?redirect=%2Fexample%2Ftable 
        //  比如现在获取的是redirect=%2Fexample%2Ftable  如果存在就继续获取 redirect后面的值
        //如果不存在 意思就是route.query都没有  后面没有接？的参数  就直接为空  就不会执行后面的取值  不会报错
        //想当于先判断了route.query是否为空  不为空 再去取值
        // this.redirect = route.query && route.query.redirect
        console.log("当前router跳转对象2222 ", this.$route)
        console.log("router 跳转对象ceshi222 ", route.query.redirect)
        
      },
       immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
