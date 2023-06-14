<template>
  <div class="container">
    <div class="row">
      <div class="col col-2">
        <mangeComp />
      </div>
      <div class="col col-10">
        <navBar />
        <div class="text d-flex justify-content-between">
          <h1 class="text-start">New Order</h1>
          <h4 class="d-flex align-items-center" style="margin-bottom: 0">
            {{ bath }} / Dashboard
          </h4>
        </div>
        <div class="row">
          <h5 data-v-7177119e="" class="text-start mb-2">Select Category</h5>
          <div class="col col-7">
            <select
              v-model="category"
              class="form-select form-select-lg mb-3 rounded-0"
              aria-label=".form-select-lg example"
            >
              <option v-for="(category, index) in categoriesList" :key="index">
                {{ category.CategoryName }}
              </option>
            </select>
          </div>
          <div class="col col-5">
            <!-- Button trigger modal -->
            <button
              v-if="info"
              type="button"
              class="btn btn-primary custmoize"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Get Clint
            </button>
            <div
              v-if="data"
              class="info d-flex flex-wrap justify-content-between p-3"
            >
              <h5>
                Name :
                <h5 class="fw-bold">{{ Clint.Name }}</h5>
              </h5>
              <h5>
                Phone :
                <h5 class="fw-bold">{{ Clint.Phone }}</h5>
              </h5>
              <h5>
                Address :
                <h5 class="fw-bold">{{ Clint.Address }}</h5>
              </h5>
            </div>
            <!-- Modal -->
            <div
              class="modal fade modal-lg"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Clints</h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <input
                      v-model="value"
                      type="search"
                      class="form-control rounded"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="search-addon"
                    />
                    <div class="parent d-flex flex-wrap">
                      <div
                        @click="takeData(index, clint)"
                        class="boxDetail"
                        v-for="(clint, index) in getClint"
                        :key="index"
                      >
                        <h3>{{ clint.Name }}</h3>
                        <h3>{{ clint.Phone }}</h3>
                        <h3>{{ clint.Address }}</h3>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col col-7 d-flex flex-wrap" style="gap: 10px">
            <div
              class="card"
              style="width: 15rem; box-shadow: 0px 0px 3px 0px #bdbdbd"
              v-for="(product, index) in search"
              :key="index"
            >
              <div class="card-body">
                <h5 class="card-title">{{ product.Name }}</h5>
                <p class="card-text text-success mb-3" style="font-size: 20px">
                  Price:${{ product.Price }}
                </p>
                <button
                  @click="addOrder(index)"
                  href="#"
                  style="width: 100%"
                  class="btn btn-success"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div class="col col-5">
            <table class="table bg-light">
              <thead style="background-color: #adc8f1">
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, index) in orders" :key="index">
                  <td style="line-height: 30px">{{ order.Name }}</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Quantity"
                      v-model="order.Quantity"
                      style="
                        width: 60px;
                        border: none;
                        border: 1px solid #ddd;
                        outline: none;
                      "
                    />
                  </td>
                  <td style="line-height: 30px">
                    {{ getTotal[index] }}
                  </td>
                  <td style="line-height: 30px">
                    <button @click="deleteOrder(index)" class="btn btn-danger">
                      <FontAwesome
                        :icon="['fas', 'trash-can']"
                        style="margin: 0"
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot style="background-color: #adc8f1">
                <td>Total</td>
                <td v-if="Cash < total">${{ Cash }}</td>
                <td v-else>${{ total }}</td>
                <td>
                  <!-- Button trigger modal -->
                  <FontAwesome
                    class="discount"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal1"
                    :icon="['fas', 'dollar-sign']"
                    style="margin: 0"
                  />
                  <!-- Modal -->
                  <div
                    class="modal fade"
                    id="exampleModal1"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            Discount
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
                            <div
                              style="position: relative"
                              class="d-block mx-auto w-1"
                            >
                              <input
                                type="number"
                                class="form-control"
                                placeholder="Discount"
                                v-model="discount"
                              />
                              <FontAwesome
                                :icon="['fas', 'down-long']"
                                style="margin: 0"
                                class="email"
                              />
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
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary done"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            @click="makeDiscount()"
                            type="button"
                            class="btn btn-success"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <FontAwesome
                    class="discount"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal12"
                    :icon="['fas', 'chalkboard']"
                    style="margin: 0"
                  />
                  <div
                    class="modal fade"
                    id="exampleModal12"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel2">
                            Note
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
                            <div
                              style="position: relative"
                              class="d-block mx-auto w-1"
                            >
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Note"
                                v-model="note"
                              />
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
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary done"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            data-bs-dismiss="modal"
                            class="btn btn-success"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tfoot>
            </table>
            <div v-if="discount" class="discountPlace">
              <h5>Discount</h5>
              <h5>...</h5>
              <h5>${{ discount }}</h5>
              <button class="btn btn-danger" @click="deleteDiscount()">
                <FontAwesome :icon="['fas', 'trash-can']" style="margin: 0" />
              </button>
            </div>
            <div v-if="note" class="note d-flex align-items-center p-2 mb-3">
              <h5>note :</h5>
              <h5 class="noteContent">{{ note }}</h5>
            </div>
            <Transition name="fade">
              <div
                style="width: 350px; margin: 20px auto"
                class="alert alert-success special error"
                role="alert"
                v-if="SuccessMessage"
              >
                {{ SuccessMessage }}
              </div>
            </Transition>
            <Transition name="fade">
              <div
                style="width: 350px; margin: 20px auto"
                class="alert alert-danger special"
                role="alert"
                v-if="ErrorMessage"
              >
                {{ ErrorMessage }}
              </div>
            </Transition>
            <button
              v-if="data"
              class="btn btn-success width"
              @click="confirmOrder()"
            >
              Confirm
            </button>
            <div
              v-if="data"
              class="buttons d-flex justify-content-between mt-3"
            >
              <button class="btn btn-primary custom">Print</button>
              <button @click="clear" class="btn btn-warning custom">
                Clear
              </button>
            </div>
          </div>
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
    name: "NewOrder",
    data() {
      return {
        bath: "",
        SuccessMessage: "",
        categoriesList: [],
        chracters: [
          "A",
          "B",
          "C",
          "D",
          "F",
          "E",
          "G",
          "H",
          "K",
          "L",
          "M",
          "N",
          "O",
          "S",
          "Z",
          "U",
          "Y",
          "T",
          "Q",
        ],
        randomChar: "",
        productList: [],
        category: "",
        orders: [],
        orderIndex: 0,
        discount: "",
        value: "",
        clints: [],
        info: true,
        data: false,
        Clint: "",
        index: "",
        ErrorMessage: "",
        note: "",
        total: 0,
        userid:"",
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
      let Categories = await axios.get(`http://localhost:3000/Categories?userId=${this.userid}`);
      if (Categories.status === 200) {
        this.categoriesList = Categories.data;
      }
      let Products = await axios.get(`http://localhost:3000/Products?userId=${this.userid}`);
      if (Products.status === 200) {
        this.productList = Products.data;
      }
      let clints = await axios.get(`http://localhost:3000/Clints?userId=${this.userid}`);
      if (clints.status === 200) {
        this.clints = clints.data;
      }
    },
    computed: {
      search() {
        if (this.category != "") {
          return this.productList.filter((product) => {
            return product.CategoryName === this.category;
          });
        } else return this.productList;
      },
      getClint() {
        if (this.value.trim().length > 0) {
          return this.clints.filter((clint) => {
            return clint.Name.includes(this.value.trim().toLowerCase());
          });
        }
      },
      getTotal() {
        return this.orders.map((order) => {
          return order.Price * order.Quantity;
        });
      },
      Cash() {
        if (this.getTotal.length > 1) {
          return this.getTotal.reduce((cur, acc) => {
            return (this.total = cur + acc);
          });
        } else return (this.total = this.getTotal[0]);
      },
    },
    methods: {
      ...mapActions(["redirectTo"]),
      clear() {
        this.orders = [];
      },
      randomCracter() {
        this.randomChar = "";
        for (let i = 0; i < 5; i++) {
          this.randomChar +=
            this.chracters[Math.trunc(Math.random() * this.chracters.length)];
        }
      },
      addOrder(index) {
        if (!this.orders.includes(this.productList[index])) {
          this.orders.push(this.productList[index]);
        } else return;
      },
      takeData(index, clint) {
        this.index = index;
        this.Clint = clint;

        this.info = false;
        this.data = true;
        document.querySelector(".btn-close").click();
      },
      deleteOrder(index) {
        this.orders.splice(index, 1);
      },
      makeDiscount() {
        if (this.discount >= this.Cash) {
          this.ErrorMessage =
            "You cannot make a discount greater than the price of the products";
        } else {
          if (this.orders.length > 0) {
            this.ErrorMessage = "";
            this.total -= this.discount;
            this.Cash -= this.discount;
            document.querySelector(".done").click();
          } else {
            this.ErrorMessage = "No products To Make Discount";
            if (this.discount > 0) {
              this.deleteDiscount();
            }
          }
        }
      },
      deleteDiscount() {
        this.total += this.discount;
        this.discount = "";
      },
      async confirmOrder() {
        this.randomCracter();
        if (this.orders.length > 0 && this.total > 0) {
          let result = await axios.post(`http://localhost:3000/Orders`, {
            clintName: this.Clint.Name,
            clintPhone: this.Clint.Phone,
            clintAddress: this.Clint.Address,
            Note: this.note,
            status: "Pending",
            discount: parseInt(this.discount),
            totalPrice: this.total,
            userId:this.userid,
            orderId: this.randomChar + Date.now(),
            orders: this.orders,
          });
          if (result.status == 201) {
            this.SuccessMessage =
              "The Order has been added successfully and is now pending";
            this.ErrorMessage = "";
            this.orders = [];
            (this.discount = ""), (this.note = "");
            setTimeout(() => {
              this.redirectTo({ val: "ordres" });
            }, 1000);
          }
        } else {
          (this.SuccessMessage = ""),
            (this.ErrorMessage = "You Must Be Add Order ");
        }
      },
    },
  };
</script>
<style scoped>
  .card {
    height: 150px;
  }
  .line {
    line-height: 30px !important;
  }
  .custmoize {
    width: 100%;
  }
  .boxDetail {
    width: 20rem;
    background-color: #fdfdfd;
    padding: 7px;
    border-radius: 6px;
    margin: 10px;
    box-shadow: 0px 0px 3px 0px #bdbdbd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
  }
  .boxDetail h3 {
    font-size: 20px;
  }
  .info {
    background-color: #adc8f1;
    height: 100px;
  }
  .info h5 {
    display: flex;
    font-size: 15px;
    text-transform: capitalize;
  }
  .width {
    width: 100%;
  }
  .custom {
    width: 49%;
  }
  .discount {
    cursor: pointer;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .discountPlace {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #ff48486b;
    margin-bottom: 15px;
  }
  .discountPlace h5 {
    margin: 0;
  }
  .note {
    background-color: rgb(173, 200, 241);
  }
  .noteContent {
    margin-left: 15px;
    font-weight: bold;
    font-size: 17px;
  }
</style>
