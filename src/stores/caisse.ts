import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { Ecriture } from '@/model/Ecriture';
import type {Caisse} from "@/model/caisse"
const EndPoint = "/sogeacongo/v1/Historique_Caisse_V2"
const EndPointCaisse = "/sogeacongo/v1/CAISSE"
const EndPointImprime = "/sogeacongo/v1/IMPRIME_Consultation_Caisse"


export const useCaisse = defineStore('caisse', {
    state: () => ({
        ecriture: [] as Ecriture[],
        caise : [] as Caisse[]
      }),
  actions: {
    async fetchCaisse(data: object) {
      try { 
        const response = await api.post(EndPoint,data);
        this.ecriture = response.data.tabDonnees;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des caisse', error);
        throw error;
      }
    },
    async fetchCaisse1() {
        try { 
          const response = await api.get(EndPointCaisse);
          this.caise = response.data;
          return response.data; 
        } catch (error) {
          console.error('Erreur lors de la recuperation des caisses', error);
          throw error;
        }
      },

      async ImprimerCaisse(data: object, id: string) {
        try { 
          const response = await api.post(EndPointImprime+'/'+id,data);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de l\'impression', error);
          throw error;
        }
      },  
  },
});