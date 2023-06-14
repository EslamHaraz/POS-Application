<template>
  <div class="container">
    <div class="row">
      <div class="col col-2">
        <mangeComp />
      </div>
      <div class="col col-10">
        <navBar />
        <div class="text d-flex justify-content-between">
          <h1 class="text-start">Clints</h1>
          <h4 class="d-flex align-items-center" style="margin-bottom: 0">
            {{ bath }} / Dashboard
          </h4>
        </div>
        <div class="parent">
          <div class="input-group" style="width: 50%">
            <input
              v-model="value"
              type="search"
              class="form-control rounded cutomize"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              style=""
            />
            <button @click="searchData" type="button" class="btn btn-primary">
              search
            </button>
          </div>
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Add New Clint
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
                    Add New Clint
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
                    <h5 class="text-start mb-0">Name</h5>
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
                  <div class="row g-3 align-items-center">
                    <h5 class="text-start mb-0">Address</h5>
                    <div style="position: relative" class="d-block mx-auto">
                      <input
                        required
                        type="text "
                        class="form-control"
                        placeholder="Enter Your Address"
                        v-model.trim="address"
                      />
                      <FontAwesome
                        :icon="['fas', 'house']"
                        style="margin: 0"
                        class="name"
                      />
                    </div>
                  </div>
                  <div class="row g-3 align-items-center">
                    <h5 class="text-start mb-0">Phone</h5>
                    <div style="position: relative" class="d-block mx-auto">
                      <input
                        required
                        type="number"
                        class="form-control"
                        placeholder="Enter Your Phone"
                        v-model.trim="phone"
                      />
                      <FontAwesome
                        :icon="['fas', 'phone']"
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
                    @click="addClint()"
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
        <table class="table table-striped text-start">
          <thead>
            <tr>
              <th style="width: 40px" scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">info</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr v-for="(clint, index) in search" :key="index">
              <td>
                {{ index + 1 }}
              </td>
              <td>
                {{ search[index].Name }}
              </td>
              <td>
                {{ search[index].Address }}
                <span>
                  {{ search[index].Phone }}
                </span>
              </td>
              <td>
                <button
                  @click="getId(clint.id, index), getOrder(index),getData(index)"
                  class="btn btn-primary"
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
                          Edit Clint
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
                          <h5 class="text-start mb-0">Name</h5>
                          <div
                            style="position: relative"
                            class="d-block mx-auto"
                          >
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
                        <div class="row g-3 align-items-center">
                          <h5 class="text-start mb-0">Address</h5>
                          <div
                            style="position: relative"
                            class="d-block mx-auto"
                          >
                            <input
                              required
                              type="text "
                              class="form-control"
                              placeholder="Enter Your Address"
                              v-model.trim="address"
                            />
                            <FontAwesome
                              :icon="['fas', 'house']"
                              style="margin: 0"
                              class="name"
                            />
                          </div>
                        </div>
                        <div class="row g-3 align-items-center">
                          <h5 class="text-start mb-0">Phone</h5>
                          <div
                            style="position: relative"
                            class="d-block mx-auto"
                          >
                            <input
                              required
                              type="number"
                              class="form-control"
                              placeholder="Enter Your Phone"
                              v-model.trim="phone"
                            />
                            <FontAwesome
                              :icon="['fas', 'phone']"
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
                          @click="editClint()"
                          type="button"
                          class="btn btn-primary"
                        >
                          Add
                        </button>
                        <div
                          style="width: 350px; margin: 20px auto"
                          class="alert alert-success special text-center"
                          role="alert"
                          v-if="sucessMessage"
                        >
                          {{ sucessMessage }}
                        </div>
                        <div
                          style="width: 350px; margin: 20px auto"
                          class="alert alert-danger special text-center"
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
                  @click="getId(clint.id, index)"
                  class="btn btn-danger"
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
                          Delete Clint
                        </h5>
                        <button
                          type="button"
                          id="closed"
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
                            <h4 class="text-danger">
                              Are You Sure To Delete This Clint ?
                            </h4>
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
                          @click="deleteClint()"
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
                  @click="getId(clint.id, index), getData(index)"
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
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div class="row g-3 align-items-center">
                          <div
                            style="position: relative"
                            class="mx-auto justify-content-around"
                          >
                            <span class="align-items-center mb-3">
                              <h4 class="d-flex align-items-center mb-0">
                                Name:
                                <h4 style="margin: 0 5px; font-size: 20px">
                                  {{ Name }}
                                </h4>
                              </h4>
                            </span>
                            <span class="align-items-center mb-3">
                              <h4 class="d-flex align-items-center mb-0">
                                Address:
                                <h4 style="margin: 0 5px; font-size: 20px">
                                  {{ Address }}
                                </h4>
                              </h4>
                            </span>
                            <span class="align-items-center">
                              <h4 class="d-flex align-items-center mb-0">
                                Phone :
                                <h4 style="margin: 0 5px; font-size: 20px">
                                  {{ Phone }}
                                </h4>
                              </h4>
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
  </div>
