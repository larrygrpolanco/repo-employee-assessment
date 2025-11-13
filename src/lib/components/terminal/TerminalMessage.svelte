<script>
  import { formatTime } from '$lib/utils/formatters.js';

  export let message;
</script>

<div class="message fade-in" class:system={message.sender === 'system'}>
  <div class="message-header">
    <span class="sender" class:user={message.sender === 'user'} class:robot={message.sender === 'robot'}>
      {#if message.sender === 'system'}
        [SYSTEM]
      {:else if message.sender === 'user'}
        > USER
      {:else}
        > ROBOT-{message.sender === 'robot' ? '7743' : ''}
      {/if}
    </span>
    <span class="timestamp">{formatTime(message.timestamp)}</span>
  </div>
  <div class="message-text">
    {message.text}
  </div>
</div>

<style>
  .message {
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--border);
    animation: fadeIn 0.3s ease-out;
  }

  .message.system {
    background-color: var(--bg-tertiary);
    border-left: 2px solid var(--accent-secondary);
  }

  .message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-small);
  }

  .sender {
    font-weight: bold;
    color: var(--text-secondary);
  }

  .sender.user {
    color: var(--accent-secondary);
  }

  .sender.robot {
    color: var(--accent-warning);
  }

  .message.system .sender {
    color: var(--accent-secondary);
    text-shadow: 0 0 5px var(--accent-secondary);
  }

  .timestamp {
    color: var(--text-dim);
    font-family: monospace;
  }

  .message-text {
    color: var(--text-primary);
    line-height: 1.6;
    word-wrap: break-word;
  }
</style>
