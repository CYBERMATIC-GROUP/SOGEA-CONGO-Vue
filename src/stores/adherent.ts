import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { Proprietaire } from '@/model/proprietaire';
const EndPoint = "/sogeacongo/v1/Propietaire"

export const useAdherent = defineStore('adherent', {
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
    async createAdherent(data: object) {
    try{
        const response = await api.post(EndPoint, data);
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la création de l\'adherent', error);
        throw error;
      }
    },
    async UpdateAdherent(data: object, id:number) {
      try{
          const response = await api.put(EndPoint+"/"+id, data);
          return response.data; 
        } catch (error) {
          console.error('Erreur lors de la modification de l\'adherent', error);
          throw error;
        }
      },
      async DeleteAdherent(id: number) {
        try{
            const response = await api.delete(EndPoint+"/"+id);
            return response.data; 
          } catch (error) {
            console.error('Erreur lors de la suppresionn de l\'adherent', error);
            throw error;
          }
        },
  },
});