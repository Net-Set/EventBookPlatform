'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Users, DollarSign, ArrowLeft } from 'lucide-react';
import { eventsService, bookingsService } from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import { Event } from '@/types';

interface EventDetailPageProps {
  params: {
    id: string;
  };
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await eventsService.getEvent(params.id);
        setEvent(data);
      } catch (error: any) {
        setError('Failed to fetch event details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (!event) return;

    try {
      setBooking(true);
      setError('');
      
      await bookingsService.createBooking({ eventId: event.id });
      setBookingSuccess(true);
      
      const updatedEvent = await eventsService.getEvent(params.id);
      setEvent(updatedEvent);
      
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to book event');
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-indigo-600 hover:text-indigo-500"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Event not found</h2>
          <button
            onClick={() => router.back()}
            className="text-indigo-600 hover:text-indigo-500"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const availableSpots = event.capacity - event._count.bookings;
  const isFullyBooked = availableSpots <= 0;
  const isPastEvent = eventDate < new Date();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Events
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {event.imageUrl && (
          <div className="h-64 md:h-96">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
            {isFullyBooked && (
              <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded">
                Sold Out
              </span>
            )}
            {isPastEvent && (
              <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded">
                Past Event
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h2>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">
                      {eventDate.toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-sm">
                      {eventDate.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3" />
                  <span>
                    {availableSpots} of {event.capacity} spots available
                  </span>
                </div>

                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-5 w-5 mr-3" />
                  <span className="text-2xl font-bold text-gray-900">${event.price}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>
          </div>

          {bookingSuccess && (
            <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ Booking successful! Check your dashboard for booking details.
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {!isPastEvent && !isFullyBooked && !bookingSuccess && (
            <div className="mt-8 flex justify-center">
              {isAuthenticated ? (
                <button
                  onClick={handleBooking}
                  disabled={booking}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-8 rounded-lg text-lg transition-colors"
                >
                  {booking ? 'Booking...' : `Book Now - $${event.price}`}
                </button>
              ) : (
                <button
                  onClick={() => router.push('/auth/login')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg text-lg transition-colors"
                >
                  Sign in to Book
                </button>
              )}
            </div>
          )}

          {isFullyBooked && !isPastEvent && (
            <div className="mt-8 text-center">
              <p className="text-gray-600">This event is fully booked.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}