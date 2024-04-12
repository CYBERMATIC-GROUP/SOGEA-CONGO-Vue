<template>
  <form @submit="onSubmit">
    <div class="flex flex-row items-center space-x-5 pt-5">
      <span>
        <img :src="Voirure" alt="Voirure" class="w-[16rem]" />
      </span>
      <div class="flex-1">
        <div class="flex flex-row space-x-5">
          <div class="w-full">
            <InputForm
              label="Immatriculation "
              type="text"
              :readonly="!modif"
              id="Immatriculation"
              :uppercase="true"
              v-model="Immatriculation"
              :valid="errors.Immatriculation"
              v-bind="ImmatriculationAttrs"
              placeholder="Entrer l'Immatriculation"
            />
            <span class="text-red-color">{{ errors.Immatriculation }}</span>
          </div>
          <div class="w-full">
            <InputForm
              label="Numero serie"
              type="text"
              :readonly="!modif"
              id="Numero serie"
              :uppercase="true"
              v-model="NumeroSerie"
              :valid="errors.NumeroSerie"
              v-bind="NumeroSerieAttrs"
              placeholder="Entrer le Numero serie"
            />
            <span class="text-red-color">{{ errors.NumeroSerie }}</span>
          </div>
        </div>
        <div class="flex flex-row space-x-5 mt-5">
          <div class="w-full">
            <InputForm
              label="Identifiant carte"
              type="text"
              :readonly="!modif"
              id="Identifiant carte"
              :cacher="true"
              v-model="IdentifiantCarte"
              :valid="errors.IdentifiantCarte"
              v-bind="IdentifiantCarteAttrs"
              placeholder="Entrer le Identifiant carte"
            />
            <span class="text-red-color">{{ errors.IdentifiantCarte }}</span>
          </div>
          <div class="w-full">
            <InputForm
              label="Première année de mise en service"
              type="number"
              :readonly="!modif"
              v-model="AnneeConstruction"
              :valid="errors.AnneeConstruction"
              v-bind="AnneeConstructionAttrs"
              id="Première année de mise en service"
              placeholder="Entrer le Première année de mise en service"
            />
            <span class="text-red-color">{{ errors.AnneeConstruction }}</span>
          </div>
        </div>
        <div class="flex flex-row space-x-5 mt-5">
          <div class="w-full relative">
            <span
              v-if="optionMarque.length < 1"
              class="absolute top-8 left-[53%]"
              ><a-spin
            /></span>
            <InputForm
              label="Marque"
              type="select"
              :readonly="!modif"
              v-model="IDMarqueAutomobile"
              :valid="errors.IDMarqueAutomobile"
              v-bind="IDMarqueAutomobileAttrs"
              :options="optionMarque"
              id="Marque"
              labelDefaut="Sélectionné la marque"
              placeholder="Entrer la Marque"
            />
            <span class="text-red-color">{{ errors.IDMarqueAutomobile }}</span>
          </div>
          <div class="w-full relative">
            <span v-if="optionType.length < 1" class="absolute top-8 left-[75%]"
              ><a-spin
            /></span>
            <InputForm
              label="Type automobile"
              type="select"
              :readonly="!modif"
              v-model="IDTypeAutomobile"
              :valid="errors.IDTypeAutomobile"
              v-bind="IDTypeAutomobileAttrs"
              :options="optionType"
              id="Type automobile"
              labelDefaut="Sélectionné le type d'automobile"
            />
            <span class="text-red-color">{{ errors.IDTypeAutomobile }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 mt-5">
      <div class="flex flex-row space-x-5">
        <div class="w-full relative">
          <span v-if="optionGenre.length < 1" class="absolute top-8 left-[53%]"
            ><a-spin
          /></span>
          <InputForm
            label="Genre"
            type="select"
            id="Genre"
            :readonly="!modif"
            v-model="IDGenre"
            :valid="errors.IDGenre"
            v-bind="IDGenreAttrs"
            labelDefaut="Sélectionné le genre"
            :options="optionGenre"
          />
          <span class="text-red-color">{{ errors.IDGenre }}</span>
        </div>
        <div class="w-full">
          <InputForm
            label="Source energies"
            type="select"
            :readonly="!modif"
            id="Source energies"
            v-model="IDSourceEnergie"
            :valid="errors.IDSourceEnergie"
            v-bind="IDSourceEnergieAttrs"
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
            labelDefaut="Sélectionné la source d'énergie"
          />
          <span class="text-red-color">{{ errors.IDSourceEnergie }}</span>
        </div>
        <div class="w-full relative">
          <span
            v-if="optionCategorie.length < 1"
            class="absolute top-8 left-[62%]"
            ><a-spin
          /></span>
          <InputForm
            label="Nature de prime"
            type="select"
            :readonly="!modif"
            id="Categorie"
            v-model="IDProduit"
            :valid="errors.IDProduit"
            v-bind="IDProduitAttrs"
            labelDefaut="Sélectionné la catégorie"
            :options="optionCategorie"
          />
          <span class="text-red-color">{{ errors.IDProduit }}</span>
        </div>
      </div>
      <div class="flex flex-row space-x-5 mt-5">
        <div class="w-full">
          <InputForm
            label="Société"
            :readonly="!modif"
            type="select"
            id="Société"
            v-model="IDLesSocietes"
            :valid="errors.IDLesSocietes"
            v-bind="IDLesSocietesAttrs"
            labelDefaut="Sélectionné la societé"
            :options="optionSociete"
          />
          <span class="text-red-color">{{ errors.IDLesSocietes }}</span>
        </div>
        <div class="w-full">
          <InputForm
            label="Département"
            type="select"
            :readonly="!modif"
            id="departement"
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
            label="Nom du véhicule"
            type="text"
            :readonly="!modif"
            v-model="nom"
            :valid="errors.nom"
            v-bind="nomAttrs"
            @click="ValeurDefaut"
            id="Nom du véhicule"
            placeholder="Entrer le Nom du véhicule"
          />
          <span class="text-red-color">{{ errors.nom }}</span>
        </div>
      </div>
    </div>
    <div class="flex-1 mt-5">
      <div class="flex flex-row space-x-5">
        <div class="w-full">
          <InputForm
            label="COULEUR  "
            type="text"
            id="COULEUR"
            :readonly="!modif"
            v-model="Couleur"
            :valid="errors.Couleur"
            v-bind="CouleurAttrs"
            placeholder="Entrer le COULEUR  "
          />
          <span class="text-red-color">{{ errors.Couleur }}</span>
        </div>
        <div class="w-full">
          <InputForm
            label="Puissance moteur"
            type="text"
            :readonly="!modif"
            v-model="PuissanceMoteur"
            :valid="errors.PuissanceMoteur"
            v-bind="PuissanceMoteurAttrs"
            id="Puissance moteur"
            placeholder="Entrer le Puissance moteur"
          />
          <span class="text-red-color">{{ errors.PuissanceMoteur }}</span>
        </div>
        <div class="w-full">
          <InputForm
            label="Date de délivrance"
            type="date"
            :readonly="!modif"
            v-model="DateDelivrance"
            :valid="errors.DateDelivrance"
            v-bind="DateDelivranceAttrs"
            id="Date de délivrance"
            placeholder="Entrer le Date de délivrance"
          />
          <span class="text-red-color">{{ errors.DateDelivrance }}</span>
        </div>
      </div>
      <div class="flex flex-row space-x-5 mt-5">
        <div class="w-full">
          <InputForm
            label="Proprietaire"
            type="select"
            id="Proprietaire"
            :readonly="$route.params.id !== undefined || !modif"
            v-model="IDProprietaire"
            :valid="errors.IDProprietaire"
            v-bind="IDProprietaireAttrs"
            :options="optionProprietaire"
            labelDefaut="Sélectionné le proprietaire"
          />
          <span class="text-red-color">{{ errors.IDProprietaire }}</span>
        </div>
        <div class="w-full">
          <label
            for="radio"
            class="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']"
            >Entrer le Est-un taxi moto ?</label
          >
          <input
            id="radio"
            v-model="bTaxiMoto"
            :readonly="!modif"
            :valid="errors.bTaxiMoto"
            v-bind="bTaxiMotoAttrs"
            type="checkbox"
          />
          <span class="text-red-color">{{ errors.bTaxiMoto }}</span>
        </div>
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
import { Card, CardContent } from "@/components/ui/card";
import Personne from "@/assets/img/personne.jpg";
import InputForm from "@/components/inputForm.vue";
import Voirure from "@/assets/img/car.jpeg";
import { Button } from "@/components/ui/button";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { ref, defineEmits, watch } from "vue";
import { useDepartement } from "@/stores/departement";
import { useGenre } from "@/stores/genre";
import { onMounted } from "vue";
import { useMarqueAutomobile } from "@/stores/marque";
import { useTypeAutomobile } from "@/stores/type";
import { useProprietaire } from "@/stores/proprietaire";
import { useSociete } from "@/stores/societe";
import { useAutomobile } from "@/stores/automobile";
import { getSuccess, getError } from "../common/notification";
import type { Proprietaire } from "@/model/proprietaire";
import router from "@/router";
import { useRoute } from "vue-router";
import { useNature } from "@/stores/naturePrime";

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    Immatriculation: yup
      .string()
      .required("Veuillez saisir votre immatriculation."),
    NumeroSerie: yup
      .string()
      .required("Veuillez saisir votre numéro de série."),
    IdentifiantCarte: yup.string(),
    AnneeConstruction: yup
      .string()
      .required("Veuillez saisir l'année de construction."),
    IDMarqueAutomobile: yup.string().required("Veuillez saisir la marque."),
    IDTypeAutomobile: yup
      .string()
      .required("Veuillez saisir le type d'automobile."),
    IDGenre: yup.string().required("Veuillez saisir le genre."),
    IDSourceEnergie: yup
      .string()
      .required("Veuillez saisir l'ID de la source d'énergie."),

    IDLesSocietes: yup
      .string()
      .required("Veuillez saisir le nom de la société."),
    IDDEPARTEMENT: yup
      .string()
      .required("Veuillez saisir l'ID du département."),
    nom: yup.string().required("Veuillez saisir le nom."),
    Couleur: yup.string().required("Veuillez saisir la couleur."),
    PuissanceMoteur: yup
      .string()
      .required("Veuillez saisir la puissance du moteur."),
    DateDelivrance: yup
      .string()
      .required("Veuillez saisir la date de délivrance."),
    IDProprietaire: yup.string().required("Veuillez saisir le propriétaire."),
    bTaxiMoto: yup.bool().required("Veuillez saisir si c'est un taxi moto."),
    IDProduit: yup.string().required("Veuillez saisir le type d'automobile."),
  }),
});

