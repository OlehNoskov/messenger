import axios from "axios";

const api = axios.create();

export function registration(user: UserSignUpDto): Promise<UserSignUpDto> {
    return api.post(`/registration`, user)
        .then(response => response.data)
        .catch(rejected => {
            console.log(rejected);
        });
}

export function login(user: any): Promise<> {
    return api.get(`/login`, user)
        .then(response => response.data)
        .catch(rejected => {
            console.log(rejected);
        });
}