<template>
  <div class="col-md-12">
    <user-info></user-info>
    <h1>Home</h1>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style>
  header {
    position: fixed;
    top:0;
    left:0;
    background: blue;
    color:white;
    width:100%;
    padding: 1em;
    text-align: right;
  }
  .container .row {
    margin-top: 50px;
  }
</style>
