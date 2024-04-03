<template>
  <form @submit.prevent="onSubmit">
    <div class="pt-8 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Debut"
          type="date"
          id="Debut"
          :readonly="!modif"
          v-model="DateDebut"
          :valid="errors.DateDebut"
          v-bind="DateDebutAttrs"
        />
        <span class="text-red-color">{{ errors.DateDebut }}</span>
      </div>

      <div class="w-full">
        <InputForm
          label="Fin"
          type="date"
          id="Fin"
          :readonly="!modif"
          v-model="DateFin"
          :valid="errors.DateFin"
          v-bind="DateFinAttrs"
        />
        <span class="text-red-color">{{ errors.DateFin }}</span>
      </div>
      <div class="w-full">
        <InputForm
          label="Nombre de clients "
          type="number"
          id="Nombre de clients "
          :readonly="!modif"
          v-model="NombreClient"
          :valid="errors.NombreClient"
          v-bind="NombreClientAttrs"
          placeholder="Entrer le Nombre de clients "
        />
        <span class="text-red-color">{{ errors.NombreClient }}</span>
      </div>
    </div>

    <div class="pt-8 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="C.A (Chiffre d'Affaire)"
          type="text"
          id="C.A (Chiffre d'Affaire)"
          :readonly="!modif"
          v-model="ChiffreAFaffaire"
          :valid="errors.ChiffreAFaffaire"
          v-bind="ChiffreAFaffaireAttrs"
        />
        <span class="text-red-color">{{ errors.ChiffreAFaffaire }}</span>
      </div>

      <div class="w-full">
        <InputForm
          label="Sous-agence"
          type="select"
          id="Sous-agence"
          :readonly="!modif"
          v-model="IDSOUSAGENGE"
          :valid="errors.IDSOUSAGENGE"
          v-bind="IDSOUSAGENGEAttrs"
          labelDefaut="Sélectionné le Sous-agence"
          :options="optionsSousAgence"
        />
        <span class="text-red-color">{{ errors.IDSOUSAGENGE }}</span>
      </div>
    </div>

    <div v-if="!modif" class="flex justify-center mt-5">
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

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    DateDebut: yup.string().required("Veuillez saisir la date de début."),
    DateFin: yup.string().required("Veuillez saisir la date de fin."),
    NombreClient: yup
      .string()
      .required("Veuillez saisir le nombre de clients."),
    ChiffreAFaffaire: yup
      .string()
      .required("Veuillez saisir le chiffre d'affaires."),
    IDSOUSAGENGE: yup
      .string()
      .required("Veuillez sélectionner la sous-agence."),
  }),
});

const [DateDebut, DateDebutAttrs] = defineField("DateDebut");
const [DateFin, DateFinAttrs] = defineField("DateFin");
const [NombreClient, NombreClientAttrs] = defineField("NombreClient");
const [ChiffreAFaffaire, ChiffreAFaffaireAttrs] =
  defineField("ChiffreAFaffaire");
const [IDSOUSAGENGE, IDSOUSAGENGEAttrs] = defineField("IDSOUSAGENGE");

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

const onSubmit = !values
  ? handleSubmit(async (values) => {
      //   const Logo = { Logo: previewImgData.value };
      //   const donne = { ...Logo, ...values };
      loading.value = true;
      console.log("Les datas : ", values);
      //   try {
      //     let response = await getSociete.createSociete(donne);
      //     console.log(response);
      //     getSuccess("La societé a été ajouter avec succèss");
      //     setTimeout(() => {
      //       loading.value = false;
      //       router.push({ path: "/liste-societe" });
      //     }, 3000);
      //   } catch (error) {
      //     console.error((error as any).response?.data?.fault?.detail);
      //     loading.value = false;
      //     getError((error as any).response?.data?.fault?.detail);
      //   }
    })
  : handleSubmit(async (value) => {
      //   const Logo = { Logo: previewImgData.value };
      //   const donne = { ...Logo, ...value };
      loading.value = true;
      console.log("Mise à jours : ", value);
      //   try {
      //     let response = await getSociete.updateSociete(
      //       values.IDLesSocietes,
      //       donne
      //     );
      //     await RefrehFunction();
      //     updateopenUpdate(false);
      //     loading.value = false;
      //     console.log(response);
      //     getSuccess("La société a été mis à jour avec succèss");
      //   } catch (error) {
      //     loading.value = false;
      //     console.error(error);
      //     getError((error as any).response?.data?.fault?.detail);
      //   }
    });

const data = ref();
const storageAdherentString = sessionStorage.getItem("objectif");

if (storageAdherentString !== null && !update) {
  const storageAdherent = JSON.parse(storageAdherentString);
  DateDebut.value = storageAdherent.DateDebut;
  DateFin.value = storageAdherent.DateFin;
  NombreClient.value = storageAdherent.NombreClient;
  ChiffreAFaffaire.value = storageAdherent.ChiffreAFaffaire;
  IDSOUSAGENGE.value = storageAdherent.IDSOUSAGENGE;
}
</script>
