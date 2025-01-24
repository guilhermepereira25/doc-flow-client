import EventService from '../services/event.service';
import { Event } from '@/lib/types';

export const getAllEvents = async (): Promise<Event[] | undefined> => {
    try {
        const eventService = new EventService();
        const response = await eventService.getAll();
        return response?.data;
    } catch (error) {
        console.error(error);
    }
}