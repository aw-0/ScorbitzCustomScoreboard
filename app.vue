<template>
	<div
		class="mr-14 flex h-screen flex-col items-center justify-center bg-[#FF00FF]"
	>
		<div class="flex rounded-lg">
			<div
				class="flex py-2 rounded-lg border-b-8"
				:style="`background-color: ${config.guestMainHex}; border-color: ${config.guestSecondaryHex}`"
			>
				<div class="my-auto ml-2 block">
					<div
						class="mb-1 rounded-sm px-0.5"
						:style="`background-color: ${config.guestSecondaryHex};`"
					>
						&nbsp;
					</div>
					<div
						class="mb-1 rounded-sm px-0.5"
						:style="`background-color: ${config.guestSecondaryHex};`"
					>
						&nbsp;
					</div>
					<div
						class="rounded-sm px-0.5"
						:style="`background-color: ${config.guestSecondaryHex};`"
					>
						&nbsp;
					</div>
				</div>
				<div class="my-auto flex px-8">
					<img :src="config.guestImgSource" class="my-auto h-14 w-12" />
					<div class="my-auto ml-10 flex text-white">
						<i
							class="fa-solid fa-circle my-auto mr-2 text-sm"
							:style="`color: ${config.guestSecondaryHex}`"
						></i>
						<h1
							class="mb-2 text-6xl font-black"
							:style="`color: ${config.guestText}`"
						>
							00
						</h1>
					</div>
				</div>
			</div>
			<div
				class="ml-4 flex py-2 border-b-8 rounded-lg text-white"
        :style="`background-color: ${config.homeMainHex}; border-color: ${config.homeSecondaryHex}`"
			>
				<div class="flex px-8">
					<img :src="config.homeImgSource" class="my-auto h-16 w-12" />
					<div class="my-auto ml-10 flex">
						<i
							class="fa-solid fa-circle my-auto mr-2 text-sm text-[#DFAB31]"
						></i>
						<h1 class="mb-2 text-6xl font-black">00</h1>
					</div>
				</div>
				<div class="my-auto mr-2 block">
					<div class="mb-1 rounded-sm bg-[#DFAB31] px-0.5">&nbsp;</div>
					<div class="mb-1 rounded-sm bg-[#DFAB31] px-0.5">&nbsp;</div>
					<div class="rounded-sm bg-[#DFAB31] px-0.5">&nbsp;</div>
				</div>
			</div>
			<div
				class="ml-4 rounded-lg flex bg-stone-700 px-8 py-2 py-auto text-white border-b-8 border-white"
			>
				<h1 class="mt-3 mb-1 text-5xl font-black">Q1</h1>
				<div class="ml-5 mr-5 rounded-sm bg-white px-0.5"></div>
				<h1 class="mt-3 mb-1 text-5xl font-black">5:56</h1>
        <div class="ml-5 mr-5 rounded-sm bg-white px-0.5"></div>
        <div class="my-auto">
          <h1 class="text-center text-5xl font-black mb-2">1st & 10</h1>
        </div>
			</div>
		</div>
	</div>
</template>

<script setup>
import * as config from "./config.json";
</script>
