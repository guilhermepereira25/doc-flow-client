import AbstractService from './abstract.service';
import type { components } from '@/lib/schema';

type UsersGetAllResponse = components['schemas']['GetAllUsersResponseDto'];

export default class AuthService extends AbstractService {
  constructor() {
    super('/users', true);
  }

  async getAll(): Promise<UsersGetAllResponse> {
    return await this.api.get(this.basePath);
  }
}
