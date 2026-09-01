import { useState } from "react";
import { sendMessage, sendMessageStream } from "../services/chatApi";
import type { Message } from "../types/chat";

export const useChatInput = (messages: Message[], setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
    const [input, setInput] = useState<string>("");

    const handleSend = async () => {
        const data = await sendMessage([
            ...messages,
            { role: "user", content: input }
        ]);
        
        setMessages(prev => [
            ...prev,
            { role: "user", content: input },
            { role: "assistant", content: data.response }
        ]);
        setInput("");
    };

    const handleSendStream = async () => {
        const userMessage: Message = { role: "user", content: input };
        const updatedMessages = [...messages, userMessage];

        setMessages([...updatedMessages, { role: "assistant", content: "" }]);
        setInput("");

        await sendMessageStream(updatedMessages, chunk => {
            setMessages(prev => {
                const copy = [...prev];
                const last = copy[copy.length - 1];
                copy[copy.length - 1] = { ...last, content: last.content + chunk };
                return copy;
            });
        });
    };

    return { input, setInput, handleSend, handleSendStream };
} 