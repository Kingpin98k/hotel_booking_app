import { useMutation, useQueryClient } from "@tanstack/react-query";
//These are custom hooks that were created after the codnig in the main components was done for modularity and reusability

import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
	//This is a hook that gives us access to the query client
	const queryClient = useQueryClient();

	//This is a hook that gives us access to the mutation function
	const { isLoading: isCreating, mutate: createCabin } = useMutation({
		mutationFn: (data) => createEditCabin(data),
		onSuccess: () => {
			toast.success("Cabin successfully created");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { isCreating, createCabin };
}
