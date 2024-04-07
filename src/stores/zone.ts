import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { Zone } from '@/model/zone';
const EndPoint = "/sogeacongo/v1/Zone"

export const useZone = defineStore('zone', {
    state: () => ({
        zone: [] as Zone[],
      }),
  actions: {
    async fetchZone() {
      try { 
        const response = await api.get(EndPoint);
        this.zone = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des zones', error);
        throw error;
      }
    },
  },
});