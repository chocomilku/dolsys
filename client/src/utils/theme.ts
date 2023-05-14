import {
	extendTheme,
	StyleFunctionProps,
	type ThemeConfig,
} from "@chakra-ui/react";

const config: ThemeConfig = {
	initialColorMode: "system",
	useSystemColorMode: false,
};

const styles = {
	global: (props: StyleFunctionProps) => ({
		body: {
			bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
		},
	}),
};

const theme = extendTheme({ config, styles });

export default theme;
