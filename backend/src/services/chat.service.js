import { toolDefinitions, availableTools } from "../toolRegistry.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  baseURL: process.env.AZURE_OPENAI_ENDPOINT,
  apiKey: process.env.AZURE_OPENAI_KEY,
});

export async function generateResponse(messages) {
    try {
    const conversation = messages
      .map(msg => `${msg.role}: ${msg.content}`)
      .join("\n");

  const response = await client.responses.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT,
      instructions:
        "Eres un asistente útil y servicial. Con amplia experiencia en desarrollo de software y programación. Responde a las preguntas de manera clara y concisa.",
      input: conversation,
      tools: toolDefinitions,
      max_output_tokens: 300,
      temperature: 1,
    });

    const toolCall = response.output.find(
      item => item.type === "function_call"
    );

    if (!toolCall) {
        console.log("No tool call found in the response.");
      return response.output_text;
      
    }

    console.log("Tool call found in the response.");
    const tool = availableTools[toolCall.name];

    const toolResult = tool();

    const finalResponse = await client.responses.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT,

      previous_response_id: response.id,

      input: [
        {
          type: "function_call_output",
          call_id: toolCall.call_id,
          output: toolResult,
        },
      ],
    });

    return finalResponse.output_text;

  } catch (error) {
    console.error(error);

    throw error;
  }
}