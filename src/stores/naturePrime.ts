import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { NaturePrime } from "@/model/naturePrime";
const EndPoint = "/sogeacongo/v1/PRODUIT_Get_Prime/"

export const useNature = defineStore('nature', {
    state: () => ({
        nature: [] as NaturePrime[],
      }),
  actions: {
    async fetchNature(idGenre: number, idType: number, idSource: number) {
      try { 
        const response = await api.get(EndPoint+idGenre+'/'+idType+'/'+idSource);
        this.nature = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des natures de primes', error);
        throw error;
      }
    },
  },
});