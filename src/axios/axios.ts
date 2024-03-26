
import axios from "axios";

let url = "https://cybclient.com";


const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use((req) => {
//   const token = sessionStorage.getItem("token");
//   if (token) {
//     req.headers["Authorization"] = "Bearer " + token;
//   }

const loginFromLocalStorage = localStorage.getItem("UTILISATEUER_LOGIN");
const tokenFromLocalStorage = localStorage.getItem("UTILISATEUER_TOKEN");

const headers  = {
    UTILISATEUER_LOGIN: loginFromLocalStorage,
    UTILISATEUER_TOKEN: tokenFromLocalStorage,
    ACTION: 2,
    RESSOURCE: "",
    CLE_API:123456
};

  // Ajouter les en-têtes personnalisés depuis la constante entete
  for (const [key, value] of Object.entries(headers )) {
    req.headers[key] = value;
  }

  return req;
});

export { api, url };

