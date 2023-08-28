import axios from "axios";

const API = axios.create({baseURL : "https://social-media-server-lbiy.onrender.com"})

export const logIn = (FormData) => API.post("/auth/login", FormData); 
export const signUp = (FormData) => API.post("/auth/register", FormData);                 