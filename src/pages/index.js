import React from "react";
import { Flex, Heading } from "rebass";

export default class Index extends React.Component {
	render() {
		return (
			<Flex flex={1} flexDirection="column">
				<Heading textAlign="center" fontSize={[5, 6, 7]}>
					Ghym
				</Heading>
			</Flex>
		);
	}
}
