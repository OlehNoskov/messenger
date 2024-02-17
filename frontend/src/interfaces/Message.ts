export interface Message {
    id?: number;
    senderName: string | undefined;
    receiverName: string;
    message: string;
    date: Date;
}