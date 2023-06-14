<template>
  <div class="employees container">
    <div class="row">
      <div class="col col-2">
        <mangeComp />
      </div>
      <div class="col col-10">
        <navBar />
        <div class="text d-flex justify-content-between">
          <h1 class="text-start">Settings</h1>
          <h4 class="d-flex align-items-center" style="margin-bottom: 0">
            {{ bath }} / Dashboard
          </h4>
        </div>
        <div class="parent" style="background-color: #ffffff; padding: 15px">
          <form @click.prevent>
            <div class="row g-3 align-items-center">
              <div style="position: relative" class="d-block mx-auto w-1">
                <h5 class="text-start">Name</h5>
                <input
                  autocomplete="on"
                  type="text "
                  class="form-control mb-4"
                  placeholder="Enter Your Name"
                  v-model.trim="name"
                />
                <span class="error-feedback" v-if="v$.name.$error">{{
                  v$.name.$errors[0].$message
                }}</span>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div style="position: relative" class="d-block mx-auto w-1">
                <h5 class="text-start">Description</h5>
                <input
                  autocomplete="on"
                  type="text"
                  class="form-control mb-4"
                  placeholder="Write Your Description"
                  v-model="description"
                />
                <span class="error-feedback" v-if="v$.description.$error">{{
                  v$.description.$errors[0].$message
                }}</span>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div style="position: relative" class="d-block mx-auto w-1">
                <h5 class="text-start">Jop Title</h5>
                <input
                  autocomplete="on"
                  type="text "
                  class="form-control mb-4"
                  placeholder="Wrirte Your Jop"
                  v-model="jop"
                />
                <span class="error-feedback" v-if="v$.jop.$error">{{
                  v$.jop.$errors[0].$message
                }}</span>
              </div>
            </div>
          </form>
          <h5 class="text-start">Logo</h5>
          <div class="file mb-4">
            <input
              style="width: 85%; margin-right: 25px"
              type="file"
              class="form-control mb-4"
              ref="fileInput"
              @input="pickFileLogo()"
            />

            <div
              class="image"
              :style="{ 'background-image': `url(${previewImage})` }"
              @click="selectImageLogo()"
            ></div>
          </div>
          <span class="error-feedback" v-if="imageError">
            {{ imageError }}
          </span>
          <h5 class="text-start">Icon</h5>
          <div class="file">
            <input
              style="width: 85%; margin-right: 25px"
              type="file"
              class="form-control mb-4"
              ref="Inputfile"
              @input="pickFileIcon()"
            />

            <div
              class="image"
              :style="{ 'background-image': `url(${previewImageIcon})` }"
              @click="selectImageIcon()"
            ></div>
          </div>
          <span class="error-feedback" v-if="imageError">
            {{ imageError }}
          </span>
          <h5 class="text-start">Status</h5>
          <select
            placeholder="open"
            v-model="statu"
            class="form-select form-select-lg mb-3 rounded-0"
            aria-label=".form-select-lg example"
          >
            <option v-for="(statu, index) in status" :key="index">
              {{ statu }}
            </option>
          </select>
          <div class="row g-3 align-items-center">
            <div style="position: relative" class="d-block mx-auto w-1">
              <h5 class="text-start">Alt Text</h5>
              <input
                autocomplete="on"
                type="text"
                class="form-control mb-1"
                placeholder="Write Your Description"
                v-model="altText"
              />
              <span class="error-feedback" v-if="v$.altText.$error">{{
                v$.altText.$errors[0].$message
              }}</span>
            </div>
          </div>
          <div class="row g-3 align-items-center">
            <div style="position: relative" class="d-block mx-auto w-1">
              <button @click="editProfile()" class="btn btn-primary mt-4">
                Edit Site
              </button>
              <Transition name="slide-fade">
                <div
                  style="width: 350px; margin: 20px auto"
                  class="alert alert-success special"
                  role="alert"
                  v-if="Message"
                >
                  {{ Message }}
                </div>
              </Transition>
              <Transition name="slide-fade">
                <div
                  style="width: 350px; margin: 20px auto"
                  class="alert alert-danger special"
                  role="alert"
                  v-if="userMessage"
                >
                  {{ userMessage }}
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <p>solid <FontAwesome icon="coffee" /> </p>
        <p>solid <FontAwesome :icon="['fas','envelope']" /> </p> -->
  </div>
