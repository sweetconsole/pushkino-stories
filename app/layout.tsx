import type { Metadata } from "next"
import "./globals.css"
import { Comfortaa, Nunito } from "next/font/google"
import { ReactNode } from "react"
import { Header } from "@/components/widgets"
import QueryProvider from "@/providers/QueryProvider"

export const metadata: Metadata = {
	title: "Истории Пушкино — рассказы дедушки внуку",
	description:
		"Истории города Пушкино с 360° панорамами, рассказанные дедушкой своему внуку.",
	metadataBase: new URL("https://pushkino-stories.vercel.app/"),
	openGraph: {
		title: "Истории Пушкино — рассказы дедушки внуку",
		description:
			"Истории города Пушкино с 360° панорамами, рассказанные дедушкой своему внуку.",
		url: "https://pushkino-stories.vercel.app/",
		siteName: "Истории Пушкино — рассказы дедушки внуку",
		images: [
			{
				url: "/preview.png",
				width: 1200,
				height: 630,
				alt: "Истории Пушкино — рассказы дедушки внуку"
			}
		],
		type: "website"
	},
	twitter: {
		card: "summary_large_image",
		title: "Истории Пушкино — рассказы дедушки внуку",
		description:
			"Истории города Пушкино с 360° панорамами, рассказанные дедушкой своему внуку.",
		images: ["/preview.png"]
	},
	robots: {
		index: true,
		follow: true
	},
	alternates: {
		canonical: "https://pushkino-stories.vercel.app/"
	}
}

const comfortaa = Comfortaa({
	subsets: ["latin", "cyrillic"],
	variable: "--font-comfortaa",
	display: "swap",
	preload: true,
	fallback: ["system-ui", "sans-serif"]
})

const nunito = Nunito({
	subsets: ["latin", "cyrillic"],
	variable: "--font-nunito",
	display: "swap",
	preload: false,
	fallback: ["system-ui", "sans-serif"]
})

export default function RootLayout({
	children
}: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="ru" className={`${comfortaa.variable} ${nunito.variable}`}>
			<body>
				<Header />

				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	)
}
