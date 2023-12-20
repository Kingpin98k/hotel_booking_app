import { QueryClient, useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
	const navigate = useNavigate();

	const queryClient = new QueryClient();

	const { isLoading, mutate: logout } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			//Clear the cache before ending the session
			//The cache data contains the user data
			queryClient.removeQueries();

			navigate("/login", { replace: true });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isLoading, logout };
}
