import { Fragment, useState } from 'react'
import './App.css'
import { ChatInput } from './components/ChatInput/ChatInput';
import { Chat } from './components/Chat/Chat';
import type { Message } from './types/chat';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <Fragment>
      <Chat messages={messages} />
      <ChatInput messages={messages} setMessages={setMessages} />
    </Fragment>
  )
}

export default App
