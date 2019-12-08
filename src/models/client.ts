import { TariffPlan } from './tariffPlan';

export interface Client {
    uuid: string;
    firstName: string;
    lastName: string;
    tariffPlan: TariffPlan;
    bonusCount?: number;
}

interface InstantStrategyType {
    ratio?: number;
}
