import { File } from "@/lib/schemas/file";
import FileService from "../services/files.service";

export async function getFilesByUser(args: {
  limit: number;
  offset: number;
}): Promise<File[] | undefined> {
  try {
    const fileService = new FileService();
    const res = await fileService.getAllByUser({ ...args });
    return res.data?.files;
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error(err);
    }
  }
}
