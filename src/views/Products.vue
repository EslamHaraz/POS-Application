<template>
  <div class="container">
    <div class="row">
      <div class="col col-2">
        <mangeComp />
      </div>
      <div class="col col-10">
        <navBar />
        <div class="text d-flex justify-content-between">
          <h1 class="text-start">Products</h1>
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
            Add New Product
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
                    Add New Product
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
                        placeholder="Wite Product Name"
                        v-model="name"
                      />

                      <FontAwesome
                        :icon="['fas', 'address-card']"
                        style="margin: 0"
                        class="name"
                      />
                    </div>
                    <h5 class="text-start mb-0">Price</h5>
                    <div style="position: relative" class="d-block mx-auto">
                      <input
                        required
                        type="number"
                        min="10"
                        class="form-control"
                        placeholder="Write Product price"
                        v-model.trim="price"
                      />

                      <FontAwesome
                        :icon="['fas', 'sack-dollar']"
                        style="margin: 0"
                        class="name"
                      />
                    </div>
                    <h5 class="text-start mb-0">Description</h5>
                    <div style="position: relative" class="d-block mx-auto">
                      <input
                        required
                        type="text "
                        class="form-control"
                        placeholder="Description"
                        v-model.trim="description"
                      />

                      <FontAwesome
                        :icon="['fas', 'audio-description']"
                        style="margin: 0"
                        class="name"
                      />
                    </div>
                    <h5 class="text-start mb-0">File Input</h5>
                    <div style="position: relative" class="d-block mx-auto">
                      <input
                        required
                        type="file"
                        class="form-control"
                        ref="fileInput"
                        style="margin-bottom: 20px"
                        @input="pickFile()"
                      />

                      <FontAwesome
                        :icon="['fas', 'file']"
                        style="margin: 0"
                        class="name"
                      />
                      <div
                        class="image"
                        :style="{ 'background-image': `url(${previewImage})` }"
                        @click="selectImage()"
                      ></div>
                    </div>
                    <h5 class="text-start mb-0">Stock</h5>
                    <div style="position: relative" class="d-block mx-auto">
                      <input
                        required
                        type="text "
                        class="form-control"
                        placeholder="Stock"
                        v-model.trim="stock"
                      />

                      <FontAwesome
                        :icon="['fas', 'cubes']"
                        style="margin: 0"
                        class="name"
                      />
                    </div>
                    <h5 class="text-start mb-0">Categories</h5>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect01"
                          >Options</label
                        >
                      </div>
                      <select
                        class="custom-select"
                        id="inputGroupSelect01"
                        style="
                          width: 82%;
                          outline: none;
                          border: 1px solid #ddd;
                        "
                        v-model="category"
                      >
                        <option
                          selected
                          v-for="(category, index) in categoriesList"
                          :key="index"
                        >
                          {{ category.CategoryName }}
                        </option>
                      </select>
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
                    @click="addproduct()"
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
              <th style="width: 40px" scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr v-for="(product, index) in search" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ product.Name }}</td>
              <td>
                <button
                  @click="getId(product.id, index),getData()"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrob1"
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
                  id="staticBackdrob1"
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
                          Edit Product
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
                              placeholder="Wite Product Name"
                              v-model="name"
                            />

                            <FontAwesome
                              :icon="['fas', 'address-card']"
                              style="margin: 0"
                              class="name"
                            />
                          </div>
                          <h5 class="text-start mb-0">Price</h5>
                          <div
                            style="position: relative"
                            class="d-block mx-auto"
                          >
                            <input
                              required
                              type="number"
                              min="10"
                              class="form-control"
                              placeholder="Write Product price"
                              v-model.trim="price"
                            />

                            <FontAwesome
                              :icon="['fas', 'sack-dollar']"
                              style="margin: 0"
                              class="name"
                            />
                          </div>
                          <h5 class="text-start mb-0">Description</h5>
                          <div
                            style="position: relative"
                            class="d-block mx-auto"
                          >
                            <input
                              required
                              type="text "
                              class="form-control"
                              placeholder="Description"
                              v-model.trim="description"
                            />

                            <FontAwesome
                              :icon="['fas', 'audio-description']"
                              style="margin: 0"
                              class="name"
                            />
                          </div>
                          <h5 class="text-start mb-0">Stock</h5>
                          <div
                            style="position: relative"
                            class="d-block mx-auto"
                          >
                            <input
                              required
                              type="text "
                              class="form-control"
                              placeholder="Stock"
                              v-model.trim="stock"
                            />

                            <FontAwesome
                              :icon="['fas', 'cubes']"
                              style="margin: 0"
                              class="name"
                            />
                          </div>
                          <h5 class="text-start mb-0">Categories</h5>
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <label
                                class="input-group-text"
                                for="inputGroupSelect01"
                                >Options</label
                              >
                            </div>
                            <select
                              class="custom-select"
                              id="inputGroupSelect01"
                              style="
                                width: 82%;
                                outline: none;
                                border: 1px solid #ddd;
                          "
                              v-model="category"
                            >
                              <option
                                selected
                                v-for="(category, index) in categoriesList"
                                :key="index"
                              >
                                {{ category.CategoryName }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          id="Close"
                          type="button"
                          class="btn btn-secondary close"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          @click="editProduct()"
                          type="button"
                          class="btn btn-primary"
                        >
                          Edit
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
                  @click="getId(product.id, index)"
                  class="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrob4"
                >
                  Delete
                  <FontAwesome :icon="['fas', 'trash']" style="margin: 0" />
                </button>
                <!-- Modal -->
                <div
                  class="modal fade"
                  id="staticBackdrob4"
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
                          Delete Product
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
                              Are You Sure To Delete This Product
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          id="closeDelete"
                          type="button"
                          class="btn btn-secondary close"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          @click="deleteProduct()"
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
                  @click="getId(product.id, index), getData()"
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
                            class="d-flex mx-auto justify-content-around"
                          >
                            <span class="align-items-center">
                              <h3 class="d-flex align-items-center mb-0">
                                Name:
                                <h4 style="margin: 0 5px">{{ Name }}</h4>
                              </h3>
                            </span>
                            <span class="align-items-center">
                              <h3 class="d-flex align-items-center mb-0">
                                ID :
                                <h4 style="margin: 0 5px">{{ Id }}</h4>
                              </h3>
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
    name: "Products",
    data() {
      return {
        v$: useValidate(),
        bath: "",
        name: "",
        stock: "",
        price: "",
        description: "",
        category: "",
        value: "",
        userid: "",
        sucessMessage: "",
        categoriesList: [],
        ErrorMessage: "",
        productId: "",
        index: "",
        Name: "",
        previewImage: null,
        passwordError: "",
        Id: "",
        categoriesList: [],
        productsList: [],
        quantity:1,
      };
    },
    validations() {
      return {
        price: { required },
        name: { required },
        stock: { required },
        description: { required },
        category: { required },
      };
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
      let products = await axios.get(
        `http://localhost:3000/Products?userId=${this.userid}`
      );
      if (products.status === 200) {
        this.productsList = products.data;
      }
    },
    components: {
      navBar,
      mangeComp,
    },
    computed: {
      search() {
        if (this.value.trim().length > 0) {
          return this.productsList.filter((product) =>
            product.Name.includes(this.value.trim().toLowerCase())
          );
        } else {
          return this.productsList;
        }
      },
    },
    methods: {
      getId(id, index) {
        this.productId = id;
        this.index = index;
      },
      ...mapActions(["redirectTo"]),
      selectImage() {
        this.$refs.fileInput.click();
      },
      pickFile() {
        let input = this.$refs.fileInput;
        let file = input.files;
        if (file && file[0]) {
          let reader = new FileReader();
          console.log(file[0]);
          this.img = file[0].name;
          reader.onload = (e) => {
            this.previewImage = e.target.result;
          };
          reader.readAsDataURL(file[0]);
          this.$emit("input", file[0]);
        }
      },
      async addproduct() {
        this.v$.$validate();
        if (this.category !== "") {
          let category = await axios.get(
            `http://localhost:3000/Categories?CategoryName=${this.category}`
          );
          if (category.status == 200) {
            this.catId = category.data[0].id;
          }
        }
        if (!this.v$.$error) {
          let result = await axios.post(`http://localhost:3000/Products`, {
            Name: this.name.toLowerCase(),
            Price: parseInt(this.price),
            Description: this.description,
            Stock: parseInt(this.stock),
            CategoryId: this.catId,
            CategoryName: this.category,
            userId: this.userid,
            Quantity:this.quantity
          });
          if (result.status === 201) {
            this.sucessMessage = "Product Added successfully";
            this.productsList.push(result.data);
            this.ErrorMessage = "";
            setTimeout(() => {
              document.querySelector(".close").click();
              this.name = "";
              this.price = "";
              this.description = "";
              this.category = "";
              this.stock = "";
              this.sucessMessage = "";
            }, 1000);
          }
        } else {
          this.ErrorMessage = "You Must Fill This Inputs";
        }
      },
      async editProduct() {
        this.v$.$validate();
        if (this.category !== "") {
          let category = await axios.get(
            `http://localhost:3000/Categories?CategoryName=${this.category}`
          );
          if (category.status == 200) {
            this.catId = category.data[0].id;
          }
        }
        if (!this.v$.$error) {
          let result = await axios.put(
            `http://localhost:3000/Products/${this.productId}`,
            {
              Name: this.name.toLowerCase(),
              Price: parseInt(this.price),
              Description: this.description,
              Stock: parseInt(this.stock),
              CategoryId: this.catId,
              CategoryName: this.category,
              Quantity:1,
              userId: this.userid,
            }
          );
          if (result.status === 200) {
            this.sucessMessage = "Product Edited successfully";
            console.log(result.data);
            console.log(this.productsList[this.index]);
            this.productsList[this.index] = result.data;
            this.ErrorMessage = "";
            setTimeout(() => {
              document.getElementById("Close").click();
              this.name = "";
              this.price = "";
              this.description = "";
              this.category = "";
              this.stock = "";
              this.sucessMessage = "";
            }, 1000);
          }
        } else {
          this.ErrorMessage = "You Must Fill This Inputs";
        }
      },
      async deleteProduct() {
        let result = await axios.delete(
          `http://localhost:3000/Products/${this.productId}`
        );
        if (result.status === 200) {
          this.productsList.splice(this.index, 1);
          setTimeout(() => {
            document.getElementById("closeDelete").click();
          }, 1000);
        }
      },
      getData() {
        this.Name = this.productsList[this.index].Name;
        this.name = this.productsList[this.index].Name;
        this.price = this.productsList[this.index].Price;
        this.description = this.productsList[this.index].Description;
        this.stock = this.productsList[this.index].Stock;
        this.Id = this.productsList[this.index].id;
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
  .image {
    width: 100px;
    height: 100px;
    background-size: cover;
  }
  .file {
    display: flex;
    align-items: center;
  }
  .error-feedback {
    font-size: 15px;
    display: block;
    margin: 10px auto;
    text-align: left;
    color: #bb4444;
  }
</style>
