import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { Revenus } from '@/model/revenus';
const EndPoint = "/sogeacongo/v1/REVENUS_STATISTIQUES"

export const useRevenus = defineStore('revenus', {
    state: () => ({
        revenus: [] as Revenus[]
      }),
  actions: {
    async fetchRevenus() {
      try { 
        const response = await api.get(EndPoint);
        this.revenus = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des revenus', error);
        throw error;
      }
    },
  },
});