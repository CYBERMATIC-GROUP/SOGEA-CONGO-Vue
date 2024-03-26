<template>
  <form @submit.prevent="onSubmit">
    <div class="pt-8 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Immatriculation"
          v-model="Immatriculation"
          v-bind="ImmatriculationAttrs"
          type="text"
          id="Immatriculation"
        />
      </div>
      <div class="w-full">
        <InputForm
          label="Numero serie"
          v-model="NumeroSerie"
          v-bind="NumeroSerieAttrs"
          type="text"
          id="Numero serie"
        />
      </div>
      <div class="w-full">
        <InputForm
          label="Année de mise en service"
          v-model="AnneeConstruction"
          v-bind="AnneeConstructionAttrs"
          type="number"
          id="Année de mise en service"
        />
      </div>
    </div>

    <div class="pt-5 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Marque"
          type="select"
          v-model="IDMarqueAutomobile"
          v-bind="IDMarqueAutomobileAttrs"
          :options="optionMarque"
          id="Marque"
          labelDefaut="la marque"
          placeholder="Entrer la Marque"
        />
      </div>
      <div class="w-full">
        <InputForm
          label="Type automobile"
          type="select"
          :options="optionType"
          v-model="IDTypeAutomobile"
          v-bind="IDTypeAutomobileAttrs"
          id="Type automobile"
          labelDefaut="le type d'automobile"
        />
      </div>
      <div class="w-full">
        <InputForm
          label="Source energies"
          type="select"
          v-model="IDSourceEnergie"
          v-bind="IDSourceEnergieAttrs"
          id="Source energies"
          :options="[
            {
              value: '1',
              label: ' Essence ',
            },
            {
              value: '9',
              label: ' Diesel ',
            },
            {
              value: '11',
              label: ' GAZ  ',
            },
          ]"
          labelDefaut="la source d'énergie"
        />
      </div>
    </div>

    <div class="pt-5 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Genre"
          type="select"
          id="Genre"
          v-model="IDGenre"
          v-bind="IDGenreAttrs"
          labelDefaut="le genre"
          :options="optionGenre"
        />
      </div>
      <div class="w-full">
        <InputForm
          label="Proprietaire"
          type="select"
          v-model="IDProprietaire"
          v-bind="IDProprietaireAttrs"
          id="Proprietaire"
          :options="optionProprietaire"
          labelDefaut="le proprietaire"
        />
      </div>
      <div class="w-full">
        <InputForm
          label="Categorie"
          type="select"
          v-model="IDCategorie"
          v-bind="IDCategorieAttrs"
          id="Categorie"
          labelDefaut="la catégorie"
          :options="[
            {
              value: '9',
              label: 'Taxi Familial \'Essence\' - 5 à 8 CVE / 5-6 Places',
            },
            {
              value: '10',
              label: ' Taxi Familial \'Essence\' - 5 à 8 CVE / 7-8 Places ',
            },
            {
              value: '18',
              label: ' Taxi Familial \'Essence\' - 9 à 13 CVE / 7-8 Places ',
            },
          ]"
        />
      </div>
    </div>

    <div class="pt-5 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Société"
          type="select"
          id="Société"
          v-model="IDLesSocietes"
          v-bind="IDLesSocietesAttrs"
          labelDefaut="la societé"
          :options="optionSociete"
        />
      </div>
      <div class="w-full">
        <InputForm
          label="Département"
          type="select"
          v-model="IDDEPARTEMENT"
          v-bind="IDDEPARTEMENTAttrs"
          id="departement"
          labelDefaut="le département"
          :options="optionsDepartement"
        />
      </div>
    </div>

    <Button :loading="loading" type="submit" class="w-full bg-bg-primary mt-7"
      >Filtrer</Button
    >
  </form>
</template>

