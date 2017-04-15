<template>
  <div id="app">
    <message>Hello</message>
  </div>
</template>

<script>

import Message from './components/Message.vue'

export default {
  components: { Message },
  data () {
    return {
      msg: 'Hello Vusse!'
    }
  }
}
</script>

<style>

</style>
