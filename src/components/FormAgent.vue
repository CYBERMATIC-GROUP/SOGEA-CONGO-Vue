<template>
  <form @submit.prevent="onSubmit">
    <Tabs default-value="Informations Générales" class="pt-2">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="Informations Générales">
          Informations Générales
        </TabsTrigger>
        <TabsTrigger value="Droits d'utilisations">
          Droits d'utilisations
        </TabsTrigger>
      </TabsList>
      <div class="overflow-y-auto">
        <TabsContent value="Informations Générales" class="h-[52vh]">
          <div class="flex flex-row justify-between px-5 border">
            <div class="flex pt-5 w-[25rem] items-center space-x-6 border-r">
              <div class="shrink-0">
                <img
                  :src="previewImg"
                  class="h-16 w-16 object-cover rounded-full"
                  alt="Current profile photo"
                />
              </div>
              <label class="block">
                <span class="sr-only">Choose profile photo</span>
                <InputForm
                  type="file"
                  :readonly="!modif"
                  :cacher="true"
                  @change="loadFile"
                  class="w-[21rem]"
                />
              </label>
            </div>
            <div class="pt-8 flex-1 ps-5 pb-5 flex flex-col space-y-5">
              <div class="w-full">
                <InputForm
                  label="Nom de l'agent"
                  type="text"
                  v-model="Nom"
                  :valid="errors.Nom"
                  v-bind="NomAttrs"
                  id="Nom de l'agent"
                  :readonly="!modif"
                  placeholder="Entrer le nom de l'agent"
                />
                <span class="text-red-color">{{ errors.Nom }}</span>
              </div>

              <div class="w-full">
                <InputForm
                  label="Prénom de l'agent"
                  type="text"
                  v-model="Prenom"
                  :valid="errors.Prenom"
                  v-bind="PrenomAttrs"
                  id="Prénom de l'agent"
                  :readonly="!modif"
                  placeholder="Entrer le prénom de l'agent"
                />
                <span class="text-red-color">{{ errors.Prenom }}</span>
              </div>
              <div class="w-full">
                <InputForm
                  label="Mail de l'agent"
                  type="email"
                  v-model="eMail"
                  :valid="errors.eMail"
                  v-bind="eMailAttrs"
                  id="Mail de l'agent"
                  :readonly="!modif"
                  placeholder="Entrer le Mail de l'agent"
                />
                <span class="text-red-color">{{ errors.eMail }}</span>
              </div>
              <div class="w-full">
                <InputForm
                  label="Civilité"
                  type="select"
                  id="civilité"
                  :readonly="!modif"
                  v-model="Civilite"
                  :valid="errors.Civilite"
                  v-bind="CiviliteAttrs"
                  labelDefaut="Sélectionné la civilité"
                  :options="[
                    { value: '1', label: 'Homme' },
                    {
                      value: '2',
                      label: 'Femme',
                    },
                  ]"
                />
                <span class="text-red-color">{{ errors.Civilite }}</span>
              </div>
              <div class="w-full">
                <InputForm
                  label="Teléphone Portable"
                  type="tel"
                  id="Teléphone Portable"
                  :readonly="!modif"
                  v-model="TelPortable"
                  :valid="errors.TelPortable"
                  v-bind="TelPortableAttrs"
                  placeholder="Entrer le téléphone portable"
                />
                <span class="text-red-color">{{ errors.TelPortable }}</span>
              </div>
            </div>
          </div>

          <div class="pt-8 flex flex-row justify-between space-x-5">
            <div class="w-full">
              <InputForm
                label="Telephone Fixe de l'agent"
                type="tel"
                id="Telephone Fixe de l'agent"
                :readonly="!modif"
                v-model="TelFixe"
                :valid="errors.TelFixe"
                v-bind="TelFixeAttrs"
                :cacher="true"
                placeholder="Entrer le numéro Telephone Fixe de l'agent"
              />
              <span class="text-red-color">{{ errors.TelFixe }}</span>
            </div>
            <div class="w-full">
              <InputForm
                label="Adresse de l'agent "
                type="text"
                id="Adresse de l'agent"
                v-model="Adresse"
                :valid="errors.Adresse"
                v-bind="AdresseAttrs"
                :readonly="!modif"
                placeholder="Entrer le numéro Adresse de l'agent "
              />
              <span class="text-red-color">{{ errors.Adresse }}</span>
            </div>
            <div class="w-full">
              <InputForm
                label="Date de naissance de l'agent"
                type="date"
                id="Date de naissance de l'agent"
                :readonly="!modif"
                v-model="DateNaissance"
                :valid="errors.DateNaissance"
                v-bind="DateNaissanceAttrs"
                placeholder="Entrer le Date de naissance de l'agent"
              />
              <span class="text-red-color">{{ errors.DateNaissance }}</span>
            </div>
          </div>

          <div class="pt-8 flex flex-row justify-between space-x-5">
            <div class="w-full">
              <InputForm
                label="Lieu de naissance de l'agent "
                type="text"
                v-model="LieuNaissance"
                :valid="errors.LieuNaissance"
                v-bind="LieuNaissanceAttrs"
                id="Lieu de naissance de l'agent "
                :readonly="!modif"
                placeholder="Entrer le Lieu de naissance de l'agent "
              />
              <span class="text-red-color">{{ errors.LieuNaissance }}</span>
            </div>
            <div class="w-full">
              <InputForm
                label="Fonction de l'agent"
                type="select"
                id="Fonction de l'agent"
                :readonly="!modif"
                v-model="IDFonction_agent"
                :valid="errors.IDFonction_agent"
                v-bind="IDFonction_agentAttrs"
                labelDefaut="Sélectionné la fonction"
                :options="[
                  { value: '1', label: 'Caissier' },
                  {
                    value: '2',
                    label: 'administrateur',
                  },
                  {
                    value: '3',
                    label: 'secretaire',
                  },
                ]"
              />
              <span class="text-red-color">{{ errors.IDFonction_agent }}</span>
            </div>
            <div class="w-full">
              <InputForm
                label="Ville"
                type="select"
                id="ville"
                :readonly="!modif"
                v-model="IDville"
                :valid="errors.IDville"
                v-bind="IDvilleAttrs"
                labelDefaut="Sélectionné le département"
                :options="optionsVille"
              />
              <span class="text-red-color">{{ errors.IDville }}</span>
            </div>
          </div>
          <div class="pt-8 flex flex-row justify-between space-x-5">
            <div class="w-full">
              <InputForm
                label="Nationalité"
                type="select"
                id="Nationalite"
                :readonly="!modif"
                v-model="Nationalite"
                :valid="errors.Nationalite"
                v-bind="NationaliteAttrs"
                labelDefaut="Sélectionné la nationalité"
                :options="optionsNationalite"
              />
              <span class="text-red-color">{{ errors.Nationalite }}</span>
            </div>
            <div class="w-full">
              <InputForm
                label="Salaire de base de l'agent"
                type="number"
                id="Salaire de base de l'agent"
                :readonly="!modif"
                v-model="SalaireBase"
                :valid="errors.SalaireBase"
                :cacher="true"
                v-bind="SalaireBaseAttrs"
                placeholder="Entrer le Salaire de base de l'agent"
              />
              <span class="text-red-color">{{ errors.SalaireBase }}</span>
            </div>
            <div class="w-full">
              <InputForm
                label="Num. compte bancaire de l'agent"
                type="number"
                v-model="NumCompteBancaire"
                :valid="errors.NumCompteBancaire"
                v-bind="NumCompteBancaireAttrs"
                :cacher="true"
                id="Num. compte bancaire de l'agent"
                :readonly="!modif"
                placeholder="Entrer le Num. compte bancaire de l'agent"
              />
              <span class="text-red-color">{{ errors.NumCompteBancaire }}</span>
            </div>
          </div>
          <div class="pt-8 flex flex-row justify-between space-x-5">
            <div class="w-full">
              <InputForm
                label="Num. sécurité sociale de l'agent"
                type="number"
                id="Num. sécurité sociale de l'agent"
                :readonly="!modif"
                v-model="NumSecuriteSocial"
                :valid="errors.NumSecuriteSocial"
                v-bind="NumSecuriteSocialAttrs"
                :cacher="true"
                placeholder="Entrer le Num. sécurité sociale de l'agent"
              />
              <span class="text-red-color">{{ errors.NumSecuriteSocial }}</span>
            </div>
            <div class="w-full">
              <InputForm
                label="Nombre de parts impot de l'agent"
                type="tel"
                id="Nombre de parts impot de l'agent"
                :readonly="!modif"
                v-model="NombrePartsImpot"
                :valid="errors.NombrePartsImpot"
                v-bind="NombrePartsImpotAttrs"
                :cacher="true"
                placeholder="Entrer le Nombre de parts impot de l'agent"
              />
              <span class="text-red-color">{{ errors.NombrePartsImpot }}</span>
            </div>
            <div class="w-full">
              <InputForm
                label="Compte de l'agent"
                type="text"
                id="Compte de l'agent"
                :readonly="!modif"
                v-model="IDCOMPTE"
                :valid="errors.IDCOMPTE"
                v-bind="IDCOMPTEAttrs"
                :cacher="true"
                placeholder="Entrer le Compte de l'agent"
              />
              <span class="text-red-color">{{ errors.IDCOMPTE }}</span>
            </div>
          </div>
          <div class="pt-8 flex flex-row justify-between space-x-5">
            <div class="w-full">
              <InputForm
                label="Nombre d'enfants de l'agent"
                type="number"
                id="Nombre d'enfants de l'agent"
                :readonly="!modif"
                v-model="NombreEnfants"
                :valid="errors.NombreEnfants"
                v-bind="NombreEnfantsAttrs"
                :cacher="true"
                placeholder="Entrer le numéro Nombre d'enfants de l'agent"
              />
              <span class="text-red-color">{{ errors.NombreEnfants }}</span>
            </div>
            <div class="w-full">
              <InputForm
                label="Situation familiale"
                type="select"
                id="familiale"
                :readonly="!modif"
                v-model="SituationFamiliale"
                :valid="errors.SituationFamiliale"
                v-bind="SituationFamilialeAttrs"
                labelDefaut="Sélectionné la situation familiale"
                :options="[
                  { value: '1', label: 'Divorcé(e)' },
                  {
                    value: '2',
                    label: 'Marié(e)',
                  },
                  { value: '3', label: 'Celibataire' },
                  {
                    value: '4',
                    label: 'Veuf(ve)',
                  },
                ]"
              />
              <span class="text-red-color">{{
                errors.SituationFamiliale
              }}</span>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="Droits d'utilisations">
          <div class="pt-8 flex flex-row justify-between space-x-5">
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                id="bDroitRealiserControle"
                :readonly="!modif"
                v-model="bDroitRealiserControle"
                v-bind="bDroitRealiserControleAttrs"
                type="checkbox"
              />
              <label
                for="bDroitRealiserControle"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Droit Réaliser Controle</label
              >
            </div>
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                id="bDroitEncaisser"
                v-model="bDroitEncaisser"
                v-bind="bDroitEncaisserAttrs"
                :readonly="!modif"
                type="checkbox"
              />
              <label
                for="bDroitEncaisser"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Droit Encaisser</label
              >
            </div>
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                id="bDroitGererCaisse"
                v-model="bDroitGererCaisse"
                v-bind="bDroitGererCaisseAttrs"
                :readonly="!modif"
                type="checkbox"
              />
              <label
                for="bDroitGererCaisse"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Droit Gerer Caisse</label
              >
            </div>
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                id="bAjouterTypeAutomobile"
                :readonly="!modif"
                type="checkbox"
                v-model="bAjouterTypeAutomobile"
                v-bind="bAjouterTypeAutomobileAttrs"
              />
              <label
                for="bAjouterTypeAutomobile"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Ajouter Type Automobile</label
              >
            </div>
          </div>
          <div class="pt-8 flex flex-row justify-between space-x-5">
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                id="bDroitAjouterAotomobile"
                :readonly="!modif"
                type="checkbox"
                v-model="bDroitAjouterAotomobile"
                v-bind="bDroitAjouterAotomobileAttrs"
              />
              <label
                for="bDroitAjouterAotomobile"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Droit Ajouter Automobile</label
              >
            </div>
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                id="bDroitSupprimerEcriture"
                :readonly="!modif"
                type="checkbox"
                v-model="bDroitSupprimerEcriture"
                v-bind="bDroitSupprimerEcritureAttrs"
              />
              <label
                for="bDroitSupprimerEcriture"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Droit Supprimer Ecriture</label
              >
            </div>
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                id="bDroitGererProduitAssurence"
                :readonly="!modif"
                type="checkbox"
                v-model="bDroitGererProduitAssurence"
                v-bind="bDroitGererProduitAssurenceAttrs"
              />
              <label
                for="bDroitGererProduitAssurence"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Droit Gerer Produit Assurence</label
              >
            </div>
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                id="bEstAdministrateurProduitsAssurences"
                :readonly="!modif"
                type="checkbox"
                v-model="bEstAdministrateurProduitsAssurences"
                v-bind="bEstAdministrateurProduitsAssurencesAttrs"
              />
              <label
                for="bEstAdministrateurProduitsAssurences"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Admin Produits Assurences</label
              >
            </div>
          </div>
          <div class="pt-8 flex flex-row justify-between space-x-5">
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                v-model="bDroitGererAgents"
                v-bind="bDroitGererAgentsAttrs"
                id="bDroitGererAgents"
                :readonly="!modif"
                type="checkbox"
              />
              <label
                for="bDroitGererAgents"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Droit Gerer Agents</label
              >
            </div>
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                id="bDroitImprimerStatistiques"
                :readonly="!modif"
                type="checkbox"
                v-model="bDroitImprimerStatistiques"
                v-bind="bDroitImprimerStatistiquesAttrs"
              />
              <label
                for="bDroitImprimerStatistiques"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Droit Imprimer Statistiques</label
              >
            </div>
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                id="bDroitGererProduitsControleTechniques"
                :readonly="!modif"
                type="checkbox"
                v-model="bDroitGererProduitsControleTechniques"
                v-bind="bDroitGererProduitsControleTechniquesAttrs"
              />
              <label
                for="bDroitGererProduitsControleTechniques"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Produits Controle Techniques</label
              >
            </div>
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                id="bDroitImprimerVignette"
                :readonly="!modif"
                type="checkbox"
                v-model="bDroitImprimerVignette"
                v-bind="bDroitImprimerVignetteAttrs"
              />
              <label
                for="bDroitImprimerVignette"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Droit Imprimer Vignette</label
              >
            </div>
          </div>
          <div class="pt-8 flex flex-row justify-between space-x-5">
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                v-model="bDateExpiration"
                v-bind="bDateExpirationAttrs"
                id="bDateExpiration"
                :readonly="!modif"
                type="checkbox"
              />
              <label
                for="bDateExpiration"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Date Expiration</label
              >
            </div>
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                id="bDroitValiderCommande"
                :readonly="!modif"
                type="checkbox"
                v-model="bDroitValiderCommande"
                v-bind="bDroitValiderCommandeAttrs"
              />
              <label
                for="bDroitValiderCommande"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Droit Valider Commande</label
              >
            </div>
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                v-model="bAdminidtrateur"
                v-bind="bAdminidtrateurAttrs"
                id="bAdminidtrateur"
                :readonly="!modif"
                type="checkbox"
              />
              <label
                for="bAdminidtrateur"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Administrateur</label
              >
            </div>
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                v-model="bdroitAjouterAgent"
                v-bind="bdroitAjouterAgentAttrs"
                id="bdroitAjouterAgent"
                :readonly="!modif"
                type="checkbox"
              />
              <label
                for="bdroitAjouterAgent"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Droit Ajouter Agent</label
              >
            </div>
          </div>
          <div class="pt-8 flex flex-row justify-between space-x-5">
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                id="bDroitImprimerContrat"
                :readonly="!modif"
                type="checkbox"
                v-model="bDroitImprimerContrat"
                v-bind="bDroitImprimerContratAttrs"
              />
              <label
                for="bDroitImprimerContrat"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Droit Imprimer Contrat</label
              >
            </div>
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                v-model="bSuperUtilisateur"
                v-bind="bSuperUtilisateurAttrs"
                id="bSuperUtilisateur"
                :readonly="!modif"
                type="checkbox"
              />
              <label
                for="bSuperUtilisateur"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Super Utilisateur</label
              >
            </div>
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                v-model="bCompteActif"
                v-bind="bCompteActifAttrs"
                id="bCompteActif"
                :readonly="!modif"
                type="checkbox"
              />
              <label
                for="bCompteActif"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Compte Actif</label
              >
            </div>
            <div class="w-full flex flex-row space-x-2 items-center">
              <input
                id="bDroitAjouterProduit"
                :readonly="!modif"
                type="checkbox"
                v-model="bDroitAjouterProduit"
                v-bind="bDroitAjouterProduitAttrs"
              />
              <label
                for="bDroitAjouterProduit"
                class="mb-1 pt-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500"
                >Droit Ajouter Produit</label
              >
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>

    <div v-if="!modif" class="flex justify-center mt-5 space-x-5">
      <Button @click="Modifier" type="button" class="w-full bg-bg-primary"
        >Modifier</Button
      >
    </div>
    <div v-else class="flex justify-center mt-5">
      <Button
        :loading="loading"
        :disabled="loading"
        essai
        type="submit"
        class="w-full bg-bg-primary"
        >Valider</Button
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import { Button } from "./ui/button";
import InputForm from "../components/inputForm.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { onMounted } from "vue";
import { useDepartement } from "../stores/departement";
import { useRessource } from "../stores/ressource";
import { ref, watch } from "vue";
import { useAdherent } from "../stores/adherent";
import { getSuccess, getError } from "../common/notification";
import router from "@/router";
import { useSociete } from "@/stores/societe";
import { defineEmits } from "vue";
import { useSousAgence } from "../stores/sousAgence";
import { useStation } from "@/stores/stations";
import TextAndSelect from "@/components/ui/TextAndSelect.vue";
import { usePointDeVente } from "../stores/pointDeVente";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import profileImg from "../assets/img/profile.png";
import { useVille } from "../stores/ville";
import { useNationalite } from "../stores/nationalite";
import { useAgent } from "../stores/agent";

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    bDroitRealiserControle: yup.bool(),
    bDroitEncaisser: yup.bool(),
    bDroitGererCaisse: yup.bool(),
    bAjouterTypeAutomobile: yup.bool(),
    bDroitAjouterAotomobile: yup.bool(),
    bDroitSupprimerEcriture: yup.bool(),
    bDroitGererProduitAssurence: yup.bool(),
    bEstAdministrateurProduitsAssurences: yup.bool(),
    bDroitGererAgents: yup.bool(),
    bDroitImprimerStatistiques: yup.bool(),
    bDroitGererProduitsControleTechniques: yup.bool(),
    bDroitImprimerVignette: yup.bool(),
    bDateExpiration: yup.bool(),
    bDroitValiderCommande: yup.bool(),
    bAdminidtrateur: yup.bool(),
    bdroitAjouterAgent: yup.bool(),
    bDroitImprimerContrat: yup.bool(),
    bSuperUtilisateur: yup.bool(),
    bCompteActif: yup.bool(),
    bDroitAjouterProduit: yup.bool(),
    Nom: yup.string().required("Veuillez saisir votre nom."),
    Prenom: yup.string().required("Veuillez saisir votre prénom."),
    eMail: yup.string().required("Veuillez saisir votre e-mail."),
    Civilite: yup.string().required("Veuillez sélectionner votre civilité."),
    TelPortable: yup
      .string()
      .required("Veuillez saisir votre téléphone portable."),
    TelFixe: yup.string(),
    Adresse: yup.string().required("Veuillez saisir votre adresse."),
    DateNaissance: yup
      .string()
      .required("Veuillez saisir votre date de naissance."),
    LieuNaissance: yup
      .string()
      .required("Veuillez saisir votre lieu de naissance."),
    IDFonction_agent: yup.string().required("Veuillez saisir votre fonction."),
    IDville: yup.string().required("Veuillez saisir votre ville."),
    Nationalite: yup.string().required("Veuillez saisir votre nationalité."),
    SalaireBase: yup.string(),
    NumCompteBancaire: yup.string(),
    NumSecuriteSocial: yup.string(),
    NombrePartsImpot: yup.string(),
    IDCOMPTE: yup.string(),
    NombreEnfants: yup.string(),
    SituationFamiliale: yup
      .string()
      .required("Veuillez sélectionner votre situation familiale."),
  }),
});

