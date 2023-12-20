import supabase, { supabaseUrl } from "./supabase";

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

export async function createEditCabin(newCabin, id) {
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	// https://ruvbjnpswgeblgintkmg.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

	//Name of the storage bucket in supabase
	const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", ""); //we are replacing the / with nothing since uupabase creates a new folder on seeing the / in the name

	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`; //we are creating a path for the image to be uploaded to supabase

	//A.Create\Edit Cabin
	let query = supabase.from("cabins");

	//1. Create a new cabin
	if (!id) {
		//Impoorting the supabase client from the supabase.js file
		query = query.insert([{ ...newCabin, image: imagePath }]);
	}
	//B. Edit Cabin
	if (id) {
		//Impoorting the supabase client from the supabase.js file
		query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
	}

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error("Cabin Could not be created");
	}

	//2. Upload image
	if (hasImagePath) return data; //if the image is already uploaded we dont need to upload it again

	//we need a whole path, and not just the name of the image to upload it to supabase
	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	//3.Delete the cabin if the image upload fails
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		console.error(storageError);
		throw new Error("Cabin image could not be uploaded please try again");
	}

	return data;
}

//Now we can use this function from anywhere in our app
