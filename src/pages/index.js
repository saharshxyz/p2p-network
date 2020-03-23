import React from "react";
import { Flex, Heading } from "rebass";
import SideBar from "../components/sideBar";

export default class Index extends React.Component {
	render() {
		return (
			<Flex width="100vw" height="100%">
				<Flex variant="sideBar" />
				<SideBar active="home" />
				<Flex flex={5} pt="25px">
					<Flex flex={1} flexDirection="column">
						<Heading textAlign="center" fontSize={[5, 6, 7]}>
							Ghym
						</Heading>
					</Flex>
				</Flex>
			</Flex>
		);
	}
}
