<template>
  <form @submit.prevent="onSubmit">
    <div class="flex justify-center pt-5 items-center space-x-6">
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
          :valid="errors.Logo"
          @change="loadFile"
          class="w-[21rem]"
        />
      </label>
    </div>
    <div class="pt-8 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Nom Société"
          type="text"
          id="Nom Société"
          :readonly="!modif"
          v-model="NomSociete"
          :valid="errors.NomSociete"
          v-bind="NomSocieteAttrs"
        />
        <span class="text-red-color">{{ errors.NomSociete }}</span>
      </div>

      <div class="w-full">
        <InputForm
          label="Code Société"
          type="text"
          id="Code Société"
          :readonly="!modif"
          :uppercase="true"
          v-model="CodeSociete"
          :valid="errors.CodeSociete"
          v-bind="CodeSocieteAttrs"
          placeholder="Entrer le Code Société"
        />
        <span class="text-red-color">{{ errors.CodeSociete }}</span>
      </div>
      <div class="w-full">
        <InputForm
          label="Mat Fiscale"
          type="text"
          id="Mat Fiscale"
          :readonly="!modif"
          v-model="MatFiscale"
          :valid="errors.MatFiscale"
          v-bind="MatFiscaleAttrs"
          placeholder="Entrer le Mat Fiscale"
        />
        <span class="text-red-color">{{ errors.MatFiscale }}</span>
      </div>
    </div>
    <div class="pt-8 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Code postal"
          type="text"
          id="Code postal"
          :readonly="!modif"
          v-model="CP"
          :valid="errors.CP"
          v-bind="CPAttrs"
        />
        <span class="text-red-color">{{ errors.CP }}</span>
      </div>

      <div class="w-full">
        <InputForm
          label="Téléphone"
          type="tel"
          id="Téléphone"
          :readonly="!modif"
          :uppercase="true"
          v-model="Tel"
          :valid="errors.Tel"
          v-bind="TelAttrs"
          placeholder="Entrer le Téléphone"
        />
        <span class="text-red-color">{{ errors.Tel }}</span>
      </div>
      <div class="w-full">
        <InputForm
          label="Fax"
          type="text"
          id="Fax"
          :readonly="!modif"
          v-model="Fax"
          :valid="errors.Fax"
          v-bind="FaxAttrs"
          placeholder="Entrer le Fax"
        />
        <span class="text-red-color">{{ errors.Fax }}</span>
      </div>
    </div>
    <div class="pt-8 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Email"
          type="email"
          id="Email"
          :readonly="!modif"
          v-model="Email"
          :valid="errors.Email"
          v-bind="EmailAttrs"
        />
        <span class="text-red-color">{{ errors.Email }}</span>
      </div>

      <div class="w-full">
        <InputForm
          label="Pays"
          type="text"
          id="Pays"
          :readonly="!modif"
          :uppercase="true"
          v-model="Pays"
          :valid="errors.Pays"
          v-bind="PaysAttrs"
          placeholder="Entrer le Pays"
        />
        <span class="text-red-color">{{ errors.Pays }}</span>
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
    </div>
    <div class="pt-8 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Ville "
          type="text"
          id="Ville "
          :readonly="!modif"
          v-model="Ville"
          :valid="errors.Ville"
          v-bind="VilleAttrs"
        />
        <span class="text-red-color">{{ errors.Ville }}</span>
      </div>

      <div class="w-full">
        <InputForm
          label="Adresse"
          type="text"
          id="Adresse"
          :readonly="!modif"
          :uppercase="true"
          v-model="Adresse"
          :valid="errors.Adresse"
          v-bind="AdresseAttrs"
          placeholder="Entrer le Adresse"
        />
        <span class="text-red-color">{{ errors.Adresse }}</span>
      </div>
      <div class="w-full">
        <InputForm
          label="Site Web"
          type="text"
          id="site Web"
          :readonly="!modif"
          v-model="Web"
          :valid="errors.Web"
          v-bind="WebAttrs"
          placeholder="Entrer le site Web"
        />
        <span class="text-red-color">{{ errors.Web }}</span>
      </div>
    </div>

    <div class="pt-8 flex flex-row justify-between space-x-5">
      <div class="w-full">
        <InputForm
          label="Echeance"
          type="text"
          id="Echeance "
          :readonly="!modif"
          v-model="Echeance"
          :valid="errors.Echeance"
          v-bind="EcheanceAttrs"
        />
        <span class="text-red-color">{{ errors.Echeance }}</span>
      </div>

      <div class="w-full">
        <InputForm
          label="RemiseEnPourcentage (%)"
          type="number"
          id="RemiseEnPourcentage"
          :readonly="!modif"
          :uppercase="true"
          v-model="RemiseEnPourcentage"
          :valid="errors.RemiseEnPourcentage"
          v-bind="RemiseEnPourcentageAttrs"
          placeholder="Entrer le RemiseEnPourcentage"
        />
        <span class="text-red-color">{{ errors.RemiseEnPourcentage }}</span>
      </div>
      <div class="w-full">
        <InputForm
          label="Statut"
          type="select"
          id="Statut"
          v-model="Status"
          :readonly="!modif"
          :valid="errors.Status"
          v-bind="StatusAttrs"
          labelDefaut="Sélectionné le Statut"
          :options="[
            { value: 1, label: 'Activer' },
            {
              value: 2,
              label: 'Desactiver',
            },
          ]"
        />
        <span class="text-red-color">{{ errors.Status }}</span>
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
import TextAndSelect from "@/components/ui/TextAndSelect.vue";
import { getSuccess, getError } from "../common/notification";
import router from "@/router";
import { useSociete } from "@/stores/societe";
import { defineEmits } from "vue";

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    Logo: yup.string(),
    NomSociete: yup.string().required("Veuillez saisir le nom de la société."),
    Adresse: yup.string().required("Veuillez saisir l'adresse de la société."),
    MatFiscale: yup
      .string()
      .required(
        "Veuillez saisir le numéro de matricule fiscale de la société."
      ),
    CodeSociete: yup
      .string()
      .required("Veuillez saisir le numéro le code de la société."),
    CP: yup.string().required("Veuillez saisir le code postal de la société."),
    Ville: yup.string().required("Veuillez saisir la ville de la société."),
    Pays: yup.string().required("Veuillez saisir le pays de la société."),
    Tel: yup
      .string()
      .required("Veuillez saisir le numéro de téléphone de la société."),
    Fax: yup
      .string()
      .required("Veuillez saisir le numéro de fax de la société."),
    Email: yup
      .string()
      .required("Veuillez saisir l'adresse e-mail de la société."),
    Web: yup.string().required("Veuillez saisir l'adresse web de la société."),
    Echeance: yup
      .string()
      .required("Veuillez saisir l'échéance de la société."),
    RemiseEnPourcentage: yup
      .string()
      .required("Veuillez saisir le pourcentage de remise de la société."),
    Status: yup.string().required("Veuillez saisir le statut de la société."),
    IDDEPARTEMENT: yup
      .string()
      .required("Veuillez saisir le département de la société."),
  }),
});

