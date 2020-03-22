import React from "react";
import { Flex, Heading, Box } from "rebass";

export default class Frame extends React.Component {
	state = {
		max: false
	};
	render() {
		return (
			<Flex sx={{ position: "absolute", width: "100%" }} id="titlebar">
				<Box
					variant="frameButton"
					onClick={() => global.Window.close()}
					bg="red"
				/>
				<Box
					variant="frameButton"
					onClick={() => global.Window.minimize()}
					bg="yellow"
				/>
				<Box
					variant="frameButton"
					onClick={() => {
						this.state.max
							? global.Window.maximize()
							: global.Window.unmaximize();
						this.state.max = !this.state.max;
					}}
					bg="green"
				/>
			</Flex>
		);
	}
}
