<template >
    <div class="container center">
      <loginComp />
    </div>
  </template>
  <script>
  import loginComp from '@/components/login/loginComp.vue';
    export default {
      name: "login",
      components: {
        loginComp,
      },
    };
  </script>
  