import { useState } from "react";
import { sendMessage } from "../services/chatApi";
import type { Message } from "../../types/chat";

export const useChatInput = (messages: Message[], setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
    const [input, setInput] = useState<string>("");

    const handleSend = async () => {
        const data = await sendMessage([
            ...messages,
            {
                role: "user",
                content: input
            }
        ]);
        
        setMessages(prev => [
            ...prev,
            {
                role: "user",
                content: input
            },
            {
                role: "assistant",
                content: data.response
            }
        ]);
        setInput("");
    };

    // const handleSendStream = async () => {
    //     const updatedMessages: Message[] = [
    //         ...messages,
    //         {
    //         role: "user",
    //         content: input
    //         }
    //     ];

    //     setMessages([
    //         ...updatedMessages,
    //         {
    //         role: "assistant",
    //         content: ""
    //         }
    //     ]);

    //     setInput("");

    //     await sendMessageStream(
    //         updatedMessages,
    //         chunk => {
    //         setMessages(prev => {
    //             const copy = [...prev];

    //             const lastIndex = copy.length - 1;

    //             copy[lastIndex] = {
    //                 ...copy[lastIndex],
    //                 content: copy[lastIndex].content + chunk,
    //             };

    //             return copy;
    //         });
    //         }
    //     );

        
    // };

    return {
        input,
        setInput,
        handleSend,
        // handleSendStream
    };
} 