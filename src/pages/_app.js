import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../components/theme";
import Frame from "../components/Frame";
export default ({ Component, pageProps }) => (
	<ThemeProvider theme={theme}>
		<Frame />
		<Component {...pageProps} />
	</ThemeProvider>
);
