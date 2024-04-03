import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { SousAgence } from '@/model/sousAgence';
const EndPoint = "/sogeacongo/v1/SOUS_AGENCE"

export const useSousAgence = defineStore('sousAgence', {
    state: () => ({
        sousAgence: [] as SousAgence[]
      }),
  actions: {
    async fetchSousAgence() {
      try { 
        const response = await api.get(EndPoint);
        this.sousAgence = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des sous agence', error);
        throw error;
      }
    },
    async createObjectif(data : object) {
      try { 
        const response = await api.post(EndPoint, data);
        this.sousAgence = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la création des societes', error);
        throw error;
      }
    },
    async updateSociete(id : number,data : object) {
      try { 
        const response = await api.put(EndPoint+"/"+id, data);
        this.sousAgence = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la mis à jour des societes', error);
        throw error;
      }
    },
    async deleteSociete(id : number) {
      try { 
        const response = await api.delete(EndPoint+"/"+id);
        this.sousAgence = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la suppresion des societes', error);
        throw error;
      }
    },
  },
});