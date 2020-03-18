import React from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

export default class Index extends React.Component {
	state = {
		secureConnections: {}
	};
	broadcast(data) {
		Object.values(this.state.secureConnections).map(v =>
			v.send(JSON.stringify(data))
		);
	}
	recieve(data) {
		alert(data);
	}
	render() {
		return (
			<button
				onClick={() => {
					this.broadcast("nibba");
				}}
			>
				Hello
			</button>
		);
	}
	componentDidMount() {
		let socket = io("http://localhost:5000");
		console.log(socket.id);
		let peers = new Object();
		socket.on("allNodeData", d => {
			console.log(d);
			d.map(node => {
				peers[node.socketId] = new Peer({
					initiator: true,
					trickle: false
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
				peers[node.socketId].on("data", this.recieve);
			});
		});
		socket.on("candidateConnection", d => {
			console.log(d);
			if (peers[d.id] == undefined) {
				peers[d.id] = new Peer({ trickle: false });
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
				peers[d.id].on("data", this.recieve);
			}
			peers[d.id].signal(d.offer);
		});
	}
}