const getSociete = useSociete();

const [IDDEPARTEMENT, IDDEPARTEMENTAttrs] = defineField("IDDEPARTEMENT");
const [NomSociete, NomSocieteAttrs] = defineField("NomSociete");
const [Adresse, AdresseAttrs] = defineField("Adresse");
const [MatFiscale, MatFiscaleAttrs] = defineField("MatFiscale");
const [CP, CPAttrs] = defineField("CP");
const [Ville, VilleAttrs] = defineField("Ville");
const [Pays, PaysAttrs] = defineField("Pays");
const [Tel, TelAttrs] = defineField("Tel");
const [Fax, FaxAttrs] = defineField("Fax");
const [Email, EmailAttrs] = defineField("Email");
const [Web, WebAttrs] = defineField("Web");
const [Echeance, EcheanceAttrs] = defineField("Echeance");
const [RemiseEnPourcentage, RemiseEnPourcentageAttrs] = defineField(
  "RemiseEnPourcentage"
);
const [Status, StatusAttrs] = defineField("Status");
const [CodeSociete, CodeSocieteAttrs] = defineField("CodeSociete");

const previewImg = ref(
  "https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c"
);

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

interface Option {
  value: number;
  label: string;
}
const getDepartement = useDepartement();
const optionsDepartement = ref<Option[]>([]);

onMounted(async () => {
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
      const Logo = { Logo: previewImgData.value };
      const donne = { ...Logo, ...values };
      loading.value = true;
      console.log("Les datas : ", donne);
      try {
        let response = await getSociete.createSociete(donne);
        console.log(response);
        getSuccess("La societé a été ajouter avec succèss");
        setTimeout(() => {
          loading.value = false;
          router.push({ path: "/liste-societe" });
        }, 3000);
      } catch (error) {
        console.error((error as any).response?.data?.fault?.detail);
        loading.value = false;
        getError((error as any).response?.data?.fault?.detail);
      }
    })
  : handleSubmit(async (value) => {
      const Logo = { Logo: previewImgData.value };
      const donne = { ...Logo, ...value };
      loading.value = true;
      console.log("Mise à jours : ", value);
      try {
        let response = await getSociete.updateSociete(
          values.IDLesSocietes,
          donne
        );
        await RefrehFunction();
        updateopenUpdate(false);
        loading.value = false;
        console.log(response);
        getSuccess("La société a été mis à jour avec succèss");
      } catch (error) {
        loading.value = false;
        console.error(error);
        getError((error as any).response?.data?.fault?.detail);
      }
    });

if (values !== undefined) {
  previewImg.value =
    values.Logo == ""
      ? "https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c"
      : values.Logo;
  IDDEPARTEMENT.value = values.IDDEPARTEMENT;
  NomSociete.value = values.NomSociete;
  Adresse.value = values.Adresse;
  MatFiscale.value = values.MatFiscale;
  CP.value = values.CP;
  Ville.value = values.Ville;
  Pays.value = values.Pays;
  Tel.value = values.Tel;
  Fax.value = values.Fax;
  Email.value = values.Email;
  Adresse.value = values.Adresse;
  Web.value = values.Web;
  Echeance.value = values.Echeance;
  RemiseEnPourcentage.value = values.RemiseEnPourcentage;
  Status.value = values.Status;
  CodeSociete.value = values.Status;
}
</script>