const previewImg = ref(profileImg);
const previewImgData = ref<string>("");

const loadFile = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      previewImgData.value = reader.result as string;
      previewImg.value = reader.result as string;
    };

    reader.readAsDataURL(file); // Lire le contenu du fichier en tant que base64
  }
};

const [Nom, NomAttrs] = defineField("Nom");
const [Prenom, PrenomAttrs] = defineField("Prenom");
const [eMail, eMailAttrs] = defineField("eMail");
const [Civilite, CiviliteAttrs] = defineField("Civilite");
const [TelPortable, TelPortableAttrs] = defineField("TelPortable");
const [TelFixe, TelFixeAttrs] = defineField("TelFixe");
const [Adresse, AdresseAttrs] = defineField("Adresse");
const [DateNaissance, DateNaissanceAttrs] = defineField("DateNaissance");
const [LieuNaissance, LieuNaissanceAttrs] = defineField("LieuNaissance");
const [IDFonction_agent, IDFonction_agentAttrs] =
  defineField("IDFonction_agent");
const [IDville, IDvilleAttrs] = defineField("IDville");
const [Nationalite, NationaliteAttrs] = defineField("Nationalite");
const [SalaireBase, SalaireBaseAttrs] = defineField("SalaireBase");
const [NumCompteBancaire, NumCompteBancaireAttrs] =
  defineField("NumCompteBancaire");
