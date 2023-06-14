<template>
    <div class="container">
        <FontAwesome  :icon="['fas', 'bars']" style="margin: 0; cursor: pointer; "/>
        <FontAwesome @click="signOut()" :icon="['fas', 'sign-out-alt']" style="margin: 0;  cursor: pointer;" title="Sign Out"/>
        </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name:"navBar",
    methods:{
        ...mapActions(['redirectTo']),
        signOut(){
            window.localStorage.removeItem("user-info")
            this.redirectTo({val:"login"})
        }
    }
}
</script>
<style scoped>
.container {
    background-color: #e7e7e7;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>