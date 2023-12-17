import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { add, set } from "date-fns";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
import CheckoutButton from "./CheckoutButton";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	const [confirmPaid, setConfirmPaid] = useState(false);

	const [addBreakfast, setAddBreakfast] = useState(false);

	const moveBack = useMoveBack();

	const { isLoading, booking } = useBooking();

	const { checkin, isCheckingIn } = useCheckin();

	const { settings, isLoading: isLoadingSettings } = useSettings();
	//We are not initializing conofirmPaid in the useState itself because initially the data hasent arrived
	//So we are using an effect to set the initial value of confirmPaidn
	useEffect(() => {
		setConfirmPaid(booking?.isPaid ?? false);
		setAddBreakfast(booking?.hasBreakfast ?? false);
	}, [booking]);

	if (isLoading || isLoadingSettings) return <Spinner />;

	const {
		id: bookingId,
		guests,
		totalPrice,
		numGuests,
		hasBreakfast,
		numNights,
	} = booking;

	const optionalBreakfastPrice =
		settings?.breakfastPrice * numNights * numGuests;

	function handleCheckin() {
		if (!confirmPaid) return;

		if (addBreakfast) {
			checkin({
				bookingId,
				breakfast: {
					hasBreakfast: true,
					extrasPrice: optionalBreakfastPrice,
					totalPrice: totalPrice + optionalBreakfastPrice,
				},
			});
		} else {
			checkin({ bookingId, breakfast: {} });
		}
	}

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			{!hasBreakfast && (
				<Box>
					<Checkbox
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast((e) => !e);
							setConfirmPaid(false);
						}}
						id="breakfast"
					>
						Want to add breakfast for ${optionalBreakfastPrice}?
					</Checkbox>
				</Box>
			)}

			<Box>
				<Checkbox
					checked={confirmPaid}
					disabled={confirmPaid}
					onChange={() => {
						setConfirmPaid((e) => !e);
					}}
					id="confirm"
				>
					I confirm that {guests.fullName} has paid{" "}
					{!addBreakfast
						? formatCurrency(totalPrice)
						: formatCurrency(totalPrice + optionalBreakfastPrice)}{" "}
					for {numGuests}{" "}
				</Checkbox>
			</Box>

			<ButtonGroup>
				{booking.status === "unconfirmed" && (
					<Button
						onClick={handleCheckin}
						disabled={!confirmPaid || isCheckingIn}
					>
						Check in
					</Button>
				)}

				<Button
					variation="secondary"
					disabled={isCheckingIn}
					onClick={moveBack}
				>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
