<template>
  <div class="container">
    <div class="row">
      <div class="col col-2">
        <mangeComp />
      </div>
      <div class="col col-10">
        <navBar />
        <div class="text d-flex justify-content-between">
          <h1 class="text-start">Categories</h1>
          <h4 class="d-flex align-items-center mb-0">
            {{ bath }} / Dashboard
          </h4>
        </div>
        <div class="parent">
          <div class="input-group w-50 col-6">
            <input
              v-model="value"
              type="search"
              class="form-control rounded cutomize"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <button @click="searchData" type="button" class="btn btn-primary">search</button>
          </div>
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Add New Category
          </button>

          <!-- Modal -->
          <div
            class="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    Add New Category
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="row g-3 align-items-center">
                    <div style="position: relative" class="d-block mx-auto">
                      <input
                        required
                        type="text "
                        class="form-control"
                        placeholder="Enter Your Name"
                        v-model.trim="name"
                      />
                      <FontAwesome
                        :icon="['fas', 'address-card']"
                        style="margin: 0"
                        class="name"
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary close"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    @click="addCategory()"
                    type="button"
                    class="btn btn-primary"
                  >
                    Add
                  </button>
                  <div
                    style="width: 350px; margin: 20px auto"
                    class="alert alert-success special"
                    role="alert"
                    v-if="sucessMessage"
                  >
                    {{ sucessMessage }}
                  </div>
                  <div
                    style="width: 350px; margin: 20px auto"
                    class="alert alert-danger special"
                    role="alert"
                    v-if="ErrorMessage"
                  >
                    {{ ErrorMessage }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th style="width: 40px;" scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr v-for="(cat, i) in search" :key="i">
              <td>
                {{ i + 1 }}
              </td>
              <td>
                {{ cat.CategoryName }}
              </td>
              <td>
                <button
                  @click="getId(cat.id,i)"
                  class="btn btn-primary "
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrob"
                >
                  Edit
                  <FontAwesome
                    :icon="['fas', 'pen-to-square']"
                    style="margin: 0"
                  />
                </button>
                <!-- Modal -->
                <div
                  class="modal fade"
                  id="staticBackdrob"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdrobLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdrobLabel">
                          Edit Category
                        </h5>
                        <button
                          type="button"
                          id="closed1"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div class="row g-3 align-items-center">
                          <div
                            style="position: relative"
                            class="d-block mx-auto"
                          >
                            <input
                              required
                              type="text "
                              class="form-control"
                              placeholder="Enter Your New Name"
                              v-model.trim="name"
                            />
                            <FontAwesome
                              :icon="['fas', 'address-card']"
                              style="margin: 0"
                              class="name"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary close"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          @click="editCategory()"
                          type="button"
                          class="btn btn-primary"
                        >
                          Add
                        </button>
                        <div
                          style="width: 350px; margin: 20px auto"
                          class="alert alert-success special"
                          role="alert"
                          v-if="sucessMessage"
                        >
                          {{ sucessMessage }}
                        </div>
                        <div
                          style="width: 350px; margin: 20px auto"
                          class="alert alert-danger special"
                          role="alert"
                          v-if="ErrorMessage"
                        >
                          {{ ErrorMessage }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  @click="getId(cat.id,i)"
                  class="btn btn-danger mx-2"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrob1"
                >
                  Delete
                  <FontAwesome :icon="['fas', 'trash']" style="margin: 0" />
                </button>
                  <!-- Modal -->
                  <div
                  class="modal fade"
                  id="staticBackdrob1"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdrob1Label"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdrob1Label">
                          Delete Category
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
                        <div class="row g-3 align-items-center">
                          <div
                            style="position: relative"
                            class="d-block mx-auto"
                          >
                          <h4 class="text-danger">Are You Sure To Delete This Category</h4>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary close"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          @click="deleteCategory()"
                          type="button"
                          class="btn btn-danger"
                        >
                          Remove
                        </button>
                        <div
                          style="width: 350px; margin: 20px auto"
                          class="alert alert-success special"
                          role="alert"
                          v-if="sucessMessage"
                        >
                          {{ sucessMessage }}
                        </div>
                        <div
                          style="width: 350px; margin: 20px auto"
                          class="alert alert-danger special"
                          role="alert"
                          v-if="ErrorMessage"
                        >
                          {{ ErrorMessage }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                &nbsp;&nbsp;&nbsp;
                <button
                  @click="getId(cat.id,i),getData()"
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
                            class="d-flex mx-auto justify-content-around"
                          >
                          <span class="align-items-center"> 
                            <h3  class="d-flex align-items-center mb-0">Name: <h4  style="margin: 0 5px;"> {{Name}}</h4></h3>
                          </span>
                          <span class="align-items-center" >
                            <h3 class="d-flex align-items-center mb-0">ID :  <h4  style="margin: 0 5px;">{{Id}}</h4></h3>

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
              <div class=" card-footer pb-0 pt-3">
    </div>
      </div>
    </div>
  </div>
</template>
<script>
  import navBar from "@/components/Navbar/navBar.vue";
  import mangeComp from "@/components/Management/mangeComp.vue";
  import { mapActions } from "vuex";
  import axios from "axios";
  export default {
    name: "Categories",
    data() {
      return {
        bath: "",
        name: "",
        value: "",
        userid: "",
        sucessMessage: "",
        categoriesList: [],
        ErrorMessage: "",
        catId: "",
        index : "",
        Name:"",
        Id:"",
      };
    },
    components: {
      navBar,
      mangeComp,
    },
    async mounted() {
      this.bath = this.$route.fullPath.slice(1);
      let user = window.localStorage.getItem("user-info");
      if (user) {
        this.userid = JSON.parse(user).id;
      } else {
        this.redirectTo({ val: "login" });
      }
      let categories = await axios.get(
        `http://localhost:3000/Categories?userId=${this.userid}`
      );
      if (categories.status === 200) {
        this.categoriesList = categories.data;
      }
    },
    computed : {
      search(){
        if(this.value.trim().length>0){
          return this.categoriesList.filter((categories)=>categories.CategoryName.includes(this.value.trim().toLowerCase()))
        }else {
          return this.categoriesList
        }
      }
    },
    methods: {
      ...mapActions(["redirectTo"]),
      async addCategory() {
        if (this.name !== "") {
          let categories = await axios.get(
            `http://localhost:3000/Categories?CategoryName=${this.name}`
          );
          if (categories.status === 200 && categories.data.length < 1) {
            let result = await axios.post(`http://localhost:3000/Categories`, {
              CategoryName: this.name.toLowerCase(),
              userId: this.userid,
            });
            if (result.status === 201) {
              this.sucessMessage = "The category has been added successfully";
              this.ErrorMessage = "";
              this.name = "";
              this.categoriesList.push(result.data);
              setTimeout(() => {
                document.querySelector(".close").click();
                this.sucessMessage = "";
              }, 1000);
            } else {
              this.sucessMessage = "Error 404";
            }
          } else {
            this.ErrorMessage = "This Category already exists";
            setTimeout(() => {
              this.ErrorMessage = "";
            }, 1000);
            if (this.name === categories.data[0].CategoryName) {
              this.name = "";
            }
          }
        } else {
          this.sucessMessage = "";
          this.ErrorMessage = "You Must Write Name";
        }
      },
      getId(id,index) {
        this.catId = id;
        this.index = index
      },
      async editCategory() {
        if (this.name !== "") {
          let categories = await axios.get(
            `http://localhost:3000/Categories?CategoryName=${this.name}`
          );
          if (categories.status === 200 && categories.data.length < 1) {
            let result = await axios.put(
              `http://localhost:3000/Categories/${this.catId}`,
              {
                CategoryName: this.name,
                userId: this.userid,
              }
            );
            if (result.status === 200) {
              this.sucessMessage = "The category has been Edited successfully";
              this.ErrorMessage = "";
              this.categoriesList[this.index].CategoryName = this.name
              console.log(this.categoriesList[this.index])
              setTimeout(() => {
                document.getElementById("closed1").click();
                this.name=""
                this.sucessMessage = "";
              }, 1000);
            } else {
              this.sucessMessage = "Error 404";
            }
          } else {
            this.ErrorMessage = "This Category already exists";
            setTimeout(() => {
              this.ErrorMessage = "";
            }, 1000);
            if (this.name === categories.data[0].CategoryName) {
              this.name = "";
            }
          }
        } else {
          this.sucessMessage = "";
          this.ErrorMessage = "You Must Write Name";
        }
      },
      async deleteCategory  () {
        console.log(this.index)
        let result = await axios.delete(`http://localhost:3000/Categories/${this.catId}`)
        if(result.status == 200){
          this.sucessMessage = 'Category Is Deleted'
          this.ErrorMessage = ''
          this.categoriesList.splice(this.index,1)
          setTimeout(() => {
            document.getElementById("closed").click()
            this.sucessMessage = ''
            }, 1000);
        }else {
          this.ErrorMessage = 'Eror 404'
          this.sucessMessage = ''
        } 
      },
      getData(){
        this.Name = this.categoriesList[this.index].CategoryName
        this.Id = this.categoriesList[this.index].id
      }
    },
  };
</script>
<style scoped>
  .form-control {
    border-radius: 0 !important;
    border-top-left-radius: 5px !important;
    border-bottom-left-radius: 5px !important;
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
  .name {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 20px;
  }
  span {
    display: flex;
  }
  h3 {
    display:flex;
  }
  tr,th,td {
    border: 1px solid #f4e9e9;
  }
</style>
