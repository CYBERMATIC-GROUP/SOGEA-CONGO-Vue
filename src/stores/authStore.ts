import { defineStore } from 'pinia';

const storedToken = localStorage.getItem("Agent");
console.log(storedToken)
let isConnected = false;

if (storedToken) {
  isConnected = true;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isConnected: isConnected,
  }),
  actions: {
    setConnected(connected: boolean) {
      this.isConnected = connected;
    },
  },
});
