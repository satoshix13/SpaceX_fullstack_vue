import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from 'jwt-decode'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAuth: false,
    token:"",
    profile:"",
    id:""
  },
  mutations: {
    login(state,token){
      state.isAuth = true
      state.token = token
      const data = jwtDecode(token)
      state.profile = data.profile
      state.id = data.id
    },
    logout(state){
      state.isAuth = false
      state.token = ""
      state.profile = ""
      state.id = ""
    }
  }
})


export default store