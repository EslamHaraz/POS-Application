<template>
  <div class="container">
    <div class="row">
      <div class="col col-2">
        <mangeComp />
      </div>
      <div class="col col-10">
        <navBar />
        <div class="text d-flex justify-content-between">
          <h1 class="text-start">Orders</h1>
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
          <router-link :to="{ name: 'NewOrder' }">
            <button type="button" class="btn btn-primary">Add New Order</button>
          </router-link>

          <!-- Modal -->
        </div>
        <table class="table table-striped text-start">
          <thead>
            <tr>
              <th style="width: 40px" scope="col">#</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
              <th scope="col">Clint Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr v-for="(order, index) in search" :key="index">
              <td>
                {{ index + 1 }}
              </td>
              <td>
                {{ order.totalPrice }}
              </td>

              <td>
                <div class="status" :class="order.status">
                  {{ order.status }}
                </div>
              </td>
              <td>
                {{ order.clintName }}
              </td>
              <td>
                <button
                  @click="getId(order.id, index)"
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
                          Edit Item
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
                          <h5 class="text-start mb-0">Status</h5>
                          <div
                            style="position: relative"
                            class="d-block mx-auto"
                          >
                            <select
                              v-model="Status"
                              class="custom-select"
                              id="inputGroupSelect01"
                            >
                              <option
                                selected
                                v-for="(option, index) in options"
                                :key="index"
                              >
                                {{ option }}
                              </option>
                            </select>
                          </div>
                          <router-link  target="_blank"
                            :to="{
                              name: 'editDetalis',
                              params: { orderId:orderId},
                            }"
                          >
                            <button class="btn btn-primary special">
                              Edit Details
                              <FontAwesome
                                :icon="['fas', 'pen-to-square']"
                                style="margin: 0"
                              />
                            </button>
                          </router-link>
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
                          @click="editStatus()"
                          type="button"
                          class="btn btn-primary"
                        >
                          Edit
                        </button>
                        <div
                          class="alert alert-success special text-center"
                          role="alert"
                          v-if="sucessMessage"
                        >
                          {{ sucessMessage }}
                        </div>
                        <div
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
                  @click="getId(order.id, index)"
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
                          Delete Order
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
                              Are You Sure To Delete This Order ?
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
                          @click="deleteOrder()"
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
                  @click="getData(index)"
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
                        <div class="g-3 align-items-center">
                          <div
                            class="info d-flex flex-wrap justify-content-between p-3 mb-2"
                          >
                            <h5>
                              Name :
                              <h5 class="fw-bold">
                                {{ name }}
                              </h5>
                            </h5>
                            <h5>
                              Phone :
                              <h5 class="fw-bold">
                                {{ phone }}
                              </h5>
                            </h5>
                            <h5>
                              Address :
                              <h5 class="fw-bold">
                                {{ Address }}
                              </h5>
                            </h5>
                          </div>
                        </div>
                        <table class="table custom table-striped">
                          <thead class="details">
                            <tr>
                              <th scope="col">Product Name</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(order, index) in ordersDatail"
                              :key="index"
                            >
                              <td>{{ order.Name }}</td>
                              <td>{{ order.Quantity }}</td>
                              <td>{{ order.Price }}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div v-if="discount" class="discountPlace">
                          <h5>Discount</h5>
                          <h5>...</h5>
                          <h5>${{ discount }}</h5>
                        </div>
                        <div class="discountPlace total">
                          <div class="content">
                            <h5>Total</h5>
                            <h5>${{ total }}</h5>
                          </div>
                        </div>
                        <div
                          v-if="note"
                          class="note d-flex align-items-center p-2 mb-1 mt-2"
                        >
                          <h5>note :</h5>
                          <h5 class="noteContent">{{ note }}</h5>
                        </div>
                        <div
                          class="note d-flex align-items-center p-2 mb-1 mt-2"
                        >
                          <h5>Code :</h5>
                          <h5 class="noteContent">{{ orderCode }}</h5>
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
  import { mapActions } from "vuex";
  import axios from "axios";
  export default {
    name: "ordres",
    data() {
      return {
        bath: "",
        options: [
          "Pending",
          "complete",
          "processing",
          "shipping",
          "refound",
          "canceled",
        ],
        name: "",
        phone: "",
        Address: "",
        discount: "",
        pending: { backgroundColor: "red" },
        value: "",
        userid: "",
        sucessMessage: "",
        ErrorMessage: "",
        clintId: "",
        orderId: "1",
        index: 0,
        note: "",
        orderCode: "",
        total: "",
        ordersDatail: [],
        orderList: [],
        Status: "",
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
      let result = await axios.get(`http://localhost:3000/Orders?userId=${this.userid}`);
      if (result.status === 200) {
        this.orderList = result.data;
      }
    },
    computed: {
      search() {
        if (this.value.trim().length > 0) {
          return this.orderList.filter((order) =>
            order.clintName.includes(this.value.trim().toLowerCase())
          );
        } else {
          return this.orderList;
        }
      },
    },
    methods: {
      ...mapActions(["redirectTo"]),
      getId(id, index) {
        (this.orderId = id), (this.index = index);
      },
      getData(index) {
        this.index = index;
        this.note = this.orderList[this.index].Note;
        this.total = this.orderList[this.index].totalPrice;
        this.discount = this.orderList[this.index].discount;
        this.orderCode = this.orderList[this.index].orderId;
        this.ordersDatail = this.orderList[this.index].orders;
        this.name = this.orderList[this.index].clintName;
        this.phone = this.orderList[this.index].clintPhone;
        this.Address = this.orderList[this.index].clintAddress;
      },
      async editStatus() {
        if (this.Status != "") {
          this.orderList[this.index].status = this.Status;
          let result = await axios.put(
            `http://localhost:3000/Orders/${this.orderId}`,
            {
              clintName: this.orderList[this.index].clintName,
              clintPhone: this.orderList[this.index].clintPhone,
              clintAddress: this.orderList[this.index].clintAddress,
              Note: this.orderList[this.index].Note,
              status: this.Status,
              discount: this.orderList[this.index].discount,
              totalPrice: this.orderList[this.index].totalPrice,
              userId:this.userid,
              orderId: this.orderList[this.index].orderId,
              orders: this.orderList[this.index].orders,
            }
          );
          if (result.status == 200) {
            this.sucessMessage =
              "The modification process has been successfully completed";
            this.ErrorMessage = "";
            setTimeout(() => {
              document.getElementById("closed1").click();
              this.sucessMessage = "";
            }, 1000);
          }
        } else {
          this.sucessMessage = "";
          this.ErrorMessage = "You Must Select The Status";
        }
      },
      async deleteOrder() {
        let result = await axios.delete(
          `http://localhost:3000/Orders/${this.orderId}`
        );
        if (result.status == 200) {
          this.orderList.splice(this.index, 1);
          document.getElementById("closed").click();
        }
      },
    },
  };
</script>
<style scoped>
  .info {
    background-color: #adc8f1;
    height: 100px;
  }
  .info h5 {
    display: flex;
    font-size: 17px;
  }
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
  .status {
    padding: 5px;
    color: white;
    border-radius: 5px;
    text-align: center;
    width: 90px;
    transition: 0.3s linear;
  }
  .custom-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #c1c0c0;
    border-radius: 3px;
  }
  .Pending {
    background-color: #ffc107;
  }
  .complete {
    background-color: #28a745;
  }
  .processing {
    background-color: #17a2b8;
  }
  .shipping {
    background-color: #007bff;
  }
  .refound {
    background-color: #dc3545;
  }
  .canceled {
    background-color: #343a40;
  }
  .special {
    width: 100%;
  }
  .details th {
    border: none;
  }
  .discountPlace {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #ff48486b;
  }
  .discountPlace h5 {
    margin: 0;
  }
  .details,
  .total {
    background-color: #adc8f1;
  }
  .content {
    display: flex;
    justify-content: space-between;
    width: 50%;
  }
  .note {
    background-color: rgb(173, 200, 241);
  }
  .noteContent {
    margin-left: 15px;
    font-weight: bold;
    font-size: 16px;
  }
</style>
