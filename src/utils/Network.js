import NodeConnect from "./NodeConnect";

export default class Network {
	secureConnections = new Object();
	pendingConnections = new Object();
	localId = null;
	fileChunks = new Array();
	socket = null;
	add(id) {
		this.pendingConnections[id] = new NodeConnect(id, true, this.socket);
		this.pendingConnections[id].handleConnect = () => {
			this.secureConnections[id] = this.pendingConnections[id];
			delete this.pendingConnections[id];
			console.log("new connection");
		};
		this.pendingConnections[id].handleClose = () => {
			delete this.secureConnections[id];
		};
		this.pendingConnections[id].recieve = d => this.recieve(d);
	}
	externalOffer(id, offer) {
		if (this.pendingConnections[id] == undefined) {
			this.pendingConnections[id] = new NodeConnect(id, false, this.socket);
			this.pendingConnections[id].handleConnect = () => {
				this.secureConnections[id] = this.pendingConnections[id];
				delete this.pendingConnections[id];
				console.log("new connection");
			};
			this.pendingConnections[id].handleClose = () => {
				delete this.secureConnections[id];
			};
			this.pendingConnections[id].recieve = d => this.recieve(d);
		}
		this.pendingConnections[id].handleOffer(offer);
	}
	broadcast(data) {
		Object.values(this.secureConnections).map(v => v.peer.send(data));
	}
	recieve(data) {
		try {
			console.log(JSON.parse(data.toString()).text);
			this.renderShell(JSON.parse(data.toString()).text);
		} catch {
			console.log("Chunk, not shell");
			if (data.toString().split("finished:").length != 1) {
				global.ipcRenderer.send("message", {
					chunks: this.fileChunks,
					returnId: data.toString().split("finished:")[1]
				});
				this.fileChunks = [];
			} else {
				this.fileChunks.push(data);
			}
		}
	}
	find(id) {
		return this.secureConnections[id];
	}
}
