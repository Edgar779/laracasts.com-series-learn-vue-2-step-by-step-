<template>
    <header>
      {{ user.name }}
      <button @click="logout">Exit</button>
    </header>
</template>

<script>
export default {
  name: 'user-info',
  computed: {
  	user() {
  		return this.$store.state.user
  	}
  },
  methods: {
  	logout() {
  		this.$store.commit('logout');
  		this.$router.go('/login');
  	}
  }
}
</script>
