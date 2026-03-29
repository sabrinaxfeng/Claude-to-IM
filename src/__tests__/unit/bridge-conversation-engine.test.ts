import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  parseErrorEventData,
  resolvePersistedSdkSessionId,
} from '../../lib/bridge/conversation-engine.js';

describe('conversation-engine helpers', () => {
  it('falls back to persisted sdk session id from session metadata', () => {
    const result = resolvePersistedSdkSessionId(
      {
        id: 'binding-1',
        channelType: 'telegram',
        chatId: 'chat-1',
        codepilotSessionId: 'session-1',
        sdkSessionId: '',
        workingDirectory: '',
        model: '',
        mode: 'code',
        active: true,
        createdAt: '',
        updatedAt: '',
      },
      { sdk_session_id: 'persisted-sdk-123' },
    );

    assert.equal(result, 'persisted-sdk-123');
  });

  it('parses structured error payloads', () => {
    const parsed = parseErrorEventData(JSON.stringify({
      message: 'Session not found',
      code: 'resume_invalid',
    }));

    assert.deepStrictEqual(parsed, {
      message: 'Session not found',
      code: 'resume_invalid',
    });
  });
});
