import { renderHook, act } from '@testing-library/react';
import { useChatInput } from './useChatInput';
import * as chatApi from '../../services/chatApi';
import type { Message } from '../../types/chat';

vi.mock('../../services/chatApi');

describe('useChatInput', () => {
  const setMessages = vi.fn();

  beforeEach(() => {
    vi.mocked(chatApi.sendMessage).mockResolvedValue({ response: 'Hello from AI' });
    setMessages.mockClear();
  });

  it('initializes with empty input', () => {
    const { result } = renderHook(() => useChatInput([], setMessages));
    expect(result.current.input).toBe('');
  });

  it('updates input via setInput', () => {
    const { result } = renderHook(() => useChatInput([], setMessages));
    act(() => result.current.setInput('test'));
    expect(result.current.input).toBe('test');
  });

  it('calls sendMessage with current messages + user input on handleSend', async () => {
    const messages: Message[] = [{ role: 'user', content: 'Hi' }];
    const { result } = renderHook(() => useChatInput(messages, setMessages));

    act(() => result.current.setInput('How are you?'));
    await act(() => result.current.handleSend());

    expect(chatApi.sendMessage).toHaveBeenCalledWith([
      { role: 'user', content: 'Hi' },
      { role: 'user', content: 'How are you?' },
    ]);
  });

  it('adds user and assistant messages then clears input after sending', async () => {
    const { result } = renderHook(() => useChatInput([], setMessages));

    act(() => result.current.setInput('Hello'));
    await act(() => result.current.handleSend());

    expect(setMessages).toHaveBeenCalledOnce();
    const updater = setMessages.mock.calls[0][0];
    const updated = updater([]);
    expect(updated).toEqual([
      { role: 'user', content: 'Hello' },
      { role: 'assistant', content: 'Hello from AI' },
    ]);
    expect(result.current.input).toBe('');
  });
});
