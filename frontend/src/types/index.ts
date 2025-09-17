export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  price: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    bookings: number;
  };
}

export interface CreateEventData {
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  price: number;
  imageUrl?: string;
}

export interface UpdateEventData extends Partial<CreateEventData> {}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  status: 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    price: number;
    imageUrl?: string;
  };
}

export interface CreateBookingData {
  eventId: string;
}

export interface DashboardStats {
  overview: {
    totalUsers: number;
    totalEvents: number;
    totalBookings: number;
    totalRevenue: number;
  };
  bookings: {
    total: number;
    confirmed: number;
    cancelled: number;
    confirmedPercentage: number;
    cancelledPercentage: number;
    totalRevenue: number;
  };
  events: {
    total: number;
    upcoming: number;
    past: number;
    upcomingPercentage: number;
    pastPercentage: number;
    popularEvents: PopularEvent[];
  };
}

export interface PopularEvent {
  id: string;
  title: string;
  date: string;
  capacity: number;
  bookingCount: number;
  occupancyRate: number;
}

export interface UserWithStats {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  _count: {
    bookings: number;
  };
}

export interface UserStats {
  total: number;
  admins: number;
  regularUsers: number;
  activeUsers: ActiveUser[];
}

export interface ActiveUser {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  totalBookings: number;
}

export interface EventWithStats {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  price: number;
  imageUrl?: string;
  createdAt: string;
  status: 'upcoming' | 'past';
  confirmedBookings: number;
  availableSpots: number;
  occupancyRate: number;
}

export interface BookingWithDetails {
  id: string;
  status: 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  event: {
    id: string;
    title: string;
    date: string;
    location: string;
    price: number;
  };
}

export interface EventBookingDetails {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    capacity: number;
    price: number;
  };
  bookings: Array<{
    id: string;
    status: 'CONFIRMED' | 'CANCELLED';
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }>;
  statistics: {
    totalBookings: number;
    confirmedBookings: number;
    cancelledBookings: number;
    availableSpots: number;
    occupancyRate: number;
    totalRevenue: number;
  };
}

export interface RevenueStats {
  totalRevenue: number;
  confirmedBookingsCount: number;
  averageBookingValue: number;
  recentBookings: Array<{
    id: string;
    eventTitle: string;
    eventDate: string;
    price: number;
    bookedAt: string;
  }>;
}