<template>
  <div id="stories">
    <ul>
      <li v-for="story in stories">
        <h3> {{ story.title }} </h3>
        <p>{{ story.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script>

class Stories {
  static getAll() {
    return axios.get('/api/stories');
  }
}

export default {
  name: 'stories',
  data () {
    return {
      stories: []
    }
  },
  mounted() {

    // Get all stories 
    Stories.getAll().then( stories => this.stories = stories.data )
                    .catch( error => console.log(error) );
  }
}
</script>

<style>
  /* TODO: add reset.css */

  ul li {
    list-style: none;
  }
</style>
