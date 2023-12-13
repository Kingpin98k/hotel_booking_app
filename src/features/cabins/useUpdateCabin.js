//These are custom hooks that were created after the codnig in the main components was done for modularity and reusability

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
	//This is a hook that gives us access to the query client
	const queryClient = useQueryClient();

	//This is a hook that gives us access to the mutation function
	const { isPending: isUpdating, mutate: updateCabin } = useMutation({
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			toast.success("Cabin successfully edited");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { isUpdating, updateCabin };
}