const [Immatriculation, ImmatriculationAttrs] = defineField("Immatriculation");
const [IDProduit, IDProduitAttrs] = defineField("IDProduit");
const [NumeroSerie, NumeroSerieAttrs] = defineField("NumeroSerie");
const [IdentifiantCarte, IdentifiantCarteAttrs] =
  defineField("IdentifiantCarte");
const [AnneeConstruction, AnneeConstructionAttrs] =
  defineField("AnneeConstruction");
const [IDMarqueAutomobile, IDMarqueAutomobileAttrs] =
  defineField("IDMarqueAutomobile");
const [IDTypeAutomobile, IDTypeAutomobileAttrs] =
  defineField("IDTypeAutomobile");
const [IDGenre, IDGenreAttrs] = defineField("IDGenre");
const [IDSourceEnergie, IDSourceEnergieAttrs] = defineField("IDSourceEnergie");
const [IDLesSocietes, IDLesSocietesAttrs] = defineField("IDLesSocietes");
const [nom, nomAttrs] = defineField("nom");
const [Couleur, CouleurAttrs] = defineField("Couleur");
const [PuissanceMoteur, PuissanceMoteurAttrs] = defineField("PuissanceMoteur");
const [DateDelivrance, DateDelivranceAttrs] = defineField("DateDelivrance");
const [IDProprietaire, IDProprietaireAttrs] = defineField("IDProprietaire");
const [bTaxiMoto, bTaxiMotoAttrs] = defineField("bTaxiMoto");
const [IDDEPARTEMENT, IDDEPARTEMENTAttrs] = defineField("IDDEPARTEMENT");

