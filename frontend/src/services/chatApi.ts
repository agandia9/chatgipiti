import type { Message } from "../types/chat";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function sendMessage(
  messages: Message[]
) {
  const response = await fetch(
    `${API_URL}/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages
      })
    }
  );

  return response.json();
}

export async function sendMessageStream(
  messages: Message[],
  onChunk: (chunk: string) => void
) {
  const response = await fetch(
    `${API_URL}/chat-stream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages
      })
    }
  );

  const reader =
    response.body?.getReader();

  const decoder =
    new TextDecoder();

  while (reader) {
    const { done, value } =
      await reader.read();

    if (done) {
      break;
    }

    const text = decoder.decode(value);

    const events = text
    .split("\n")
    .filter(line => line.startsWith("data: "));

    for (const event of events) {
        const value = event.replace("data: ", "");
        onChunk(value);
        }
  }
}