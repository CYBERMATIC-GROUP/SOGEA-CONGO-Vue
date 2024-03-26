import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type {Automobile} from "@/model/automobile"
const EndPoint = "/sogeacongo/v1/Automobiles"
const EndPointRecuperation = "/sogeacongo/v1/AutomobilesGetListe"

export const useAutomobile = defineStore('automobile', {
  state: () => ({
    automobile: [] as Automobile[]
  }),
  actions: {
    async fetchAutomobile(data : object) {
      try { 
        const response = await api.post(EndPointRecuperation, data);
        this.automobile = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des automobile', error);
        throw error;
      }
    },
    async createAutomobile(data: object) {
    try{
        const response = await api.post(EndPoint, data);
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la création de l\'autombile', error);
        throw error;
      }
    },
    async UpdateAutomobile(data: object, id:number) {
      try{
          const response = await api.put(EndPoint+"/"+id, data);
          return response.data; 
        } catch (error) {
          console.error('Erreur lors de la modification de l\'automiblie', error);
          throw error;
        }
      },
      async DeleteAutomobile(id: number) {
        try{
            const response = await api.delete(EndPoint+"/"+id);
            return response.data; 
          } catch (error) {
            console.error('Erreur lors de la suppresionn de l\'automiblie', error);
            throw error;
          }
        },
  },
});