import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var() (--color-grey-50);
`;

function ProtectedRoute({ children }) {
	const navigate = useNavigate();

	//1. Load the authenticated user
	const { isLoading, user, isAuthenticated } = useUser();

	//2.If there is NO authenticated user, redirect to the /login
	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			navigate("/login");
		}
	}, [isAuthenticated, isLoading, navigate]);

	//3.Show a spinner while this is happening
	if (isLoading)
		return (
			<FullPage>
				<Spinner />;
			</FullPage>
		);

	//4.If YES then, render the app
	if (isAuthenticated) return children;
}

export default ProtectedRoute;
