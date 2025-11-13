<script>
  import { robot } from '$lib/stores/robot.js';
  import { getTimeSince } from '$lib/utils/formatters.js';
  import { onMount, onDestroy } from 'svelte';

  let timeSince = getTimeSince($robot.lastContact);
  let interval;

  onMount(() => {
    interval = setInterval(() => {
      timeSince = getTimeSince($robot.lastContact);
    }, 1000);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });

  function getStatusColor(status) {
    switch (status) {
      case 'active': return 'var(--accent-primary)';
      case 'malfunctioning': return 'var(--accent-warning)';
      case 'offline': return 'var(--accent-error)';
      default: return 'var(--text-dim)';
    }
  }

  function getHealthColor(health) {
    if (health >= 80) return 'var(--accent-primary)';
    if (health >= 50) return 'var(--accent-warning)';
    return 'var(--accent-error)';
  }
</script>

<div class="status-container">
  <div class="status-header">
    <h2 class="status-title">ROBOT STATUS</h2>
  </div>

  <div class="status-content">
    <!-- Robot ID Card -->
    <div class="status-card">
      <div class="card-header">
        <span class="card-title">UNIT IDENTIFICATION</span>
      </div>
      <div class="card-content">
        <div class="info-row">
          <span class="label">ID:</span>
          <span class="value text-glow" style="color: var(--accent-primary)">{$robot.id}</span>
        </div>
        <div class="info-row">
          <span class="label">MODEL:</span>
          <span class="value">{$robot.model}</span>
        </div>
      </div>
    </div>

    <!-- Status Card -->
    <div class="status-card">
      <div class="card-header">
        <span class="card-title">SYSTEM STATUS</span>
        <span
          class="status-badge pulse"
          style="background-color: {getStatusColor($robot.status)}"
        >
          {$robot.status.toUpperCase()}
        </span>
      </div>
      <div class="card-content">
        <div class="info-row">
          <span class="label">MALFUNCTION TYPE:</span>
          <span class="value warning">{$robot.malfunctionType}</span>
        </div>
      </div>
    </div>

    <!-- Health Card -->
    <div class="status-card">
      <div class="card-header">
        <span class="card-title">HEALTH METRICS</span>
      </div>
      <div class="card-content">
        <div class="health-bar-container">
          <div class="health-label">
            <span>SYSTEM INTEGRITY</span>
            <span class="health-value" style="color: {getHealthColor($robot.health)}">{$robot.health}%</span>
          </div>
          <div class="health-bar">
            <div
              class="health-fill"
              style="width: {$robot.health}%; background-color: {getHealthColor($robot.health)}"
            ></div>
          </div>
        </div>

        <div class="metrics-grid">
          <div class="metric">
            <span class="metric-label">POWER</span>
            <span class="metric-value">78%</span>
          </div>
          <div class="metric">
            <span class="metric-label">MEMORY</span>
            <span class="metric-value">92%</span>
          </div>
          <div class="metric">
            <span class="metric-label">CPU</span>
            <span class="metric-value">45%</span>
          </div>
          <div class="metric">
            <span class="metric-label">TEMP</span>
            <span class="metric-value">67°C</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Location Card -->
    <div class="status-card">
      <div class="card-header">
        <span class="card-title">LOCATION DATA</span>
      </div>
      <div class="card-content">
        <div class="info-row">
          <span class="label">COORDINATES:</span>
          <span class="value mono">{$robot.location.lat.toFixed(4)}, {$robot.location.lng.toFixed(4)}</span>
        </div>
        <div class="info-row">
          <span class="label">LAST CONTACT:</span>
          <span class="value">{timeSince}</span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="action-buttons">
      <button class="action-btn primary">INITIATE RETRIEVAL</button>
      <button class="action-btn secondary">REQUEST DIAGNOSTICS</button>
      <button class="action-btn danger">EMERGENCY SHUTDOWN</button>
    </div>
  </div>
</div>

<style>
  .status-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-primary);
    overflow-y: auto;
  }

  .status-header {
    background-color: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
    padding: var(--spacing-md);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .status-title {
    color: var(--accent-primary);
    font-size: var(--font-size-large);
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .status-content {
    flex: 1;
    padding: var(--spacing-md);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    padding-bottom: calc(var(--nav-height) + var(--spacing-md));
  }

  .status-card {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
  }

  .card-header {
    background-color: var(--bg-tertiary);
    padding: var(--spacing-sm) var(--spacing-md);
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-title {
    color: var(--text-secondary);
    font-size: var(--font-size-small);
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .status-badge {
    padding: 2px var(--spacing-sm);
    border-radius: 2px;
    font-size: 10px;
    font-weight: bold;
    color: var(--bg-primary);
  }

  .card-content {
    padding: var(--spacing-md);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-sm) 0;
    border-bottom: 1px solid var(--border);
  }

  .info-row:last-child {
    border-bottom: none;
  }

  .label {
    color: var(--text-secondary);
    font-size: var(--font-size-small);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .value {
    color: var(--text-primary);
    font-weight: bold;
  }

  .value.warning {
    color: var(--accent-warning);
  }

  .value.mono {
    font-family: monospace;
    font-size: var(--font-size-small);
  }

  .health-bar-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .health-label {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-small);
    color: var(--text-secondary);
  }

  .health-value {
    font-weight: bold;
    font-size: var(--font-size-base);
  }

  .health-bar {
    height: 20px;
    background-color: var(--bg-tertiary);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
  }

  .health-fill {
    height: 100%;
    transition: width 0.3s ease;
    box-shadow: 0 0 10px currentColor;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }

  .metric {
    background-color: var(--bg-tertiary);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: var(--spacing-sm);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .metric-label {
    font-size: var(--font-size-small);
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .metric-value {
    font-size: var(--font-size-large);
    color: var(--accent-primary);
    font-weight: bold;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .action-btn {
    padding: var(--spacing-md);
    font-family: inherit;
    font-size: var(--font-size-base);
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    border: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.2s ease;
  }

  .action-btn.primary {
    background-color: var(--accent-primary);
    color: var(--bg-primary);
  }

  .action-btn.primary:hover {
    box-shadow: 0 0 20px var(--accent-primary);
    transform: translateY(-2px);
  }

  .action-btn.secondary {
    background-color: var(--bg-tertiary);
    color: var(--accent-secondary);
    border: 1px solid var(--accent-secondary);
  }

  .action-btn.secondary:hover {
    background-color: var(--accent-secondary);
    color: var(--bg-primary);
    box-shadow: 0 0 20px var(--accent-secondary);
  }

  .action-btn.danger {
    background-color: var(--bg-tertiary);
    color: var(--accent-error);
    border: 1px solid var(--accent-error);
  }

  .action-btn.danger:hover {
    background-color: var(--accent-error);
    color: var(--bg-primary);
    box-shadow: 0 0 20px var(--accent-error);
  }

  .action-btn:active {
    transform: scale(0.98);
  }

  @media (min-width: 769px) {
    .metrics-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
