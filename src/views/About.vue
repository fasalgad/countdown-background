<template>
	<div class="about">
		<upload-image
			is="upload-image"
			:url="forms.create.url"
			:max_files="5"
			name="files[]"
			:resize_enabled="true"
			:resize_max_width="640"
			:button_html="forms.create.confirm"
			:button_class="'button is-primary'"
			v-on:upload-image-attemp="uploadImageAttempt"
			v-on:upload-image-success="uploadImageSuccess"
			v-on:upload-image-failure="uploadImageFailure"
			v-on:upload-image-loaded="uploadImageLoaded"
			v-on:upload-image-submit="uploadImageSubmit"
			v-on:upload-image-clicked="uploadImageClicked"
			v-on:upload-image-removed="uploadImageRemoved"
		></upload-image>
	</div>
</template>
<script>
export default {
	data() {
		return {
			forms: {
				create: {
					url: 'https://url.cl',
					confirm: null,
				},
			},
		};
	},
	methods: {
		uploadImageAttempt(event) {
			console.log("uploadImageAttempt", event);
		},
		uploadImageSuccess(event) {
			console.log("uploadImageSuccess", event);
		},
		uploadImageFailure(event) {
			console.log("uploadImageFailure", event);
		},
		uploadImageLoaded(event) {
			console.log("uploadImageLoaded", event);
		},
		uploadImageSubmit(event) {
			console.log("uploadImageSubmit", event);
		},
		uploadImageClicked(event) {
			console.log("uploadImageClicked", event);
		},
		uploadImageRemoved(event) {
			console.log("uploadImageRemoved", event);
		},
	},
};
</script>
