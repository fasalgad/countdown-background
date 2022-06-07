
<!-- BaseTimer.vue -->
<template>
	<div class="base-timer">
		<audio ref="audio" :src="audio" style="display: none"></audio>
		<svg
			class="base-timer__svg"
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g class="base-timer__circle">
				<circle class="base-timer__path-elapsed" cx="50" cy="50" r="46.5" />
				<path
					id="base-timer-path-remaining"
					ref="base-timer-path-remaining"
					:stroke-dasharray="circleDasharray || '283'"
					:class="`base-timer__path-remaining ${remainingPathColor}`"
					d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
				></path>
			</g>
		</svg>
		<span class="base-timer__label">
			<!-- Remaining time label -->
			{{ formattedTimeLeft }}
		</span>
	</div>
</template>
<script>
/* eslint-disable no-unused-vars */
var π = 3.14;
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
	info: {
		color: "green",
	},
	warning: {
		color: "orange",
		threshold: WARNING_THRESHOLD,
	},
	alert: {
		color: "red",
		threshold: ALERT_THRESHOLD,
	},
};

export default {
	props: {
		timeLeft: {
			type: Number,
			required: true,
		},
		timeLimit: {
			type: Number,
			required: true,
		},
		muted: {
			type: Boolean,
			default: false,
		},
	},
	created() {
		this.remainingPathColor = COLOR_CODES.info.color;
		this.audio = require("../assets/audio/Tram Bell 4 - QuickSounds.com.mp3");
	},
	data() {
		return {
			FULL_DASH_ARRAY: 2 * π * 45,
			remainingPathColor: null,
			audio: null,
		};
	},
	methods: {
		setRemainingPathColor() {
			try {
				const { alert, warning, info } = COLOR_CODES;
				if (this.timeLeft <= alert.threshold) {
					this.remainingPathColor = alert.color;
				} else if (this.timeLeft <= warning.threshold) {
					this.remainingPathColor = warning.color;
				} else {
					this.remainingPathColor = COLOR_CODES.info.color;
				}
				// eslint-disable-next-line no-empty
			} catch (error) {}
		},
		calculateTimeFraction() {
			const rawTimeFraction = this.timeLeft;
			return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction);
		},
		play() {
			try {
				this.$refs.audio.play();
				this.$refs.audio.volume = 1;
				// eslint-disable-next-line no-empty
			} catch (error) {}
		},
		stop() {
			try {
				this.$refs.audio.pause();
				this.$refs.audio.load();
				this.$refs.audio.volume = 0;
				// eslint-disable-next-line no-empty
			} catch (error) {}
		},
	},
	computed: {
		circleDasharray() {
			return `${(this.timeFraction * this.FULL_DASH_ARRAY).toFixed(0)} 283`;
		},
		timeFraction() {
			// Divides time left by the defined time limit.
			return this.timeLeft / this.timeLimit;
		},
		formattedTimeLeft() {
			const timeLeft = this.timeLeft;
			// The largest round integer less than or equal to the result of time divided being by 60.
			const minutes = Math.floor(timeLeft / 60);
			// Seconds are the remainder of the time dividedby 60 (modulus operator)
			let seconds = timeLeft % 60;
			// If the value of seconds is less than 10,then display seconds with a leading zero
			if (seconds < 10) {
				seconds = `0${seconds}`;
			}
			if (this.timeLeft == 0 && this.muted == false) {
				this.play();
				try {
					this.$refs.audio.removeAttribute("muted");
					// eslint-disable-next-line no-empty
				} catch (error) {}
			} else {
				this.stop();
				try {
					this.$refs.audio.setAttribute("muted", "muted");
					// eslint-disable-next-line no-empty
				} catch (error) {}
			}
			this.setRemainingPathColor();
			// The output in MM:SS format
			return `${minutes}:${seconds}`;
		},
	},
};
</script>
<style scoped lang="scss">
/* Sets the containers height and width */
.base-timer {
	position: relative;
	width: 300px;
	height: 300px;
	/* Removes SVG styling that would hide the time label */
	&__circle {
		fill: none;
		stroke: none;
	}
	/* The SVG path that displays the timer's progress */
	&__path-elapsed {
		stroke-width: 7px;
		stroke: grey;
	}
	&__label {
		position: absolute;

		/* Size should match the parent container */
		width: 300px;
		height: 300px;
		/* Keep the label aligned to the top */
		top: 0;
		/* Create a flexible box that centers content vertically and horizontally */
		display: flex;
		align-items: center;
		justify-content: center;
		/* Sort of an arbitrary number; adjust to your liking */
		font-size: 48px;
		text-shadow: 2px 2px 3px #000, -2px 2px 3px #000, 2px -2px 3px #000,
			-2px -2px 3px #000;
		color: #fff;
	}
	&__path-remaining {
		/* Just as thick as the original ring */
		stroke-width: 7px;
		/* Rounds the line endings to create a seamless circle */
		stroke-linecap: round;
		/* Makes sure the animation starts at the top of the circle */
		transform: rotate(90deg);
		transform-origin: center;
		/* One second aligns with the speed of the countdown timer */
		transition: 1s linear all;
		/* Allows the ring to change color when the color value updates */
		stroke: rgb(65, 184, 131); // green
	}
	&__svg {
		/* Flips the svg and makes the animation to move left-to-right*/
		transform: scaleX(-1);
	}

	.base-timer__path-remaining.green {
		stroke: rgb(65, 184, 131);
	}

	.base-timer__path-remaining.orange {
		stroke: orange;
	}

	.base-timer__path-remaining.red {
		stroke: red;
	}
}
</style>