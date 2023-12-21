import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

//This is a custom component
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { isCreating, createCabin } = useCreateCabin();
	const { isUpdating, updateCabin } = useUpdateCabin();

	//cabinToEdit is an object that contains the data of the cabin to edit
	const { id: editId, ...editValues } = cabinToEdit;

	//This is a boolean that is true if we are editing a cabin
	const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	//This is the object that contains all the errors
	const { errors } = formState;

	//------------------//
	//This is a boolean that is true if the form is submitting
	const isWorking = isCreating || isUpdating;
	//------------------//

	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];

		if (isEditSession) {
			//we need id since we are editing a cabin and not creating one
			updateCabin(
				{ newCabinData: { ...data, image: image }, id: editId },
				{
					onSuccess: () => {
						//data is the cabin that was created
						reset({ values: null });
						onCloseModal?.();
					},
				}
			);
		} else {
			createCabin(
				{ ...data, image: data.image[0] },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		}
	}

	function onError() {
		// console.log(errors);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? "modal" : "regular"}
		>
			{/* <FormRow>
				<Label htmlFor="name">Cabin name</Label>
				<Input
					type="text"
					id="name"
					{...register("name", {
						required: "This field is required",
					})}
				/>
				{errors?.name?.message && <Error>{errors.name.message}</Error>}
			</FormRow> */}
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					disabled={isWorking}
					type="text"
					id="name"
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>
			<FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
				<Input
					disabled={isWorking}
					type="number"
					id="maxCapacity"
					{...register("maxCapacity", {
						required: "This field is required",
						//These are the validation rules
						min: {
							value: 1,
							message: "Minimum capacity is 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Regular Price" error={errors?.regularPrice?.message}>
				<Input
					disabled={isWorking}
					type="number"
					id="regularPrice"
					defaultValue={0}
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Minimum value is 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					disabled={isCreating}
					type="number"
					id="discount"
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						min: {
							value: 0,
							message: "Minimum value is 1",
						},
						//This is a custom validation rule
						validate: (value) => {
							//value is the value of the input
							if (parseInt(value) > parseInt(getValues().regularPrice)) {
								//getValues() is a function that returns the values of all the inputs
								return "Discount should be less than regular price";
							}
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Description For The Website"
				error={errors?.description?.message}
			>
				<Textarea
					disabled={isWorking}
					type="number"
					id="description"
					defaultValue=""
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor="image">Cabin photo</Label>
				{/* This is a custom component */}
				<FileInput
					disabled={isWorking}
					type="file"
					id="image"
					accept="image/*"
					{...register("image")}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				<Button disabled={isWorking}>Edit cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
