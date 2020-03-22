import React from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import Network from "../utils/Network";

export default class joinNetwork extends React.Component {
	state = {
		id: "",
		shellText: ``,
		network: null
	};
	render() {
		return (
			<div>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/downloadjs/1.4.8/download.min.js"></script>
				<input type="file" id="file-input" />
				<button
					onClick={() => {
						this.setState({ shellText: "" });
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
					Hello
				</button>
				<textarea value={this.state.shellText} readOnly />
			</div>
		);
	}
	componentDidMount() {
		let socket = io("http://localhost:5000");
		this.state.network = new Network();
		this.state.network.socket = socket;
		this.state.network.renderShell = text => {
			this.setState({ shellText: `${this.state.shellText}\n${text}` });
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
				.peer.send(JSON.stringify({ type: "text", text: data.text }));
		});
	}
}
