<template>
  <div id="app">
    <ul>
      <li v-for="story in stories" v-text="story"></li>
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
  name: 'app',
  data () {
    return {
      stories: []
    }
  },
  mounted() {
    console.log(Stories)
    Stories.getAll().then( stories => this.stories = stories)
                  .catch( error => console.log(error) );
  }
}
</script>

<style>
</style>
