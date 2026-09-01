import { useState } from 'react'
import { ChatInput } from './components/ChatInput/ChatInput';
import { Chat } from './components/Chat/Chat';
import type { Message } from './types/chat';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <>
      <Chat messages={messages} />
      <ChatInput messages={messages} setMessages={setMessages} />
    </>
  )
}

export default App
