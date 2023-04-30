import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "./auth0ProviderWithNavigate.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Auth0ProviderWithNavigate>
				<App />
			</Auth0ProviderWithNavigate>
		</BrowserRouter>
	</React.StrictMode>
);
