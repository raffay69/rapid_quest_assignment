import express from "express";
import { messageModel } from "./models/message.model.js";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected ", socket.id);

  socket.on("disconnect", () => {
    console.log("client disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("running on 3000");
});

async function watchMessages() {
  const changeStream = messageModel.watch();
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      io.emit("newMessage", change.fullDocument);
    }
    if (change.operationType === "update") {
      io.emit(
        "updateMessage",
        change.updateDescription.updatedFields,
        change.documentKey._id
      );
    }
    if (change.operationType === "delete") {
      io.emit("deletedMessage", change.documentKey._id);
    }
  });
}
watchMessages();

app.get("/chat", async (req, res) => {
  try {
    const data = await messageModel.aggregate([
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: "$conversation_id",
          customer_name: { $first: "$customer_name" },
          latest_message: { $first: "$content" },
          timestamp: { $first: "$timestamp" },
          message_count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          conversation_id: "$_id",
          customer_name: 1,
          latest_message: 1,
          timestamp: 1,
          message_count: 1,
        },
      },
      {
        $sort: { timestamp: -1 },
      },
    ]);
    res.json(data);
  } catch (e) {
    res.sendStatus(500).json({ error: e.message });
  }
});

app.post("/chat", async (req, res) => {
  try {
    const newMsg = req.body;
    await messageModel.create(newMsg);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500).json({ error: e.message });
  }
});

app.get("/chat/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await messageModel
      .find({ conversation_id: id })
      .sort({ timestamp: 1 });
    res.json(data);
  } catch (e) {
    res.sendStatus(500).json({ error: e.message });
  }
});

// to keep the server alive
app.get("/keep-alive", (req, res) => {
  res.send("alive");
});
