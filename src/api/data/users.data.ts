import UsersService from '../services/users.service';
import { components } from '@/lib/schema';

type UsersGetAllResponse = components['schemas']['GetAllUsersResponseDto'];
type User = components['schemas']['User'];

export const getAllUsers = async (): Promise<User[] | undefined> => {
    try {
        const userService = new UsersService();
        const response: UsersGetAllResponse = await userService.getAll();
        return response?.data.users;
    } catch (error) {
        console.error(error);
    }
}