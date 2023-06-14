<template>
  <div class="employees container">
    <div class="row">
      <div class="col col-2">
        <mangeComp />
      </div>
      <div class="col col-10">
        <navBar />
        <div class="text d-flex justify-content-between">
          <h1 class="text-start">Employees</h1>
          <h4 class="d-flex align-items-center" style="margin-bottom: 0">
            {{ bath }} / Dashboard
          </h4>
        </div>
        <div class="parent">
          <div class="input-group" style="width: 50%">
            <input
              v-model="value"
              @keyup="searchData()"
              type="search"
              class="form-control rounded cutomize"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              style=""
            />
            <button type="button" class="btn btn-primary">search</button>
          </div>
          <router-link :to="{ name: 'addEmployee' }">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add New Employee
            </button>
          </router-link>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Jop_Title</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr v-for="(employee, index) in search" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ search[index].Name }}</td>
              <td>{{ search[index].Email }}</td>
              <td>{{ search[index].Jop }}</td>
              <td>
                <router-link
                  style="text-decoration: none"
                  :to="{
                    name: 'editEmployee',
                    params: { employeeId: employee.id },
                  }"
                >
                  <button class="btn btn-primary">
                    Edit
                    <FontAwesome
                      :icon="['fas', 'pen-to-square']"
                      style="margin: 0"
                    />
                  </button>
                  &nbsp;&nbsp;&nbsp;
                </router-link>
                <router-link
                  :to="{
                    name: 'DeleteEmloyee',
                    params: { employeeId: employee.id },
                  }"
                  style="text-decoration: none"
                >
                  <button class="btn btn-danger">
                    Delete
                    <FontAwesome :icon="['fas', 'trash']" style="margin: 0" />
                  </button>
                  &nbsp;&nbsp;&nbsp;
                </router-link>

              <button
                  @click="getId(employee.id,index),getData()"
                  class="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrob12"
                >
                  Show
                  <FontAwesome :icon="['fas', 'eye']" style="margin: 0" />
                </button>
                <div
                  class="modal fade"
                  id="staticBackdrob12"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdrob1Label2"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdrob1Label2">
                          Details
                        </h5>
                        <button
                          type="button"
                          id="closed"
                          class="btn-close "
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div class="row g-3 align-items-center ">
                          <div
                            style="position: relative"
                            class="d-flex mx-auto justify-content-around flex-column"
                          >
                          <span class="align-items-center mb-3 d-block"> 
                            <h3  class="d-flex align-items-center mb-0">Name: <h5  style="margin: 0 5px;">{{name}}</h5></h3>
                          </span>
                          <span class="align-items-center mb-3 d-block" >
                            <h3 class="d-flex align-items-center mb-0">Email :  <h5  style="margin: 0 5px;">{{email}}</h5></h3>
                          </span>
                          <span class="align-items-center mb-3 d-block" >
                            <h3 class="d-flex align-items-center mb-0">Jop  :  <h5  style="margin: 0 5px;">{{jop}}</h5></h3>
                          </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                &nbsp;&nbsp;&nbsp;
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <p>solid <FontAwesome icon="coffee" /> </p>
    <p>solid <FontAwesome :icon="['fas','envelope']" /> </p> -->
  </div>
</template>
<script>
  import mangeComp from '../Management/mangeComp.vue';
  import { mapActions } from 'vuex';
  import navBar from '../Navbar/navBar.vue';
  import axios from 'axios';
  export default {
      name:"employeesComp",
      data(){
        return {
          userid:"",
          bath:"",
          Employees:[],
          value:'',
          employee:"",
          index:"",
          name:"",
          jop:"",
          email:"",
      }
      },
      components :{
          mangeComp,
          navBar,
      },
    async  mounted(){
      this.bath = this.$route.fullPath.slice(1)
        let user = window.localStorage.getItem("user-info");
        if (user) {
          this.userid = JSON.parse(user).id;
        } else {
          this.redirectTo({ val: "login" });
        }
        let result = await axios.get(`http://localhost:3000/Employees?userId=${this.userid}`)
        if(result.status === 200 && result.data.length > 0){
          this.Employees= result.data
        }
      },
      computed : {
      search(){
        if(this.value.trim().length>0){
          return this.Employees.filter((Employees)=>Employees.Name.includes(this.value.trim().toLowerCase()))
        }else {
          return this.Employees
        }
      }
    },
      methods:{
        ...mapActions(["redirectTo"]),
        getId(id,index) {
        this.employee = id;
        this.index = index
      },
      getData(){
      this.name =  this.Employees[this.index].Name
      this.email =  this.Employees[this.index].Email
      this.jop =  this.Employees[this.index].Jop
      }
      }
  }
</script>
<style scoped>
  .form-control {
    border-radius: 0 !important;
    border-top-left-radius: 5px !important;
    border-bottom-left-radius: 5px !important;
    width: 50% !important;
  }
  .parent {
    display: flex;
    justify-content: space-around;
    background-color: white;
    padding: 15px;
    border-top-left-radius: 5px;
    border-top: 4px solid #0d6efd;
    border-top-right-radius: 5px;
    border-bottom: 1px solid #ddd;
  }
  .table {
    background-color: white;
    border: 1px solid #fdf6f6;
  }
  tr,th,td {
    border: 1px solid #f4e9e9;
  }
  span {
    display: flex;
  }

  h3 {
    display:flex;
  }
</style>
