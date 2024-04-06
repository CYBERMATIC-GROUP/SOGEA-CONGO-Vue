import { defineStore } from 'pinia';


export const useMenu = defineStore('menu', {
  state: () => ({
    menu: true,
  }),
  actions: {
    setMenu(active: boolean) {
      this.menu = active;
    },
  },
});
