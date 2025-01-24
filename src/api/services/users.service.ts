import { ApiResponse, type User } from '@/lib/types';
import AbstractService from './abstract.service';

export default class AuthService extends AbstractService {
  constructor() {
    super('/users', true);
  }

  async getAll(): Promise<ApiResponse<User[]>> {
    return await this.api.get(this.basePath);
  }
}
