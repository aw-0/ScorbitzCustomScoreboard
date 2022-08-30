<template>
	<div class="flex items-center justify-center font-black h-screen flex-col bg-[#FF00FF]" >
		<div class="flex rounded-lg">
			<div class="ml-4 flex py-2 border-b-8 rounded-lg text-white" :style="`background-color: ${config.guestMainHex}; border-color: ${config.guestSecondaryHex}`">
				<div class="my-auto ml-2 mt-1 block">
					<div v-for="n in guest.timeouts" class="mb-1 rounded-sm px-0.5" :style="`background-color: ${config.guestSecondaryHex}`">&nbsp;</div>
				</div>
				<div class="flex px-8">
					<img :src="config.guestImgSource" class="my-auto h-16 w-14" />
					<div class="my-auto ml-10 flex">
						<i class="fa-solid fa-circle my-auto mr-2 text-sm" :style="`color: ${possession === 'guest' ? config.guestSecondaryHex : config.guestMainHex}`"></i>
						<h1 class="mb-1 text-6xl font-extrabold">{{guest.score}}</h1>
					</div>
				</div>
			</div>
			
			<div class="ml-4 flex py-2 border-b-8 rounded-lg text-white" :style="`background-color: ${config.homeMainHex}; border-color: ${config.homeSecondaryHex}`">
				<div class="flex px-8">
					<img :src="config.homeImgSource" class="my-auto h-16 w-12" />
					<div class="my-auto ml-10 flex">
						<i class="fa-solid fa-circle my-auto mr-2 text-sm" :style="`color: ${possession === 'home' ? config.homeSecondaryHex : config.homeMainHex}`"></i>
						<h1 class="mb-1 text-6xl font-extrabold">{{home.score}}</h1>
					</div>
				</div>
				<div class="my-auto mr-2 mt-1 block">
					<div v-for="n in home.timeouts" class="mb-1 rounded-sm px-0.5" :style="`background-color: ${config.homeSecondaryHex}`">&nbsp;</div>
				</div>
			</div>

			<div class="ml-4 rounded-lg flex bg-stone-700 px-8 py-6 my-auto text-white border-b-8 border-white">
				<h1 class="text-5xl font-extrabold">Q{{quarter}}</h1>
				<div class="ml-5 mr-5 rounded-sm bg-white px-0.5"></div>
				<h1 class="text-5xl font-extrabold">{{formatTimeLeft}}</h1>
				<div class="ml-5 mr-5 rounded-sm bg-white px-0.5"></div>
				<div class="my-auto">
					<h1 class="text-center text-5xl font-extrabold mb-2">{{formatDown}} & {{toGo}}</h1>
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

const formatTimeLeft = computed(() => {
	const minutes = Math.floor(timeLeft.value / 60);
	let seconds = timeLeft.value % 60;

	if (seconds < 10) {
		seconds = `0${seconds}`;
	}
	return `${minutes}:${seconds}`;
})

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

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const subscribeToScoreboard = async () => {
    const scoreboard = await $fetch(config.scorbitzUrl);
    console.log(scoreboard);
    down.value = scoreboard.down
    toGo.value = scoreboard.yards_to_go
    timeLeft.value = scoreboard.seconds
    // TODO: Quarter
    possession.value = scoreboard.possession
    home.score = scoreboard.home_score
    guest.score = scoreboard.guest_score
    home.timeouts = scoreboard.home_tol
    guest.timeouts = scoreboard.guest_tol
    await sleep(150);
    subscribeToScoreboard();
}

onMounted(async () => {
	await subscribeToScoreboard();
})
</script>
