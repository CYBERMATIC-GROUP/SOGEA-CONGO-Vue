import { defineStore } from 'pinia';
import { api } from "../axios/index";
import type { Login } from '@/model/login';
const EndPoint = "/sogeacongo/v1/DemandeConnexion"

export const useLoginStore = defineStore('login', {
  actions: {
    async login(payload: Login) {
      try { 
        const response = await api.post(EndPoint+"/"+payload.login+"/"+payload.motDePasse, payload);
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la connexion', error);
        throw error;
      }
    },
  },
});