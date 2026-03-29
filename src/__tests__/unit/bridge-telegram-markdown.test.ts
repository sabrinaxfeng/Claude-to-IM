import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { splitMessage } from '../../lib/bridge/adapters/telegram-utils.js';
import { markdownToTelegramChunks } from '../../lib/bridge/markdown/telegram.js';

describe('telegram chunk splitting', () => {
  it('prefers whitespace boundaries in plain telegram utils splitting', () => {
    const text = 'alpha beta gamma delta epsilon';
    const [first] = splitMessage(text, 12);
    assert.equal(first, 'alpha beta');
  });

  it('prefers natural whitespace boundaries for markdown chunks', () => {
    const text = 'alpha beta gamma delta epsilon zeta eta theta';
    const chunks = markdownToTelegramChunks(text, 18);
    assert.ok(chunks.length > 1);
    assert.equal(chunks[0]?.text.endsWith(' '), false);
    assert.match(chunks[0]?.text ?? '', /alpha beta gamma/);
  });
});
