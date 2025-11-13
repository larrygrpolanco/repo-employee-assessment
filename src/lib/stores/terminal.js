import { writable } from 'svelte/store';

function createTerminalStore() {
  let messageIdCounter = 0;

  const { subscribe, update } = writable({
    messages: [],
    isTyping: false
  });

  return {
    subscribe,
    addMessage: (sender, text) => {
      update(state => ({
        ...state,
        messages: [
          ...state.messages,
          {
            id: `msg-${Date.now()}-${messageIdCounter++}`,
            sender,
            text,
            timestamp: new Date()
          }
        ]
      }));
    },
    setTyping: (isTyping) => {
      update(state => ({ ...state, isTyping }));
    },
    clear: () => {
      update(() => ({ messages: [], isTyping: false }));
    }
  };
}

export const terminal = createTerminalStore();
