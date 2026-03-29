import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { ChatRateLimiter } from '../../lib/bridge/security/rate-limiter.js';

describe('chat rate limiter', () => {
  it('serializes acquire calls for the same chat', async () => {
    const limiter = new ChatRateLimiter({ maxMessages: 1, windowMs: 20 });
    const order: string[] = [];

    const first = limiter.acquire('chat-1').then(() => { order.push('first'); });
    const second = limiter.acquire('chat-1').then(() => { order.push('second'); });

    await Promise.all([first, second]);
    assert.deepStrictEqual(order, ['first', 'second']);
  });

  it('canSendImmediately does not consume a send slot', async () => {
    const limiter = new ChatRateLimiter({ maxMessages: 1, windowMs: 60_000 });

    assert.equal(limiter.canSendImmediately('chat-1'), true);
    assert.equal(limiter.canSendImmediately('chat-1'), true);

    await limiter.acquire('chat-1');
    assert.equal(limiter.canSendImmediately('chat-1'), false);
  });
});
