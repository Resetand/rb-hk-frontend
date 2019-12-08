import { Strategy } from './strategy';

export interface TariffPlan {
    uuid: string;
    title: string;
    strategies?: Strategy[];
}
