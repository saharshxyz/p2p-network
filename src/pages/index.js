import React from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

export default class Index extends React.Component {
	state = {
		secureConnections: {},
		fileChunks: [],
		id: ""
	};
	broadcast(data) {
		Object.values(this.state.secureConnections).map(v => v.send(data));
	}
	recieve(data) {
		try {
			console.log(JSON.parse(data.toString()).text)
		} catch {
			console.log("NOT A SHELL THING")
		}
		if (data.toString().split("finished:").length != 1) {
			global.ipcRenderer.send("message", { chunks: this.state.fileChunks, returnId: data.toString().split("finished:")[1] });
			this.state.fileChunks = []
		} else {
			this.state.fileChunks.push(data);
		}
	}
	render() {
		return (
			<div>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/downloadjs/1.4.8/download.min.js"></script>
				<input type="file" id="file-input" />
				<button
					onClick={() => {
						const id = Object.keys(this.state.secureConnections)[0]
						let input = document.getElementById("file-input");
						let file = input.files[0];
						console.log("Sending", file);
						// We convert the file from Blob to ArrayBuffer
						file.arrayBuffer().then(buffer => {
							/**
							 * A chunkSize (in Bytes) is set here
							 * I have it set to 16KB
							 */
							const chunkSize = 16 * 1024;

							// Keep chunking, and sending the chunks to the other peer
							while (buffer.byteLength) {
								console.log(`Sending with ${buffer.byteLength} left`);
								const chunk = buffer.slice(0, chunkSize);
								buffer = buffer.slice(chunkSize, buffer.byteLength);
								console.log(chunk);
								// Off goes the chunk!
								this.state.secureConnections[id].send(chunk)
							}
							this.state.secureConnections[id].send("finished:" + this.state.id)
						});
					}}
				>
					Hello
				</button>
			</div>
		);
	}
	componentDidMount() {
		let socket = io("http://localhost:5000");
		let peers = new Object();
		socket.on("allNodeData", d => {
			this.state.id = socket.id
			console.log(d);
			d.map(node => {
				peers[node.socketId] = new Peer({
					initiator: true
				});
				peers[node.socketId].on("signal", data => {
					socket.emit("candidateSignals", {
						socketId: node.socketId,
						id: socket.id,
						offer: data
					});
				});
				peers[node.socketId].on("connect", () => {
					this.state.secureConnections[node.socketId] = peers[node.socketId];
					console.log("new connection");
				});
				peers[node.socketId].on("close", () => {
					delete this.state.secureConnections[node.socketId];
				});
				peers[node.socketId].on("data", d => this.recieve(d));
			});
		});
		socket.on("candidateConnection", d => {
			console.log(d);
			if (peers[d.id] == undefined) {
				peers[d.id] = new Peer();
				peers[d.id].on("signal", data => {
					socket.emit("candidateSignals", {
						socketId: d.id,
						id: socket.id,
						offer: data
					});
				});
				peers[d.id].on("connect", () => {
					this.state.secureConnections[d.id] = peers[d.id];
					console.log("new connection");
				});
				peers[d.id].on("close", () => {
					delete this.state.secureConnections[d.id];
				});
				peers[d.id].on("data", d => this.recieve(d));
			}
			peers[d.id].signal(d.offer);
		});
		global.ipcRenderer.on("shell", (event, data) => {
			this.state.secureConnections[data.id].send(JSON.stringify({ type: "text", text: data.text }))
		})
	}
}
