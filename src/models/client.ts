export interface ClientDesc {
    uuid: string;
    name: string;
    tariffPlan: TariffPlan;
}

export interface Client {}

export interface TariffPlan {
    id: string;
    title: string;
}

interface InstantStrategyType {
    ratio?: number;
}
