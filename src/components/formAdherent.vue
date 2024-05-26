<template>
  <form @submit.prevent="onSubmit">
    <div class="pt-8 flex flex-row justify-between space-x-5">
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
            { value: '1', label: 'M.' },
            {
              value: '2',
              label: 'Mme',
            },
          ]"
        />
        <span class="text-red-color">{{ errors.Civilite }}</span>
      </div>

      <div class="w-full">
        <InputForm
          label="Nom"
          type="text"
          id="Nom"
          :readonly="!modif"
          :uppercase="true"
          v-model="Nom"
          :valid="errors.Nom"
          v-bind="NomAttrs"
          placeholder="Entrer le nom"
        />
        <span class="text-red-color">{{ errors.Nom }}</span>
      </div>
      <div class="w-full">
        <InputForm
          label="Prénom"
          type="text"
          id="prénom"
          :readonly="!modif"
          v-model="Prenom"
          :valid="errors.Prenom"
          v-bind="PrenomAttrs"
          placeholder="Entrer le prénom"
        />
        <span class="text-red-color">{{ errors.Nom }}</span>
      </div>
    </div>
    <div class="pt-5 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Adresse mail"
          type="text"
          id="mail"
          :readonly="!modif"
          v-model="eMail"
          :valid="errors.eMail"
          v-bind="eMailAttrs"
          placeholder="Entrer l'adresse mail"
        />
        <span class="text-red-color">{{ errors.eMail }}</span>
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

      <div class="w-full">
        <InputForm
          label="Adresse"
          type="text"
          id="adresse"
          :readonly="!modif"
          v-model="Adresse"
          :valid="errors.Adresse"
          v-bind="AdresseAttrs"
          placeholder="Entrer l'adresse"
        />
        <span class="text-red-color">{{ errors.Adresse }}</span>
      </div>
    </div>
    <div class="pt-5 flex flex-row justify-between space-x-5">
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

      <div class="w-full">
        <TextAndSelect
          label="Quartier"
          id="quartier"
          :readonly="!modif"
          :valid="errors.IDQUARTIER"
          :options="optionsQuartier"
          v-bind="IDQUARTIERAttrs"
          placeholder="Veuillez saisir votre quartier"
          v-model="IDQUARTIER"
        />
        <span class="text-red-color">{{ errors.IDQUARTIER }}</span>
      </div>
    </div>
    <div class="pt-5 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <TextAndSelect
          label="Zone"
          id="zone"
          :options="optionsZone"
          v-model="IDZone"
          :readonly="!modif"
          :valid="errors.IDZone"
          v-bind="IDZoneAttrs"
          placeholder="Entrer la zone"
        />
        <span class="text-red-color">{{ errors.IDZone }}</span>
      </div>

      <div class="w-full">
        <InputForm
          label="Type pièce"
          type="select"
          id="Type pièce"
          v-model="TypePiece"
          :readonly="!modif"
          :valid="errors.TypePiece"
          v-bind="TypePieceAttrs"
          labelDefaut="Sélectionné le type pièce"
          :options="[
            { value: 'CNI', label: 'CNI' },
            {
              value: 'Passeport',
              label: 'Passeport',
            },
            {
              value: 'Permis de conduire',
              label: 'Permis de conduire',
            },
            {
              value: 'Carte de résident',
              label: 'Carte de résident',
            },
          ]"
        />
        <span class="text-red-color">{{ errors.TypePiece }}</span>
      </div>

      <div class="w-full">
        <InputForm
          label="Numéro de piece"
          type="text"
          id="Numéro de piece"
          :readonly="!modif"
          v-model="CNI"
          :uppercase="true"
          :valid="errors.CNI"
          v-bind="CNIAttrs"
          placeholder="Entrer le numéro de piece"
        />
        <span class="text-red-color">{{ errors.CNI }}</span>
      </div>
    </div>
    <div class="pt-5 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Date de validité"
          type="date"
          id="Date de validité"
          :readonly="!modif"
          v-model="DateExpirationPiece"
          :valid="errors.DateExpirationPiece"
          v-bind="DateExpirationPieceAttrs"
          placeholder="Entrer la date de validité"
        />
        <span class="text-red-color">{{ errors.DateExpirationPiece }}</span>
      </div>

      <div class="w-full">
        <InputForm
          label="Numéro de NIU "
          type="text"
          id="Numéro de NIU "
          v-model="NIU"
          :uppercase="true"
          :readonly="!modif"
          :valid="errors.NIU"
          v-bind="NIUAttrs"
          placeholder="Entrer le numéro de NIU "
        />
        <span class="text-red-color">{{ errors.NIU }}</span>
      </div>
    </div>
    <div v-if="!modif" class="flex justify-center mt-5 space-x-5">
      <Button @click="Modifier" type="button" class="w-full bg-bg-primary"
        >Modifier</Button
      >
      <Button @click="OnImprime" :loading="loadingButton" type="button" class="w-full bg-bg-primary"
        >Imprimer</Button
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
import TextAndSelect from "@/components/ui/TextAndSelect.vue";
import { getSuccess, getError } from "../common/notification";
import router from "@/router";
import { defineEmits } from "vue";

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    IDDEPARTEMENT: yup.string().required("Veuillez saisir votre département."),
    IDQUARTIER: yup.string().required("Veuillez saisir le nom du quartier."),
    IDARRONDISSEMENT: yup
      .string()
      .required("Veuillez saisir votre arrondissement."),
    eMail: yup.string().required("Veuillez saisir votre adresse e-mail."),
    Civilite: yup.string().required("Veuillez saisir votre civilité."),
    Nom: yup.string().required("Veuillez saisir votre nom."),
    Prenom: yup.string().required("Veuillez saisir votre prénom."),
    TelPortable: yup
      .string()
      .required("Veuillez saisir votre numéro de téléphone portable."),
    NIU: yup.string().required("Veuillez saisir votre NIU."),
    IDZone: yup.string().required("Veuillez saisir votre zone."),
    DateExpirationPiece: yup
      .string()
      .required(
        "Veuillez saisir la date d'expiration de votre pièce d'identité."
      ),
    CNI: yup.string().required("Veuillez saisir votre numéro de CNI."),
    TypePiece: yup
      .string()
      .required("Veuillez saisir le type de votre pièce d'identité."),
    Adresse: yup.string().required("Veuillez saisir votre adresse."),
  }),
});

