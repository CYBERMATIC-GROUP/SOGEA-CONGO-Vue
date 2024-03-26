import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { TypeAutomobile } from '@/model/typeAutomobile';
const EndPoint = "/sogeacongo/v1/TypeAutomobile"

export const useTypeAutomobile = defineStore('typeAutomobile', {
    state: () => ({
        typeAutomobile: [] as TypeAutomobile[]
      }),
  actions: {
    async fetchTypeAutomobile() {
      try { 
        const response = await api.get(EndPoint);
        this.typeAutomobile = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des type de voiture', error);
        throw error;
      }
    },
  },
});