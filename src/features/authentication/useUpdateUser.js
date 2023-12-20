//These are custom hooks that were created after the codnig in the main components was done for modularity and reusability

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
	//This is a hook that gives us access to the query client
	const queryClient = useQueryClient();

	//This is a hook that gives us access to the mutation function
	const { isPending: isUpdating, mutate: updateUser } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: () => {
			toast.success("User account successfully updated");
			queryClient.invalidateQueries({
				queryKey: ["user"],
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { isUpdating, updateUser };
}
