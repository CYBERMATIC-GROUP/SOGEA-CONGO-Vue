import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { Ecriture } from '@/model/Ecriture';
const EndPoint = "/sogeacongo/v1/Historique_Compte_V2"

export const useCompte = defineStore('compte', {
    state: () => ({
        ecriture: [] as Ecriture[]
      }),
  actions: {
    async fetchCompte(data: object) {
      try { 
        const response = await api.post(EndPoint,data);
        this.ecriture = response.data.tabDonnees;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des comptes', error);
        throw error;
      }
    },
  },
});