import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {
	const { isDarkMode, toggleDarkMode } = useDarkMode();

	return (
		<ButtonIcon
			title={isDarkMode ? "toggle light mode" : "toggle dark mode"}
			onClick={toggleDarkMode}
		>
			{isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
		</ButtonIcon>
	);
}

export default DarkModeToggle;
