import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type {Nationalite} from "@/model/nationalite"
const EndPoint = "/sogeacongo/v1/Nationalite"


export const useNationalite= defineStore('nationalite', {
    state: () => ({
        nationalite: [] as Nationalite[]
      }),
  actions: {
    async fetchNationalite() {
      try { 
        const response = await api.get(EndPoint);
        this.nationalite = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des nationalites', error);
        throw error;
      }
    },
    async createNationalite(data : object) {
      try { 
        const response = await api.post(EndPoint, data);
       
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la création des nationalites', error);
        throw error;
      }
    },
    async updateNationalite(id : number,data : object) {
      try { 
        const response = await api.put(EndPoint+"/"+id, data);
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la mis à jour des nationalites', error);
        throw error;
      }
    },
    async deleteNationalite(id : number) {
      try { 
        const response = await api.delete(EndPoint+"/"+id);
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la suppresion des nationalites', error);
        throw error;
      }
    },
  },
});