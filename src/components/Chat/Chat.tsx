import './Chat.css';
import type { Message } from "../../types/chat";

export function Chat({ messages }: { messages: Message[] }) {
    return (
            <div className="Chat-messages">
                {
                    messages.length > 0 ? (
                        messages.map((message, index) => (
                            <div key={index} className={`Chat-messages--${message.role}`}>
                                {message.content}
                            </div>
                        ))
                    ) : (
                        <div className="Chat-messages--empty">
                            Welcome to the chat!
                        </div>
                    )
                }
            </div>
    );
}