import supabase from "./supabase";

export async function getCabins() {
	//Impoorting the supabase client from the supabase.js file
	let { data: cabins, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabin Could not be loaded");
	}

	//returning the data
	return cabins;
}

export async function deleteCabin(id) {
	let { error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabin Could not be deleted");
	}
}

export async function createCabin(newCabin) {
	//Impoorting the supabase client from the supabase.js file
	const { data, error } = await supabase.from("cabins").insert([newCabin]); //inserting the new cabin

	if (error) {
		console.error(error);
		throw new Error("Cabin Could not be created");
	}

	return data;
}

//Now we can use this function from anywhere in our app
