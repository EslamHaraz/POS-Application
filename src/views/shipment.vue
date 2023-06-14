<template>
  <div class="imgTrack">
  </div>
  <div class="container center">
    <h2 class="text-light">Order Track</h2>
    <form @click.prevent>
      <div class="row g-3 align-items-center orderInput">
        <div class="col-6 m-auto">
          <div style="position: relative;" class=" d-block mx-auto">
            <input
            type="text"
              autocomplete="on"
              class="form-control mb-3"
              placeholder="Enter Order Id"
              v-model="orderId"
            />
            <FontAwesome :icon="['fas', 'id-card-clip']" style="margin: 0;" class="email" />
          </div>
          <div class="buttonsParent">
            <button
             type="submit" @click="getOrder()" class="btn btn-primary loginButton ">
                Get Order
              </button>
              <router-link :to="{name:'login'}">
                <button
                 type="submit" class="btn btn-warning loginButton ">
                    Login
                  </button>
              </router-link>
          </div>

        <div style="width: 350px; margin: 20px auto;" class="alert alert-danger special" role="alert" v-if="ErrorMessage">
      {{ErrorMessage}}
    </div>
        </div>
      </div>
      <div class="row">
        <Transition name="bounce">
        <div v-if="data" class="col-6 data">
          <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdrob1Label2">
                          Order detail
                        </h5>
                        <button
                          type="button"
                          id="closed"
                          class="btn-close"
         
                          @click="closeDetails()"
                        ></button>
                      </div>
                      <div class="g-3 align-items-center">
                          <div
                            class="info d-flex flex-wrap justify-content-between p-3 mb-2"
                          >
                            <h5>
                              Name :
                              <h5 v-if="orderDetail" class="fw-bold">
                                {{ orderDetail.clintName  }}
                              </h5>
                            </h5>
                            <h5>
                              Phone :
                              <h5 v-if="orderDetail" class="fw-bold">
                                {{ orderDetail.clintPhone }}
                              </h5>
                            </h5>
                            <h5>
                              Address :
                              <h5 v-if="orderDetail" class="fw-bold">
                                {{ orderDetail.clintAddress }}
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
                            v-if="orderDetail"
                              v-for="(order, index) in orderDetail.orders"
                              :key="index"
                            >
                              <td>{{ order.Name }}</td>
                              <td>{{ order.Quantity }}</td>
                              <td>{{ order.Price }}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div v-if="orderDetail" class="discountPlace">
                          <h5>Discount</h5>
                          <h5>...</h5>
                          <h5>${{ orderDetail.discount }}</h5>
                        </div>
                        <div v-if="orderDetail"  class="discountPlace total">
                          <div class="content">
                            <h5>Total</h5>
                            <h5>${{ orderDetail.totalPrice }}</h5>
                          </div>
                        </div>
                        <div class="discountPlace total">
                          <div class="content">
                            <h5>Status</h5>
                            <h5 v-if="orderDetail">{{ orderDetail.status }}</h5>
                          </div>
                        </div>
        </div>
      </Transition>
    </div>
    </form>
  </div>
</template>
<script>
  import axios from "axios";
  export default {
    name: "shipment",
    data(){
      return {
        orderId:"",
        ErrorMessage:"",
        data:false,
        name:"",
        phone:"",
        Address:"",
        orderDetail:[]
      }
    },
    methods:{
     async getOrder(){
      if(this.orderId !=""){
        let result = await axios.get(`http://localhost:3000/Orders?orderId=${this.orderId}`)
        if(result.status == 200 && result.data.length > 0 ){
          this.orderDetail = result.data[0]
          this.ErrorMessage = ""
          this.data=true;
        }
        else {
          this.ErrorMessage = "Order Id Is Wrong"
        }
      }else {
        this.ErrorMessage = "Write Your Order Id Please"
      }
      },
      closeDetails(){
          this.data===false ? this.data= true : this.data = false
      }
    }
  };
</script>
<style scoped>
  .info {
    background-color: #adc8f1;
    height: 100px;
    align-items:center;
  }
  .info h5 {
    display: flex;
    font-size: 17px;
  }
.orderInput {
  margin: auto !important;
    padding: 14px;
    border-radius: 5px;
}
.loginButton {
  width: 100%; margin-bottom: 20px;
}  
.imgTrack {
  background-image: url("../assets/imgs/website-parallax-background-C.jpg") ;
      height: 100vh;
    background-size: cover;
}
.col-6 {
  padding:25px;
  border-radius:5px;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
.data {
  background-color:White;
  margin:auto;
}
.note {
    background-color: rgb(173, 200, 241);
  }
  .noteContent {
    margin-left: 15px;
    font-weight: bold;
    font-size: 16px;
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
  tr,
  th,
  td {
    border: 1px solid #f4e9e9;
  }
  .modal-header {
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 20px;
    padding: 10px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    width: 80%;
  }
</style>
