export interface Transaction {
    uuid: string;
    clientId: string;
    amount: number;
    currency: Currency.RUB;
    mcc: number;
}

export enum Currency {
    RUB = 'RUB',
    USD = 'USD',
}
