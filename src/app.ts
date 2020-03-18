require("dotenv").config();
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var mongoose = require("mongoose");
import NodeSchema from "./schema/Node";
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
var Node = mongoose.model("nodes", NodeSchema);
server.listen(5000, () => console.log("Listening on 5000"));

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Ghym API Yay.");
});

io.on("connection", async socket => {
	let node = new Node({ socketId: socket.id });
	Node.find()
		.lean()
		.exec(async (err, users) => {
			socket.emit("allNodeData", users);
			await node.save();
		});
	socket.on("candidateSignals", data => {
		io.to(data.socketId).emit("candidateConnection", data);
	});
	socket.on("disconnect", () => {
		console.log("boopity");
		console.log(socket.id);
		Node.findOneAndRemove({ socketId: socket.id }).then(d => {
			console.log(`${d.socketId} has left the network.`);
		});
	});
});
