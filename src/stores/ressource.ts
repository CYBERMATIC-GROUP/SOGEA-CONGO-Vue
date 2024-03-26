import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { Ressource } from '@/model/ressource';


export const useRessource = defineStore('ressource', {
    state: () => ({
        ressource: [] as Ressource[],
      }),
  actions: {
    async fetchRessource(data: object, item:string) {
        const EndPoint = "/sogeacongo/v1/GetRessource/"+item
      try { 
        const response = await api.post(EndPoint, data);
        this.ressource = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des ressources', error);
        throw error;
      }
    },
  },
});