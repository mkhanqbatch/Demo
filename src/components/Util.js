import axios from "axios";

export const setDataInSessionStorage = (key, data) => {
  window.sessionStorage.setItem(key, JSON.stringify(data));
};
export const getDataFromSessionStorage = (key) => {
  return JSON.parse(window.sessionStorage.getItem(key));
};
export const api = axios.create({
  baseURL: "http://localhost:5000/v1/",
});
