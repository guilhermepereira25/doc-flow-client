import { axiosInstance } from '../axios-instance';

export default class Service {
  static async get(url: string) {
    const response = await axiosInstance.get(url);
    return response.data;
  }

  static async post(url: string, body: object) {
    const response = await axiosInstance.post(url, body);
    return response.data;
  }

  static async put(url: string, body: object) {
    const response = await axiosInstance.put(url, body);
    return response.data;
  }

  static async delete(url: string) {
    const response = await axiosInstance.delete(url);
    return response.data;
  }
}
