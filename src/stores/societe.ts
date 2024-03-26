import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { Societe } from '@/model/societe';
const EndPoint = "/sogeacongo/v1/LES_SOCIETES"

export const useSociete = defineStore('societe', {
    state: () => ({
        societe: [] as Societe[]
      }),
  actions: {
    async fetchSociete() {
      try { 
        const response = await api.get(EndPoint);
        this.societe = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des societes', error);
        throw error;
      }
    },
  },
});