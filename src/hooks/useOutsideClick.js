import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenCapturing = true) {
	const ref = useRef();

	//This is for the click outside the modal
	//To close the modal
	useEffect(
		function () {
			//This is for the click outside the modal
			function handleClickOutside(event) {
				//ref.current is the modal
				//event.target is the element that we clicked on
				if (ref.current && !ref.current.contains(event.target)) {
					handler?.();
				}
			}
			//true is for the capturing phase and false is for the bubbling phase
			//So we are listening to the capturing phase
			document.addEventListener("click", handleClickOutside, listenCapturing);

			//Remove the event listener when the component unmounts
			return function () {
				document.removeEventListener("click", handleClickOutside);
			};
		},
		[handler, listenCapturing]
	);

	return ref;
}

export default useOutsideClick;
