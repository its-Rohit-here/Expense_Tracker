import axios from "axios";


export const axiosClient = axios.create({
    baseURL : 'localhost:6000',
})
