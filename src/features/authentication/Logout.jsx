import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
	const { logout, isLoadng } = useLogout();

	return (
		<ButtonIcon title="logout" disabled={isLoadng} onClick={logout}>
			{isLoadng ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
		</ButtonIcon>
	);
}

export default Logout;
