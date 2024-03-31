import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { Societe } from '@/model/societe';
const EndPoint = "/sogeacongo/v1/LES_SOCIETES"

export const useSociete = defineStore('societe', {
    state: () => ({
        societe: [] as Societe[]
      }),
  actions: {
    async fetchSociete() {
      try { 
        const response = await api.get(EndPoint);
        this.societe = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des societes', error);
        throw error;
      }
    },
    async createSociete(data : object) {
      try { 
        const response = await api.post(EndPoint, data);
        this.societe = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la création des societes', error);
        throw error;
      }
    },
    async updateSociete(id : number,data : object) {
      try { 
        const response = await api.put(EndPoint+"/"+id, data);
        this.societe = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la mis à jour des societes', error);
        throw error;
      }
    },
    async deleteSociete(id : number) {
      try { 
        const response = await api.delete(EndPoint+"/"+id);
        this.societe = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la suppresion des societes', error);
        throw error;
      }
    },
  },
});