const [IDDEPARTEMENT, IDDEPARTEMENTAttrs] = defineField("IDDEPARTEMENT");
const [IDQUARTIER, IDQUARTIERAttrs] = defineField("IDQUARTIER");

const [IDARRONDISSEMENT, IDARRONDISSEMENTAttrs] =
  defineField("IDARRONDISSEMENT");
const [eMail, eMailAttrs] = defineField("eMail");
const [IDZone, IDZoneAttrs] = defineField("IDZone");
const [CNI, CNIAttrs] = defineField("CNI");
const [Nom, NomAttrs] = defineField("Nom");
const [Prenom, PrenomAttrs] = defineField("Prenom");
const [TelPortable, TelPortableAttrs] = defineField("TelPortable");
const [NIU, NIUAttrs] = defineField("NIU");
const [DateExpirationPiece, DateExpirationPieceAttrs] = defineField(
  "DateExpirationPiece"
);
const [TypePiece, TypePieceAttrs] = defineField("TypePiece");
const [Adresse, AdresseAttrs] = defineField("Adresse");
const [Civilite, CiviliteAttrs] = defineField("Civilite");

const getDepartement = useDepartement();
const getArrondissement = useRessource();
const createAdherent = useAdherent();

interface Option {
  value: number;
  label: string;
}

const optionsDepartement = ref<Option[]>([]);
const optionsArrondissement = ref<Option[]>([]);
const optionsQuartier = ref<Option[]>([]);
const optionsZone = ref<Option[]>([]);

