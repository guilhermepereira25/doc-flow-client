import AbstractService from './abstract.service';
import type { components } from '@/lib/schema';

type UsersGetAllResponse = components['schemas']['GetAllUsersResponseDto'];

export default class UserService extends AbstractService {
  constructor() {
    super('/users', true);
  }

  async getAll(args: { limit: number, offset: number }): Promise<UsersGetAllResponse> {
    return await this.api.get(this.basePath + `?limit=${args.limit}&offset=${args.offset}`);
  }
}
