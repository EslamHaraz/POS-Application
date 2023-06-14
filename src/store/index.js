import { createStore } from "vuex";
import router from "@/router/index";
import axios from "axios";
const state = {
  siteName: "",
  userName: "",
}
const getters = {}
const mutations = {
  // Payload Used To Send Data 
  redirectTo(state,payload) {
    router.push({name:payload})
  },
  editSuserName(state,payload) {
    state.userName = payload.Name
  },
  editSiteName(state,payload) {
    state.siteName = payload.Name
  },
  async getDetails(state,payload) {
    let result = await axios.get(`http://localhost:3000/users/${payload.userid}`)  
    if(result.status == 200){
      state.siteName = result.data.SiteName
      state.userName = result.data.Name
    } 
  } 
}
const actions = {
  redirectTo({commit},payload) {
    commit("redirectTo",payload.val)
  }
} 
export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