function formatDateISO(date: any) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const nomMarque = ref("");
const nomType = ref("");

watch(IDMarqueAutomobile, async (newValue, oldValue) => {
  optionMarque.value = getMarque.marqueAutomobile.map((item) => ({
    value: item.IDMarqueAutomobile,
    label: item.Marque,
  }));

  let objectSelect = optionMarque.value.find(
    (element) => element.value == IDMarqueAutomobile.value
  );
  nomMarque.value = objectSelect?.label + "-";
});

watch(IDTypeAutomobile, async (newValue, oldValue) => {
  optionType.value = getType.typeAutomobile.map((item) => ({
    value: item.IDTypeAutomobile,
    label: item.NomType,
  }));

  let objectSelect = optionType.value.find(
    (element) => element.value == IDTypeAutomobile.value
  );
  nomType.value = String(objectSelect?.label);
});

const ValeurDefaut = () => {
  nom.value = nomMarque.value + nomType.value;
};

// Utiliser une référence pour stocker la date formatée au format ISO 8601
DateDelivrance.value = formatDateISO(new Date());

const getDepartement = useDepartement();
const getGenre = useGenre();
const getMarque = useMarqueAutomobile();
const getType = useTypeAutomobile();
const getProprietaire = useProprietaire();
const getSociete = useSociete();
const getNature = useNature();

