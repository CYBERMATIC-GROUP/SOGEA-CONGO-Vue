import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { Departement } from '@/model/departement';
const EndPoint = "/sogeacongo/v1/Departement"

export const useDepartement = defineStore('departement', {
    state: () => ({
      departement: [] as Departement[]
      }),
  actions: {
    async fetchDepartement() {
      try { 
        const response = await api.get(EndPoint);
        this.departement = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des départements', error);
        throw error;
      }
    },
  },
});