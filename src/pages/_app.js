import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../components/theme";
import Frame from "../components/Frame";
import { Flex } from "rebass";
import SideBar from "../components/sideBar";

export default ({ Component, pageProps }) => (
	<ThemeProvider theme={theme}>
		<Frame />
		<Flex width="100vw" height="100%">
			<SideBar />
			<Flex flex={5} pt="20px">
				<Component {...pageProps} />
			</Flex>
		</Flex>
		<style global>{`
            body, html, #__next {
                height: 100%;
            }
            #titlebar {
                -webkit-app-region: drag;
            }
        `}</style>
	</ThemeProvider>
);
