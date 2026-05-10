import slugify from "slugify"

export const generateStoryId = (title: string): string => {
	const baseSlug = slugify(title, {
		lower: true,
		strict: true,
		locale: "ru",
		trim: true
	})

	const random = Math.random().toString(36).substring(2, 6)

	return `${baseSlug}-${random}`
}
