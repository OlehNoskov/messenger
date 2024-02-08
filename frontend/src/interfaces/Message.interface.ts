export interface MessageInterface {
    id?: number;
    senderName: string | undefined;
    receiverName: string;
    message: string;
    date: Date;
}