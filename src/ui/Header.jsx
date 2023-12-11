//This is the header component for the app
import styled from "styled-components";

//The styled component for a <header> with the class of header
const StyledHeader = styled.header`
	background-color: var(--color-grey-0);
	padding: 1.2rem 4.8rem;
	border-bottom: 1px solid var(--color-grey-100);
`;
function Header() {
	return <StyledHeader>Header</StyledHeader>;
}

export default Header;
