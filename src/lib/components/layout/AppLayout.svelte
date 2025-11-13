<script>
  import { activeTab } from '$lib/stores/navigation.js';
  import BottomNav from './BottomNav.svelte';
  import Terminal from '$lib/components/terminal/Terminal.svelte';
  import Map from '$lib/components/map/Map.svelte';
  import RobotStatus from '$lib/components/status/RobotStatus.svelte';
</script>

<div class="app-container">
  <main class="content-area">
    {#if $activeTab === 'terminal'}
      <Terminal />
    {:else if $activeTab === 'map'}
      <Map />
    {:else if $activeTab === 'status'}
      <RobotStatus />
    {/if}
  </main>

  <BottomNav />
</div>

<style>
  .app-container {
    height: 100vh;
    height: 100dvh; /* Dynamic viewport height for mobile */
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--bg-primary);
  }

  .content-area {
    flex: 1;
    overflow: hidden;
    position: relative;
    padding-bottom: var(--nav-height);
  }

  @media (min-width: 769px) {
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      border-left: 1px solid var(--border);
      border-right: 1px solid var(--border);
    }
  }
</style>
