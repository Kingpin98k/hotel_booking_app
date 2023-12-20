import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const { isPending: isLoading, mutate: login } = useMutation({
		mutationFn: ({ email, password }) =>
			loginApi({
				email,
				password,
			}),
		onSuccess: (userData) => {
			//Update the cache with the user data so that the user is logged in and the session is maintained even after a refresh of the page
			//The cache data contains the user data and the user is authenticated
			queryClient.setQueryData(["user"], userData.user);

			navigate("/dashboard", { replace: true });
		},
		onError: (err) => {
			console.log("Error", err);
			toast.error("The provided email or password are incorrect");
		},
	});

	return { isLoading, login };
}
