import { ApiResponse, type Event } from '@/lib/types';
import AbstractService from './abstract.service';

export default class AuthService extends AbstractService {
  constructor() {
    super('/events', true);
  }

  async getAll(): Promise<ApiResponse<Event[]>> {
    return await this.api.get(this.basePath);
  }
}
