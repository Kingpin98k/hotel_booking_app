import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

function CreateCabinForm() {
	const queryClient = useQueryClient();

	const { isLoading: isCreating, mutate } = useMutation({
		mutationFn: (data) => createCabin(data),
		onSuccess: () => {
			toast.success("Cabin successfully created");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			reset();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const { register, handleSubmit, reset, getValues, formState } = useForm();

	const { errors } = formState;
	console.log(errors);

	function onSubmit(data) {
		mutate(data);
	}

	// function onError(errors) {
	// 	console.log(errors);
	// }

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
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
					disabled={isCreating}
					type="text"
					id="name"
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>
			<FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
				<Input
					disabled={isCreating}
					type="number"
					id="maxCapacity"
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Minimum capacity is 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Regular Price" error={errors?.regularPrice?.message}>
				<Input
					disabled={isCreating}
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
						validate: (value) => {
							if (parseInt(value) > parseInt(getValues().regularPrice)) {
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
					disabled={isCreating}
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
				<FileInput disabled={isCreating} id="image" accept="image/*" />
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isCreating}>Edit cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
