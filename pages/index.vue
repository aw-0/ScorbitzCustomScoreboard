<template>
	<div class="flex items-center justify-center font-black h-screen flex-col bg-[#FF00FF]" >
		<div :style="config.text ? '' : `margin-bottom: 68px;`">
			<h1 v-if="config.text" class="mb-4 px-4 py-2 text-3xl font-semibold text-white bg-stone-700 border-white rounded-lg">{{config.text}}</h1>
		</div>
		<div class="flex rounded-lg">
			<div class="ml-4 flex py-2 border-b-8 rounded-lg text-white" :style="`background-color: ${config.guestMainHex}; border-color: ${config.guestSecondaryHex}`">
				<div class="my-auto ml-2 mt-1 block">
					<div v-for="n in guest.timeouts" class="mb-1 rounded-sm px-0.5 text-md" :style="`background-color: ${config.guestSecondaryHex}`">&nbsp;</div>
				</div>
				<div class="flex px-8">
					<img :src="config.guestImgSource" class="mt-4 h-16 w-18" />
					<div class="my-auto ml-10 flex">
						<i class="fa-solid fa-circle my-auto mr-2 text-sm" :style="`color: ${possession === 'guest' ? config.guestSecondaryHex : config.guestMainHex}`"></i>
						<h1 class="text-6xl font-extrabold">{{guest.score}}</h1>
					</div>
				</div>
			</div>
			
			<div class="ml-4 flex py-2 border-b-8 rounded-lg text-white" :style="`background-color: ${config.homeMainHex}; border-color: ${config.homeSecondaryHex}`">
				<div class="flex px-8">
					<img :src="config.homeImgSource" class="my-auto h-16 w-12" />
					<div class="my-auto ml-10 flex">
						<i class="fa-solid fa-circle my-auto mr-2 text-sm" :style="`color: ${possession === 'home' ? config.homeSecondaryHex : config.homeMainHex}`"></i>
						<h1 class="text-6xl font-extrabold">{{home.score}}</h1>
					</div>
				</div>
				<div class="my-auto mr-2 mt-1 block">
					<div v-for="n in home.timeouts" class="mb-1 rounded-sm px-0.5 text-md" :style="`background-color: ${config.homeSecondaryHex}`">&nbsp;</div>
				</div>
			</div>

			<div class="ml-4 rounded-lg flex bg-stone-700 px-8 py-6 my-auto text-white border-b-8 border-white">
				<h1 class="text-6xl font-extrabold">Q{{quarter}}</h1>
				<div class="ml-5 mr-5 rounded-sm bg-white px-0.5"></div>
				<h1 class="text-6xl font-extrabold">{{formatMinutes}}:{{formatSeconds}}</h1>
				<div class="ml-5 mr-5 rounded-sm bg-white px-0.5"></div>
				<div class="my-auto">
					<div class="flex">
						<h1 class="text-center text-6xl font-extrabold">{{formatDown}}</h1>
						<h1 class="ml-4 mr-4 text-center text-6xl font-extrabold">&</h1>
						<h1 class="text-center text-6xl font-extrabold">{{toGo}}</h1>
					</div>
					<!-- <h1 class="text-center text-6xl font-extrabold">{{formatDown}} & {{toGo}}</h1> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import * as config from "../config.json";

const home = reactive({
	score: "0",
	timeouts: "3"
})
const guest = reactive({
	score: "0",
	timeouts: "3"
})
const possession = ref("guest")
const quarter = ref("1")
const timeLeft = ref("750")
const down = ref("1")
const toGo = ref("10")
const minutes = ref("1")
const seconds = ref("30")

const formatDown = computed(() => {
	switch (down.value) {
		case "1":
			return "1st";
		case "2":
			return "2nd";
		case "3":
			return "3rd";
		case "4":
			return "4th";
	}
})

const formatMinutes = computed(() => {
	if (minutes.value < 10) {
		return "0" + minutes.value
	} else {
		return minutes.value
	}
})

const formatSeconds = computed(() => {
	if (seconds.value < 10) {
		return "0" + seconds.value
	} else {
		return seconds.value
	}
})

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const subscribeToScoreboard = async () => {
    const scoreboard = await $fetch(config.scorbitzUrl);
    console.log(scoreboard);
    down.value = scoreboard.down
    toGo.value = scoreboard.yards_to_go
		minutes.value = scoreboard.minutes
    seconds.value = scoreboard.seconds
		quarter.value = scoreboard.period
    // TODO: Quarter
    possession.value = scoreboard.possession
    home.score = scoreboard.home_score
    guest.score = scoreboard.guest_score
    home.timeouts = Number(scoreboard.home_tol)
    guest.timeouts = Number(scoreboard.guest_tol)
    await sleep(150);
    subscribeToScoreboard();
}

onMounted(async () => {
    if (config.enabled) await subscribeToScoreboard();
})
</script>
