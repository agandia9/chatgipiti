import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInput } from './ChatInput';
import type { Message } from '../../types/chat';

vi.mock('../../services/chatApi', () => ({
  sendMessage: vi.fn().mockResolvedValue({ response: 'Mocked response' }),
}));

describe('ChatInput', () => {
  const setMessages = vi.fn();
  const messages: Message[] = [];

  beforeEach(() => {
    setMessages.mockClear();
  });

  it('renders the input and send button', () => {
    render(<ChatInput messages={messages} setMessages={setMessages} />);
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('updates input value as user types', async () => {
    render(<ChatInput messages={messages} setMessages={setMessages} />);
    const input = screen.getByPlaceholderText('Type your message...');
    await userEvent.type(input, 'Hello world');
    expect(input).toHaveValue('Hello world');
  });

  it('clears input and updates messages after sending', async () => {
    render(<ChatInput messages={messages} setMessages={setMessages} />);
    const input = screen.getByPlaceholderText('Type your message...');
    await userEvent.type(input, 'Hello');
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(input).toHaveValue('');
    expect(setMessages).toHaveBeenCalled();
  });
});
