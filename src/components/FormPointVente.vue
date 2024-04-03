<template>
  <form @submit.prevent="onSubmit">
    <div class="pt-8 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Raison Socilale"
          type="text"
          id="Raison Socilale"
          :readonly="!modif"
          v-model="RaisonSocilale"
          :valid="errors.RaisonSocilale"
          v-bind="RaisonSocilaleAttrs"
          placeholder="Entrer la raison sociale"
        />
        <span class="text-red-color">{{ errors.RaisonSocilale }}</span>
      </div>

      <div class="w-full">
        <InputForm
          label="Adresse"
          type="text"
          id="Adresse"
          :readonly="!modif"
          v-model="Adresse"
          :valid="errors.Adresse"
          v-bind="AdresseAttrs"
          placeholder="Entrer l'adresse"
        />
        <span class="text-red-color">{{ errors.Adresse }}</span>
      </div>
      <div class="w-full">
        <InputForm
          label="Mobile"
          type="tel"
          id="Mobile"
          :readonly="!modif"
          v-model="Mobile"
          :valid="errors.Mobile"
          v-bind="MobileAttrs"
          placeholder="Entrer le mobile"
        />
        <span class="text-red-color">{{ errors.Mobile }}</span>
      </div>
    </div>

    <div class="pt-8 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Airtel Money"
          type="tel"
          id="Airtel Money"
          :readonly="!modif"
          :cacher="true"
          v-model="AirtelMoney"
          :valid="errors.AirtelMoney"
          v-bind="AirtelMoneyAttrs"
          placeholder="Entrer le numéro airtel money"
        />
        <span class="text-red-color">{{ errors.AirtelMoney }}</span>
      </div>
      <div class="w-full">
        <InputForm
          label="Momo"
          type="tel"
          id="Momo"
          :readonly="!modif"
          v-model="MOMO"
          :cacher="true"
          :valid="errors.MOMO"
          v-bind="MOMOAttrs"
          placeholder="Entrer le numéro momo"
        />
        <span class="text-red-color">{{ errors.MOMO }}</span>
      </div>
      <div class="w-full">
        <InputForm
          label="Code station"
          type="text"
          id="Code station"
          :readonly="!modif"
          v-model="IdentifiantVendeur"
          :valid="errors.IdentifiantVendeur"
          v-bind="IdentifiantVendeurAttrs"
          placeholder="Entrer le code station"
        />
        <span class="text-red-color">{{ errors.IdentifiantVendeur }}</span>
      </div>
    </div>
    <div class="pt-8 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Nom et Prenom Responsable"
          type="text"
          id="Nom et Prenom Responsable"
          :readonly="!modif"
          v-model="NomPrenomResponsable"
          :valid="errors.NomPrenomResponsable"
          v-bind="NomPrenomResponsableAttrs"
          placeholder="Entrer le nom et prenom du responsable"
        />
        <span class="text-red-color">{{ errors.NomPrenomResponsable }}</span>
      </div>
      <div class="w-full">
        <InputForm
          label="Département"
          type="select"
          id="departement"
          :readonly="!modif"
          v-model="IDDEPARTEMENT"
          :valid="errors.IDDEPARTEMENT"
          v-bind="IDDEPARTEMENTAttrs"
          labelDefaut="Sélectionné le département"
          :options="optionsDepartement"
        />
        <span class="text-red-color">{{ errors.IDDEPARTEMENT }}</span>
      </div>
      <div class="w-full">
        <InputForm
          label="Arrondissement"
          type="select"
          id="Arrondissement"
          :readonly="!modif"
          labelDefaut="Sélectionné l'arrondissement"
          v-model="IDARRONDISSEMENT"
          :valid="errors.IDARRONDISSEMENT"
          v-bind="IDARRONDISSEMENTAttrs"
          :options="optionsArrondissement"
        />
        <span class="text-red-color">{{ errors.IDARRONDISSEMENT }}</span>
      </div>
    </div>
    <div class="pt-8 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <TextAndSelect
          label="Quartier"
          id="quartier"
          :value="IDQUARTIER"
          :readonly="!modif"
          :valid="errors.IDQUARTIER"
          :options="optionsQuartier"
          v-bind="IDQUARTIERAttrs"
          placeholder="Veuillez saisir votre quartier"
          v-model="IDQUARTIER"
        />
        <span class="text-red-color">{{ errors.IDQUARTIER }}</span>
      </div>
      <div class="w-full">
        <InputForm
          label="STATIONS"
          type="select"
          id="station"
          :readonly="!modif"
          v-model="IDSTATIONS"
          :valid="errors.IDSTATIONS"
          v-bind="IDSTATIONSAttrs"
          labelDefaut="Sélectionné la station"
          :options="optionsStation"
        />
        <span class="text-red-color">{{ errors.IDSTATIONS }}</span>
      </div>
    </div>

    <div class="pt-8 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Compagnie"
          type="text"
          id="Compagnie"
          :readonly="!modif"
          :cacher="true"
          v-model="Compagnie"
          :valid="errors.Compagnie"
          v-bind="CompagnieAttrs"
          placeholder="Entrer la compagnie"
        />
        <span class="text-red-color">{{ errors.Compagnie }}</span>
      </div>
      <div class="w-full">
        <InputForm
          label="Latitude"
          type="number"
          id="Latitude"
          :readonly="!modif"
          v-model="GPS_Latitude"
          :cacher="true"
          :valid="errors.GPS_Latitude"
          v-bind="GPS_LatitudeAttrs"
          placeholder="Entrer la latitude"
        />
        <span class="text-red-color">{{ errors.GPS_Latitude }}</span>
      </div>
      <div class="w-full">
        <InputForm
          label="Longitude"
          type="number"
          id="Longitude"
          :cacher="true"
          :readonly="!modif"
          v-model="GPS_Longitude"
          :valid="errors.GPS_Longitude"
          v-bind="GPS_LongitudeAttrs"
          placeholder="Entrer la longitude"
        />
        <span class="text-red-color">{{ errors.GPS_Longitude }}</span>
      </div>
    </div>

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

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    RaisonSocilale: yup.string().required("Veuillez saisir la raison sociale."),
    Adresse: yup.string().required("Veuillez saisir l'adresse."),
    Mobile: yup
      .string()
      .required("Veuillez saisir le numéro de téléphone mobile."),
    AirtelMoney: yup.string(),

    MOMO: yup.string().required("Veuillez saisir le numéro MOMO."),
    IdentifiantVendeur: yup.string(),

    NomPrenomResponsable: yup
      .string()
      .required("Veuillez saisir le nom du responsable."),
    IDDEPARTEMENT: yup
      .string()
      .required("Veuillez sélectionner un département."),
    IDARRONDISSEMENT: yup
      .string()
      .required("Veuillez sélectionner un arrondissement."),
    IDQUARTIER: yup.string().required("Veuillez sélectionner un quartier."),
    IDSTATIONS: yup.string().required("Veuillez sélectionner une station."),
    Compagnie: yup.string(),
    GPS_Latitude: yup.string(),
    GPS_Longitude: yup.string(),
  }),
});

