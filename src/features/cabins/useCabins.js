//This hook returns the fetched cbins
//i.e. why it is named useCabins

import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
	//useQuery hook
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		//uniquely identifies the query data
		queryKey: ["cabins"],

		//queryFn is a function that "should return a Promise"
		queryFn: () => {
			//This data will get stored in the cache
			return getCabins();
		},
	});

	return { isLoading, cabins, error };
}
