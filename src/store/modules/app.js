import Cookies from 'js-cookie'
//这个文件定义了侧边栏的状态，打开或者关闭，以及是否需要动画。并定义对应的操作mutation，以及异步操作action。
const state = {
  sidebar: {
    //“！”是逻辑与运算，并且可以与任何变量进行逻辑与将其转化为布尔值，“!!”则是逻辑与的取反运算，尤其后者在判断类型时代码简洁高效，省去了多次判断null、undefined和空字符串的冗余代码。
    //+xxx表示将xxx隐式转换为Number的值   !xxx表示将xxx隐式转换为Boolean并取反的值  
    //!+xxx +xxx的值只要不报错就肯定是Number类型，Number类型中满足取反之后为true的值只有0和NaN，所以!+xxx就是判断xxx转换为Number后是0或NaN的一个值。
    //一个！是将对象转为布尔型并取反，两个！是将取反后的布尔值再取反，相当于直接将非布尔类型值转为布尔类型值。
    //alert(!!+undefined)//false
    //alert(!!+null)//false
    //alert(!!+0)//false
    //alert(!!+"")//fase
    //alert(!!+"123456sss")//false
    //alert(!!+"123456")//true
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
