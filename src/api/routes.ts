import { Client } from '../models/client';
import { Strategy } from '../models/strategy';
import request from './utils';
import { Bonus } from '../models/bonus';
import { TariffPlan } from '../models/tariffPlan';

export const fetchClients = async () => request.get<Client[]>('/clients').then(({ data }) => data);

export const createStrategy = async (strategyCreation: Strategy) =>
    request.post('/strategies', {
        ...strategyCreation,
        settings: JSON.stringify(strategyCreation.settings),
    });

export const fetchStrategies = async () =>
    request
        .get<Strategy[]>('/strategies')
        .then(({ data }) =>
            data.map(item => ({ ...item, settings: JSON.parse((item as any).settings) })),
        );

export const fetchClient = async (id: string) =>
    request.get<Client>(`/clients/${id}`).then(({ data }) => data);

export const fetchClientBonuses = async (id: string) =>
    request.get<Bonus[]>(`/bonuses?clientId=${id}`).then(({ data }) => data);

export const fetchTariffs = async () =>
    request.get<TariffPlan[]>('tariffPlans').then(({ data }) => data);

export const bindClientWithTariff = (clientId: string, tariffId: string) => {
    request.put(`/clients/link?clientId=${clientId}&tariffPlanId=${tariffId}`);
};
