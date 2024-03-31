import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import {type ParametreGeneral} from "@/model/parametreGenerale"
const EndPoint = "/sogeacongo/v1/ClaculAmortissementCredit/"
const EndPointSouscription = "/sogeacongo/v1/NouvelleSouscription/"

export const useCalcul = defineStore('calcul', {
    state: () => ({
        parametreGeneral: {} as ParametreGeneral
      }),
  actions: {
    async CalculAmortissement(produitId: number, date:string,etat:number,idAutimobile:number,data: object) {
    try{
        const response = await api.post(EndPoint+produitId+"/"+date+"/"+etat+"/"+idAutimobile, data);
        this.parametreGeneral = response.data.ParametreGeneral
        return response.data; 
      } catch (error) {
        console.error('Erreur lors du Calcul Amortissement', error);
        throw error;
      }
    },

    async CalculSouscription(produitId: number, date:string,etat:number,idAutimobile:number,data: object) {
      try{
          const response = await api.post(EndPointSouscription+produitId+"/"+date+"/"+etat+"/"+idAutimobile, data);
          this.parametreGeneral = response.data.ParametreGeneral
          return response.data; 
        } catch (error) {
          console.error('Erreur lors creation de la souscription', error);
          throw error;
        }
      },
}
});