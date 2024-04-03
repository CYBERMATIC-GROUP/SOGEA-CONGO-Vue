import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { PointDeVente } from '@/model/pointDeVente';
const EndPoint = "/sogeacongo/v1/StationPointVenteGetListe"
const endPointVente = "/sogeacongo/v1/StationPointVente"


export const usePointDeVente= defineStore('pointDeVente', {
    state: () => ({
        pointDeVente: [] as PointDeVente[]
      }),
  actions: {
    async fetchPointDeVente(data: Object) {
      try { 
        const response = await api.post(EndPoint, data);
        this.pointDeVente = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des points de vente', error);
        throw error;
      }
    },
    async createPointDeVente(data : object) {
      try { 
        const response = await api.post(endPointVente, data);
       
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la création des points de vente', error);
        throw error;
      }
    },
    async updatePointDeVente(id : number,data : object) {
      try { 
        const response = await api.put(endPointVente+"/"+id, data);
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la mis à jour des points de vente', error);
        throw error;
      }
    },
    async deletePointDeVente(id : number) {
      try { 
        const response = await api.delete(endPointVente+"/"+id);
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la suppresion des points de vente', error);
        throw error;
      }
    },
  },
});