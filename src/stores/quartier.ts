import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { Quartier } from '@/model/quartier';
const EndPoint = "/sogeacongo/v1/Quartier"

export const useQuartier = defineStore('quartier', {
    state: () => ({
        quartier: [] as Quartier[],
      }),
  actions: {
    async fetchQuartier() {
      try { 
        const response = await api.get(EndPoint);
        this.quartier = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des quartiers', error);
        throw error;
      }
    },
  },
});