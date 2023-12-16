import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Table from "../../ui/Table";

// const Table = styled.div`
// 	border: 1px solid var(--color-grey-200);

// 	font-size: 1.4rem;
// 	background-color: var(--color-grey-0);
// 	border-radius: 7px;
// 	overflow: hidden;
// `;

const TableHeader = styled.header`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;

	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-grey-600);
	padding: 1.6rem 2.4rem;
`;

function CabinTable() {
	const { isLoading, cabins } = useCabins();

	const [searchParams] = useSearchParams();

	//Querying for remote state using react-query

	if (isLoading) return <Spinner />;

	//1. Filter
	const filterValue = searchParams.get("discount") || "all";

	let filteredCabins;

	if (filterValue === "all") {
		filteredCabins = cabins;
	}

	if (filterValue === "no-discount") {
		filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
	}

	if (filterValue === "with-discount") {
		filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
	}

	//2.Sort
	const sortValue = searchParams.get("sortBy") || "startDate-asc";

	//This is the field that we are sorting by and the direction of the sort (asc or dsc)
	const [field, direction] = sortValue.split("-");

	//THis is the modifier for sorting the cabins in ascending or descending order
	const modifier = direction === "asc" ? 1 : -1;

	// This is the sorted array of cabins based on the field and direction of the sort
	const sortedCabins = filteredCabins.sort((a, b) => {
		if (field === "name") {
			return (
				a[field].localeCompare(b[field], undefined, { sensitivity: "base" }) *
				modifier
			);
		} else {
			return (a[field] - b[field]) * modifier;
		}
	});
	//Ask CHATGPT how this sorting logic works

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				<Table.Body
					data={sortedCabins}
					render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
				></Table.Body>
			</Table>
		</Menus>
	);
}

export default CabinTable;
