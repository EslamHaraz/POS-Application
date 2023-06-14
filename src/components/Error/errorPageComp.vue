<template>
    <body>
        <div class="parent">
          <img src="../Error/img/800px_COLOURBOX22636839.jpg"> 
          <button @click="goBack()" class="button">Go Back</button>
        </div>
    </body>
  </template>
  <script>
  import { mapActions } from 'vuex';
    export default {
      name: "ErrorPage",
      methods:{
        ...mapActions(["redirectTo"]),
        goBack(){
          this.redirectTo({val:"home"})
        }
      }
    };
  </script>
  <style scoped>
  .parent {
    text-align: center;
    margin: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  
  }
  .parent img {
    max-width: 100%;  
  }
  button {
    color: white;
    font-weight: 800
  }
  body {
    background-color: white !important;
    height: 100vh;
  }
  #app {
    position: relative;
    height: 100vh;
  }
  .button {
    background-color: #2c6789;
    padding: 5px;
    width: 150px;
    border: none;
    border-radius: 7px;
    transition: 0.5s;
  }
  .button:hover {
    opacity: 0.8;
  }
  </style>