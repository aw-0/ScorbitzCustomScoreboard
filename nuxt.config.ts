import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	app: {
		head: {
			link: [
				{
					href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css",
					rel: "stylesheet",
				},
				{
					href: "https://fonts.googleapis.com/css?family=Azeret+Mono:300,400,500,700&display=swap",
					rel: "stylesheet",
				},
			],
		},
	},
	buildModules: ["@nuxtjs/tailwindcss"],
});
