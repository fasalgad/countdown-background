<template>
	<div
		id="droparea"
		ref="droparea"
		@dragenter="highlight"
		@dragover="highlight"
		@dragleave="unhighlight"
		@drop="handleDrop"
		style="width: 100%; height: 100%"
	>
		<div style="position: fixed; z-index: 3">
			<div style="position: absolute; z-index: 3">
				{{ timeLeft }}
				<div v-show="showTimer">
					<div v-show="!edit">
						<v-btn icon>
							<v-icon @click="btnEdit"> mdi-pencil </v-icon>
						</v-btn>
					</div>
					<div v-show="edit">
						<v-text-field
							filled
							v-model="timeLimit"
							type="number"
							:append-icon="show4 ? 'mdi-bell' : 'mdi-bell-off'"
							@click:append="sound"
							@click:append-outer="play"
							append-outer-icon="mdi-check"
							color="white"
						>
						</v-text-field>
					</div>
				</div>
				<div>
					<v-btn icon>
						<v-icon v-if="showTimer" @click="showTimer = !showTimer">
							mdi-timer-off
						</v-icon>
						<v-icon v-else @click="showTimer = !showTimer"> mdi-timer </v-icon>
					</v-btn>
				</div>
				<div>
					<v-btn icon>
						<v-icon v-if="showScreen" @click="exitFullscreen">
							mdi-fullscreen-exit
						</v-icon>
						<v-icon v-else @click="fullscreen"> mdi-fullscreen </v-icon>
					</v-btn>
				</div>
			</div>
			<BaseTimer
				v-if="showTimer"
				:time-left="timer"
				:timeLimit="timeLimitNumber"
				:muted="muted"
			></BaseTimer>
		</div>
		<v-img
			width="100%"
			:src="img.src"
			v-for="(img, index) of imgs"
			:key="index"
		>
			<v-btn icon absolute right @click="removeImg(img, index)">
				<v-icon> mdi-close </v-icon>
			</v-btn>
		</v-img>
		<form class="my-form">
			<input
				type="file"
				id="fileElem"
				multiple
				accept="image/*"
				@change="handleFiles($event)"
			/>
			<label class="button" for="fileElem">
				<v-icon> mdi-attachment </v-icon>
			</label>
		</form>
	</div>