const [NumSecuriteSocial, NumSecuriteSocialAttrs] =
  defineField("NumSecuriteSocial");
const [NombrePartsImpot, NombrePartsImpotAttrs] =
  defineField("NombrePartsImpot");
const [IDCOMPTE, IDCOMPTEAttrs] = defineField("IDCOMPTE");
const [NombreEnfants, NombreEnfantsAttrs] = defineField("NombreEnfants");
const [SituationFamiliale, SituationFamilialeAttrs] =
  defineField("SituationFamiliale");

const [bDroitRealiserControle, bDroitRealiserControleAttrs] = defineField(
  "bDroitRealiserControle"
);
const [bDroitEncaisser, bDroitEncaisserAttrs] = defineField("bDroitEncaisser");
const [bDroitGererCaisse, bDroitGererCaisseAttrs] =
  defineField("bDroitGererCaisse");
const [bAjouterTypeAutomobile, bAjouterTypeAutomobileAttrs] = defineField(
  "bAjouterTypeAutomobile"
);
const [bDroitAjouterAotomobile, bDroitAjouterAotomobileAttrs] = defineField(
  "bDroitAjouterAotomobile"
);
const [bDroitSupprimerEcriture, bDroitSupprimerEcritureAttrs] = defineField(
  "bDroitSupprimerEcriture"
);
const [bDroitGererProduitAssurence, bDroitGererProduitAssurenceAttrs] =
  defineField("bDroitGererProduitAssurence");
