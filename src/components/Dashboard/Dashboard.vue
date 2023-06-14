<template>
    <div class="container">
        <div class="text d-flex     justify-content-between " >
          <h1 class="text-start">Home</h1>
          <h4 class="d-flex align-items-center" style="margin-bottom: 0;">Home / Dashboard</h4>
        </div>
        <div class="User details">
            <div class="row     justify-content-between">
                <div class="box" style="background-color: #1891b3; width: 24%;">
                    <span class="text-start text-light">
                        <h3 class="bold">{{clints.length}}</h3>
                        <h5>Clints</h5>
                    </span>
                    <FontAwesome
                :icon="['fas', 'users']"
                style="margin: 0;"
                class="icon"
              />
                </div>
                <div class="box" style="background-color: #299049; width: 24%;">
                    <span class="text-start text-light">
                        <h3 class="bold">{{products.length}}</h3>
                        <h5>Products</h5>
                    </span>
                    <FontAwesome
                :icon="['fab', 'product-hunt']"
                style="margin: 0;"
                class="icon"
              />
                </div>
                <div class=" bg-warning box" style="width: 24%;">
                    <span class="text-start text-dark">
                        <h3 class="bold">{{ordres.length}}</h3>
                        <h5>Orders</h5>
                    </span>
                    <FontAwesome
                :icon="['fas', 'cart-shopping']"
                style="margin: 0;"
                class="icon"
              />
                </div>
                <div class=" bg-danger box" style="width: 24%;">
                    <span class="text-start text-light">
                        <h3 class="bold">{{Categories.length}}</h3>
                        <h5>Categories</h5>
                    </span>
                    <FontAwesome
                :icon="['fas', 'shapes']"
                style="margin: 0;"
                class="icon"
              />
                </div>
            </div>
        </div>
        <div class="row" style="background-color: white;">
            <div class="col-12" style="border-bottom: 1px solid #ddd; margin-bottom: 20px;">
                <div class="access">
                    <div class="quick " style="padding: 7px">
                        <span class="cutsmoize">
                            <FontAwesome
                            :icon="['fas', 'person-running']"
                            style="margin: 0; font-size: 20px;"
                            class=""
                          />
                          <p style="margin: 0; font-weight: 600;">Quick Access</p>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div >
                    <router-link :to="{name:'NewOrder'}" style="text-decoration: none;" >
                                <div class="box auick" >
                                    <h4 style="margin: auto;">New Order</h4>
                                </div>
                            </router-link>
                </div>
            </div>
            <div class="col-4">
                <div >
                    <router-link :to="{name:'ordres'}" style="text-decoration: none;" >
                                <div class="box auick" >
                                    <h4 style="margin: auto;">access Order</h4>
                                </div>
                            </router-link>
                </div>
            </div>
            <div class="col-4">
                <div >
                    <router-link :to="{name:'Clints'}" style="text-decoration: none;" >
                                <div class="box auick" >
                                    <h4 style="margin: auto;">access Clints</h4>
                                </div>
                            </router-link>
                </div>
            </div>
            <div class="col-4">
                <div >
                    <router-link :to="{name:'employeesComp'}" style="text-decoration: none;" >
                                <div class="box auick" >
                                    <h4 style="margin: auto;">access Employees</h4>
                                </div>
                            </router-link>
                </div>
            </div>
            <div class="col-4">
                <div >
                    <router-link :to="{name:'Categories'}" style="text-decoration: none;" >
                                <div class="box auick" >
                                    <h4 style="margin: auto;">access Categories</h4>
                                </div>
                            </router-link>
                </div>
            </div>
            <div class="col-4">
                <div >
                    <router-link :to="{name:'Products'}" style="text-decoration: none;" >
                                <div class="box auick" >
                                    <h4 style="margin: auto;">access Products</h4>
                                </div>
                            </router-link>
                </div>
            </div>
        </div>
      </div>
      <!-- <p>solid <FontAwesome icon="coffee" /> </p>
      <p>solid <FontAwesome :icon="['fas','envelope']" /> </p> -->
  </template>
  <script>
  import mangeComp from "@/components/Management/mangeComp.vue"; 
  import navBar from "@/components/Navbar/navBar.vue";
  // @ is an alias to /src
  import { mapActions } from "vuex";
  import axios from "axios";
  export default {
    name: "Dashboard",
    data(){
      return {
        name:"",
        userid:"",
        bath:"",
        Categories:[],
        products:[],
        clints:[],
        ordres:[],
      }
    },
    components:{
      mangeComp,
      navBar,
    },
  async  mounted(){
   this.bath = this.$route.path.slice(1)
      let user = window.localStorage.getItem("user-info")
      if(user){ 
        this.name = JSON.parse(user).Name
        this.userid = JSON.parse(user).id;
      }else {
        this.redirectTo({val:'login'})
      }
      let result = await axios.get(`http://localhost:3000/Categories?userId=${this.userid}`) 
      if(result.status == 200){
        this.Categories = result.data
      }
      let products = await axios.get(`http://localhost:3000/Products?userId=${this.userid}`) 
      if(products.status == 200){
        this.products = products.data
      }
      let clints = await axios.get(`http://localhost:3000/Clints?userId=${this.userid}`) 
      if(clints.status == 200){
        this.clints = clints.data
      }
      let ordres = await axios.get(`http://localhost:3000/Orders?userId=${this.userid}`) 
      if(ordres.status == 200){
        this.ordres = ordres.data
      }
    },
    methods : {
      ...mapActions(["redirectTo"])
    }
  };
  </script>
<style>
.box {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px
}
.icon {
    font-size: 60px;
    opacity: 0.4;
}
.bold {
    font-weight: bold
}
.access {
    background-color: white;
    border-radius: 4px;
}
.cutsmoize {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: 15px;
    width: 150px;
}
.auick {
    background-color: #c0bfc0;
    color: black;
    margin-bottom: 25px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 2px #a19f9f;
}
</style>
  