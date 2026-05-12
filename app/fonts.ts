import { Comfortaa, Nunito } from "next/font/google"

export const comfortaa = Comfortaa({
	subsets: ["latin", "cyrillic"],
	variable: "--font-comfortaa",
	display: "swap"
})

export const nunito = Nunito({
	subsets: ["latin", "cyrillic"],
	variable: "--font-nunito",
	display: "swap"
})
