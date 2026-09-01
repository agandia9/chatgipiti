import { render, screen } from '@testing-library/react';
import { Chat } from './Chat';
import type { Message } from '../../types/chat';

describe('Chat', () => {
  it('renders welcome message when there are no messages', () => {
    render(<Chat messages={[]} />);
    expect(screen.getByText('Welcome to the chat!')).toBeInTheDocument();
  });

  it('renders each message with the correct role class', () => {
    const messages: Message[] = [
      { role: 'user', content: 'Hello!' },
      { role: 'assistant', content: 'Hi there!' },
    ];

    render(<Chat messages={messages} />);

    const userMsg = screen.getByText('Hello!');
    const assistantMsg = screen.getByText('Hi there!');

    expect(userMsg).toHaveClass('Chat-messages--user');
    expect(assistantMsg).toHaveClass('Chat-messages--assistant');
  });

  it('does not render the welcome message when there are messages', () => {
    const messages: Message[] = [{ role: 'user', content: 'Hey' }];
    render(<Chat messages={messages} />);
    expect(screen.queryByText('Welcome to the chat!')).not.toBeInTheDocument();
  });
});
