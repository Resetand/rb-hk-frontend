import { Client, ClientDesc } from '../models/client';
import { Strategy } from '../models/strategy';
import request from './utils';

export const fetchClients = async () =>
    request.get<ClientDesc[]>('/clients').then(({ data }) => data);

export const createStrategy = async (strategyCreation: Strategy) =>
    request.post('/strategies', strategyCreation);

export const fetchStrategies = async () =>
    request.get<Strategy[]>('/strategies').then(({ data }) => data);

export const fetchClient = async (id: string) => request.get<Client>(`/client/${id}`);
