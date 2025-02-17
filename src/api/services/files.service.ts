import { components } from '@/lib/schema';
import AbstractService from './abstract.service';

type GetAllFilesResponseDto = components['schemas']['GetAllFilesResponseDto'];

export default class FileService extends AbstractService {
  constructor() {
    super('/files', true);
  }

  async getAllByUser(args: { limit: number, offset: number }): Promise<GetAllFilesResponseDto> {
    return await this.api.get(this.basePath + `/user?limit=${args.limit}&offset=${args.offset}`);
  }
}
