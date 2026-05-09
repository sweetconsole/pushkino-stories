import { Jaro, Geist, Staatliches } from "next/font/google"

export const jaro = Jaro({
	subsets: ["latin"],
	variable: "--font-jaro",
	display: "swap"
})

export const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist",
	display: "swap"
})

export const staatliches = Staatliches({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-staatliches",
	display: "swap"
})
