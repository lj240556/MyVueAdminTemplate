<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
      <!--transition-group是用来渲染进入/离开 & 列表过渡的动画
      在实现列表过渡时，如果需要过渡的元素是通过v-for渲染出来的，不能使用
           transition 包裹，需要使用 transition-group -->
      <!--若需要为 v-for 循环创建的元素设置动画，必须为每一个元素设置 :key 属性-->
      <!-- 通过监听当前路由的变化，动态更新面包屑的内容。 -->
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <!-- 为空 就显示空的class -->
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <!-- @click.prevent 阻止事件的默认行为， //阻止a标签跳转，仅执行函数 handleLink -->
        <!-- 否则显示 对应的内容 -->
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>

    </transition-group>
  </el-breadcrumb>
</template>

<script>
/*使用pathtoRegexp*/
/*将路径字符串(如/user/:name)转换为正则表达式的工具库，这个只要看下项目的README就大概知道怎么用了。*/
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
     // /* // only show routes with meta.title
     //  /*  /usr/login/info   */
     //  //$route.matched 将会是一个包含从上到下的所有对象    过滤规则是   没有meta则根据meta判断  有meta则根据meta中的title判断 
     //  /*  this.$route.matched  返回的就是当前路由匹配到的组件类*/
      //  /user/info  将会有两个记录   /user      /user/info   匹配到以后  需要过滤 过滤规则是   每个路由下面有个meta字段  必须要有这个meta字段



      //返回只有在router.js的定义的路由  其他路由不需要
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
     
      //拿到第一个路由
      const first = matched[0]

      // console.log(first.redirect,"sssssss1111111122222233333333")
      // 如果第一级目录不是Dashboard /dashboard  因为有可能是/example/table    此时必须则手动加入/dashboard   为了能够显示dashboard面包屑
      if (!this.isDashboard(first)) {
        //手动放入
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
        
      }
      //如果第一个是/dashboard目录   则将该数组赋值给levelList对象
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      // console.log(this.levelList,"sssssss11111111222222333333334444444")
    },
    // 这个是用来判断当前路由是不是Dashboard
    isDashboard(route) {
      // 表示 a && b：如果a是false，那么b不管是true还是false，都返回false，因此不用判断b了，这个时候刚好判断到a，因此返回a。
      //这里的name是路由的名字  配置在router.js
      const name = route && route.name
      //console.log(route,"sssssss11111111222222")
      // 如果name不存在  则返回false
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    ///*这个是来  处理 url 中地址与参数*/
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      // "  params为这种格式  id:123 
      const { params } = this.$route
      console.log(this.$route,"sssssss11111111222222router")
       console.log(path,"sssssss11111111222222path")
      console.log("sssssss11111111222222")
      var toPath = pathToRegexp.compile(path)
      // 这里的toPath为pathToRegexp返回的对象
      return toPath(params)
    },
    //点击事件
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
