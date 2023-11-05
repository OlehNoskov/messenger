import axios from "axios";

const api = axios.create();

export function registration(user: any): Promise<any> {
    return api.post(`/registration`, user)
        .then(response => response)
        .catch(rejected => {
            console.log(rejected);
        });
}

export function login(user: any): Promise<any> {
    return api.post(`/login`, user)
        .then((response) => response)
        .catch(rejected => {
            console.log(rejected);
        });
}