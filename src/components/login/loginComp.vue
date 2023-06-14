<template>
  <div class="login">
    <h1 style="color:#727272">Login</h1>
    <form class="form" @click.prevent>
      <h3 class="head" style="font-size: 18px;">Login In To Start Your Session</h3>
      <div class="row g-3 align-items-center">
        <div style="position: relative;" class=" d-block mx-auto w-1">
          <input
            type="Email "
            class="form-control"
            placeholder="Enter Your Email"
            v-model="state.email"
            
          />
          <FontAwesome :icon="['fas', 'envelope']" style="margin: 0;" class="email" />
          <span class="error-feedback mt-3 d-block fs-5" v-if="v$.email.$error">{{
            v$.email.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div style="position: relative;" class=" d-block mx-auto">
          <input
            type="password"
            autocomplete="on"
            class="form-control"
            placeholder="Enter Your Password"
            v-model="state.pass"
          />
          <FontAwesome :icon="['fas', 'lock']" style="margin: 0;" class="email" />
          <span class="error-feedback mt-3 d-block fs-5" v-if="v$.pass.$error">{{
            v$.pass.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class=" d-block ">
          <button style="width: 100%; margin-bottom: 20px;" type="submit" @click="userLogin()" class="btn btn-primary ">
            Login
          </button>
          <button
            type="submit"
            @click="redirectTo({ val: 'signUp' })"
            class="btn text-light sign"
          >
            SignUp
          </button>
          <router-link :to="{name:'shipment'}">
            <button
            type="submit"
            class="btn text-light sign mt-4 bg-success"
          >
            Track the shipment
          </button>
          </router-link>
        </div>
      </div>
      <br />
    </form>
    <div style="width: 350px; margin: 20px auto;" class="alert alert-success special" role="alert" v-if="sucessMessage">
      {{sucessMessage}}
    </div>
    <div style="width: 350px; margin: 20px auto;" class="alert alert-danger special" role="alert" v-if="ErrorMessage">
      {{ErrorMessage}}
    </div>
  </div>
</template>
<script>
  import { mapActions } from "vuex";
  import useValidate from "@vuelidate/core";
  import { required, email } from "@vuelidate/validators";
  import { reactive, computed } from "vue";
  import axios from "axios";
  export default {
    name: "loginComp",
    // Compisition Api
    setup() {
      // State Data
      const state = reactive({
        email: "",
        pass: "",
      });
      // Validations
      const rules = computed(() => {
        // must return object
        return {
          email: { required, email },
          pass: { required },
        };
      });
      const v$ = useValidate(rules, state);
      return {
        state,
        v$,
      };
    },
    data() {
      return {
        Message:"",
        sucessMessage:"",
        ErrorMessage:""
      };
    },
    methods: {
      ...mapActions(["redirectTo"]),
      async userLogin() {
        this.v$.$validate();
      if (!this.v$.$error) {
          let result = await axios.get(`http://localhost:3000/users/?Email=${this.state.email}&Password=${this.state.pass}`)
          if(result.status === 200 && result.data.length > 0){
            window.localStorage.setItem("user-info",JSON.stringify(result.data[0]))
            this.sucessMessage = "Log In Is successfully"
            this.ErrorMessage=""
            setTimeout(()=>{

              this.redirectTo({val:'home'})
            },1000)
          }else {
              this.ErrorMessage = "User Not Valid "
              this.sucessMessage = ""
          }
        }
      }

    },
  };
</script>

<style>
  .img {
    width: 16px;
    margin-bottom: 3px;
    margin: 0 3px 1px 0;
  }
  .form {
    background-color: #fdfdfd;
    width: 400px;
    margin: auto;
    padding: 20px 20px 0 20px ;
    box-shadow: 0px 0px 1px 1px #c5b6b6;
  }
  .email {
    margin: 0px;
    position: absolute;
    top: 10px;
    right: 16px;
  }
  .sign {
    background-color: #F44336 !important;
    width: 100%;
  }
  .head {
    font-size: 19px;
    color: #6e6d6d;
    font-weight: 400;
    margin-bottom: 20px;
  }
</style>
