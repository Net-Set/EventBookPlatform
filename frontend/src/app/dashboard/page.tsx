'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, DollarSign, X, Users } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { bookingsService } from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import { Booking } from '@/types';

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingBooking, setCancellingBooking] = useState<string | null>(null);
  
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingsService.getMyBookings();
        setBookings(data);
      } catch (error: any) {
        setError('Failed to fetch bookings');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      setCancellingBooking(bookingId);
      await bookingsService.cancelBooking(bookingId);
      
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'CANCELLED' }
          : booking
      ));
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setCancellingBooking(null);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-700">Loading your bookings...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED');
  const cancelledBookings = bookings.filter(b => b.status === 'CANCELLED');
  const upcomingBookings = confirmedBookings.filter(b => new Date(b.event.date) > new Date());
  const pastBookings = confirmedBookings.filter(b => new Date(b.event.date) <= new Date());

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}!</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Total Bookings</h3>
            <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Upcoming Events</h3>
            <p className="text-2xl font-bold text-blue-600">{upcomingBookings.length}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Past Events</h3>
            <p className="text-2xl font-bold text-gray-700">{pastBookings.length}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Cancelled</h3>
            <p className="text-2xl font-bold text-red-600">{cancelledBookings.length}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          {upcomingBookings.length === 0 ? (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
              <p className="text-gray-700">No upcoming events. Browse events to book your next experience!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onCancel={handleCancelBooking}
                  isCancelling={cancellingBooking === booking.id}
                  showCancelButton={true}
                />
              ))}
            </div>
          )}
        </div>

        {pastBookings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Events</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pastBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onCancel={handleCancelBooking}
                  isCancelling={false}
                  showCancelButton={false}
                />
              ))}
            </div>
          </div>
        )}

        {cancelledBookings.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cancelled Bookings</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cancelledBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onCancel={handleCancelBooking}
                  isCancelling={false}
                  showCancelButton={false}
                  isCancelled={true}
                />
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

interface BookingCardProps {
  booking: Booking;
  onCancel: (bookingId: string) => void;
  isCancelling: boolean;
  showCancelButton: boolean;
  isCancelled?: boolean;
}

function BookingCard({ booking, onCancel, isCancelling, showCancelButton, isCancelled = false }: BookingCardProps) {
  const eventDate = new Date(booking.event.date);
  const bookingDate = new Date(booking.createdAt);

  return (
    <div className={`bg-gray-50 rounded-lg p-6 border border-gray-200 ${isCancelled ? 'opacity-75' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{booking.event.title}</h3>
        {isCancelled && (
          <span className="bg-red-50 text-red-700 text-xs font-medium px-2 py-1 rounded border border-red-200">
            Cancelled
          </span>
        )}
        {showCancelButton && (
          <button
            onClick={() => onCancel(booking.id)}
            disabled={isCancelling}
            className="text-red-600 hover:text-red-700 disabled:opacity-50"
            title="Cancel booking"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          {eventDate.toLocaleDateString()} at {eventDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          {booking.event.location}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          {booking.seatCount} {booking.seatCount === 1 ? 'seat' : 'seats'}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <DollarSign className="h-4 w-4 mr-2" />
          ${(booking.event.price * booking.seatCount).toFixed(2)} ({booking.seatCount} × ${booking.event.price})
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Booked on {bookingDate.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}