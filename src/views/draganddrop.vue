<template>
	<div>
		<div
			id="drop_zone"
			ref="drop_zone"
			@drop="dropHandler($event, outside)"
			@dragover="dragOverHandler($event, outside)"
		>
			<v-img :src="file && file.name ? file.name : ''"></v-img>
			<p>Arrastra y suelta uno o más archivos a esta zona ...</p>
		</div>
		<v-btn @click="click">click</v-btn>
	</div>
</template>
<script>
export default {
	data() {
		return {
			file: null,
			outside: null,
		};
	},
	created() {
		this.outside = this;
	},
	mounted() {},
	watch: {
		file() {
			console.log("watch", this.file);
		},
	},
	methods: {
		click() {
			console.log(this.file);
		},
		dropHandler: (ev, vuethis) => {
			console.log("Fichero(s) arrastrados");

			// Evitar el comportamiendo por defecto (Evitar que el fichero se abra/ejecute)
			ev.preventDefault();

			if (ev.dataTransfer.items) {
				// Usar la interfaz DataTransferItemList para acceder a el/los archivos)
				for (let i = 0; i < ev.dataTransfer.items.length; i++) {
					// Si los elementos arrastrados no son ficheros, rechazarlos
					if (ev.dataTransfer.items[i].kind === "file") {
						var file = ev.dataTransfer.items[i].getAsFile();
						console.log("... file[" + i + "].name = " + file.name);
						vuethis.file = file;
					}
				}
			} else {
				// Usar la interfaz DataTransfer para acceder a el/los archivos
				for (let i = 0; i < ev.dataTransfer.files.length; i++) {
					console.log(
						"... file[" + i + "].name = " + ev.dataTransfer.files[i].name
					);
					vuethis.file = ev.dataTransfer.files[i].name;
					console.log(ev);
				}
			}

			// // Pasar el evento a removeDragData para limpiar
			// outside.removeDragData(ev);
		},
		dragOverHandler: (ev) => {
			console.log("File(s) in drop zone");

			// Prevent default behavior (Prevent file from being opened)
			ev.preventDefault();
		},
		removeDragData: (ev) => {
			console.log("Removing drag data");
			// console.log(ev);
			if (ev.dataTransfer.items) {
				// Use DataTransferItemList interface to remove the drag data
				ev.dataTransfer.items.clear();
			} else {
				// Use DataTransfer interface to remove the drag data
				ev.dataTransfer.clearData();
			}
		},
	},
};
</script>

<style>
#drop_zone {
	border: 5px solid blue;
	width: 200px;
	height: 100px;
}
</style>