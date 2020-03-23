import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../components/theme";
import Frame from "../components/Frame";

export default ({ Component, pageProps }) => (
	<ThemeProvider theme={theme}>
		<Component {...pageProps} />
		<style>{`
            body, html, #__next {
                height: 100%
            }
            #titlebar {
                -webkit-app-region: drag;
            }
        `}</style>
	</ThemeProvider>
);