<script setup lang="ts">
import InputForm from "../components/inputForm.vue";
import { ref, onMounted, defineEmits } from "vue";
import { useMarqueAutomobile } from "@/stores/marque";
import { useTypeAutomobile } from "@/stores/type";
import { useGenre } from "@/stores/genre";
import { useAdherent } from "@/stores/adherent";
import { useSociete } from "@/stores/societe";
import { useDepartement } from "@/stores/departement";
import { Button } from "@/components/ui/button";
import { useForm } from "vee-validate";
import * as yup from "yup";

const getMarque = useMarqueAutomobile();

interface Option {
  value: number | string;
  label: string;
}

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    Immatriculation: yup.string(),
    NumeroSerie: yup.string(),
    AnneeConstruction: yup.string(),
    IDMarqueAutomobile: yup.string(),
    IDTypeAutomobile: yup.string(),
    IDGenre: yup.string(),
    IDSourceEnergie: yup.string(),
    IDCategorie: yup.string(),
    IDLesSocietes: yup.string(),
    IDDEPARTEMENT: yup.string(),
    IDProprietaire: yup.string(),
  }),
});

const [Immatriculation, ImmatriculationAttrs] = defineField("Immatriculation");
const [NumeroSerie, NumeroSerieAttrs] = defineField("NumeroSerie");
defineField("IdentifiantCarte");
const [AnneeConstruction, AnneeConstructionAttrs] =
  defineField("AnneeConstruction");
const [IDMarqueAutomobile, IDMarqueAutomobileAttrs] =
  defineField("IDMarqueAutomobile");
const [IDTypeAutomobile, IDTypeAutomobileAttrs] =
  defineField("IDTypeAutomobile");
const [IDGenre, IDGenreAttrs] = defineField("IDGenre");
const [IDSourceEnergie, IDSourceEnergieAttrs] = defineField("IDSourceEnergie");
const [IDCategorie, IDCategorieAttrs] = defineField("IDCategorie");
const [IDLesSocietes, IDLesSocietesAttrs] = defineField("IDLesSocietes");
const [IDProprietaire, IDProprietaireAttrs] = defineField("IDProprietaire");
const [IDDEPARTEMENT, IDDEPARTEMENTAttrs] = defineField("IDDEPARTEMENT");

const optionMarque = ref<Option[]>([]);
const optionType = ref<Option[]>([]);
const getGenre = useGenre();
const optionGenre = ref<Option[]>([]);
const optionProprietaire = ref<Option[]>([]);
const optionSociete = ref<Option[]>([]);
const getProprietaire = useAdherent();
const getType = useTypeAutomobile();
const getSociete = useSociete();
const optionsDepartement = ref<Option[]>([]);
const getDepartement = useDepartement();

const emits = defineEmits(["seachData"]);

const seachData = (data: any) => {
  emits("seachData", data);
};

const loading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  console.log("Les datas : ", values);
  seachData(values);
});

onMounted(async () => {
  await getMarque.fetchMarqueAutomobile();
  await getDepartement.fetchDepartement();
  await getType.fetchTypeAutomobile();
  await getGenre.fetchGenre();
  await getProprietaire.fetchProprietaire();
  await getSociete.fetchSociete();
  optionsDepartement.value = getDepartement.departement.map((item) => ({
    value: item.IDDEPARTEMENT,
    label: item.NomDepartement,
  }));
  optionMarque.value = getMarque.marqueAutomobile.map((item) => ({
    value: item.IDMarqueAutomobile,
    label: item.Marque,
  }));
  optionType.value = getType.typeAutomobile.map((item) => ({
    value: item.IDTypeAutomobile,
    label: item.NomType,
  }));
  optionGenre.value = getGenre.genre.map((item) => ({
    value: item.IDGenre,
    label: item.GenreVoiture,
  }));
  optionProprietaire.value = getProprietaire.proprietaire.map((item) => ({
    value: item.IDProprietaire,
    label: item.Nom + " " + item.Prenom,
  }));
  optionSociete.value = getSociete.societe.map((item) => ({
    value: item.IDLesSocietes,
    label: item.NomSociete,
  }));
});
</script>
