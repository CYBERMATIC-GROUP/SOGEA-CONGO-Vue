import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { Station } from '@/model/stations';
const EndPoint = "/sogeacongo/v1/STATIONS"

export const useStation= defineStore('station', {
    state: () => ({
        station: [] as Station[]
      }),
  actions: {
    async fetchStation() {
      try { 
        const response = await api.get(EndPoint);
        this.station = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des stations', error);
        throw error;
      }
    },
    async createStation(data : object) {
      try { 
        const response = await api.post(EndPoint, data);
        this.station = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la création des stations', error);
        throw error;
      }
    },
    async updateStation(id : number,data : object) {
      try { 
        const response = await api.put(EndPoint+"/"+id, data);
        this.station = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la mis à jour des stations', error);
        throw error;
      }
    },
    async deleteStation(id : number) {
      try { 
        const response = await api.delete(EndPoint+"/"+id);
        this.station = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la suppresion des stations', error);
        throw error;
      }
    },
  },
});