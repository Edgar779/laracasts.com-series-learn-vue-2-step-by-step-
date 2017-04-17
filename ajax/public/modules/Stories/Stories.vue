<template>
  <div id="stories">
    <ul>
      <li v-for="story in stories">
        <h3> {{ story.title }} </h3>
        <p>{{ story.body }}</p>
      </li>
    </ul>

    <form action="/stories" @submit.prevent="onSubmit" class="form">
      <input type="text" name="title" v-model="story.title">
      <textarea class="form-input" name="body" v-model="story.body"></textarea>
      <button type="submit" class="btn btn-primary" >Save</button>
    </form>
  </div>
</template>

<script>

class Errors {
  constructor() {
    this.errors = [];
  }
  get( field ) {
    if ( this.errors[field] ) {
      return this.errors[field][0];
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
      stories: [],
      errors: new Errors()
    }
  },
  mounted() {

    // Get all stories 
    Stories.getAll().then( stories => this.stories = stories.data )
                    .catch( error => console.log(error) );
  },
  methods: {
    onSubmit() {
      Stories.create( this.story )
              .then( ( stories ) => this.stories = stories.data )
              .catch( () => {});
    },
    update( story ) {
      Stories.update( story ).then( () => {}).catch( () => {});
    },
    delete( story ) {
      Stories.delete( story ).then( () => {}).catch( () => {});
    }
  }
}
</script>

<style>
  /* TODO: add reset.css */

  ul li {
    list-style: none;
  }
</style>
