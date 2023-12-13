import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpadteSettings() {
	//This is a hook that gives us access to the query client
	const queryClient = useQueryClient();

	//This is a hook that gives us access to the mutation function
	const { isPending: isUpdating, mutate: updateSettings } = useMutation({
		mutationFn: updateSettingApi,
		onSuccess: () => {
			toast.success("Settings successfully edited");
			queryClient.invalidateQueries({
				queryKey: ["settings"],
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { isUpdating, updateSettings };
}
