import React from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

export default class Index extends React.Component {
	state = {
		secureConnections: {},
		fileChunks: []
	};
	broadcast(data) {
		Object.values(this.state.secureConnections).map(v => v.send(data));
	}
	recieve(data) {
		if (data.toString() == "finished") {
			alert("yeeted");
			// Once, all the chunks are received, combine them to form a Blob
			const file = new Blob(this.state.fileChunks);
			download(file, "main.zip");
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
						let input = document.getElementById("file-input");
						const file = input.files[0];
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
								this.broadcast(chunk);
							}
							this.broadcast("finished");
						});
					}}
				>
					Hello
				</button>
			</div>
		);
	}
	componentDidMount() {
		global.ipcRenderer.send("message", "hello");
		let socket = io("http://localhost:5000");
		console.log(socket.id);
		let peers = new Object();
		socket.on("allNodeData", d => {
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
	}
}
