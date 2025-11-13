<script>
  import { onMount, afterUpdate } from 'svelte';
  import { get } from 'svelte/store';
  import { terminal } from '$lib/stores/terminal.js';
  import { mockMessages } from '$lib/utils/mockData.js';
  import TerminalHeader from './TerminalHeader.svelte';
  import TerminalMessage from './TerminalMessage.svelte';
  import TerminalInput from './TerminalInput.svelte';

  let messagesContainer;

  onMount(() => {
    // Load mock messages only if store is empty
    if (get(terminal).messages.length === 0) {
      mockMessages.forEach(msg => {
        terminal.addMessage(msg.sender, msg.text);
      });
    }
  });

  afterUpdate(() => {
    // Auto-scroll to bottom when new messages arrive
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });
</script>

<div class="terminal-container">
  <TerminalHeader />

  <div class="messages-container" bind:this={messagesContainer}>
    {#each $terminal.messages as message (message.id)}
      <TerminalMessage {message} />
    {/each}

    {#if $terminal.isTyping}
      <div class="typing-indicator fade-in">
        <span class="sender robot">> ROBOT-7743</span>
        <span class="typing-dots">
          <span class="dot">.</span>
          <span class="dot">.</span>
          <span class="dot">.</span>
        </span>
      </div>
    {/if}
  </div>

  <TerminalInput />
</div>

<style>
  .terminal-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: var(--bg-primary);
  }

  .messages-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 80px; /* Space for input */
  }

  .typing-indicator {
    padding: var(--spacing-md);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    border-bottom: 1px solid var(--border);
  }

  .sender.robot {
    color: var(--accent-warning);
    font-size: var(--font-size-small);
    font-weight: bold;
  }

  .typing-dots {
    display: flex;
    gap: 4px;
  }

  .dot {
    color: var(--accent-warning);
    animation: blink 1.4s infinite;
  }

  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes blink {
    0%, 60%, 100% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
  }
</style>
