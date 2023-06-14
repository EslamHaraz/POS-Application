<template>
  <div class="container center">
    <signUpComp />
  </div>
</template>
<script>
import signUpComp from '@/components/signUp/signUpComp.vue';
  export default {
    name: "signUp",
    components: {
         signUpComp,
    },
  };
</script>
<style>
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%)
}
</style>
