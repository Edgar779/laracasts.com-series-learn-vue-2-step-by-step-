<template>
  <div class="col-md-4 login">
    <h1>Login</h1>
    
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

import axios from 'axios';
import Errors from '../Common/Common.js';

class Auth {
  static login( user ) {
    return axios.post('/api/user/login', user); 
  }
}

export default {
  name: 'auth',
  data () {
    return {
      user: {
        username: "",
        password: ""
      },
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
                if ( errors.response ) {
                  this.errors.record( errors.response.data )   
                }
                else {
                  alert("Invalid user data");
                }
                
              });
    },
    onSuccess( response ) {
      if ( response.data._id ) {
        this.$store.commit("login", response.data );
        this.$router.push("/home");
      }
      else {
        alert("Invalid user data");
      }
    }
  }
}
</script>

<style>
  .row {
    margin:0 auto;
  }
</style>>
