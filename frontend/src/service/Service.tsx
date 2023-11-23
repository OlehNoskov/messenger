import axios from "axios";
import {UserSignInDto} from "../dto/UserSignInDto";
import {UserSignUpDto} from "../dto/UserSignUpDto";

const api = axios.create();

export async function login(user: UserSignInDto): Promise<any> {
    return api.post('/login', user);
}

export async function signup(user: UserSignUpDto) {
    return api.post('/signup', user)
}