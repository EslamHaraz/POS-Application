<template>
  <div class="employees container">
    <div class="row">
      <div class="col col-2">
        <mangeComp />
      </div>
      <div class="col col-10">
        <navBar />
        <div class="text d-flex justify-content-between">
          <h1 class="text-start">Profile</h1>
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
                <h5 class="text-start">Email</h5>
                <input
                  autocomplete="on"
                  type="Email "
                  class="form-control mb-4"
                  placeholder="Enter Your Email"
                  v-model="email"
                />
                <span class="error-feedback" v-if="v$.email.$error">{{
                  v$.email.$errors[0].$message
                }}</span>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div style="position: relative" class="d-block mx-auto w-1">
                <h5 class="text-start">Password</h5>
                <input
                  autocomplete="on"
                  type="password"
                  class="form-control mb-4"
                  placeholder="Enter Your Password"
                  v-model="password"
                />
                <span class="error-feedback" v-if="v$.password.$error">{{
                  v$.password.$errors[0].$message
                }}</span>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div style="position: relative" class="d-block mx-auto w-1">
                <h5 class="text-start">ConfirmPassword</h5>
                <input
                  autocomplete="on"
                  type="password"
                  class="form-control mb-4"
                  placeholder="Confirm Your Password"
                  v-model="confirmPassword"
                />
                <span class="error-feedback" v-if="v$.confirmPassword.$error">{{
                  v$.confirmPassword.$errors[0].$message
                }}</span>
                <span class="error-feedback" v-if="passwordError">
                  {{ passwordError }}
                </span>
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
          <div class="file">
            <input
              style="width: 85%; margin-right: 25px"
              type="file"
              class="form-control mb-4"
              ref="fileInput"
              @input="pickFile()"
            />

            <div
              class="image"
              :style="{ 'background-image': `url(${previewImage})` }"
              @click="selectImage()"
            ></div>
          </div>
          <span class="error-feedback" v-if="imageError">
            {{ imageError }}
          </span>
          <div class="row g-3 align-items-center">
            <div style="position: relative" class="d-block mx-auto w-1">
              <button @click="editProfile()" class="btn btn-primary mt-4">
                Edit Profile
              </button>
              <div
                style="width: 350px; margin: 20px auto"
                class="alert alert-success special"
                role="alert"
                v-if="Message"
              >
                {{ Message }}
              </div>
              <div
                style="width: 350px; margin: 20px auto"
                class="alert alert-danger special"
                role="alert"
                v-if="userMessage"
              >
                {{ userMessage }}
              </div>
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
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import axios from "axios";
import { mapActions, mapState } from "vuex";
export default {
  name: "editProfile",
  data() {
    return {
      v$: useValidate(),
      userid: "",
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      jop: "",
      photo: "",
      bath: "",
      previewImage: null,
      passwordError: "",
      imageError: "",
      Message: "",
      userDetail: [],
      userMessage: "",
    };
  },
  validations() {
    return {
      email: { email, required },
      name: { minLength: minLength(5), required },
      password: {
        minLength: minLength(10),
        maxLength: maxLength(12),
        required,
      },
      confirmPassword: {
        minLength: minLength(10),
        maxLength: maxLength(12),
        required,
      },
      jop: { required },
    };
  },
  components: {
    mangeComp,
    navBar,
  },
  computed: {
    ...mapState({
      userName: (state) => state.userName,
    }),
  },
  async mounted() {
    this.bath = this.$route.fullPath.slice(1);
    let user = window.localStorage.getItem("user-info");
    if (user) {
      this.userid = JSON.parse(user).id;
      this.name = JSON.parse(user).Name;
      this.email = JSON.parse(user).Email;
      this.jop = JSON.parse(user).JopTitle;
    } else {
      this.redirectTo({ val: "login" });
    }
    let userinfo = await axios.get(
      `http://localhost:3000/users/${this.userid}`
    );
    if (userinfo.status == 200) {
      this.userDetail = userinfo.data;
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    editSiteName() {
      this.$store.commit("editSuserName", { Name: this.name });
    },
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
    async editProfile() {
      this.v$.$validate();
      if (
        this.password === this.confirmPassword &&
        this.previewImage !== null
      ) {
        let users = await axios.get(
          `http://localhost:3000/users?Email=${this.email}&&Name=${this.name}`
        );
        if (users.status == 200 && users.data.length < 1) {
          this.userMessage = "";
          this.passwordError = "";
          this.imageError = "";
          if (!this.v$.$error) {
            let result = await axios.put(
              `http://localhost:3000/users/${this.userid}`,
              {
                Name: this.name.toLowerCase(),
                Password: this.password,
                Email: this.email,
                JopTitle: this.jop,
                SiteName: this.userDetail.SiteName,
                Description: this.userDetail.Description,
                AltText: this.userDetail.AltText,
                Status: this.userDetail.Status,
              }
            );
            if (result.status == 200) {
              this.editSiteName();
              this.Message = "Edit user Is successfully";
              window.localStorage.setItem(
                "user-info",
                JSON.stringify(result.data)
              );
            } else {
              document.querySelector(".special").className =
                "alert alert-danger";
              this.Message = "Error 404";
            }
          }
        } else {
          this.userMessage = "The user already exists";
          let Name = users.data[0].Name;
          if (this.name === Name || this.email === users.data[0].Email) {
            (this.name = ""), (this.email = "");
          }
        }
      } else {
        this.passwordError = "The password does not match";
        this.imageError = "required photo ";
      }
    },
    validateImage(e) {
      console.log(e.target.value);
    },
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
.parent {
  height: 85vh;
}
</style>
