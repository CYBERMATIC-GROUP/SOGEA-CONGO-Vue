// formRules.ts
import * as yup from 'yup';
import { useForm } from "vee-validate";


export const validationSchema = yup.object({
  IDDEPARTEMENT: yup.string().required("Veuillez saisir votre département."),
  NomQuartier: yup.string().required("Veuillez saisir le nom du quartier."),
  IDARRONDISSEMENT: yup.string().required("Veuillez saisir votre arrondissement."),
  eMail: yup.string().required("Veuillez saisir votre adresse e-mail."),
  Civilite: yup.string().required("Veuillez saisir votre civilité."),
  Nom: yup.string().required("Veuillez saisir votre nom."),
  Prenom: yup.string().required("Veuillez saisir votre prénom."),
  TelPortable: yup.string().required("Veuillez saisir votre numéro de téléphone portable."),
  NIU: yup.string().required("Veuillez saisir votre NIU."),
  Zone: yup.string().required("Veuillez saisir votre zone."),
  DateExpirationPiece: yup.string().required("Veuillez saisir la date d'expiration de votre pièce d'identité."),
  CNI: yup.string().required("Veuillez saisir votre numéro de CNI."),
  TypePiece: yup.string().required("Veuillez saisir le type de votre pièce d'identité."),
  Adresse: yup.string().required("Veuillez saisir votre adresse."),
});

export const { errors, handleSubmit, defineField, setFieldValue , resetField, handleReset  } = useForm({
  validationSchema: validationSchema,
});


