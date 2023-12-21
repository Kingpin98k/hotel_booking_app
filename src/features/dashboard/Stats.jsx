import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays, numCabins }) {
	//1. Get the total number of bookings
	const numBookings = bookings.length;

	//2.Total Sales
	const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

	//3.Total checkins
	const checkins = confirmedStays.length;

	//4. Occupancy Rate
	//No of checked in nights / all available nights

	const occupation = confirmedStays.reduce(
		(acc, cur) => acc + cur.numNights,
		0
	);

	const occupancyRate = Math.round((occupation / (numDays * numCabins)) * 100);

	return (
		<>
			<Stat
				title="Bookings"
				color="blue"
				icon={<HiOutlineBriefcase />}
				value={numBookings}
			/>
			<Stat
				title="Sales"
				color="green"
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title="Check Ins"
				color="indigo"
				icon={<HiOutlineCalendarDays />}
				value={checkins}
			/>
			<Stat
				title="Occupancy Rate"
				color="yellow"
				icon={<HiOutlineChartBar />}
				value={occupancyRate + "%"}
			/>
		</>
	);
}

export default Stats;