interface Option {
  value: number | string;
  label: string;
}

const optionsDepartement = ref<Option[]>([]);
const optionGenre = ref<Option[]>([]);
const optionMarque = ref<Option[]>([]);
const optionType = ref<Option[]>([]);
const optionProprietaire = ref<Option[]>([]);
const optionSociete = ref<Option[]>([]);
const optionCategorie = ref<Option[]>([]);

onMounted(async () => {
  await getDepartement.fetchDepartement();
  await getGenre.fetchGenre();
  await getMarque.fetchMarqueAutomobile();
  await getType.fetchTypeAutomobile();
  await getProprietaire.fetchProprietaire();
  await getSociete.fetchSociete();

  optionsDepartement.value = getDepartement.departement.map((item) => ({
    value: item.IDDEPARTEMENT,
    label: item.NomDepartement,
  }));
  optionGenre.value = getGenre.genre.map((item) => ({
    value: item.IDGenre,
    label: item.GenreVoiture,
  }));
  optionMarque.value = getMarque.marqueAutomobile.map((item) => ({
    value: item.IDMarqueAutomobile,
    label: item.Marque,
  }));
  optionType.value = getType.typeAutomobile.map((item) => ({
    value: item.IDTypeAutomobile,
    label: item.NomType,
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

// Observateur pour IDGenre
watch(IDGenre, async (newValue, oldValue) => {
  IDGenre.value = newValue;
  await getNature.fetchNature(
    IDGenre.value,
    IDTypeAutomobile.value,
    IDSourceEnergie.value
  );
  optionCategorie.value = getNature.nature.map((item) => ({
    value: item.IDProduit,
    label: item.Libelle,
  }));
});

// Observateur pour IDTypeAutomobile
watch(IDTypeAutomobile, async (newValue, oldValue) => {
  IDTypeAutomobile.value = newValue;
  await getNature.fetchNature(
    IDGenre.value,
    IDTypeAutomobile.value,
    IDSourceEnergie.value
  );
  optionCategorie.value = getNature.nature.map((item) => ({
    value: item.IDProduit,
    label: item.Libelle,
  }));
});

// Observateur pour IDSourceEnergie
watch(IDSourceEnergie, async (newValue, oldValue) => {
  IDSourceEnergie.value = newValue;
  await getNature.fetchNature(
    IDGenre.value,
    IDTypeAutomobile.value,
    IDSourceEnergie.value
  );
  optionCategorie.value = getNature.nature.map((item) => ({
    value: item.IDProduit,
    label: item.Libelle,
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

const createAutomobile = useAutomobile();

const onSubmit = !values
  ? handleSubmit(async (values) => {
      loading.value = true;
      const IDCategorie = { IDCategorie: 1 };
      const data = { ...values, ...IDCategorie };
      console.log("Les datas : ", data);
      try {
        let response = await createAutomobile.createAutomobile(data);
        console.log(response);
        getSuccess("L'automobile a été ajouter avec succèss");
        setTimeout(() => {
          loading.value = false;
          router.push({ path: "/liste-automobile" });
        }, 3000);
      } catch (error) {
        console.error(error);
        loading.value = false;
        getError((error as any).response?.data?.fault?.detail);
      }
    })
  : handleSubmit(async (value) => {
      const IDCategorie = { IDCategorie: 1 };
      const data = { ...value, ...IDCategorie };
      loading.value = true;
      try {
        let response = await createAutomobile.UpdateAutomobile(
          data,
          values.IDAutomobiles
        );
        await RefrehFunction();
        updateopenUpdate(false);
        loading.value = false;
        console.log(response);
        getSuccess("L'automobile a été mis à jour avec succèss");
      } catch (error) {
        loading.value = false;
        console.error(error);
        getError((error as any).response?.data?.fault?.detail);
      }
    });

const storageAdherentString: string | null = localStorage.getItem("adherent");

// Vérifier si l'objet est présent et le parser
let adherent: Proprietaire | null = null;
if (storageAdherentString !== null) {
  try {
    adherent = JSON.parse(storageAdherentString);
    const currentRouteId = ref<string | null>(null);

    const route = useRoute();

    if (typeof route.params.id === "string") {
      // Affecter la valeur de route.params.id à currentRouteId.value
      currentRouteId.value = route.params.id;
    }

    // Utilisation de l'ID de la route actuelle
    console.log(currentRouteId.value); // Affichera l'ID de la route actuelle
    IDProprietaire.value = currentRouteId.value;
  } catch (error) {
    console.error(
      "Erreur lors de l'analyse de l'objet JSON dans le localStorage:",
      error
    );
  }
}

const Modifier = () => {
  modif.value = true;
};

if (values !== undefined) {
  IDDEPARTEMENT.value = values.IDDEPARTEMENT;
  IDLesSocietes.value = values.IDLesSocietes;
  Immatriculation.value = values.Immatriculation;
  NumeroSerie.value = values.NumeroSerie;
  IdentifiantCarte.value = values.IdentifiantCarte;
  AnneeConstruction.value = values.AnneeConstruction;
  IDMarqueAutomobile.value = values.IDMarqueAutomobile;
  IDTypeAutomobile.value = values.IDTypeAutomobile;
  IDGenre.value = values.IDGenre;
  IDSourceEnergie.value = values.IDSourceEnergie;
  nom.value = values.nom;
  Couleur.value = values.Couleur;
  PuissanceMoteur.value = values.PuissanceMoteur;
  DateDelivrance.value = values.DateDelivrance;
  IDProprietaire.value = values.IDProprietaire;
  bTaxiMoto.value = values.bTaxiMoto;
  IDDEPARTEMENT.value = values.IDDEPARTEMENT;
  IDProduit.value = values.IDProduit;
  try {
    const asyncFunction = async () => {
      await getNature.fetchNature(
        values.IDGenre,
        values.IDTypeAutomobile,
        values.IDSourceEnergie
      );
      optionCategorie.value = getNature.nature.map((item) => ({
        value: item.IDProduit,
        label: item.Libelle,
      }));
    };
    asyncFunction();
  } catch (error) {
    getError((error as any).response?.data?.fault?.detail);
  }
} else {
  bTaxiMoto.value = false;
}
</script>

<style scoped></style>
