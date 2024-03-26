import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { Arrondissement } from '../model/arrondissement';
const EndPoint = "/sogeacongo/v1/Arrondissement"

export const useArrondissement = defineStore('arrondissement', {
    state: () => ({
        arrondissement: {} as Arrondissement,
      }),
  actions: {
    async fetchArrondissement() {
      try { 
        const response = await api.get(EndPoint);
        this.arrondissement = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des arrondissements', error);
        throw error;
      }
    },
  },
});