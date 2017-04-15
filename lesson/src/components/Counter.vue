<template>
	
	<div> The count is {{ counter }} 
		<button @click=" counter++ "> Increment </button>
	</div>
</template>

<script>
	export default {
		data() {
			return { counter: 0 };
		}
	}

</script>

<style>
	
</style>