onMounted(async () => {
  await getDepartement.fetchDepartement();
  optionsDepartement.value = getDepartement.departement.map((item) => ({
    value: item.IDDEPARTEMENT,
    label: item.NomDepartement,
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
    IDDEPARTEMENT: IDDEPARTEMENT.value,
    IDARRONDISSEMENT: newValue,
  };
  try {
    let response = await getArrondissement.fetchRessource(data, "Quartier");
    console.log(IDARRONDISSEMENT.value);
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
  try {
    let response = await getArrondissement.fetchRessource(data, "Zone");
    console.log(response);
    optionsZone.value = response.map(
      (item: { IDZone: number; NomZone: any }) => ({
        value: item.IDZone,
        label: item.NomZone,
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

const onSubmit = !values
  ? handleSubmit(async (values) => {
      let Zone = IDZone.value;
      let NomQuartier = IDQUARTIER.value;

      if (typeof IDZone.value === "string") {
        Zone = IDZone.value;
        values.IDZone = 0;
      }
      if (typeof IDQUARTIER.value === "string") {
        NomQuartier = IDQUARTIER.value;
        values.IDQUARTIER = 0;
      }

      const data = { Zone, NomQuartier, ...values };
      loading.value = true;
      console.log("Les datas : ", values);
      try {
        let response = await createAdherent.createAdherent(data);
        console.log(response);
        getSuccess("L'adhérent a été ajouter avec succèss");
        localStorage.setItem("adherent", JSON.stringify(response));
        setTimeout(() => {
          loading.value = false;
          router.push({ path: "/automobile/" + response.IDProprietaire });
        }, 3000);
      } catch (error) {
        console.error((error as any).response?.data?.fault?.detail);
        loading.value = false;
        getError((error as any).response?.data?.fault?.detail);
      }
    })
  : handleSubmit(async (value) => {
      let Zone = IDZone.value;
      let NomQuartier = IDQUARTIER.value;

      if (typeof IDZone.value === "string") {
        Zone = IDZone.value;
        value.IDZone = 0;
      }
      if (typeof IDQUARTIER.value === "string") {
        NomQuartier = IDQUARTIER.value;
        value.IDQUARTIER = 0;
      }

      const data = { Zone, NomQuartier, ...value };

      loading.value = true;
      console.log("Mise à jours : ", data);
      try {
        let response = await createAdherent.UpdateAdherent(
          data,
          values.IDProprietaire
        );
        await RefrehFunction();
        updateopenUpdate(false);
        loading.value = false;
        console.log(response);
        getSuccess("L'adhérent a été mis à jour avec succèss");
      } catch (error) {
        loading.value = false;
        console.error(error);
        getError((error as any).response?.data?.fault?.detail);
      }
    });

const modif = ref(update);
const Modifier = () => {
  modif.value = true;
};

function formatHTMLDate(dateString: any) {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().slice(0, 10);
  return formattedDate;
}

const loadingButton = ref(false)

const OnImprime = async () =>{
  
    loadingButton.value = true
  try {
    let response = await createAdherent.ImprimerAdherent({nIDProprietaire: values.IDProprietaire},values.IDProprietaire)
    console.log(response)
    const newWindow = window.open();
    loadingButton.value = false
  if (newWindow) {
    newWindow.document.write(
      '<embed width="100%" height="100%" ' +
        'src="' +
        response.Etat +
        '" ' +
        'type="application/pdf" />'
    );
  } else {
    alert(
      "Votre navigateur bloque l'ouverture de nouvelle fenêtre. Veuillez autoriser les pop-ups pour cette page."
    );
  }
  } catch (error) {
    console.log(error)
  }
}



if (values !== undefined) {
  // NomQuartier.value = values.NomQuartier;
  IDQUARTIER.value = values.NomQuartier;
  IDZone.value = values.Zone;
  try {
    const asyncFunction = async () => {
      let response = await createAdherent.getOne(values.IDProprietaire);
      IDDEPARTEMENT.value = response.IDDEPARTEMENT;
      IDARRONDISSEMENT.value = response.IDARRONDISSEMENT;
      eMail.value = response.eMail;
      CNI.value = response.CNI;
      Nom.value = response.Nom;
      Prenom.value = response.Prenom;
      TelPortable.value = response.TelPortable;
      NIU.value = response.NIU;
      DateExpirationPiece.value =
        response.DateExpirationPiece == "0000-00-00"
          ? response.DateExpirationPiece
          : formatHTMLDate(response.DateExpirationPiece);
      TypePiece.value = response.TypePiece;
      Adresse.value = response.Adresse;
      Civilite.value = response.Civilite;
    };
    asyncFunction();
  } catch (error) {
    getError((error as any).response?.data?.fault?.detail);
  }
}
</script>
