import { type MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Истории Пушкино — рассказы дедушки внуку",
		short_name: "Истории Пушкино",
		description:
			"Истории города Пушкино с 360° панорамами, рассказанные дедушкой своему внуку.",
		start_url: "/",
		display: "standalone",
		background_color: "#fbf9f4",
		theme_color: "#e67a4c",
		icons: [
			{
				src: "/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png"
			},
			{
				src: "/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png"
			}
		]
	}
}
