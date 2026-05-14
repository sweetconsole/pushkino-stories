import {
	collection,
	query,
	getDoc,
	getDocs,
	doc,
	setDoc,
	updateDoc
} from "firebase/firestore"
import { db } from "@/lib/firebase.client"
import { generateStoryId } from "@/services/stories/generateId"
import { Story } from "@/types/story"

export const getAllStories = async (): Promise<Story[]> => {
	const q = query(collection(db, "stories"))
	const snapshot = await getDocs(q)
	return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Story)
}

export const getStoryById = async (id: string): Promise<Story | null> => {
	const docRef = doc(db, "stories", id)
	const docSnap = await getDoc(docRef)
	return docSnap.exists()
		? ({ id: docSnap.id, ...docSnap.data() } as Story)
		: null
}

export const addStory = async (story: Omit<Story, "id">) => {
	const customId = generateStoryId(story.title)

	const storyRef = doc(db, "stories", customId)

	await setDoc(storyRef, {
		title: story.title,
		author: story.author,
		description: story.description,
		story: story.story || "",
		panoramaURL: story.panoramaURL,
		panoramaExtraURL: story.panoramaExtraURL || ""
	})

	return {
		id: customId,
		...story
	}
}

export const updateStory = async (
	id: string,
	story: Omit<Story, "id">
): Promise<Story> => {
	const storyRef = doc(db, "stories", id)
	await updateDoc(storyRef, {
		...story
	})

	return { id, ...story }
}
