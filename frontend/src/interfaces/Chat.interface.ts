import { MessageInterface } from "./Message.interface";

export interface ChatInterface {
    id?: number;
    senderName?: string | undefined;
    receiverName: string;
    messages: MessageInterface[];
}