<template>
  <div class="Mange">
    <div class="text-left container parentLinks">
      <div class="row">
        <div style="border-bottom: 1px solid #525252" class="col-12">
          <div
            style="display: flex; justify-content: flex-start; padding: 10px"
            class="Mangament align-items-center"
          >
            <img class="custmoize" src="../Management/Img/pngwing.com.png" />
            <h5 class="spec">{{siteName}}</h5>
          </div>
        </div>
      </div>
      <div class="row">
        <div style="border-bottom: 1px solid #525252" class="col-12">
          <router-link
            :to="{ name: 'editProfile' }"
            style="text-decoration: none"
          >
            <div
              style="display: flex; justify-content: flex-start; padding: 10px"
              class="Mangament align-items-center"
            >
              <img class="custmoize" src="../Management/Img/pngwing.com.png" />
              <h5 class="spec storeTitle">{{ userName }}</h5>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div style="border-bottom: 1px solid #525252" class="col-12">
          <router-link :to="{ name: 'home' }" style="text-decoration: none">
            <div
              style="
                display: flex;
                justify-content: flex-start;
                padding: 10px;
                margin-left: 5px;
              "
              class="Mangament align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'house-chimney']"
                style="margin: 0"
                class="color"
              />
              <h4 class="spec">Dashboard</h4>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div style="border-bottom: 1px solid #525252" class="col-12">
          <router-link
            :to="{ name: 'employeesComp' }"
            style="text-decoration: none"
          >
            <div
              style="
                display: flex;
                justify-content: flex-start;
                padding: 10px;
                margin-left: 5px;
              "
              class="Mangament align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'person']"
                style="margin: 0; font-size: 22px"
                class="color"
              />
              <h4 class="spec">Employess</h4>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div style="border-bottom: 1px solid #525252" class="col-12">
          <router-link
            :to="{ name: 'Categories' }"
            style="text-decoration: none"
          >
            <div
              style="display: flex; justify-content: flex-start; padding: 10px"
              class="Mangament align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'shapes']"
                style="margin: 0; font-size: 22px"
                class="color"
              />
              <h4 class="spec">Categories</h4>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div style="border-bottom: 1px solid #525252" class="col-12">
          <router-link :to="{ name: 'Products' }" style="text-decoration: none">
            <div
              style="display: flex; justify-content: flex-start; padding: 10px"
              class="Mangament align-items-center"
            >
              <FontAwesome
                :icon="['fab', 'product-hunt']"
                style="margin: 0; font-size: 22px"
                class="color"
              />
              <h4 class="spec">Products</h4>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div style="border-bottom: 1px solid #525252" class="col-12">
          <router-link :to="{ name: 'Clints' }" style="text-decoration: none">
            <div
              style="display: flex; justify-content: flex-start; padding: 10px"
              class="Mangament align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'users']"
                style="margin: 0; font-size: 22px"
                class="color"
              />
              <h4 class="spec">Clints</h4>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div style="border-bottom: 1px solid #525252" class="col-12">
          <router-link :to="{name:'settings'}" style="text-decoration: none">
            <div
              style="display: flex; justify-content: flex-start; padding: 10px"
              class="Mangament align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'gears']"
                style="margin: 0; font-size: 22px"
                class="color"
              />
              <h4 class="spec">Settings</h4>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div style="border-bottom: 1px solid #525252" class="col-12">
          <router-link :to="{ name: 'NewOrder' }" style="text-decoration: none">
            <div
              style="display: flex; justify-content: flex-start; padding: 10px"
              class="Mangament align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'cart-plus']"
                style="margin: 0; font-size: 22px"
                class="color"
              />

              <h4 class="spec">New Order</h4>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div style="border-bottom: 1px solid #525252" class="col-12">
          <router-link :to="{ name: 'ordres' }" style="text-decoration: none">
            <div
              style="display: flex; justify-content: flex-start; padding: 10px"
              class="Mangament align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'cart-shopping']"
                style="margin: 0; font-size: 22px"
                class="color"
              />
              <h4 class="spec">Orders</h4>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions,mapState } from "vuex";
  export default {
    name: "mangeComp",
    data() {
      return {
        userid: "",
      };
    },
    mounted() {
      let user = window.localStorage.getItem("user-info");
      if (user) {
        this.userid = JSON.parse(user).id;
        this.getDetails()
      } else {
        this.redirectTo({ val: "login" });
      }
    },
    computed :{
      ...mapState({
            siteName: state => state.siteName,
            userName: state => state.userName
        })
    },
    methods: {
      ...mapActions(["redirectTo"]),
      getDetails(){
        this.$store.commit('getDetails',{userid:this.userid})
      }
    },
  };
</script>
<style>
  .custmoize {
    max-width: 100%;
    width: 30px;
  }
  .color {
    color: #b9b9b9;
  }
  .spec {
    margin-bottom: 0px;
    color: #b8bbc3;
    font-weight: bold;
    font-size: 15px;
    margin-left: 12px;
  }
  .row {
    margin-bottom: 10px;
  }
  .parentLinks {
    background-color: #3d4149;
    height: 64rem;
  }
  .storeTitle {
    font-size: 14px;
  }
</style>