const [
  bEstAdministrateurProduitsAssurences,
  bEstAdministrateurProduitsAssurencesAttrs,
] = defineField("bEstAdministrateurProduitsAssurences");
const [bDroitGererAgents, bDroitGererAgentsAttrs] =
  defineField("bDroitGererAgents");
const [bDroitImprimerStatistiques, bDroitImprimerStatistiquesAttrs] =
  defineField("bDroitImprimerStatistiques");
const [
  bDroitGererProduitsControleTechniques,
  bDroitGererProduitsControleTechniquesAttrs,
] = defineField("bDroitGererProduitsControleTechniques");
const [bDroitImprimerVignette, bDroitImprimerVignetteAttrs] = defineField(
  "bDroitImprimerVignette"
);
const [bDateExpiration, bDateExpirationAttrs] = defineField("bDateExpiration");
const [bDroitValiderCommande, bDroitValiderCommandeAttrs] = defineField(
  "bDroitValiderCommande"
);
const [bAdminidtrateur, bAdminidtrateurAttrs] = defineField("bAdminidtrateur");
const [bdroitAjouterAgent, bdroitAjouterAgentAttrs] =
  defineField("bdroitAjouterAgent");
const [bDroitImprimerContrat, bDroitImprimerContratAttrs] = defineField(
  "bDroitImprimerContrat"
);
const [bSuperUtilisateur, bSuperUtilisateurAttrs] =
  defineField("bSuperUtilisateur");
