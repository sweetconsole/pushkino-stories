import { prisma } from "@/prisma.client"
import {cachedQuery} from "@/cache.service"


export const getStories = async () => {
	return await cachedQuery(`hieroglyph_transcription`, () =>
		prisma.story.findMany()
	)
}