import axios from "axios";
import {UserSignInDto} from "../dto/UserSignInDto";
import {UserSignUpDto} from "../dto/UserSignUpDto";

const api = axios.create();

export async function registration(user: UserSignUpDto | undefined): Promise<any> {
    try {
        return await api.post(`/registration`, user);
    } catch (rejected) {
        console.log(rejected);
    }
}

export async function login(user: UserSignInDto | undefined): Promise<any> {
    try {
        return await api.post(`/login`, user);
    } catch (rejected) {
        console.log(rejected);
    }
}