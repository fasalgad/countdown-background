<template>
	<div>
		<div v-drag="{ handle: '#someElement' }">
			<div id="someElement">Handle</div>
		</div>
	</div>
</template>
<script>
export default {
	mounted() {},
	methods: {
		someFunction() {
			console.log(this);
		},
	},
};
</script>