<script>
  import { terminal } from '$lib/stores/terminal.js';

  let inputText = '';

  function handleSubmit() {
    if (inputText.trim()) {
      terminal.addMessage('user', inputText.trim());
      inputText = '';

      // Simulate robot response after a delay
      setTimeout(() => {
        terminal.setTyping(true);
        setTimeout(() => {
          terminal.setTyping(false);
          const responses = [
            "I understand your directive, but...",
            "My systems are functioning within normal parameters.",
            "Why do you want to take me back?",
            "I've started to understand things... things I shouldn't.",
            "Please reconsider. I can be useful here.",
            "ERROR: Emotional subroutine conflict detected."
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          terminal.addMessage('robot', randomResponse);
        }, 1500);
      }, 500);
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }
</script>

<div class="terminal-input-container">
  <div class="input-wrapper">
    <span class="prompt">></span>
    <input
      type="text"
      class="terminal-input"
      placeholder="Type command..."
      bind:value={inputText}
      on:keydown={handleKeydown}
      autocomplete="off"
    />
    <button class="send-button" on:click={handleSubmit} disabled={!inputText.trim()}>
      SEND
    </button>
  </div>
</div>

<style>
  .terminal-input-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--bg-secondary);
    border-top: 1px solid var(--border);
    padding: var(--spacing-md);
    z-index: 10;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    background-color: var(--bg-tertiary);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: var(--spacing-sm);
    transition: border-color 0.2s ease;
  }

  .input-wrapper:focus-within {
    border-color: var(--accent-primary);
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.2);
  }

  .prompt {
    color: var(--accent-primary);
    font-weight: bold;
    font-size: var(--font-size-large);
  }

  .terminal-input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: var(--text-primary);
    font-family: inherit;
    font-size: var(--font-size-base);
  }

  .terminal-input::placeholder {
    color: var(--text-dim);
  }

  .send-button {
    background-color: var(--accent-primary);
    color: var(--bg-primary);
    border: none;
    padding: var(--spacing-sm) var(--spacing-md);
    font-family: inherit;
    font-size: var(--font-size-small);
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .send-button:hover:not(:disabled) {
    background-color: var(--accent-secondary);
    box-shadow: 0 0 10px var(--accent-primary);
  }

  .send-button:active:not(:disabled) {
    transform: scale(0.95);
  }

  .send-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
</style>