</template>
<script>
import BaseTimer from "../components/BaseTimer.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
	data() {
		return {
			files: [],
			timeLimit: 20,
			timePassed: 0,
			timerInterval: null,
			edit: false,
			imgs: [],
			imgGuid: [],
			muted: true,
			show4: false,
			showTimer: true,
			showScreen: false,
		};
	},
	created() {},
	components: {
		BaseTimer,
	},
	computed: {
		...mapState(["timer"]),
		timeLeft() {
			if (this.timer == 0) {
				this.ClearTimer();
			}

			return "";
		},
		timeLimitNumber() {
			return isNaN(this.timeLimit) ? 0 : parseInt(this.timeLimit);
		},
	},
	methods: {
		...mapActions(["initiate_timer", "clear_timer"]),
		...mapMutations(["set_timer", "start_timer"]),
		fullscreen() {
			this.showScreen = !this.showScreen;
			let elem = this.$refs.droparea;
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.webkitRequestFullscreen) {
				/* Safari */
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) {
				/* IE11 */
				elem.msRequestFullscreen();
			}
		},
		exitFullscreen() {
			this.showScreen = !this.showScreen;
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitexitFullscreen) {
				/* Safari */
				document.webkitexitFullscreen();
			} else if (document.msexitFullscreen) {
				/* IE11 */
				document.msexitFullscreen();
			}
		},
		sound() {
			this.show4 = !this.show4;
			this.muted = !this.show4;
		},
		removeImg(img) {
			// this.imgs.splice(index, 1);

			// let i = this.imgs.filter((ele) => {
			// 	console.log(ele.guid, img.guid);
			// 	return ele.guid == img.guid;
			// });

			let ii = this.imgGuid.indexOf(img.guid);
			this.imgs.splice(ii, 1);
			this.imgGuid.splice(ii, 1);
			console.log(this.imgGuid, this.imgs, ii);
		},
		play() {
			this.SetTimer();
			this.edit = false;
		},
		btnEdit() {
			this.edit = true;
			this.ClearTimer();
		},
		SetTimer() {
			try {
				this.timeLimit = parseInt(this.timeLimit);
			} catch (error) {
				this.timeLimit = 0;
			}
			this.set_timer(this.timeLimit);
			this.StartTimer();
		},
		StartTimer() {
			this.initiate_timer();
		},
		ClearTimer() {
			this.clear_timer();
		},
		highlight(e) {
			e.preventDefault();
			e.stopPropagation();
			this.$refs.droparea.classList.add("highlight");
		},
		unhighlight(e) {
			e.preventDefault();
			e.stopPropagation();
			this.$refs.droparea.classList.remove("highlight");
		},
		handleDrop(e) {
			e.preventDefault();
			e.stopPropagation();
			this.unhighlight(e);
			let dt = e.dataTransfer;
			let files = dt.files;

			this.handleFiles(files);
		},
		handleFiles(event) {
			if (event instanceof Event) {
				let files = [...event.srcElement.files];
				// // files.forEach(this.uploadFile);
				files.forEach(this.previewFile);
			} else {
				if (event instanceof FileList) {
					let files = [...event];
					// // files.forEach(this.uploadFile);
					files.forEach(this.previewFile);
				}
			}
		},
		uploadFile(file) {
			let url = "YOUR URL HERE";
			let formData = new FormData();

			formData.append("file", file);

			fetch(url, {
				method: "POST",
				body: formData,
			})
				.then(() => {
					/* Done. Inform the user */
				})
				.catch(() => {
					/* Error. Inform the user */
				});
		},
		previewFile(file) {
			console.log("previewFile", file);
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				// let img = document.createElement("img");
				// img.src = reader.result;
				// img.style.width = "100%";
				// this.$refs.gallery.appendChild(img);
				// console.log(this.$refs.gallery);
				let guid = this.generateUUID();
				this.imgs.push({
					guid: guid,
					src: reader.result,
				});
				this.imgGuid.push(guid);
			};
		},
		generateUUID() {
			// Public Domain/MIT
			var d = new Date().getTime(); //Timestamp
			var d2 =
				(typeof performance !== "undefined" &&
					performance.now &&
					performance.now() * 1000) ||
				0; //Time in microseconds since page-load or 0 if unsupported
			return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
				/[xy]/g,
				function (c) {
					var r = Math.random() * 16; //random number between 0 and 16
					if (d > 0) {
						//Use timestamp until depleted
						r = (d + r) % 16 | 0;
						d = Math.floor(d / 16);
					} else {
						//Use microseconds since page-load if supported
						r = (d2 + r) % 16 | 0;
						d2 = Math.floor(d2 / 16);
					}
					return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
				}
			);
		},
	},
};
</script>
<style>
/* Safari */
:-webkit-full-screen {
	background-color: white;
}

/* IE11 */
:-ms-fullscreen {
	background-color: white;
}

/* Standard syntax */
:fullscreen {
	background-color: white;
}
.v-input__icon button {
	color: white !important;
	background: #000000b0 !important;
	border-radius: 21% !important;
}
.v-text-field__slot input {
	font-weight: bold;
}
#drop-area {
	border: 2px dashed #ccc;
	border-radius: 20px;
	width: 480px;
	font-family: sans-serif;
	margin: 100px auto;
	padding: 20px;
}
#drop-area.highlight {
	border-color: purple;
}
p {
	margin-top: 0;
}
.my-form {
	margin-bottom: 10px;
}
#gallery {
	margin-top: 10px;
}
#gallery img {
	width: 150px;
	margin-bottom: 10px;
	margin-right: 10px;
	vertical-align: middle;
}
.button {
	display: inline-block;
	padding: 10px;
	cursor: pointer;
	border-radius: 5px;
}
.button:hover {
	background: #ddd;
}
#fileElem {
	display: none;
}
</style>