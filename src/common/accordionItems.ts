import {SquarePen, UsersRound, Landmark, BarChartHorizontal, Handshake, Car, MapPin, User } from "lucide-vue-next";

export const accordionItems : any = [
    {
      value: "Gestion souscription",
      title: "Gestion souscription",
      icon: SquarePen,
      content: [
        {
          label: "Saisie",
          route: "/saisie",
        },
        {
          label: "Consultation",
          route: "/consultation",
        },
      ],
    },
    {
      value: "Adhérents",
      title: "Adhérents",
      icon: UsersRound,
      content: [
        {
          label: "Liste des Adhérents",
          route: "/liste-adherent",
        },
        {
          label: "Ajouter un adhérent",
          route: "/adherent",
        },
      ],
    },
    {
      value: "Les societes",
      title: "Les societes",
      icon: Landmark,
      content: [
        {
          label: "Listes des societes",
          route: "/liste-societe",
        },
        {
          label: "Ajouter une societe",
          route: "/societe",
        },
      ],
    },
    {
      value: "Comptabilité",
      title: "Comptabilité",
      icon: Landmark,
      content: [
        {
          label: "Consultation de compte",
          route: "/consultation-compte",
        },
        {
          label: "Consultation de caisse",
          route: "/consultation-caisse",
        },
      ],
    },
    {
      value: "Statistiques",
      title: "Statistiques",
      icon: BarChartHorizontal,
      content: [
        {
          label: "Objectifs",
          route: "/liste-objectif",
        },
        {
          label: "Revenus",
          route: "/revenus",
        },
      ],
    },
    {
      value: "Partenaires",
      title: "Partenaires",
      icon: Handshake,
      content: [
        {
          label: "Liste des Stations",
          route: "/liste-station",
        },
      ],
    },
    {
      value: "Automobiles",
      title: "Automobiles",
      icon: Car,
      content: [
        {
          label: "Liste des automobiles",
          route: "/liste-automobile",
        },
        {
          label: "Ajouter un Automobile",
          route: "/automobile",
        },
      ],
    },
    {
      value: "Position Points Vente",
      title: "Position Points Vente",
      icon: MapPin,
      content: [
        {
          label: "Liste des points ventes",
          route: "/liste-point-vente",
        },
      ],
    },
    {
      value: "Gestion des utilisateurs",
      title: "Gestion des utilisateurs",
      icon: User,
      content: [
        {
          label: "Liste des utilisateurs",
          route: "/liste-agent",
        },
      ],
    },
  ];