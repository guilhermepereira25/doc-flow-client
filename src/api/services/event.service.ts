import { ApiResponse } from '@/lib/types';
import AbstractService from './abstract.service';
import type { components } from '@/lib/schema';

export type GetAllEventsResponseDto = components['schemas']['GetAllEventsResponseDto'];
export type EventCreate = components['schemas']['CreateEventDto'];
type Event = components['schemas']['Event'];

export default class AuthService extends AbstractService {
  constructor() {
    super('/events', true);
  }

  async getAll(): Promise<GetAllEventsResponseDto> {
    return await this.api.get(this.basePath);
  }

  async create(data: EventCreate): Promise<ApiResponse<Event>> {
    return await this.api.post(this.basePath, data);
  }
}
