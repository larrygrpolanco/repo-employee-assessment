<script>
  import { activeTab } from '$lib/stores/navigation.js';

  const tabs = [
    { id: 'terminal', label: 'Terminal', icon: '>' },
    { id: 'map', label: 'Map', icon: '◉' },
    { id: 'status', label: 'Status', icon: '⚡' }
  ];

  function selectTab(tabId) {
    activeTab.set(tabId);
  }
</script>

<nav class="bottom-nav">
  {#each tabs as tab}
    <button
      class="nav-item"
      class:active={$activeTab === tab.id}
      on:click={() => selectTab(tab.id)}
      aria-label={tab.label}
    >
      <span class="nav-icon">{tab.icon}</span>
      <span class="nav-label">{tab.label}</span>
    </button>
  {/each}
</nav>

<style>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--nav-height);
    background-color: var(--bg-secondary);
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
    pointer-events: auto;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm);
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 80px;
    position: relative;
    pointer-events: auto;
    touch-action: manipulation;
  }

  .nav-item:hover {
    color: var(--text-primary);
  }

  .nav-item.active {
    color: var(--accent-primary);
  }

  .nav-item.active .nav-icon {
    text-shadow: 0 0 10px var(--accent-primary);
  }

  .nav-item.active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background-color: var(--accent-primary);
    box-shadow: 0 0 10px var(--accent-primary);
  }

  .nav-icon {
    font-size: var(--font-size-large);
    transition: transform 0.2s ease;
  }

  .nav-item:active .nav-icon {
    transform: scale(0.9);
  }

  .nav-label {
    font-size: var(--font-size-small);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  @media (min-width: 769px) {
    .bottom-nav {
      max-width: 1200px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
