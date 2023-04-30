import { Auth0Provider } from "@auth0/auth0-react";
import React, { PropsWithChildren } from "react";

interface Auth0ProviderWithNavigateProps {
	children: React.ReactNode;
}

export const Auth0ProviderWithNavigate = ({
	children,
}: PropsWithChildren<Auth0ProviderWithNavigateProps>): JSX.Element | null => {
	const [domain, clientId, audience] = [
		import.meta.env.VITE_AUTH0_DOMAIN,
		import.meta.env.VITE_AUTH0_CLIENT_ID,
		import.meta.env.VITE_AUTH0_AUDIENCE,
	];

	if (!domain || !clientId || !audience) return null;

	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			authorizationParams={{
				redirect_uri: window.location.origin,
				audience: audience,
			}}
			useRefreshTokens={true}
			cacheLocation="localstorage">
			{children}
		</Auth0Provider>
	);
};
