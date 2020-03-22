import React from "react";
import { Flex, Text } from "rebass";

export default class sideBar extends React.Component {
	render() {
		return (
			<Flex
				flexDirection="column"
				flex={1}
				minWidth="60px"
				bg="accent"
				height="100%"
				pt="20px"
			>
				<Flex variant="sideBarButton" bg="secondary" color="white">
					Home
				</Flex>
				<Flex variant="sideBarButton">Home</Flex>
				<Flex variant="sideBarButton">Home</Flex>
				<Flex variant="sideBarButton">Home</Flex>
				<Flex variant="sideBarButton">Home</Flex>
				<Flex variant="sideBarButton">Home</Flex>
			</Flex>
		);
	}
}
