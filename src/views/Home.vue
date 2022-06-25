<template>
	<div class="home">
		<div style="position: absolute; top: 0; right: 0; z-index: 1">
			<v-btn fab large bottom left>
				<v-icon>mdi-pencil </v-icon>
			</v-btn>
		</div>
		<v-img
			v-for="(img, index) of fileRecords"
			:key="index"
			:src="img.urlResized"
			width="100%"
			alt=""
		>
			<BaseTimer :time-left="timeLeft"></BaseTimer>
		</v-img>
		<VueFileAgent
			ref="vueFileAgent"
			:theme="'list'"
			:multiple="true"
			:deletable="true"
			:meta="true"
			:accept="'image/*,.zip'"
			:maxSize="'20MB'"
			:maxFiles="14"
			:helpText="'Choose images or zip files'"
			:errorText="{
				type: 'Invalid file type. Only images or zip Allowed',
				size: 'Files should not exceed 10MB in size',
			}"
			@select="filesSelected($event)"
			@beforedelete="onBeforeDelete($event)"
			@delete="fileDeleted($event)"
			v-model="fileRecords"
		></VueFileAgent>
		<button :disabled="!fileRecordsForUpload.length" @click="uploadFiles()">
			Upload {{ fileRecordsForUpload.length }} files
		</button>
	</div>
</template>

<script>
// @ is an alias to /src
import BaseTimer from "../components/BaseTimer";
export default {
	name: "Home",
	mounted() {
		// try {
		// 	let img = localStorage.getItem("img");
		// 	this.fileRecords = img;
		// // eslint-disable-next-line no-empty
		// } catch (error) {}
		document.head
			.appendChild(`<meta property="og:url"                content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" />
<meta property="og:type"               content="article" />
<meta property="og:title"              content="When Great Minds Don’t Think Alike" />
<meta property="og:description"        content="How much does culture influence creative thinking?" />
<meta property="og:image"              content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />`);
	},
	data: function () {
		return {
			fileRecords: [],
			uploadUrl: "https://www.mocky.io/v2/5d4fb20b3000005c111099e3",
			uploadHeaders: { "X-Test-Header": "vue-file-agent" },
			fileRecordsForUpload: [],
			img: null,
			timeLimit: 20,
			timePassed: 0,
			timerInterval: null,
		};
	},
	components: {
		BaseTimer,
	},
	watch: {
		fileRecords() {
			console.log(this.fileRecords);
			this.startTimer();
		},
	},
	computed: {
		timeLeft() {
			return this.timeLimit - this.timePassed;
		},
	},
	methods: {
		startTimer() {
			this.$setIntervalCurrentTime = setInterval(() => {
				this.timePassed += 1;

				if (this.timeLimit - this.timePassed == 0) {
					this.$clearIntervalCurrentTime(this);
				}
			}, 1000);
		},
		uploadFiles: function () {
			// Using the default uploader. You may use another uploader instead.
			this.$refs.vueFileAgent.upload(
				this.uploadUrl,
				this.uploadHeaders,
				this.fileRecordsForUpload
			);
			this.fileRecordsForUpload = [];
		},
		deleteUploadedFile: function (fileRecord) {
			// Using the default uploader. You may use another uploader instead.
			this.$refs.vueFileAgent.deleteUpload(
				this.uploadUrl,
				this.uploadHeaders,
				fileRecord
			);
		},
		filesSelected: function (fileRecordsNewlySelected) {
			console.log("fileRecordsNewlySelected", fileRecordsNewlySelected);
			this.img = fileRecordsNewlySelected.urlResized;
			var validFileRecords = fileRecordsNewlySelected.filter(
				(fileRecord) => !fileRecord.error
			);
			this.fileRecordsForUpload =
				this.fileRecordsForUpload.concat(validFileRecords);
		},
		onBeforeDelete: function (fileRecord) {
			var i = this.fileRecordsForUpload.indexOf(fileRecord);
			if (i !== -1) {
				this.fileRecordsForUpload.splice(i, 1);
			} else {
				if (confirm("Are you sure you want to delete?")) {
					this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
				}
			}
		},
		fileDeleted: function (fileRecord) {
			var i = this.fileRecordsForUpload.indexOf(fileRecord);
			if (i !== -1) {
				this.fileRecordsForUpload.splice(i, 1);
			} else {
				this.deleteUploadedFile(fileRecord);
			}
		},
	},
};
</script>
<style>
.single-file-upload-for-vue {
	font-size: 0.75em;
	border: 2px dashed #dc5f00;
	background: #ffe484;
	border-radius: 20%;
}
</style>
