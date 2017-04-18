<template>
  <div class="col-md-12">
    <h1> {{ pageTitle }} </h1>
    <ul>
      <li v-for="story in stories">
        <h3> {{ story.title }} </h3>
        <p>{{ story.body }}</p>
      </li>
    </ul>
    
    <form action="/stories" @submit.prevent="onSubmit" @keydown="errors.clear($event)">
      <div  class="form-group" 
            v-bind:class="{'has-error': errors.get('title') && submited}"
            @keydown="errors.clear('title')">
        <label>Title:</label>
         <input type="text" 
                name="title"
                class="form-control" 
                v-model="story.title">
         <span  class="help is-danger" 
                v-text="errors.get('title')"></span>
      </div>
      <div  class="form-group" 
            v-bind:class="{'has-error': errors.get('body') && submited}">
        <label>Body:</label>
        <textarea class="form-control"
                  name="body"
                  v-model="story.body"                   
                  ></textarea>

        <span class="help is-danger" 
              v-text="errors.get('body')"></span>
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
  </div>
</template>

<script>

class Errors {
  constructor() {
    this.errors = {};
  }
  get( field ) {
    if ( this.errors[field] ) {
      return this.errors[field].message;
    }
  }
  record( errors ) {
    this.errors = errors;
  }
  clear( ev ) {
    if ( ev.target ) {
      delete this.errors[ ev.target.name ];
    } 
  }
}

class Stories {
  static getAll() {
    return axios.get('/api/stories');
  }
  static update( story ) {
    return axios.put('/api/stories/', story);
  }
  static create( story ) {
    return axios.post('/api/stories', story);
  }
  static delete( story ) {
    return axios.delete('/api/stories/' + story.id ); 
  }
}

export default {
  name: 'stories',
  data () {
    return {
      story: {
        title: "",
        body: ""
      },
      submited: false,
      stories: [],
      errors: new Errors()
    }
  },
  computed: {
    pageTitle() {
      return ( this.story["_id"] ) ? "Update story" : "Stories";
    }
  },
  mounted() {
    // Get all stories 
    Stories.getAll().then( stories => this.stories = stories.data );

  },
  methods: {
    onSubmit( story ) {
      this.submited = true;
      var action = ( story.hasOwnProperty("_id") ) ? "update" : "create";
      Stories[ action ]( this.story )
              .then( this.onSuccess )
              .catch( ( errors ) => { 
                this.errors.record( errors.response.data ) 
              });
    },
    onSuccess( stories ) {
      this.stories = stories.data;
      this.story.title = this.story.body = "";
      this.submited = false;
    },
  }
}
</script>

<style>
  /* TODO: add reset.css */

  ul li {
    list-style: none;
  }
</style>
