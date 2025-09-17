import Link from 'next/link';
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import { Event } from '@/types';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date);
  const availableSpots = event.capacity - event._count.bookings;
  const isFullyBooked = availableSpots <= 0;

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700">
      {event.imageUrl && (
        <div className="h-48 bg-gray-600">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-white line-clamp-2">
            {event.title}
          </h3>
          {isFullyBooked && (
            <span className="bg-red-900 text-red-200 text-xs font-medium px-2 py-1 rounded">
              Sold Out
            </span>
          )}
        </div>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            {eventDate.toLocaleDateString()} at {eventDate.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          
          <div className="flex items-center text-sm text-gray-400">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
          
          <div className="flex items-center text-sm text-gray-400">
            <Users className="h-4 w-4 mr-2" />
            {availableSpots} / {event.capacity} spots available
          </div>
          
          <div className="flex items-center text-sm text-gray-400">
            <DollarSign className="h-4 w-4 mr-2" />
            ${event.price}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Link
            href={`/events/${event.id}`}
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            View Details
          </Link>
          
          {!isFullyBooked && (
            <Link
              href={`/events/${event.id}`}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Book Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}