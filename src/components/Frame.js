import React from "react";
import { Flex, Heading, Box } from "rebass";
import Icon from "@hackclub/icons";

export default class Frame extends React.Component {
	state = {
		max: true
	};
	render() {
		return (
			<Flex sx={{ position: "absolute", width: "100%" }} id="titlebar">
				<Flex
					variant="frameButton"
					onClick={() => global.Window.close()}
					bg="red"
					p={0.5}
				>
					<Icon glyph="view-close" size={23} />
				</Flex>
				<Flex
					variant="frameButton"
					onClick={() => global.Window.minimize()}
					bg="yellow"
					p={0.5}
				>
					<Icon glyph="down-caret" size={23} />
				</Flex>
				<Flex
					variant="frameButton"
					onClick={() => {
						this.setState({ max: !this.state.max });
						this.state.max
							? global.Window.maximize()
							: global.Window.unmaximize();
					}}
					bg="green"
					p={0.8}
				>
					<Icon glyph={this.state.max ? "expand" : "view-back"} size={23} />
				</Flex>
			</Flex>
		);
	}
}
