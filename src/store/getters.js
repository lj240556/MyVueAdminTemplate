const getters = {
  //这个比较简单，做了函数映射，函数直接返回相应的数据。
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
