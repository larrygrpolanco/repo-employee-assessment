<script>
  import { formatTime } from '$lib/utils/formatters.js';
  import { onMount, onDestroy } from 'svelte';

  let currentTime = new Date();
  let interval;

  onMount(() => {
    interval = setInterval(() => {
      currentTime = new Date();
    }, 1000);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<header class="terminal-header">
  <div class="header-left">
    <span class="status-indicator pulse"></span>
    <span class="terminal-title">REPO EMPLOYEE TERMINAL v2.4.7</span>
  </div>
  <div class="header-right">
    <span class="time">{formatTime(currentTime)}</span>
  </div>
</header>

<style>
  .terminal-header {
    background-color: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
    padding: var(--spacing-md);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--accent-primary);
    box-shadow: 0 0 10px var(--accent-primary);
  }

  .terminal-title {
    color: var(--accent-primary);
    font-size: var(--font-size-small);
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .time {
    color: var(--text-secondary);
    font-size: var(--font-size-small);
    font-family: monospace;
  }

  @media (max-width: 768px) {
    .terminal-title {
      font-size: 10px;
    }
  }
</style>
