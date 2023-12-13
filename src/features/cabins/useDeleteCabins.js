//These are custom hooks that were created after the codnig in the main components was done for modularity and reusability

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
	const queryClient = useQueryClient();
	//useMutation hook
	const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
		//mutate is a function
		//mutationFn is a function that "should return a Promise"
		mutationFn: (id) => {
			return deleteCabinApi(id);
		},
		//onSuccess is a function that will be called when the mutation is successful
		onSuccess: () => {
			toast.success("Cabin Successfully Deleted");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		//onError is a function that will be called when the mutation fails
		onError: (err) => toast.error(err.message),
	});
	return { isDeleting, deleteCabin };
}