</template>
<script>
  import navBar from "@/components/Navbar/navBar.vue";
  import mangeComp from "@/components/Management/mangeComp.vue";
  import useValidate from "@vuelidate/core";
  import { required } from "@vuelidate/validators";
  import { mapActions } from "vuex";
  import axios from "axios";
  export default {
    name: "Clints",
    data() {
      return {
        v$: useValidate(),
        bath: "",
        name: "",
        value: "",
        address: "",
        userid: "",
        phone: "",
        sucessMessage: "",
        clintsList: [],
        orders: [],
        ErrorMessage: "",
        clintId: "",
        index: "",
        listOfId: [],
        listOforders: [],
        Name: "",
        Address: "",
        Phone: "",
      };
    },
    validations() {
      return {
        name: { required },
        address: { required },
        phone: { required },
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
      let result = await axios.get(`http://localhost:3000/Clints?userId=${this.userid}`);
      if (result.status === 200) {
        this.clintsList = result.data;
      }
      for (let i = 0; i < this.clintsList.length; i++) {
        let clintOrder = await axios.get(
          `http://localhost:3000/Orders?clintName=${this.clintsList[i].Name}`
        );
        if (clintOrder.status == 200) {
          this.orders.push(clintOrder.data);
        }
      }
    },
    computed: {
      search() {
        if (this.value.trim().length > 0) {
          return this.clintsList.filter((clint) =>
            clint.Name.includes(this.value.trim().toLowerCase())
          );
        } else {
          return this.clintsList;
        }
      },
    },
    methods: {
      ...mapActions(["redirectTo"]),
      async addClint() {
        this.v$.$validate();
        if (this.name !== "") {
          let clints = await axios.get(
            `http://localhost:3000/Clints?Name=${this.name}`
          );
          if (!this.v$.$error) {
            if (clints.status === 200 && clints.data.length < 1) {
              let result = await axios.post(`http://localhost:3000/Clints`, {
                Name: this.name.toLowerCase(),
                Address: this.address,
                Phone: this.phone,
                userId: this.userid,
              });
              if (result.status === 201) {
                this.sucessMessage = "The Clint has been added successfully";
                this.ErrorMessage = "";
                this.clintsList.push(result.data);
                (this.name = ""),
                  (this.address = ""),
                  (this.phone = ""),
                  setTimeout(() => {
                    document.querySelector(".close").click();
                    this.sucessMessage = "";
                  }, 1000);
              } else {
                this.sucessMessage = "Error 404";
              }
            } else {
              this.ErrorMessage = "This Clint already exists";
              setTimeout(() => {
                this.ErrorMessage = "";
              }, 1000);
            }
          }
        } else {
          this.sucessMessage = "";
          this.ErrorMessage = "You Must Write Data";
        }
      },
      getId(id, index) {
        this.clintId = id;
        this.index = index;
      },
      getOrder(val) {
        this.listOfId = [];
        this.listOforders = [];
        for (let i = 0; i < this.orders.length; i++) {
          if (this.orders[val][i]) {
            this.listOfId.push(this.orders[val][i].id);
            this.listOforders.push(this.orders[val][i]);
          }
        }
      },
      async editClint() {
        this.v$.$validate();
        if (!this.v$.$error) {
        if (this.name !== "") {
          let clints = await axios.get(
            `http://localhost:3000/Clints?Name=${this.name}`
          );

          if (clints.status === 200 && clints.data.length < 1) {
            let result = await axios.put(
              `http://localhost:3000/clints/${this.clintId}`,
              {
                Name: this.name.toLowerCase(),
                Address: this.address,
                Phone: this.phone,
                userId: this.userid,
              }
            );
            if (result.status === 200) {
              if (this.listOfId.length > 0) {
                for (let i = 0; i < this.listOfId.length; i++) {
                  let ordersEdit = await axios.put(
                    `http://localhost:3000/Orders/${this.listOfId[i]}`,
                    {
                      clintName: this.name.toLowerCase(),
                      clintPhone: this.phone,
                      clintAddress: this.address,
                      Note: this.listOforders[i].Note,
                      status: this.listOforders[i].status,
                      discount: this.listOforders[i].discount,
                      totalPrice: this.listOforders[i].totalPrice,
                      userId:this.userid,
                      orderId: this.listOforders[i].orderId,
                      orders: this.listOforders[i].orders,
                    }
                  );
                  if( ordersEdit.status == 200 ){
                    console.log(`Edited`)
                  }
                }
              }
              this.sucessMessage = "The Clint has been Edited successfully";
              this.ErrorMessage = "";
              this.clintsList[this.index] = result.data;
              setTimeout(() => {
                document.getElementById("closed1").click();
                this.name = "";
                this.sucessMessage = "";
              }, 1000);
            } else {
              this.sucessMessage = "Error 404";
            }
          } else {
            this.ErrorMessage = "This clint already exists";
            setTimeout(() => {
              this.ErrorMessage = "";
            }, 1000);
            if (this.name === clints.data[0].Name) {
              this.name = "";
            }
          }
        } else {
          this.sucessMessage = "";
          this.ErrorMessage = "You Must Write Name";
        }
      }
      },
      async deleteClint() {
        let result = await axios.delete(
          `http://localhost:3000/Clints/${this.clintId}`
        );
        if (result.status == 200) {
          this.sucessMessage = "Clint Is Deleted";
          this.ErrorMessage = "";
          this.clintsList.splice(this.index, 1);
          setTimeout(() => {
            document.getElementById("closed").click();
            this.sucessMessage = "";
          }, 1000);
        } else {
          this.ErrorMessage = "Error 404";
          this.sucessMessage = "";
        }
      },
      getData(index) {
        this.Name = this.clintsList[index].Name;
        this.name = this.clintsList[index].Name;
        this.address = this.clintsList[index].Address;
        this.Address = this.clintsList[index].Address;
        this.Phone = this.clintsList[index].Phone;
        this.phone = this.clintsList[index].Phone;
      },
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
    display: flex;
  }
  tr,
  th,
  td {
    border: 1px solid #f4e9e9;
  }
</style>
