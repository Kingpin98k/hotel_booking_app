import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
	const { checkout, isCheckingOut } = useCheckout();

	function handleCheckout() {
		checkout(bookingId);
	}

	return (
		<Button
			disabled={isCheckingOut}
			variation="primary"
			size="small"
			onClick={handleCheckout}
		>
			Check out
		</Button>
	);
}

export default CheckoutButton;
