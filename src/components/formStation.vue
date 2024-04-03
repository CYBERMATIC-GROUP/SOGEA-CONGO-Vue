<template>
  <form @submit.prevent="onSubmit">
    <div class="pt-8 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Code unique identifiant la station"
          type="text"
          id="Code unique identifiant la station"
          :readonly="!modif"
          v-model="CiodeStation"
          :valid="errors.CiodeStation"
          v-bind="CiodeStationAttrs"
          placeholder="Entrer le code unique "
        />
        <span class="text-red-color">{{ errors.CiodeStation }}</span>
      </div>

      <div class="w-full">
        <InputForm
          label="Nom station"
          type="text"
          id="Nom station"
          :readonly="!modif"
          v-model="NomStation"
          :valid="errors.NomStation"
          v-bind="NomStationAttrs"
          placeholder="Entrer le nom de la station"
        />
        <span class="text-red-color">{{ errors.NomStation }}</span>
      </div>
    </div>

    <div class="pt-8 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="IDENTIFIANT DE CONNEXION"
          type="text"
          id="IDENTIFIANT DE CONNEXION"
          :readonly="!modif"
          v-model="Adresse"
          :valid="errors.Adresse"
          v-bind="AdresseAttrs"
          placeholder="Entrer l'identifiant de connexion"
        />
        <span class="text-red-color">{{ errors.Adresse }}</span>
      </div>
      <div class="w-full">
        <InputForm
          label="Adresse"
          type="text"
          id="Adresse"
          :readonly="!modif"
          v-model="login"
          :valid="errors.login"
          v-bind="loginAttrs"
          placeholder="Entrer l'adresse"
        />
        <span class="text-red-color">{{ errors.login }}</span>
      </div>
    </div>

    <div v-if="!modif" class="flex justify-center mt-5 space-x-5">
      <Button @click="Modifier" type="button" class="w-full bg-bg-primary"
        >Modifier</Button
      >
      <Button type="button" class="w-full bg-bg-primary">Point de vente</Button>
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

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    CiodeStation: yup.string().required("Veuillez saisir la date de début."),
    NomStation: yup.string().required("Veuillez saisir la date de fin."),
    Adresse: yup.string().required("Veuillez saisir le nombre de clients."),
    login: yup.string().required("Veuillez saisir le chiffre d'affaires."),
  }),
});

const [CiodeStation, CiodeStationAttrs] = defineField("CiodeStation");
const [NomStation, NomStationAttrs] = defineField("NomStation");
const [Adresse, AdresseAttrs] = defineField("Adresse");
const [login, loginAttrs] = defineField("login");
const getStation = useStation();

interface Option {
  value: number;
  label: string;
}
const getSousAgence = useSousAgence();
const optionsSousAgence = ref<Option[]>([]);

onMounted(async () => {
  await getSousAgence.fetchSousAgence();
  optionsSousAgence.value = getSousAgence.sousAgence.map((item) => ({
    value: item.IDSOUSAGENGE,
    label: item.Nom,
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
const idStation = ref();

if (storageAdherentString !== null && !update) {
  const storageAdherent = JSON.parse(storageAdherentString);
  CiodeStation.value = storageAdherent.CiodeStation;
  NomStation.value = storageAdherent.NomStation;
  Adresse.value = storageAdherent.Adresse;
  login.value = storageAdherent.login;
  idStation.value = storageAdherent.IDSTATIONS;
}

const onSubmit = update
  ? handleSubmit(async (values) => {
      loading.value = true;
      try {
        let response = await getStation.createStation(values);
        console.log(response);
        await RefrehFunction();
        getSuccess("La station a été ajouter avec succèss");
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
        let response = await getStation.updateStation(idStation.value, value);
        await RefrehFunction();
        updateopenUpdate(false);
        loading.value = false;
        console.log(response);
        getSuccess("La station a été mis à jour avec succèss");
      } catch (error) {
        loading.value = false;
        console.error(error);
        getError((error as any).response?.data?.fault?.detail);
      }
    });
</script>
