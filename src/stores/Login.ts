import { defineStore } from 'pinia';
import { api } from "../axios/index";
import type { Login } from '@/model/login';
import type {LoginProprietaire} from "@/model/loginProprietaire"
const EndPoint = "/sogeacongo/v1/DemandeConnexion"
const EnPointProprietaire = "/sogeacongo/v1/PROPRIETAIRE_Demande_Connexion"

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
    async loginPropiretaire(payload: LoginProprietaire) {
    
      try { 
        const response = await api.post(EnPointProprietaire, payload);
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la connexion', error);
        throw error;
      }
    },
  },
  
});