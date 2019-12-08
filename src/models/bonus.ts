import { Transaction } from './transation';
import { Strategy } from './strategy';

export interface Bonus {
    id: string;
    amount: number;
    createTime: string;
    transactions: Transaction[];
    strategy: Strategy;
}
