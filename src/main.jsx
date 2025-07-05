import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import NavBar from "./app/components/NavBar.jsx";
import Login from './app/components/Login';
import { BrowserRouter } from "react-router-dom";

import {AppProvider} from "./app/components/AppContext.jsx";

createRoot(document.getElementById("root")).render(
	// <StrictMode>
	<AppProvider>
		<BrowserRouter>
			{/* <Login /> */}
			<App /> 
		</BrowserRouter>
	</AppProvider>
	//</StrictMode>
);
