<template>
  <div class="col-md-12">
    <h1>Home</h1>
    
    <form action="/login" @submit.prevent="onSubmit" @keydown="errors.clear($event)">
      <div  class="form-group" 
            v-bind:class="{'has-error': errors.get('username') && submited}"
            @keydown="errors.clear('username')">
        <label>User:</label>
         <input type="text" 
                name="title"
                class="form-control" 
                v-model="user.username">
         <span  class="help is-danger" 
                v-text="errors.get('title')"></span>
      </div>
      <div  class="form-group" 
            v-bind:class="{'has-error': errors.get('password') && submited}">
        <label>Password:</label>
        <input  type="password"
                class="form-control"
                name="pass"
                v-model="user.password"                   
                />
        <span class="help is-danger" 
              v-text="errors.get('password')"></span>
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
  </div>
</template>

<script>
import Errors from '../Common/Common.js';

class Auth {
  static login( user ) {
    return axios.post('/api/user/login', user); 
  }
}

export default {
  name: 'home',
  data () {
    return {
      submited: false,
      errors: new Errors()
    }
  },
  methods: {
    onSubmit( story ) {
      this.submited = true;
      Auth.login( this.user )
              .then( this.onSuccess )
              .catch( ( errors ) => { 
                this.errors.record( errors.response.data ) 
              });
    },
    onSuccess( stories ) {
      alert("logged in");
      this.submited = false;
    }
  }
}
</script>

<style>
  div.login {
    margin:0 auto;
  }
  
</style>

<style>
  
</style>
