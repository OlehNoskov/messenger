import {Status} from "../enums/Status";

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    // status: Status;
}