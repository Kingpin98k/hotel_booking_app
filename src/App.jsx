import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import NewUsers from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

// import styled from "styled-components";

// //importing globalstyles to be applied to the app
// import GlobalStyles from "./styles/GlobalStyles";
// import Heading from "./ui/Heading";
// import Row from "./ui/Row";
// import Button from "./ui/Button";

// //-------Styled Components--------//

// //Using styled components

// // const Button = styled.button`
// // 	font-size: 1.4rem;
// // 	padding: 1.2rem 1.6rem;
// // 	font-weight: 500;
// // 	border-radius: 7px;
// // 	//Using variables out of the globalstyles component
// // 	background-color: var(--color-brand-600);
// // 	color: white;
// // 	margin: 20px;
// // 	cursor: pointer;
// // `;

// const Input = styled.input`
// 	border: 1px solid #ddd;
// 	border-radius: 5px;
// 	padding: 0.8rem 1.2rem;
// 	background-color: #fff;
// `;

// const StyledApp = styled.div`
// 	padding: 20px;
// `;

// //---------------------------------//

// function App() {
// 	return (
// 		<>
// 			<GlobalStyles />
// 			<StyledApp>
// 				<Row type="vertical">
// 					{/*Reusing the same styled component using props*/}
// 					<Row type="horizontal">
// 						{/* The as prop is important to convert this to desired element */}
// 						<Heading as="h1">The Wild Oasis</Heading>
// 						<div>
// 							<Heading as="h2">Check in and out</Heading>
// 							<Button
// 								variation="primary"
// 								size="medium"
// 								onClick={() => {
// 									alert("Clicked");
// 								}}
// 							>
// 								Ckeck IN
// 							</Button>
// 							<Button
// 								variation="secondary"
// 								size="small"
// 								onClick={() => {
// 									alert("Clicked");
// 								}}
// 							>
// 								Ckeck Out
// 							</Button>
// 						</div>
// 					</Row>
// 					<Row type="vertical">
// 						<Heading as="h3">Form</Heading>
// 						{/* We can define the properties such as type for these components without */}
// 						{/* making props for them */}
// 						<form>
// 							<Input type="number" placeholder="Number of Guests" />
// 							<Input type="number" placeholder="Number of Guests" />
// 						</form>
// 					</Row>
// 				</Row>
// 			</StyledApp>
// 		</>
// 	);
// }

// export default App;

const queryClient = new QueryClient({
	//This is the default configuration for all the queries
	defaultOptions: {
		queries: {
			staleTime: 0, //0 minute
		},
	},
});

function App() {
	return (
		<DarkModeProvider>
			{/* //This is the provider for react-query */}
			<QueryClientProvider client={queryClient}>
				{/* This is the devtools for react-query */}
				{/* <ReactQueryDevtools initialIsOpen={false} /> */}
				<GlobalStyles />
				<BrowserRouter>
					<Routes>
						{/* The * route is the catch all route */}
						{/* No path is mentioned here so this will be the default route */}
						<Route
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							{/* The index route is the default route (/) in this case and this will be redirected to (/dashboard)*/}
							<Route index element={<Navigate replace to="dashboard" />} />
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="cabins" element={<Cabins />} />
							<Route path="users" element={<NewUsers />} />
							<Route path="settings" element={<Settings />} />
							<Route path="account" element={<Account />} />
							<Route path="bookings" element={<Bookings />} />
							<Route path="bookings/:bookingId" element={<Booking />} />
							<Route path="checkin/:bookingId" element={<Checkin />} />
						</Route>
						<Route path="login" element={<Login />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
				{/* This is the toaster for react-hot-toast */}
				<Toaster
					position="top-center"
					gutter={12}
					containerStyle={{ margin: "8px" }}
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 5000,
						},
						style: {
							fontSize: "16px",
							maxWidth: "500px",
							padding: "16px 24px",
							backgroundColor: "var(--color-grey-0)",
							color: "var(--color-grey-700)",
						},
					}}
				/>
			</QueryClientProvider>
		</DarkModeProvider>
	);
}

export default App;
