<script>
  import { robot } from '$lib/stores/robot.js';
  import { mapState } from '$lib/stores/map.js';

  // Calculate mock distance
  function calculateDistance() {
    // Mock distance calculation
    return Math.round(Math.random() * 5000 + 500);
  }

  let distance = calculateDistance();
</script>

<div class="map-container">
  <div class="map-header">
    <h2 class="map-title">LOCATION TRACKER</h2>
    <div class="coordinates">
      LAT: {$mapState.robotLocation.lat.toFixed(4)} / LNG: {$mapState.robotLocation.lng.toFixed(4)}
    </div>
  </div>

  <div class="map-view">
    <div class="grid-overlay"></div>

    <div class="location-info">
      <div class="distance-indicator">
        <span class="label">DISTANCE TO TARGET</span>
        <span class="value text-glow">{distance}m</span>
      </div>

      <div class="robot-marker pulse">
        <span class="marker-icon">◉</span>
        <span class="marker-label">{$robot.id}</span>
      </div>

      <div class="user-marker">
        <span class="marker-icon">▲</span>
        <span class="marker-label">YOU</span>
      </div>
    </div>

    <div class="map-placeholder">
      <div class="placeholder-text">
        <span>// MAP INTEGRATION</span>
        <span>// AWAITING SATELLITE DATA</span>
        <span class="pulse">// CONNECTING...</span>
      </div>
    </div>
  </div>

  <div class="map-controls">
    <button class="control-btn">CENTER</button>
    <button class="control-btn">ZOOM IN</button>
    <button class="control-btn">ZOOM OUT</button>
  </div>
</div>

<style>
  .map-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-primary);
    overflow: hidden;
  }

  .map-header {
    background-color: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
    padding: var(--spacing-md);
  }

  .map-title {
    color: var(--accent-secondary);
    font-size: var(--font-size-large);
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: var(--spacing-sm);
  }

  .coordinates {
    color: var(--text-secondary);
    font-size: var(--font-size-small);
    font-family: monospace;
  }

  .map-view {
    flex: 1;
    position: relative;
    background-color: var(--bg-secondary);
    overflow: hidden;
  }

  .grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.3;
  }

  .map-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle, var(--bg-tertiary) 0%, var(--bg-primary) 70%);
  }

  .placeholder-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--text-dim);
    font-size: var(--font-size-small);
    text-align: center;
  }

  .location-info {
    position: absolute;
    inset: 0;
    z-index: 10;
  }

  .distance-indicator {
    position: absolute;
    top: var(--spacing-lg);
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(10, 14, 20, 0.9);
    border: 1px solid var(--accent-primary);
    border-radius: 4px;
    padding: var(--spacing-sm) var(--spacing-md);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .distance-indicator .label {
    font-size: var(--font-size-small);
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .distance-indicator .value {
    font-size: var(--font-size-heading);
    color: var(--accent-primary);
    font-weight: bold;
  }

  .robot-marker,
  .user-marker {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .robot-marker {
    top: 60%;
    left: 55%;
    transform: translate(-50%, -50%);
    color: var(--accent-warning);
  }

  .user-marker {
    top: 45%;
    left: 45%;
    transform: translate(-50%, -50%);
    color: var(--accent-secondary);
  }

  .marker-icon {
    font-size: 32px;
    text-shadow: 0 0 10px currentColor;
  }

  .marker-label {
    font-size: var(--font-size-small);
    font-weight: bold;
    background-color: rgba(10, 14, 20, 0.9);
    padding: 2px var(--spacing-sm);
    border-radius: 2px;
    border: 1px solid currentColor;
  }

  .map-controls {
    background-color: var(--bg-secondary);
    border-top: 1px solid var(--border);
    padding: var(--spacing-md);
    display: flex;
    gap: var(--spacing-sm);
    justify-content: center;
  }

  .control-btn {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    border: 1px solid var(--border);
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

  .control-btn:hover {
    background-color: var(--accent-primary);
    color: var(--bg-primary);
    border-color: var(--accent-primary);
    box-shadow: 0 0 10px var(--accent-primary);
  }

  .control-btn:active {
    transform: scale(0.95);
  }
</style>
