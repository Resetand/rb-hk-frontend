export interface Strategy {
    type: StrategyType;
    title: string;
    settings: InstantStrategy;
}

export interface InstantStrategy {
    intervals: IntervalSettings[];
    mcc_list: string[];
    min_bonus: number;
    max_bonus: number;
}

export enum StrategyType {
    INSTANT = 'INSTANT',
    AGGREGATE_DATE = 'AGGREGATE_DATE',
}

export interface IntervalSettings {
    from?: number;
    to?: number;
    ratio?: number;
    amount?: number;
}

export interface AggregateStrategy {
    aggregate_time_settings: AggregateTimeSettings;
    mcc_list: string[];
    min_bonus: number;
    max_bonus: number;
    aggregate_function: AggregateFunction;
    intervals: IntervalSettings;
}

export enum AggregateFunction {
    SUM = 'SUM',
}

export enum TimeUnit {
    DAYS = 'DAYS',
}

export interface AggregateTimeSettings {
    fromTime: Date;
    toTime: Date;
    timeUnit: TimeUnit;
    quantity: number;
}
