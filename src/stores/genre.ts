import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { Genre } from '@/model/genre';
const EndPoint = "/sogeacongo/v1/Genre"

export const useGenre = defineStore('genre', {
    state: () => ({
      genre: [] as Genre[]
      }),
  actions: {
    async fetchGenre() {
      try { 
        const response = await api.get(EndPoint);
        this.genre = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des genres', error);
        throw error;
      }
    },
  },
});