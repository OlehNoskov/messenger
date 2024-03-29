import axios, { AxiosResponse } from "axios";

import { Chat } from "../interfaces/Chat";
import { UserSignInDto } from "../dto/UserSignIn.dto";
import { UserSignUpDto } from "../dto/UserSignUp.dto";
import { parseJwt } from "./ParserJwt";

const api = axios.create();

export async function login(user: UserSignInDto): Promise<AxiosResponse<any>> {
    // @ts-ignore
    return api
        .post('/login', user)
        .catch(e => {
            console.error(e)
        });
}

export async function logout(user: any, username: string | undefined): Promise<AxiosResponse<any>> {
    // @ts-ignore
    return api
        .post(`/logout/${username}`, {
        headers: {'Authorization': bearerAuth(user)}
        })
        .catch(e => {
            console.error(e)
        });
}

export async function signup(user: UserSignUpDto): Promise<AxiosResponse<any>> {
    // @ts-ignore
    return api
        .post('/signup', user)
        .catch(e => {
            console.error(e)
        })
}

export async function findUserByUsername(user: any, username: string): Promise<AxiosResponse<any>> {
    // @ts-ignore
    return api
        .get(`/user/${username}`, {
        headers: {'Authorization': bearerAuth(user)}
        })
        .catch(e => {
            console.error(e)
        })
}

export async function createChat(user: any, chat: Chat): Promise<AxiosResponse<any>> {
    // @ts-ignore
    return api
        .post(`/chat/create`, chat, {
        headers: {'Authorization': bearerAuth(user)}
        })
        .catch(e => {
            console.error(e)
        })
}

export async function findChatsByUserName(user: any, userName: any): Promise<AxiosResponse<any>> {
    // @ts-ignore
    return api
        .get(`/chat/all/${userName}`, {
        headers: {'Authorization': bearerAuth(user)}
        })
        .catch(e => {
            console.error(e)
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

            if (Date.now() > data.exp * 10000) {
                window.location.href = "/login";
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
