import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query.client"
import {
	addStory,
	getAllStories,
	getStoryById
} from "@/services/stories/stories.service"
import { Story } from "@/types/story"

export const useStories = () => {
	return useQuery({
		queryKey: ["stories"],
		queryFn: getAllStories
	})
}

export const useStory = (id: string) => {
	return useQuery({
		queryKey: ["story", id],
		queryFn: () => getStoryById(id),
		enabled: !!id,
		initialData: () => {
			const stories = queryClient.getQueryData<Story[]>(["stories"])
			return stories?.find(story => story.id === id)
		}
	})
}

export const useAddStory = () => {
	return useMutation({
		mutationFn: addStory,
		onSuccess: newStory => {
			queryClient.setQueryData<Story[]>(["stories"], (old = []) => [
				newStory,
				...old
			])
			queryClient.setQueryData(["story", newStory.id], newStory)
		}
	})
}
