import { components } from "@/lib/schema";
import AbstractService from "./abstract.service";
import { CreateFile, CreateFileResponse } from "@/lib/schemas/file.schema";
import { AxiosProgressEvent } from "axios";

type GetAllFilesResponseDto = components["schemas"]["GetAllFilesResponseDto"];

export default class FileService extends AbstractService {
  constructor() {
    super("/files", true);
  }

  async getAllByUser(args: {
    limit: number;
    offset: number;
  }): Promise<GetAllFilesResponseDto> {
    return await this.api.get(
      this.basePath + `/user?limit=${args.limit}&offset=${args.offset}`,
    );
  }

  async create(data: CreateFile): Promise<CreateFileResponse> {
    return await this.api.post(this.basePath, data);
  }

  async upload(fileId: string, fileData: FormData, onUploadProgress: (progressEvent: AxiosProgressEvent) => void) {
    return await this.api.post(this.basePath + `/upload/${fileId}`, fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }
}
