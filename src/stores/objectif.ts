import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { Objectif } from '@/model/objectif';
const EndPoint = "/sogeacongo/v1/STATISTIQUES_Get_State_Objectif"
const EndPointCreate = "/sogeacongo/v1/OBECTIFS"

export const useObjectif = defineStore('objectif', {
    state: () => ({
        objectif: [] as Objectif[]
      }),
  actions: {
    async fetchObjectif() {
      try { 
        const response = await api.post(EndPoint, { "DateDebut":"20231202", "DateFin":"20231202", "IDSOUSAGENGE":0, "IDDEPARTEMENT":0 });
        this.objectif = response.data.tabObjectif;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des objectifs', error);
        throw error;
      }
    },
    async createObjectif(data : object) {
      try { 
        const response = await api.post(EndPointCreate, data);
        this.objectif = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la création des objectif', error);
        throw error;
      }
    },
    async getOne(id : number) {
      try { 
        const response = await api.get(EndPointCreate+'/'+id);
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation de l\'objectif', error);
        throw error;
      }
    },
    async updateSociete(id : number,data : object) {
      try { 
        const response = await api.put(EndPoint+"/"+id, data);
        this.objectif = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la mis à jour des societes', error);
        throw error;
      }
    },
    async deleteSociete(id : number) {
      try { 
        const response = await api.delete(EndPoint+"/"+id);
        this.objectif = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la suppresion des societes', error);
        throw error;
      }
    },
  },
});