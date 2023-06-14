<template>
    <div class="container " style="margin-top: 90px;" >
        <h1 class="text-danger">Are You Want To Delete This Employee</h1>
        <table class="table table-striped">
  <thead>
    <tr style="background-color: white;">
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Jop_Title</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>{{name}}</td>
      <td>{{email}}</td>
      <td>{{jop}}</td>
    </tr>
  </tbody>
</table>
<button @click="DeleteNow()" class="btn  btn-danger">Delete Now</button>&nbsp;&nbsp;&nbsp;
<router-link style="text-decoration: none;" :to="{name:'employeesComp'}">
    <button @click="th" class="btn  btn-primary">Back</button>&nbsp;&nbsp;&nbsp;
</router-link>
<div
      style="width: 350px; margin: 20px auto"
      class="alert alert-success special"
      role="alert"
      v-if="Message"
    >
      {{ Message }}
    </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import axios from 'axios';
export default {
    name:"DeleteEmloyee",
    data(){
        return {
            employeeId:this.$route.params.employeeId,
            userId : '',
            employeeDetail:[],
            name:"",
            email:"",
            jop:"",
            Message:""
        }
    },
   async mounted(){
        let user = window.localStorage.getItem('user-info')
        if(!user){
            this.redirecTo({val:"login"})
        }else {
            this.userId = JSON.parse(user).id;
        }
        let result = await axios.get(`http://localhost:3000/Employees?userId=${this.userId}&&id=${this.employeeId}`)
        if(result.status == 200 && result.data.length > 0){  
            this.name = result.data[0].Name
            this.email = result.data[0].Email
            this.jop = result.data[0].Jop

        }
    },
    methods : {
        ...mapActions(["redirectTo"]),
      async  DeleteNow(){
            let result = await axios.delete(`http://localhost:3000/Employees/${this.employeeId}`)
            if(result.status === 200){
                this.Message = "Deleted Is successfully"
                setTimeout(()=>{
                    this.redirectTo({val:'employeesComp'})
                },2000)
            }else {
                this.Message = "Error 404" 
            }
        }
    }
}
</script>