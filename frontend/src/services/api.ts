import api from '@/lib/api';
import { Event, CreateEventData, UpdateEventData, Booking, CreateBookingData } from '@/types';

export const eventsService = {
  getEvents: async (): Promise<Event[]> => {
    const response = await api.get('/events');
    return response.data;
  },

  getUpcomingEvents: async (): Promise<Event[]> => {
    const response = await api.get('/events/upcoming');
    return response.data;
  },

  getEvent: async (id: string): Promise<Event> => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  createEvent: async (data: CreateEventData): Promise<Event> => {
    const response = await api.post('/events', data);
    return response.data;
  },

  updateEvent: async (id: string, data: UpdateEventData): Promise<Event> => {
    const response = await api.patch(`/events/${id}`, data);
    return response.data;
  },

  deleteEvent: async (id: string): Promise<void> => {
    await api.delete(`/events/${id}`);
  },

  getAvailableCapacity: async (id: string): Promise<number> => {
    const response = await api.get(`/events/${id}/capacity`);
    return response.data;
  },
};

export const bookingsService = {
  createBooking: async (data: CreateBookingData): Promise<Booking> => {
    const response = await api.post('/bookings', data);
    return response.data;
  },

  getMyBookings: async (): Promise<Booking[]> => {
    const response = await api.get('/bookings/my-bookings');
    return response.data;
  },

  getBooking: async (id: string): Promise<Booking> => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  cancelBooking: async (id: string): Promise<Booking> => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },

  getEventBookings: async (eventId: string): Promise<any[]> => {
    const response = await api.get(`/bookings/event/${eventId}`);
    return response.data;
  },

  getBookingStats: async (): Promise<{ total: number; confirmed: number; cancelled: number }> => {
    const response = await api.get('/bookings/stats');
    return response.data;
  },
};

export const adminService = {
  getDashboard: async (): Promise<any> => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  getAllUsers: async (): Promise<any[]> => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  getUserStats: async (): Promise<any> => {
    const response = await api.get('/admin/users/stats');
    return response.data;
  },

  getAllEventsDetailed: async (): Promise<any[]> => {
    const response = await api.get('/admin/events');
    return response.data;
  },

  getEventStats: async (): Promise<any> => {
    const response = await api.get('/admin/events/stats');
    return response.data;
  },

  getEventBookingsDetailed: async (eventId: string): Promise<any> => {
    const response = await api.get(`/admin/events/${eventId}/bookings`);
    return response.data;
  },

  getAllBookingsDetailed: async (): Promise<any[]> => {
    const response = await api.get('/admin/bookings');
    return response.data;
  },

  getBookingStatsDetailed: async (): Promise<any> => {
    const response = await api.get('/admin/bookings/stats');
    return response.data;
  },

  getRevenueStats: async (): Promise<any> => {
    const response = await api.get('/admin/revenue');
    return response.data;
  },
};