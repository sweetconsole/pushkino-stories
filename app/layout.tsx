import type { Metadata } from "next"
import "./globals.css"
import { ReactNode } from "react"
import { comfortaa, nunito } from "@/app/fonts"
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
