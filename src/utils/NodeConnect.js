import Peer from "simple-peer";

export default class NodeConnection {
    localId = new String;
    destId = new String;
    peer = null;
    socket = null;
    constructor(destId, initiator, socket) {
        this.socket = socket;
        this.localId = socket.id;
        this.destId = destId;
        this.peer = new Peer({
            initiator: initiator
        });
        this.peerConnections()
    }
    peerConnections() {
        this.peer.on("signal", data => {
            this.socket.emit("candidateSignals", {
                socketId: this.destId,
                id: this.localId,
                offer: data
            });
        });
        this.peer.on("connect", () => {
            this.handleConnect(this.peer, this.destId)
        });
        this.peer.on("close", () => {
            this.handleClose(this.peer, this.destId)
        });
        this.peer.on("data", d => this.recieve(d));
    }
    handleOffer(offer) {
        this.peer.signal(offer)
    }
}