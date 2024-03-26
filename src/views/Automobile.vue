<template>
  <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl">
    <div class="w-full h-[2rem] select-none flex justify-center items-center">
      <h1 class="font-[600] text-white text-[1.3rem]">
        {{
          $route.params.id !== undefined
            ? "Adhérent"
            : "Informations du véhicule"
        }}
      </h1>
    </div>
    <CardContent v-if="$route.params.id !== undefined" class="bg-white">
      <div class="flex flex-row items-center space-x-5 pt-5">
        <span class="border">
          <img :src="Personne" alt="Personne" class="size-[10rem]" />
        </span>
        <div class="flex-1">
          <div class="flex flex-row space-x-5">
            <div class="w-full">
              <InputForm
                label="Nom"
                type="text"
                id="Nom"
                v-model="adherentName"
                readonly="true"
                placeholder="Entrer le nom"
              />
            </div>
            <div class="w-full">
              <InputForm
                label="Prénom (s)"
                type="text"
                id="Prénom"
                v-model="adherentPrenom"
                readonly="true"
                placeholder="Entrer le prénom"
              />
            </div>
          </div>
          <div class="flex flex-row space-x-5 mt-5">
            <div class="w-full">
              <InputForm
                label="Contact"
                type="text"
                id="Contact"
                v-model="adherentContact"
                readonly="true"
                placeholder="Entrer le Contact"
              />
            </div>
            <div class="w-full">
              <InputForm
                label="C.N.I"
                type="text"
                v-model="adherentCNI"
                id="C.N.I"
                readonly="true"
                placeholder="Entrer le C.N.I"
              />
            </div>
          </div>

          <div class="flex flex-row space-x-5 mt-5">
            <div class="w-full">
              <InputForm
                label="NIU"
                type="text"
                v-model="adherentNUI"
                id="NIU"
                readonly="true"
                placeholder="Entrer le NIU"
              />
            </div>
            <div class="w-full">
              <InputForm
                label="Adresse"
                type="text"
                v-model="adherentAdresse"
                id="Adresse"
                readonly="true"
                placeholder="Entrer le Adresse"
              />
            </div>
          </div>
        </div>
      </div>
    </CardContent>

    <div class="bg-white pt-5 px-5" v-if="$route.params.id !== undefined">
      <div
        class="w-full shadow-md bg-[#73B1E7] h-[2rem] rounded-tl-xl rounded-tr-xl"
      >
        <div
          class="w-full h-[2rem] select-none flex justify-center items-center"
        >
          <h1 class="font-[600] text-white text-[1.3rem]">
            Informations du véhicule
          </h1>
        </div>
      </div>
    </div>

    <CardContent class="bg-white px-5">
      <formAutomobile :update="true" />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import formAutomobile from "@/components/formAutomobile.vue";
import Personne from "@/assets/img/personne.jpg";
import InputForm from "@/components/inputForm.vue";
import { ref } from "vue";
import { useDepartement } from "@/stores/departement";
import { useGenre } from "@/stores/genre";
import { onMounted } from "vue";
import { useMarqueAutomobile } from "@/stores/marque";
import { useTypeAutomobile } from "@/stores/type";
import { useProprietaire } from "@/stores/proprietaire";
import { useSociete } from "@/stores/societe";
import type { Proprietaire } from "@/model/proprietaire";
import { useRoute } from "vue-router";

const getDepartement = useDepartement();
const getGenre = useGenre();
const getMarque = useMarqueAutomobile();
const getType = useTypeAutomobile();
const getProprietaire = useProprietaire();
const getSociete = useSociete();

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
  } catch (error) {
    console.error(
      "Erreur lors de l'analyse de l'objet JSON dans le localStorage:",
      error
    );
  }
}

console.log("Adherent : ", adherent);
const adherentName = adherent?.Nom;
const adherentPrenom = adherent?.Prenom;
const adherentContact = adherent?.TelPortable;
const adherentCNI = adherent?.CNI;
const adherentNUI = adherent?.NIU;
const adherentAdresse = adherent?.Adresse;
</script>
