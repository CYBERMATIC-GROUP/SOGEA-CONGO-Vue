import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { Proprietaire } from '@/model/proprietaire';
const EndPoint = "/sogeacongo/v1/Propietaire"

export const useProprietaire = defineStore('proprietaire', {
    state: () => ({
        proprietaire: [] as Proprietaire[]
      }),
  actions: {
    async fetchProprietaire() {
      try { 
        const response = await api.get(EndPoint);
        this.proprietaire = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des proprietaires', error);
        throw error;
      }
    },
  },
});