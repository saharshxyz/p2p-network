import React from "react";
import { Flex, Text, Box } from "rebass";
import Icon from "@hackclub/icons";
import Link from "next/link";

export default class sideBar extends React.Component {
	render() {
		return (
			<Flex variant="sideBar" sx={{ position: "fixed" }}>
				<Link href="/">
					<Flex
						variant={
							this.props.active == "home"
								? "sideBarButtonActive"
								: "sideBarButton"
						}
					>
						<Box m="auto" height="25px" mr="3px">
							<Icon glyph="home" size={25} />
						</Box>
						<Text m="auto" ml="3px">
							Home
						</Text>
					</Flex>
				</Link>
				<Link href="/console">
					<Flex
						variant={
							this.props.active == "console"
								? "sideBarButtonActive"
								: "sideBarButton"
						}
					>
						<Box m="auto" height="25px" mr="3px">
							<Icon glyph="terminal" size={25} />
						</Box>
						<Text m="auto" ml="3px">
							Runner
						</Text>
					</Flex>
				</Link>
				<Flex
					variant={
						this.props.active == "help"
							? "sideBarButtonActive"
							: "sideBarButton"
					}
				>
					<Box m="auto" height="25px" mr="3px">
						<Icon glyph="help" size={25} />
					</Box>
					<Text m="auto" ml="3px">
						Help
					</Text>
				</Flex>
				<Flex
					variant={
						this.props.active == "billing"
							? "sideBarButtonActive"
							: "sideBarButton"
					}
				>
					<Box m="auto" height="25px" mr="3px">
						<Icon glyph="card" size={25} />
					</Box>
					<Text m="auto" ml="3px">
						Billing
					</Text>
				</Flex>
				<Flex
					variant={
						this.props.active == "account"
							? "sideBarButtonActive"
							: "sideBarButton"
					}
				>
					<Box m="auto" height="25px" mr="3px">
						<Icon glyph="profile" size={25} />
					</Box>
					<Text m="auto" ml="3px">
						Account
					</Text>
				</Flex>
			</Flex>
		);
	}
}
