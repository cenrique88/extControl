import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import NavBar from "./components/NavBar.jsx";
import Login from './components/Login';
import { BrowserRouter } from "react-router-dom";

import {AppProvider} from "./components/AppContext.jsx";

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
