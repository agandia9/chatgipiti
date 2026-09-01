import express from "express";
import cors from "cors";
import { generateResponse, generateResponseStream } from "./services/chat.service.js";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("Server running");
});

app.post("/chat", async (req, res) => {
  try {
    const response = await generateResponse(
      req.body.messages
    );

    res.json({
      response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/chat-stream", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    await generateResponseStream(req.body.messages, chunk => {
      res.write(`data: ${chunk}\n\n`);
    });
  } catch (error) {
    console.error(error);
    res.write(`data: [ERROR] ${error.message}\n\n`);
  } finally {
    res.end();
  }
});