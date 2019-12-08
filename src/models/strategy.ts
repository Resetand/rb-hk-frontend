export interface Strategy {
    type: StrategyType;
    title: string;
    settings: InstantStrategy;
}

export interface InstantStrategy {
    intervals: InstantAmountInterval[];
    mссList: string[];
    minBonus: number;
    maxBonus: number;
}

export enum StrategyType {
    INSTANT = 'INSTANT',
}

export interface InstantAmountInterval {
    from?: number;
    to?: number;
    ratio?: number;
    amount?: number;
}
