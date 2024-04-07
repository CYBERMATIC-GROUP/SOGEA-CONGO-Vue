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
          type="number"
          id="C.A (Chiffre d'Affaire)"
          :readonly="!modif"
          v-model="ChiffreAFaffaire"
          :valid="errors.ChiffreAFaffaire"
          v-bind="ChiffreAFaffaireAttrs"
          placeholder="Veillez saisir le chiffre d'affaire "
        />
        <span class="text-red-color">{{ errors.ChiffreAFaffaire }}</span>
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

    <div class="pt-8 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Chiffre d'affaire réaliser"
          type="number"
          id="CARealise"
          :readonly="!modif"
          v-model="CARealise"
          :valid="errors.CARealise"
          v-bind="CARealiseAttrs"
          placeholder="Veillez saisir le chiffre d'affaire réaliser"
        />
        <span class="text-red-color">{{ errors.CARealise }}</span>
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
import { useObjectif } from "@/stores/objectif";

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    IDDEPARTEMENT: yup.string().required("Veuillez saisir votre département."),
    DateDebut: yup.string().required("Veuillez saisir la date de début."),
    DateFin: yup.string().required("Veuillez saisir la date de fin."),
    NombreClient: yup
      .string()
      .required("Veuillez saisir le nombre de clients."),
    ChiffreAFaffaire: yup
      .string()
      .required("Veuillez saisir le chiffre d'affaire."),
    CARealise: yup
      .string()
      .required("Veuillez saisir le chiffre d'affaire réaliser"),
    IDSOUSAGENGE: yup
      .string()
      .required("Veuillez sélectionner la sous-agence."),
  }),
});

const [DateDebut, DateDebutAttrs] = defineField("DateDebut");
const [CARealise, CARealiseAttrs] = defineField("CARealise");
const [DateFin, DateFinAttrs] = defineField("DateFin");
const [NombreClient, NombreClientAttrs] = defineField("NombreClient");
const [ChiffreAFaffaire, ChiffreAFaffaireAttrs] =
  defineField("ChiffreAFaffaire");
const [IDSOUSAGENGE, IDSOUSAGENGEAttrs] = defineField("IDSOUSAGENGE");
const [IDDEPARTEMENT, IDDEPARTEMENTAttrs] = defineField("IDDEPARTEMENT");

interface Option {
  value: number;
  label: string;
}
const getSousAgence = useSousAgence();
const getDepartement = useDepartement();
const optionsSousAgence = ref<Option[]>([]);
const getObjectif = useObjectif();
const optionsDepartement = ref<Option[]>([]);

onMounted(async () => {
  await getSousAgence.fetchSousAgence();
  optionsSousAgence.value = getSousAgence.sousAgence.map((item) => ({
    value: item.IDSOUSAGENGE,
    label: item.Nom,
  }));
  await getDepartement.fetchDepartement();
  optionsDepartement.value = getDepartement.departement.map((item) => ({
    value: item.IDDEPARTEMENT,
    label: item.NomDepartement,
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
      loading.value = true;
      console.log("Les datas : ", values);
      try {
        let response = await getObjectif.createObjectif(values);
        console.log(response);
        await RefrehFunction();
        updateopenUpdate(false);
        loading.value = false;
        getSuccess("L'objectif a été ajouter avec succèss");
      } catch (error) {
        console.error((error as any).response?.data?.fault?.detail);
        loading.value = false;
        getError((error as any).response?.data?.fault?.detail);
      }
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
  try {
    const asyncFunction = async () => {
      let response = await getObjectif.getOne(storageAdherent.IDOBJECTIFS);
      console.log(response);
      DateDebut.value = response.DateDebut;
      DateFin.value = response.DateFin;
      NombreClient.value = response.NombreClient;
      ChiffreAFaffaire.value = response.ChiffreAFaffaire;
      IDSOUSAGENGE.value = response.IDSOUSAGENGE;
      IDDEPARTEMENT.value = response.IDDEPARTEMENT;
      CARealise.value = response.CARealise;
    };
    asyncFunction();
  } catch (error) {
    getError((error as any).response?.data?.fault?.detail);
  }
}
</script>
