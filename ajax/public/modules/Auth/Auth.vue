<template>
  <div class="col-md-4 login text-center">
    <h1>Login</h1>
    
    <form @submit.prevent="onSubmit" @keydown="form.errors.clear($event)">
      <div  class="form-group" 
            v-bind:class="{'has-error': form.errors.get('username') && form.submited}"
            @keydown="form.errors.clear('username')">
        <label>User:</label>
         <input type="text" 
                name="title"
                class="form-control" 
                v-model="form.username">
         <span  class="help is-danger" 
                v-text="form.errors.get('title')"></span>
      </div>
      <div  class="form-group" 
            v-bind:class="{'has-error': form.errors.get('password') && form.submited}">
        <label>Password:</label>
        <input  type="password"
                class="form-control"
                name="pass"
                v-model="form.password"                   
                />
        <span class="help is-danger" 
              v-text="form.errors.get('password')"></span>
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
  </div>
</template>

<script>

import axios from 'axios';
import { Form, Errors } from '../Common/Common.js';

export default {
  name: 'auth',
  data () {
    return {
      form: new Form({
        username: "",
        password: ""
      })
    }
  },
  methods: {
    onSubmit( story ) {
      this.form.submit('post', 'user/login')
              .then( this.onSuccess )
              .catch( ( errors ) => { 
                if ( errors.response ) {
                  this.form.errors.record( errors.response.data );
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
  .login {
    margin:0 auto;
    float: none;
    display: block;
  }
  .login form {
    text-align: left;
    margin-top: 30px;
  }
</style>>