const [bCompteActif, bCompteActifAttrs] = defineField("bCompteActif");
const [bDroitAjouterProduit, bDroitAjouterProduitAttrs] = defineField(
  "bDroitAjouterProduit"
);

const getStation = useStation();

interface Option {
  value: number;
  label: string;
}

const optionsStation = ref<Option[]>([]);
const getVille = useVille();
const getNationalite = useNationalite();
const getArrondissement = useRessource();
const getPointDeVente = usePointDeVente();
const optionsVille = ref<Option[]>([]);
const optionsNationalite = ref<Option[]>([]);
const optionsArrondissement = ref<Option[]>([]);
const optionsQuartier = ref<Option[]>([]);
const getAgent = useAgent();

onMounted(async () => {
  await getVille.fetchVille();
  optionsVille.value = getVille.ville.map((item) => ({
    value: item.IDville,
    label: item.Libele,
  }));
  await getNationalite.fetchNationalite();
  optionsNationalite.value = getNationalite.nationalite.map((item) => ({
    value: item.IDNationalite,
    label: item.LibNationalite,
  }));
});

const { values, update } = defineProps(["values", "update"]);

const emits = defineEmits(["RefrehFunction", "updateopenUpdate"]);
const loading = ref(false);

const updateopenUpdate = (data: any) => {
  emits("updateopenUpdate", data);
};
const RefrehFunction = async () => {
  emits("RefrehFunction");
};

