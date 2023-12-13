import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUpadteSettings } from "./useUpdateSettings";
import { useSettings } from "./useSettings";

//This components allows updating settings one at a time but we can change it to multiple also

function UpdateSettingsForm() {
	const { isLoading, settings } = useSettings();

	//This will initially populate with an empty object, which will cause the defaultValue to be undefined.
	//upon arrival of the data, the defaultValue will be updated to the correct value.

	const {
		minBookingLength,
		maxBookingLength,
		maxGuestsPerBooking,
		breakfastPrice,
	} = settings || {};

	const { isUpdating, updateSettings } = useUpadteSettings();

	function handleUpdate(e, key) {
		const value = e.target.value;
		updateSettings({ [key]: value });
	}

	if (isLoading) return <Spinner />;

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					defaultValue={minBookingLength}
					type="number"
					id="min-nights"
					onBlur={(e) => handleUpdate(e, "minBookingLength")}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					defaultValue={maxBookingLength}
					type="number"
					id="max-nights"
					onBlur={(e) => handleUpdate(e, "maxBookingLength")}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					defaultValue={maxGuestsPerBooking}
					type="number"
					id="max-guests"
					onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					defaultValue={breakfastPrice}
					type="number"
					id="breakfast-price"
					onBlur={(e) => handleUpdate(e, "breakfastPrice")}
					disabled={isUpdating}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
