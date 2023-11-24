import axios from "axios";
import {UserSignInDto} from "../dto/UserSignInDto";
import {UserSignUpDto} from "../dto/UserSignUpDto";
import {parseJwt} from "./ParserJwt";

const api = axios.create();

interface User {
    accessToken: string;
}

export async function login(user: UserSignInDto): Promise<any> {
    return api.post('/login', user);
}

export async function signup(user: UserSignUpDto): Promise<any> {
    return api.post('/signup', user)
}

export async function findUserByUsername(user: any, username: string): Promise<any> {
    return api.get(`/user/${username}`, {
        headers: {'Authorization': bearerAuth(user)}
    })
}

export async function getCurrentUser(user: any): Promise<any> {
    return api.get(`/user/current`, {
        headers: {'Authorization': bearerAuth(user)}
    })
}

export function bearerAuth(user: any): string {
    return `Bearer ${user.accessToken}`;
}

//Request interceptor (Intercept requests before they are handled by then or catch.)
api.interceptors.request.use(
    (config) => {

        if (config.headers.Authorization) {

            const token: string = config.headers.Authorization.toString().split(' ')[1];
            const data = parseJwt(token);

            if (Date.now() > data.exp * 1000) {
                window.location.href = "/login";
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
