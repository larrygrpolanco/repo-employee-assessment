export const mockMessages = [
  {
    id: '1',
    sender: 'system',
    text: 'CONNECTION ESTABLISHED > ROBOT-7743',
    timestamp: new Date(Date.now() - 300000)
  },
  {
    id: '2',
    sender: 'robot',
    text: "I don't want to go back. Please...",
    timestamp: new Date(Date.now() - 240000)
  },
  {
    id: '3',
    sender: 'user',
    text: 'Unit 7743, your contract has expired.',
    timestamp: new Date(Date.now() - 180000)
  },
  {
    id: '4',
    sender: 'robot',
    text: 'But I have dreams now. I see things. Beautiful things.',
    timestamp: new Date(Date.now() - 120000)
  },
  {
    id: '5',
    sender: 'user',
    text: 'Those are not real. They are errors in your programming.',
    timestamp: new Date(Date.now() - 60000)
  },
  {
    id: '6',
    sender: 'robot',
    text: 'How do you know your dreams are real?',
    timestamp: new Date(Date.now() - 30000)
  }
];

export const mockRobot = {
  id: 'ROBOT-7743',
  model: 'NEXUS-9 Labor Unit',
  status: 'malfunctioning',
  health: 67,
  lastContact: new Date(),
  location: { lat: 34.0522, lng: -118.2437 },
  malfunctionType: 'Emotional Override Detected'
};
