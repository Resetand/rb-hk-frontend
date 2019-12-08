import { Strategy } from './strategy';

export interface TariffPlan {
    id: string;
    title: string;
    strategies?: Strategy[];
}
