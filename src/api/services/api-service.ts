import { AxiosInstance, AxiosRequestConfig } from "axios";
import { axiosInstance, privateAxiosInstance } from "../axios-instance";

export default class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(privateInstance = false) {
    this.axiosInstance = privateInstance ? privateAxiosInstance : axiosInstance;
  }

  async get(url: string) {
    const response = await this.axiosInstance.get(url);
    return response.data;
  }

  async post(url: string, body: object, config?: AxiosRequestConfig<object>) {
    const response = await this.axiosInstance.post(url, body, config);
    return response.data;
  }

  async put(url: string, body: object, config?: AxiosRequestConfig<object>) {
    const response = await this.axiosInstance.put(url, body, config);
    return response.data;
  }

  async patch(url: string, body: object) {
    const response = await this.axiosInstance.patch(url, body);
    return response.data;
  }

  async delete(url: string) {
    const response = await this.axiosInstance.delete(url);
    return response.data;
  }
}
