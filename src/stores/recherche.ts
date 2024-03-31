import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type {Automobile} from "@/model/automobile"
const EndPoint = "/sogeacongo/v1/RECHERCHE_Automobile_Recherche"


export const useRecherche = defineStore('recherche', {
  state: () => ({
    automobile: [] as Automobile[]
  }),
  actions: {
    async fetchAutomobile(data : object) {
      try { 
        const response = await api.post(EndPoint, data);
        this.automobile = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recherche des automobile', error);
        throw error;
      }
    }
}});