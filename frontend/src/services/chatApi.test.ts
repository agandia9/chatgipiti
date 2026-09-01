import { sendMessage } from './chatApi';
import type { Message } from '../types/chat';

describe('chatApi', () => {
  const messages: Message[] = [{ role: 'user', content: 'Hello' }];

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('sendMessage', () => {
    it('posts to /chat and returns parsed JSON', async () => {
      vi.mocked(fetch).mockResolvedValue({
        json: vi.fn().mockResolvedValue({ response: 'Hi!' }),
      } as unknown as Response);

      const result = await sendMessage(messages);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/chat'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages }),
        })
      );
      expect(result).toEqual({ response: 'Hi!' });
    });
  });
});
