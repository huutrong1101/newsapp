import axios from "axios";
// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "https://nguyenhuutrong.cyclic.app/api";

export const domainApi = BASE_URL;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});
