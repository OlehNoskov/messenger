import axios from "axios";

const api = axios.create();

export function registration(user: UserSignUDto): Promise<UserSignUDto> {
    return api.post(`/registration`, user)
        .then(response => response.data)
        .catch(rejected => {
            console.log(rejected);
        });
}