const [RaisonSocilale, RaisonSocilaleAttrs] = defineField("RaisonSocilale");
const [Adresse, AdresseAttrs] = defineField("Adresse");
const [Mobile, MobileAttrs] = defineField("Mobile");
const [AirtelMoney, AirtelMoneyAttrs] = defineField("AirtelMoney");
const [MOMO, MOMOAttrs] = defineField("MOMO");
const [IdentifiantVendeur, IdentifiantVendeurAttrs] =
  defineField("IdentifiantVendeur");
const [NomPrenomResponsable, NomPrenomResponsableAttrs] = defineField(
  "NomPrenomResponsable"
);
const [IDDEPARTEMENT, IDDEPARTEMENTAttrs] = defineField("IDDEPARTEMENT");
const [IDARRONDISSEMENT, IDARRONDISSEMENTAttrs] =
  defineField("IDARRONDISSEMENT");
const [IDQUARTIER, IDQUARTIERAttrs] = defineField("IDQUARTIER");
const [IDSTATIONS, IDSTATIONSAttrs] = defineField("IDSTATIONS");
const [Compagnie, CompagnieAttrs] = defineField("Compagnie");
const [GPS_Latitude, GPS_LatitudeAttrs] = defineField("GPS_Latitude");
const [GPS_Longitude, GPS_LongitudeAttrs] = defineField("GPS_Longitude");

