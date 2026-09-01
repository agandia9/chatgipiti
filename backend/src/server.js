import express from "express";
import cors from "cors";
import { generateResponse } from "./services/chat.service.js";

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

// app.post("/chat-stream", async (req, res) => {
//     res.setHeader(
//       "Content-Type",
//       "text/event-stream"
//     );

//     res.setHeader(
//       "Cache-Control",
//       "no-cache"
//     );

//     res.setHeader(
//       "Connection",
//       "keep-alive"
//     );

//     const { messages } = req.body;
//     const conversation = messages.map(msg => `${msg.role}: ${msg.content}`).join("\n");

//     const stream = client.responses.stream({
//       model: process.env.AZURE_OPENAI_DEPLOYMENT,
//       input: conversation,
//     });

//     stream.on(
//       "response.output_text.delta",
//       event => {
//         res.write(
//           `data: ${event.delta}\n\n`
//         );
//       }
//     );

//     await stream.finalResponse();

//     res.end();
// });