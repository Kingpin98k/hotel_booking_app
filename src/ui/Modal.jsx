import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;

//-------------------------------------------------------------------
//Compound Component having all the states inside the component only
//-------------------------------------------------------------------

//The context
const ModalContext = createContext();

//The Parent Component
function Modal({ children }) {
	const [openName, setOpenName] = useState("");

	const close = () => setOpenName("");
	const open = (name) => setOpenName(name);
	return (
		<ModalContext.Provider value={{ close, open, openName }}>
			{children}
		</ModalContext.Provider>
	);
}

//The Child Components
function Open({ children, opens }) {
	const { open } = useContext(ModalContext);

	//We are cloning the children and adding a new prop to it
	//Since we are not using useContext on Button component
	return cloneElement(children, {
		onClick: () => {
			// Assuming that 'open' is a function you want to call when the child is clicked
			open(opens);
		},
	});
}

//-----------------
//React portal
//-----------------

function Window({ children, name }) {
	const { openName, close } = useContext(ModalContext);

	//This is for the click outside the modal
	//Close function will be called is the click is detected outside the referenced element
	const ref = useOutsideClick(close, true);

	if (name !== openName) return null;
	//This is a portal
	//We are rendering the modal in the body
	return createPortal(
		<Overlay>
			{/* This is for the click outside the modal */}
			<StyledModal ref={ref}>
				<Button onClick={close}>
					<HiXMark />
				</Button>
				{/* We are cloning the children and adding a new prop to it */}
				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		//This is the target container
		document.body
	);
}

//Child Components as properties of the Parent Component
Modal.Open = Open;
Modal.Window = Window;

//---------------------------------------------------------
//---------------------------------------------------------

export default Modal;
