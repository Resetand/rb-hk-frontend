import { Client } from '../models/client';
import { Strategy } from '../models/strategy';
import request from './utils';
import { Bonus } from '../models/bonus';

export const fetchClients = async () => request.get<Client[]>('/clients').then(({ data }) => data);

export const createStrategy = async (strategyCreation: Strategy) =>
    request.post('/strategies', strategyCreation);

export const fetchStrategies = async () =>
    request.get<Strategy[]>('/strategies').then(({ data }) => data);

export const fetchClient = async (id: string) =>
    request.get<Client>(`/clients/${id}`).then(({ data }) => data);

export const fetchClientBonuses = async (id: string) =>
    request.get<Bonus[]>(`/bonuses?clientId=${id}`).then(({ data }) => data);
