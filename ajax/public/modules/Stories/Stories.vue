<template>
  <div class="col-md-12" id="stories">
    <h1> {{ pageTitle }} </h1>
    <label>
      Filter stories by title: <input v-model="searchText" />
    </label>
    <ul>
      <li v-for="story in filteredStories">
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
        _id: null,
        title: "",
        body: ""
      }),
      searchText: "",
      stories: []
    }
  },
  computed: {
    pageTitle() {
      return ( this.form["_id"] != null ) ? "Update story" : "Stories";
    },
    filteredStories: function () {
      return this.stories.filter(( story ) => {
        return story.title.indexOf( this.searchText ) !== -1;
      });
    }
  },
  mounted() {
    // Get all stories 
    Stories.getAll().then( stories => this.stories = stories.data );
  },
  methods: {
    onSubmit() {
      var action = ( this.form._id != null ) ? "put" : "post";
      
      this.form.submit(action, 'stories')
                .then( stories => this.stories = stories.data )
                .catch(errors => alert( errors ));
    },
    update( story ) {
      this.form.setData( story );
    },
    // Removes a story
    remove( story ) {
      Stories.delete( story._id ).then( response => {
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
    height: 37vh;
  }
  #stories ul li {
    position: relative;
  }
  #stories ul li ul {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
  }
  ul li {
    list-style: none;
  }
</style>