const modif = ref(update);

const Modifier = () => {
  modif.value = true;
};

const storageAdherentString = sessionStorage.getItem("objectif");
const IDagent = ref();

if (storageAdherentString !== null && !update) {
  const storageAdherent = JSON.parse(storageAdherentString);
  previewImg.value =
    storageAdherent.Photo == "" ? profileImg : storageAdherent.Photo;
  IDagent.value = storageAdherent.IDagent;
  Nom.value = storageAdherent.Nom;
  Prenom.value = storageAdherent.Prenom;
  eMail.value = storageAdherent.eMail;
  Civilite.value = storageAdherent.Civilite;
  TelPortable.value = storageAdherent.TelPortable;
  TelFixe.value = storageAdherent.TelFixe;
  Adresse.value = storageAdherent.Adresse;
  DateNaissance.value = storageAdherent.DateNaissance;
  LieuNaissance.value = storageAdherent.LieuNaissance;
  IDFonction_agent.value = storageAdherent.IDFonction_agent;
  IDville.value = storageAdherent.IDville;
  Nationalite.value = storageAdherent.Nationalite;
  SalaireBase.value = storageAdherent.SalaireBase;
  NumCompteBancaire.value = storageAdherent.NumCompteBancaire;
  NumSecuriteSocial.value = storageAdherent.NumSecuriteSocial;
  NombrePartsImpot.value = storageAdherent.NombrePartsImpot;
  IDCOMPTE.value = storageAdherent.IDCOMPTE;
  NombreEnfants.value = storageAdherent.NombreEnfants;
  SituationFamiliale.value = storageAdherent.SituationFamiliale;
  bDroitRealiserControle.value = storageAdherent.bDroitRealiserControle;
  bDroitEncaisser.value = storageAdherent.bDroitEncaisser;
  bDroitGererCaisse.value = storageAdherent.bDroitGererCaisse;
  bAjouterTypeAutomobile.value = storageAdherent.bAjouterTypeAutomobile;
  bDroitAjouterAotomobile.value = storageAdherent.bDroitAjouterAotomobile;
  bDroitSupprimerEcriture.value = storageAdherent.bDroitSupprimerEcriture;
  bDroitGererProduitAssurence.value =
    storageAdherent.bDroitGererProduitAssurence;
  bEstAdministrateurProduitsAssurences.value =
    storageAdherent.bEstAdministrateurProduitsAssurences;
  bDroitGererAgents.value = storageAdherent.bDroitGererAgents;
  bDroitImprimerStatistiques.value = storageAdherent.bDroitImprimerStatistiques;
  bDroitGererProduitsControleTechniques.value =
    storageAdherent.bDroitGererProduitsControleTechniques;
  bDroitImprimerVignette.value = storageAdherent.bDroitImprimerVignette;
  bDateExpiration.value = storageAdherent.bDateExpiration;
  bDroitValiderCommande.value = storageAdherent.bDroitValiderCommande;
  bAdminidtrateur.value = storageAdherent.bAdminidtrateur;
  bdroitAjouterAgent.value = storageAdherent.bdroitAjouterAgent;
  bDroitImprimerContrat.value = storageAdherent.bDroitImprimerContrat;
  bSuperUtilisateur.value = storageAdherent.bSuperUtilisateur;
  bCompteActif.value = storageAdherent.bCompteActif;
  bDroitAjouterProduit.value = storageAdherent.bDroitAjouterProduit;
} else {
  bDroitRealiserControle.value = false;
  bDroitEncaisser.value = false;
  bDroitGererCaisse.value = false;
  bAjouterTypeAutomobile.value = false;
  bDroitAjouterAotomobile.value = false;
  bDroitSupprimerEcriture.value = false;
  bDroitGererProduitAssurence.value = false;
  bEstAdministrateurProduitsAssurences.value = false;
  bDroitGererAgents.value = false;
  bDroitImprimerStatistiques.value = false;
  bDroitGererProduitsControleTechniques.value = false;
  bDroitImprimerVignette.value = false;
  bDateExpiration.value = false;
  bDroitValiderCommande.value = false;
  bAdminidtrateur.value = false;
  bdroitAjouterAgent.value = false;
  bDroitImprimerContrat.value = false;
  bSuperUtilisateur.value = false;
  bCompteActif.value = false;
  bDroitAjouterProduit.value = false;
}

const onSubmit = update
  ? handleSubmit(async (values) => {
      loading.value = true;
      console.log(values);
      const Photo = { Photo: previewImgData.value };
      const donne = { ...Photo, ...values };
      try {
        let response = await getAgent.createAgent(donne);
        console.log(response);
        await RefrehFunction();
        getSuccess("L'agent a été ajouter avec succèss");
        updateopenUpdate(false);
        loading.value = true;
      } catch (error) {
        console.error((error as any).response?.data?.fault?.detail);
        loading.value = false;
        getError((error as any).response?.data?.fault?.detail);
      }
    })
  : handleSubmit(async (value) => {
      loading.value = true;
      console.log("Mise à jours : ", value);
      try {
        let response = await getAgent.updateAgent(IDagent.value, value);
        await RefrehFunction();
        updateopenUpdate(false);
        loading.value = false;
        console.log(response);
        getSuccess("L'agent a été mis à jour avec succèss");
      } catch (error) {
        loading.value = false;
        console.error(error);
        getError((error as any).response?.data?.fault?.detail);
      }
    });
</script>
