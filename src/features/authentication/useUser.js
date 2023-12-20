import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

//This is the custom hook to be used in the ProtectedRoute component for authentication

export function useUser() {
	//This is to fetch the user
	const { isLoading, data: user } = useQuery({
		queryKey: ["user"],
		queryFn: () => getCurrentUser(),
	});

	return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
