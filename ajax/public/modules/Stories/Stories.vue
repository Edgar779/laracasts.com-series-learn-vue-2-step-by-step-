<template>
  <div class="col-md-12">
    <h1> {{ pageTitle }} </h1>
    <ul>
      <li v-for="story in stories">
        <h3> {{ story.title }} </h3>
        <p>{{ story.body }}</p>
        <ul>
          <li><button @click="update( story )">Update</button></li>
          <li><button @click="remove( story )">Delete</button></li>
        </ul>
      </li>
    </ul>
    
    <form action="stories" @submit.prevent="onSubmit" @keydown="form.errors.clear($event)">
      <div  class="form-group" 
            v-bind:class="{'has-error': form.errors.get('title') && form.submited}"
            @keydown="form.errors.clear('title')">
        <label>Title:</label>
         <input type="text" 
                name="title"
                class="form-control" 
                v-model="form.title">
         <span  class="help is-danger" 
                v-text="form.errors.get('title')"></span>
      </div>
      <div  class="form-group" 
            v-bind:class="{'has-error': form.errors.get('body') && form.submited}">
        <label>Body:</label>
        <textarea class="form-control"
                  name="body"
                  v-model="form.body"                   
                  ></textarea>

        <span class="help is-danger" 
              v-text="form.errors.get('body')"></span>
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
  </div>
</template>

<script>
import { Form, Errors } from '../Common/Common.js';
import axios from 'axios';

class Stories {
  static getAll() {
    return axios.get('/api/stories');
  }
  static delete( _id ) {
    return axios.delete('/api/stories/' + _id ); 
  }
}


export default {
  name: 'stories',
  data () {
    return {
      form: new Form({
        title: "",
        body: ""
      }),
      stories: []
    }
  },
  computed: {
    pageTitle() {
      return ( this.form["_id"] ) ? "Update story" : "Stories";
    }
  },
  mounted() {
    // Get all stories 
    Stories.getAll().then( stories => this.stories = stories.data );
  },
  methods: {
    onSubmit( story ) {
      var action = ( story.hasOwnProperty("_id") ) ? "put" : "post";

      this.form.submit(action, 'stories')
                .then( this.onSuccess )
                .catch( (errors) => {
                  this.form.errors.record( errors.response.data );
                });
    },
    onSuccess( stories ) {
      this.stories = stories.data;
      this.form.reset();
    },
    // Removes a story
    remove( story ) {
      Stories.delete( story._id ).then( ( response ) => {
        let indx = this.stories.indexOf( story );
        if ( response.data.success && this.stories.splice( indx, 1) );
      });
    }
  }
}
</script>

<style>
  /* TODO: add reset.css */
  #stories > ul {
    overflow-y: scroll;
    height: 50vh;
  }
  #stories ul li {
    position: relative;
  }
  #stories ul li ul {
    position: absolute;
    top:0;
    right: 0;
  }
  ul li {
    list-style: none;
  }
</style>
