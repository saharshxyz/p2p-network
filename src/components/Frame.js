import React from "react";
import { Flex, Heading, Box } from "rebass";

export default class Frame extends React.Component {
	render() {
		return (
			<Flex sx={{ position: "absolute", width: "100%" }} id="titlebar">
				<Box
					variant="frameButton"
					onClick={() => global.window.close()}
					bg="red"
				/>
				<Box
					variant="frameButton"
					onClick={() => global.window.minimize()}
					bg="yellow"
				/>
				<Box
					variant="frameButton"
					onClick={() => global.window.maximize()}
					bg="green"
				/>
			</Flex>
		);
	}
}
