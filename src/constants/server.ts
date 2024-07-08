import axios from "axios";



export const SERVER_URL: string = `${import.meta.env.VITE_API}`;

const server = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true
});

export default server;