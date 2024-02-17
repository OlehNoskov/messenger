import { Message } from "./Message";

export interface Chat {
    id?: number;
    senderName?: string | undefined;
    receiverName: string;
    messages: Message[];
}