<template>
  <div class="home container">
    <div class="row">
      <div class="col col-2">
        <mangeComp />
      </div>
      <div class="col col-10">
        <navBar />
        <Dashboard />
      </div>
    </div>
  </div>
</template>
<script>
import mangeComp from "@/components/Management/mangeComp.vue"; 
import navBar from "@/components/Navbar/navBar.vue";
import Dashboard from "@/components/Dashboard/Dashboard.vue";
// @ is an alias to /src
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "HomeView",
  data(){
    return {
      name:"",
      userid:"",
    }
  },
  components:{
    mangeComp,
    navBar,
    Dashboard
  },
async  mounted(){
    let user = window.localStorage.getItem("user-info")
    if(user){ 
      this.name = JSON.parse(user).Name
      this.userid = JSON.parse(user).id;

    }else {
      this.redirectTo({val:'login'})
    }
  },
  methods : {
    ...mapActions(["redirectTo"]),

  }
};
</script>