</template>
<script>
  import mangeComp from "../components/Management/mangeComp.vue";
  import navBar from "../components/Navbar/navBar.vue";
  import useValidate from "@vuelidate/core";
  import { required,minLength} from "@vuelidate/validators";
  import axios from "axios";
  import { mapActions, mapState } from "vuex";
  export default {
    name: "settings",
    data() {
      return {
        v$: useValidate(),
        userid: "",
        description:"",
        name: "",
        jop: "",
        altText:"",
        bath: "",
        status:["Open","Closed","Closed for renovation"],
        statu:"",
        previewImage: null,
        previewImageIcon:null,
        passwordError: "",
        imageError: "",
        Message:'',
        userMessage:"",
        userDetail:[],
      };
    },
    validations() {
      return {
      description: {required },
        name: { minLength: minLength(5),required },
        jop: { required },
        altText: { required },
        statu: { required },
      };
    },
    components: {
      mangeComp,
      navBar,
    },
    async mounted() {
      this.bath = this.$route.fullPath.slice(1);
      let user = window.localStorage.getItem("user-info");
      if (user) {
        this.userid = JSON.parse(user).id;
        this.name = JSON.parse(user).SiteName
        this.description = JSON.parse(user).Description
        this.altText = JSON.parse(user).AltText
        this.statu = JSON.parse(user).Status
        this.jop = JSON.parse(user).JopTitle
      } else {
        this.redirectTo({ val: "login" });
      }
      let userinfo = await axios.get(`http://localhost:3000/users/${this.userid}`)
      if(userinfo.status == 200){
        this.userDetail = userinfo.data
      }
    },
    methods: {
      ...mapActions(["redirectTo"]),
      editSiteName(){
        this.$store.commit('editSiteName',{Name:this.name})
      },
      selectImageIcon() {
        this.$refs.Inputfile.click();
      },
      selectImageLogo() {
        this.$refs.fileInput.click();
      },
      pickFileLogo() {
        let input = this.$refs.fileInput;
        let file = input.files;
        if (file && file[0]) {
          let reader = new FileReader();
          this.img = file[0].name;
          reader.onload = (e) => {
            this.previewImage = e.target.result;
          };
          reader.readAsDataURL(file[0]);
          this.$emit("input", file[0]);
        }
      },
      pickFileIcon() {
        let input = this.$refs.Inputfile;
        let file = input.files;
        if (file && file[0]) {
          let reader = new FileReader();
          this.img = file[0].name;
          reader.onload = (e) => {
            this.previewImageIcon = e.target.result;
          };
          reader.readAsDataURL(file[0]);
          this.$emit("input", file[0]);
        }
      },
      async editProfile() {
        this.v$.$validate();
            if (!this.v$.$error  && this.previewImageIcon !== null &&this.previewImage !== null) {
              let result = await axios.put(`http://localhost:3000/users/${this.userid}`,{
                Name : this.userDetail.Name,
                Password : this.userDetail.Password,
                Email : this.userDetail.Email,
                JopTitle : this.jop,
                SiteName:this.name,
                Description:this.description,
                AltText:this.altText,
                Status:this.statu,
              })
              if(result.status == 200){
                this.editSiteName()
                this.Message = "Edit Site Is successfully";
                this.userMessage=''
                window.localStorage.setItem(
              "user-info",
              JSON.stringify(result.data)
            );
              }else {
              document.querySelector(".special").className = "alert alert-danger";
              this.Message = "Error 404";
              }
          }else {
            this.userMessage = "You Must Choose The Photo"
        }
      },
      validateImage(e) {
        console.log(e.target.value)
      }
    },
  };
</script>
<style scoped>
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
    display: block;
    color: red;
  }
  .special {
    position: absolute;
    top: 0;
    right: 0;
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>
