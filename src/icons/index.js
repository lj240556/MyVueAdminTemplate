import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
//console.log(req,"this is  require .context")
// requireContext.keys() 返回匹配成功模块的名字组成的数组
// // 通过 requireContext(key)导出文件内容


//(requireContext)=>{
//requireContext.keys().map(requireContext)
//}




//执行结果就是逐项引入模块.
const requireAll22 = requireContext => requireContext.keys().map(requireContext)
//console.log(requireAll22,"this is  require .context")
requireAll22(req)
console.log(req.keys().map(req),"this is  require .map")
console.log(req.keys(),"this is  require .context22222")


//常我们可能会在多个页面require 同一个组件，数量少还行，多了的话就很蛮烦，维护起来也费劲。这个时候require.context 就排上用场了，一次性引入。