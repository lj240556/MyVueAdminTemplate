import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)
//Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。
// Vuex有五大核心概念
// State 可以理解为数据对象，里面包装了各种数据，类比为一个单例模式的对象，里面封装了很多数据
// Getter 可以理解为get函数，从state里获取数据，在这里还可以对原始数据进行一些转换包装后返回
// Mutation 可以理解为update，对state里的数据进行修改
// Action 可以理解为异步操作调度，就是有一个对state操作（mutation）的队列，action相当于把这些操作（mutation）放入该队列，这样可以尽可能的不影响当前操作
// Module 命名空间，一个数据对象有时候太复杂，例如订单数据与员工数据没有关系，强行放一起有些乱，可以分多个模块按其功能对数据进行划分设计多个State，这样也方便认知与解耦

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
