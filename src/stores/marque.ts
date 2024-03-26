import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { MarqueAutomobile } from '@/model/marqueAutomobile';
const EndPoint = "/sogeacongo/v1/MarqueAutomobile"

export const useMarqueAutomobile = defineStore('marqueAutomobile', {
    state: () => ({
        marqueAutomobile: [] as MarqueAutomobile[]
      }),
  actions: {
    async fetchMarqueAutomobile() {
      try { 
        const response = await api.get(EndPoint);
        this.marqueAutomobile = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des marques de voiture', error);
        throw error;
      }
    },
  },
});