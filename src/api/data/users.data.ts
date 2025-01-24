import UsersService from '../services/users.service';
import { User } from '@/lib/types';

export const getAllUserss = async (): Promise<User[] | undefined> => {
    try {
        const userService = new UsersService();
        const response = await userService.getAll();
        return response?.data;
    } catch (error) {
        console.error(error);
    }
}