import './ChatInput.css';
import type { Message } from "../../types/chat";
import { useChatInput } from './useChatInput';

export function ChatInput({ messages, setMessages }: { messages: Message[]; setMessages: React.Dispatch<React.SetStateAction<Message[]>> }) {
    const { input, setInput, handleSend } = useChatInput(messages, setMessages);

    return (
        <div className="Chat-input">
        <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
        {/* <button onClick={handleSendStream}>Send Stream</button> */}
        </div>
    );
}