const getStation = useStation();

interface Option {
  value: number;
  label: string;
}

const optionsStation = ref<Option[]>([]);
const getDepartement = useDepartement();
const getArrondissement = useRessource();
const getPointDeVente = usePointDeVente();
const optionsDepartement = ref<Option[]>([]);
const optionsArrondissement = ref<Option[]>([]);
const optionsQuartier = ref<Option[]>([]);

onMounted(async () => {
  await getDepartement.fetchDepartement();
  optionsDepartement.value = getDepartement.departement.map((item) => ({
    value: item.IDDEPARTEMENT,
    label: item.NomDepartement,
  }));
  await getStation.fetchStation();
  optionsStation.value = getStation.station.map((item) => ({
    value: item.IDSTATIONS,
    label: item.NomStation,
  }));
});

watch(IDDEPARTEMENT, async (newValue, oldValue) => {
  const data = {
    IDRESSOURCE: 0,
    IDZone: 0,
    IDDEPARTEMENT: newValue,
    IDARRONDISSEMENT: 1,
  };
  try {
    let response = await getArrondissement.fetchRessource(
      data,
      "Arrondissement"
    );
    console.log(response);
    optionsArrondissement.value = response.map(
      (item: { IDARRONDISSEMENT: any; NomArron: any }) => ({
        value: item.IDARRONDISSEMENT,
        label: item.NomArron,
      })
    );
  } catch (error) {
    console.error(error);
  }
});

watch(IDARRONDISSEMENT, async (newValue, oldValue) => {
  const data = {
    IDRESSOURCE: 0,
    IDZone: 0,
    IDDEPARTEMENT: newValue,
    IDARRONDISSEMENT: IDDEPARTEMENT.value,
  };
  try {
    let response = await getArrondissement.fetchRessource(data, "Quartier");
    console.log(response);
    optionsQuartier.value = response.map(
      (item: { IDQUARTIER: number; NomQuartier: any }) => ({
        value: item.IDQUARTIER,
        label: item.NomQuartier,
      })
    );
  } catch (error) {
    console.error(error);
  }
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
const IDVENDEURS = ref();

if (storageAdherentString !== null && !update) {
  const storageAdherent = JSON.parse(storageAdherentString);
  RaisonSocilale.value = storageAdherent.RaisonSocilale;
  Adresse.value = storageAdherent.Adresse;
  Mobile.value = storageAdherent.Mobile;
  AirtelMoney.value = storageAdherent.AirtelMoney;
  MOMO.value = storageAdherent.MOMO;
  IdentifiantVendeur.value = storageAdherent.IdentifiantVendeur;
  NomPrenomResponsable.value = storageAdherent.NomPrenomResponsable;
  IDDEPARTEMENT.value = storageAdherent.IDDEPARTEMENT;
  IDARRONDISSEMENT.value = storageAdherent.IDARRONDISSEMENT;
  IDQUARTIER.value = storageAdherent.Quartier;
  IDSTATIONS.value = storageAdherent.IDSTATIONS;
  IDVENDEURS.value = storageAdherent.IDVENDEURS;
  Compagnie.value = storageAdherent.Compagnie;
  GPS_Latitude.value = storageAdherent.GPS_Latitude;
  GPS_Longitude.value = storageAdherent.GPS_Longitude;
}

const onSubmit = update
  ? handleSubmit(async (values) => {
      loading.value = true;
      try {
        let response = await getPointDeVente.createPointDeVente(values);
        console.log(response);
        await RefrehFunction();
        getSuccess("Le point de vente a été ajouter avec succèss");
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
        let response = await getPointDeVente.updatePointDeVente(
          IDVENDEURS.value,
          value
        );
        await RefrehFunction();
        updateopenUpdate(false);
        loading.value = false;
        console.log(response);
        getSuccess("Le point de vente a été mis à jour avec succèss");
      } catch (error) {
        loading.value = false;
        console.error(error);
        getError((error as any).response?.data?.fault?.detail);
      }
    });
</script>
