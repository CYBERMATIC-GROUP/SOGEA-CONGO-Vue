import { defineStore } from 'pinia';
import { api } from "../axios/axios";
import type { Agent } from '@/model/agent';
const EndPoint = "/sogeacongo/v1/Agents"
const endpointPhoto = "/sogeacongo/v1/PHOTO_Get_Photo_Agent/"

export const useAgent= defineStore('agent', {
    state: () => ({
        agent: [] as Agent[]
      }),
  actions: {
    async photoAgent(id : number) {
      try { 
        const response = await api.get(endpointPhoto+id);
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation de la photo de l\'agent', error);
        throw error;
      }
    },
    async fetchAgent() {
      try { 
        const response = await api.get(EndPoint);
        this.agent = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation des agents', error);
        throw error;
      }
    },
    async getOne(id: number) {
      try { 
        const response = await api.get(EndPoint+'/'+id);
        this.agent = response.data;
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la recuperation de l\'agents', error);
        throw error;
      }
    },
    async createAgent(data : object) {
      try { 
        const response = await api.post(EndPoint, data);
       
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la création des agents', error);
        throw error;
      }
    },
    async updateAgent(id : number,data : object) {
      try { 
        const response = await api.put(EndPoint+"/"+id, data);
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la mis à jour des agents', error);
        throw error;
      }
    },
    async deleteAgent(id : number) {
      try { 
        const response = await api.delete(EndPoint+"/"+id);
        return response.data; 
      } catch (error) {
        console.error('Erreur lors de la suppresion des agents', error);
        throw error;
      }
    },
  },
});