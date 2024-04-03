import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type {Ville} from "@/model/ville"
const EndPoint = "/sogeacongo/v1/Ville"

export const useVille= defineStore('ville', {
    state: () => ({
        ville: [] as Ville[]
      }),
  actions: {
    async fetchVille() {
      try { 
        const response = await api.get(EndPoint);
        this.ville = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des villes', error);
        throw error;
      }
    },
    async createVille(data : object) {
      try { 
        const response = await api.post(EndPoint, data);
       
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la création des villes', error);
        throw error;
      }
    },
    async updateVille(id : number,data : object) {
      try { 
        const response = await api.put(EndPoint+"/"+id, data);
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la mis à jour des villes', error);
        throw error;
      }
    },
    async deleteVille(id : number) {
      try { 
        const response = await api.delete(EndPoint+"/"+id);
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la suppresion des villes', error);
        throw error;
      }
    },
  },
});