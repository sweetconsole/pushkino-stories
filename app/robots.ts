import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/add/"]
		},
		sitemap: "https://pushkino-stories.vercel.app/"
	}
}
