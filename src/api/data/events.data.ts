import EventService from '../services/event.service';
import { components } from '@/lib/schema';

type EventCreate = components['schemas']['CreateEventDto'];
type Event = components['schemas']['Event'];

export const getAllEvents = async (): Promise<Event[] | undefined> => {
    try {
        const eventService = new EventService();
        const response = await eventService.getAll();
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (process.env.VITE_ENV === 'development') {
            console.error(error);
        }
    }
}

export const createEvent = async (data: EventCreate): Promise<Event | boolean> => {
    try {
        const eventService = new EventService();
        const response = await eventService.create(data);
        return response.data;
    } catch (error) {
        if (process.env.VITE_ENV === 'development') {
            console.error(error);
        }
        return false;
    }
}