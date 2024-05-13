import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import {type Souscription} from "@/model/souscription"
const EndPoint = "/sogeacongo/v1//SOUSCRIPTIONS_LISTE"
const endPointSouscription = "/sogeacongo/v1/SoldeCompte"
const endPointImprime = "/sogeacongo/v1/Imprime_Releve_Compte/"
const endPointEcheance = "/sogeacongo/v1/Versement_Echeance/"
const endPointImprimeViniette = "/sogeacongo/v1/Imprime_Viniette_Recto/"
const endPointSouscriptionAutomobile = "/sogeacongo/v1/Automobiles_Get_Solde/"
const endPointPayement = "/sogeacongo/v1/MOBILE_MONEY_Demande_Paiement"
const endPointVerifie = "/sogeacongo/v1/MOBILE_MONEY_Verifie_Statut_Transaction"

export const useSouscription = defineStore('souscription', {
    state: () => ({
        sousciption: [] as Souscription[]
      }),
  actions: {
    async fetchSouscriptionAutombile(idAutombile: number) {
      try{
          const response = await api.get(endPointSouscriptionAutomobile+idAutombile);
          return response.data; 
        } catch (error) {
          console.error('Erreur lors de la recuperation des souscriptions', error);
          throw error;
        }
      },
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
    async PayementSouscription(data : Object) {
      try{
          const response = await api.post(endPointPayement,data)
          return response.data; 
        } catch (error) {
          console.error('Erreur lors du payement des solde', error);
          throw error;
        }
      },
      async PayementVerifie(data : Object) {
        try{
            const response = await api.post(endPointVerifie,data)
            return response.data; 
          } catch (error) {
            console.error('Erreur lors de la verification', error);
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
    },
    async fetchImprime(IDSOUSCRIPTIONS : number) {
      try{
          const response = await api.get(endPointImprimeViniette+IDSOUSCRIPTIONS);
          this.sousciption = response.data
          return response.data; 
        } catch (error) {
          console.error('Erreur lors de l\'impression', error);
          throw error;
        }
      },
}});