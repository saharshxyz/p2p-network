import React from "react";
import io from "socket.io-client";
import Network from "../utils/Network";
import { Flex, Heading, Button, Box, Text } from "rebass";
import { Label, Textarea } from "@rebass/forms";
import SideBar from "../components/sideBar";
import Dropzone from "react-dropzone";

export default class Console extends React.Component {
	state = {
		id: "",
		shellText: [<Text>Drag a zip to run it!</Text>],
		network: null
	};
	render() {
		return (
			<Flex width="100vw" height="100%">
				<Flex variant="sideBar" />
				<SideBar active="console" />
				<Flex flex={5} pt="25px">
					<Flex flex={1} flexDirection="column">
						<Heading textAlign="center" fontSize={[5, 6, 7]}>
							Runner
						</Heading>
						<Dropzone
							accept=".zip"
							onDrop={e =>
								e.forEach(
									f => (document.getElementById("filetext").innerHTML = f.name)
								)
							}
						>
							{({ getRootProps, getInputProps }) => (
								<section style={{ display: "flex" }}>
									<Box
										sx={{
											height: "100px",
											my: "20px",
											display: "flex",
											outlineColor: "grey",
											outlineWidth: "3px",
											outlineStyle: "dashed",
											width: "50vw",
											mx: "auto"
										}}
										{...getRootProps()}
									>
										<input id="file-input" {...getInputProps()} />
										<p id="filetext" style={{ margin: "auto" }}>
											Drag your program zip here!
										</p>
									</Box>
								</section>
							)}
						</Dropzone>
						<Button
							width="30vw"
							mx="auto"
							onClick={() => {
								this.setState({ shellText: new Array() });
								// This is randomized to the first node, eventually this would be chosen
								const id = Object.keys(this.state.network.secureConnections)[0];
								let input = document.getElementById("file-input");
								let file = input.files[0];
								console.log("Sending", file);
								file.arrayBuffer().then(buffer => {
									const chunkSize = 16 * 1024;
									while (buffer.byteLength) {
										console.log(`Sending with ${buffer.byteLength} left`);
										const chunk = buffer.slice(0, chunkSize);
										buffer = buffer.slice(chunkSize, buffer.byteLength);
										console.log(chunk);
										this.state.network.find(id).peer.send(chunk);
									}
									this.state.network
										.find(id)
										.peer.send("finished:" + this.state.id);
								});
							}}
						>
							Send Away!
						</Button>
						<Box sx={{ mx: "auto", my: "30px", width: "90%" }}>
							<Text fontWeight="bold">Console:</Text>
							<Box
								sx={{
									borderRadius: "4px",
									border: "2px solid #5c5e69",
									p: "20px"
								}}
							>
								{this.state.shellText}
							</Box>
						</Box>
					</Flex>
				</Flex>
			</Flex>
		);
	}
	componentDidMount() {
		let socket = io("http://localhost:5000");
		this.state.network = new Network();
		this.state.network.socket = socket;
		this.state.network.renderShell = line => {
			console.log(this.state.shellText);
			console.log(line);
			let payload = this.state.shellText;
			line.text.split("\n").map(v => {
				payload.push(
					<Text color={line.type == "out" ? "text" : "red"}>{v}</Text>
				);
			});
			this.setState({ shellText: payload });
		};
		socket.on("allNodeData", d => {
			this.state.id = socket.id;
			console.log(d);
			d.map(node => {
				this.state.network.add(node.socketId);
			});
		});
		socket.on("candidateConnection", d => {
			this.state.network.externalOffer(d.id, d.offer);
		});
		global.ipcRenderer.on("shell", (event, data) => {
			this.state.network
				.find(data.id)
				.peer.send(JSON.stringify({ type: data.type, text: data.text }));
		});
	}
	componentWillUnmount() {
		this.state.network.kill(this.state.network.socket);
	}
}
