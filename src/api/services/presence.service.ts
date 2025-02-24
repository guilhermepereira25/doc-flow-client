import { ApiResponse } from "@/lib/types";
import AbstractService from "./abstract.service";
import type {
  GetAllPresencesResponseDto,
  PresenceCreate,
  /*GetPresenceResponseDto*/ Presence,
  GetAllPresencesByUserResponseDto,
} from "@/lib/types";

export default class PresenceService extends AbstractService {
  constructor() {
    super("/presences", true);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  async getAll(data: {
    offset: number;
    limit: number;
  }): Promise<GetAllPresencesResponseDto> {
    console.log(this.basePath + `?offset=${data.offset}&limit=${data.limit}`);
    return await this.api.get(
      this.basePath + `?offset=${data.offset}&limit=${data.limit}`,
    );
  }
  //"/presences/user/{id}"
  async getAllByUser(data: {
    id: string;
    offset: number;
    limit: number;
  }): Promise<GetAllPresencesByUserResponseDto> {
    console.log(
      this.api.get(
        this.basePath +
          `/user/${data.id}` +
          `?offset=${data.offset}&limit=${data.limit}`,
      ),
    );
    return await this.api.get(
      this.basePath +
        `/user/${data.id}` +
        `?offset=${data.offset}&limit=${data.limit}`,
    );
  }

  async create(data: PresenceCreate): Promise<ApiResponse<Presence>> {
    console.log("token: " + this.getToken());
    return await this.api.post(this.basePath, data);
  }

  async patch(
    id: string,
    data: PresenceCreate,
  ): Promise<
    ApiResponse<{
      presence: Presence;
    }>
  > {
    return await this.api.patch(this.basePath + `/${id}`, data);
  }
}
