import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import {type Souscription} from "@/model/souscription"
const EndPoint = "/sogeacongo/v1//SOUSCRIPTIONS_LISTE"
const endPointSouscription = "/sogeacongo/v1/SoldeCompte"
const endPointImprime = "/sogeacongo/v1/Imprime_Releve_Compte/"
const endPointEcheance = "/sogeacongo/v1/Versement_Echeance/"


export const useSouscription = defineStore('souscription', {
    state: () => ({
        sousciption: [] as Souscription[]
      }),
  actions: {
    async fetchSouscription() {
    try{
        const response = await api.post(EndPoint,{IDSOUSCRIPTIONS: 0, IDProduit: 0, Annee: 0, IDAutomobiles: 0, IDProprietaire: 0});
        this.sousciption = response.data
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des souscriptions', error);
        throw error;
      }
    },
    async fetchSolde(data : Object) {
        try{
            const response = await api.post(endPointSouscription,data)
            return response.data; 
          } catch (error) {
            console.error('Erreur lors de la recuperation des solde', error);
            throw error;
          }
        },
    async Imprime(id : number, data : Object) {
        try{
            const response = await api.post(endPointImprime+id,data)
            return response.data; 
            } catch (error) {
            console.error('Erreur lors de l\'impression', error);
            throw error;
            }
    },
    async createEcheance(montant : number, id: number, data : Object) {
        try{
            const response = await api.post(endPointEcheance+montant+"/"+id,data)
            return response.data; 
            } catch (error) {
            console.error('Erreur lors de l\'echeance', error);
            throw error;
            }
    }
}});