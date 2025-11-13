import { writable } from 'svelte/store';

export const robot = writable({
  id: 'ROBOT-7743',
  model: 'NEXUS-9 Labor Unit',
  status: 'malfunctioning',
  health: 67,
  lastContact: new Date(),
  location: { lat: 34.0522, lng: -118.2437 },
  malfunctionType: 'Emotional Override Detected'
});
