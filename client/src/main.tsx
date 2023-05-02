import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Auth0ProviderWithNavigate } from "./auth0ProviderWithNavigate.tsx";
import App from "./App.tsx";
import theme from "./utils/theme.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<Auth0ProviderWithNavigate>
					<App />
				</Auth0ProviderWithNavigate>
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>
);
