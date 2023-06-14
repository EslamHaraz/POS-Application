<template>
  <div class="signup">
    <form @click.prevent class="form">
      <div class="row g-3 align-items-center">
        <div style="position: relative" class="d-block mx-auto">
          <h1 style="color: #727272">Sign Up</h1>
          <input
            type="text "
            class="form-control"
            placeholder="Enter Your Name"
            v-model.trim="name"
          />
          <FontAwesome :icon="['fas', 'address-card']" style="margin: 0;" class="name" />
          <span class="error-feedback" v-if="v$.name.$error">{{
            v$.name.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div style="position: relative;" class="d-block mx-auto">
          <input
            type="email "
            class="form-control"
            placeholder="Enter Your Email"
            v-model.trim="email"
          />
          <FontAwesome :icon="['fas', 'envelope']" style="margin: 0;" class="email" />
          <span class="error-feedback" v-if="v$.email.$error">{{
            v$.email.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div style="position: relative;" class="d-block mx-auto">
          <input
            autocomplete="on"
            type="password"
            class="form-control"
            placeholder="Enter Your Password"
            v-model.trim="pass"
          />
          <FontAwesome :icon="['fas', 'lock']" style="margin: 0;" class="email" />
          <span class="error-feedback" v-if="v$.pass.$error">{{
            v$.pass.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div style="position: relative;" class="d-block mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Enter Your Jop"
            v-model.trim="jop"
          />
          <FontAwesome :icon="['fas', 'briefcase']" style="margin: 0;" class="email" />
          <span class="error-feedback" v-if="v$.jop.$error">{{
            v$.jop.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div style="position: relative;" class="d-block mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Enter Your Site Name"
            v-model.trim="siteName"
          />
          <FontAwesome :icon="['fas', 'address-card']" style="margin: 0;" class="email" />
          <span class="error-feedback" v-if="v$.siteName.$error">{{
            v$.siteName.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div style="position: relative;" class="d-block mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Enter Your Site Description"
            v-model.trim="description"
          />
          <FontAwesome :icon="['fas', 'audio-description']" style="margin: 0;" class="email" />
          <span class="error-feedback" v-if="v$.description.$error">{{
            v$.description.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div style="position: relative;" class="d-block mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Alt text"
            v-model.trim="altText"
          />
          <FontAwesome :icon="['fas', 'comment']" style="margin: 0;" class="email" />
          <span class="error-feedback" v-if="v$.altText.$error">{{
            v$.altText.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
    </form>
    <div class="file">
            <input
              type="file"
              class="form-control mb-4 inputImage"
              ref="fileInput"
              @input="pickFile()"
            />

            <div
              class="image"
              :style="{ 'background-image': `url(${previewImage})` }"
              @click="selectImage()"
            ></div>
          </div>
          <span class="error-feedback photoError" v-if="imageError">
            {{ imageError }}
          </span>
          <div>
            <div class="col-auto d-block submit">
          <button
            type="submit"
            @click="signUpNow()"
            class="btn btn-primary d-block mb-2 w-100"
          >
            SignUp Now</button
          >&nbsp;&nbsp;&nbsp;
          <button
            type="submit"
            @click="redirectTo({ val: 'login' })"
            class="btn d-block w-100 sign text-light"
          >
            Login
          </button>
          &nbsp;&nbsp;&nbsp;
        </div>
      </div>
      <br />

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
      v-if="users"
    >
      {{ users }}
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import { mapActions } from "vuex";
  import useValidate from "@vuelidate/core";
  import { required, email, minLength } from "@vuelidate/validators";
  export default {
    name: "signUpComp",
    data() {
      return {
        v$: useValidate(),
        name: "",
        pass: "",
        siteName:"",
        description:"",
        altText:"",
        previewImage: null,
        imageError: "",
        email: "",
        Message: "",
        users: "",
        jop:"",
      };
    },
    async mounted() {
      let user = window.localStorage.getItem("user-info");
      if (user) {
        this.redirectTo({ val: "home" });
      }
    },
    validations() {
      return {
        name: { required, minLength: minLength(10) },
        pass: { required, minLength: minLength(10) },
        email: { required, email },
        siteName: { required },
        description: { required },
        altText: { required },
        jop: { required},
      };
    },
    methods: {
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
      async signUpNow() {
        this.v$.$validate();
        if (!this.v$.$error &&this.previewImage !== null) {
          let user = await axios.get(
            `http://localhost:3000/users?Email=${this.email}&Name=${this.name}`
          );
          if (user.status == 200 && user.data.length < 1) {
            this.users = "";
            this.imageError = "";
            let result = await axios.post(`http://localhost:3000/users`, {
              Name: this.name,
              Password: this.pass,
              Email: this.email,
              SiteName:this.siteName,
              Description:this.description,
              AltText:this.altText,
              Status:"Open",
              JopTitle:this.jop,
            });
            if (result.status == 201) {
              // Save User Info To LocalStorage
              window.localStorage.setItem(
                "user-info",
                JSON.stringify(result.data)
              );
              setTimeout(() => {
                this.redirectTo({ val: "home" });
              }, 1000);
              this.Message = "Signup Is successfully";
            } else {
            }
            document.querySelector(".special").className = "alert alert-danger";
            this.Message = "Error 404";
          } else {
            this.users = "This Email Or Name Already Existing ";
            let Name = user.data[0].Name;
            if (this.name === Name || this.email === user.data[0].Email) {
              (this.name = ""), (this.email = "");
              console.log("hello");
            }
          }
        }else {
          this.imageError = "required photo ";
        }
      },
    },
  };
</script>

<style scoped>
.form {
  box-shadow:none;
}
  .error-feedback {
    color: red ;
    font-size: 0.85em;
    text-transform: capitalize;
  }
  .name {
    position: absolute;
    top: 91px;
    right: 15px;
    margin: 0
  }

  .image {
    width: 100px;
    height: 100px;
    background-size: cover;
    margin: 20px auto
  }
  .photoError {
       width: 400px;
        background-color: #fdfdfd;
        display:block; margin: auto
  }
  .file {
    width: 400px;
    margin: auto;
    background-color: #fdfdfd;
    display: flex;
    align-items: center;
  }
  .inputImage {
    width:230px !important;
    margin-left:20px !important;
  }
  .submit {
    width: 400px !important;
    margin: auto;
    background-color: white;
    padding: 20px;
}
</style>
