import { writable } from 'svelte/store';

export const mapState = writable({
  userLocation: { lat: 34.0522, lng: -118.2437 },
  robotLocation: { lat: 34.0522, lng: -118.2437 },
  zoom: 14
});
