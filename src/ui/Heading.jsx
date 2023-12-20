import styled, { css } from "styled-components";

//Using styled components

//since this is a template literal we can enter js mode to do our calculations
const Heading = styled.h1`
	//Callback
	${(prop) =>
		//We can access the props by using callbacks
		//'as' is a special prop which sets the styled element type to the one defined by it
		prop.as === "h1" &&
		//'css' is a helper in styled-components which highlights the css
		css`
			font-size: 3rem;
			font-weight: 600;
		`}
	${(prop) =>
		prop.as === "h2" &&
		css`
			font-size: 3rem;
			font-weight: 500;
		`}
    ${(prop) =>
		prop.as === "h3" &&
		css`
			font-size: 2rem;
			font-weight: 400;
		`}
		${(prop) =>
		prop.as === "h4" &&
		css`
			font-size: 3rem;
			font-weight: 600;
			text-align: center;
		`}
	color: var(--color-grey-900);
`;

export default Heading;
