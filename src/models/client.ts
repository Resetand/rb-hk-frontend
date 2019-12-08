import { TariffPlan } from './tariffPlan';

export interface Client {
    uuid: string;
    firstName: string;
    lastName: string;
    tariffPlan: TariffPlan;
}

interface InstantStrategyType {
    ratio?: number;
}

/*

*/
