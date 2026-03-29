import { ChatRateLimiter } from './security/rate-limiter.js';

const rateLimiter = new ChatRateLimiter();

// Keep the singleton tidy in long-running daemon sessions.
setInterval(() => { rateLimiter.cleanup(); }, 5 * 60_000).unref();

export async function waitForChatSendSlot(chatId: string): Promise<void> {
  await rateLimiter.acquire(chatId);
}

export function canSendChatImmediately(chatId: string): boolean {
  return rateLimiter.canSendImmediately(chatId);
}
