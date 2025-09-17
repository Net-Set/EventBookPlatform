'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import EventCard from '@/components/EventCard';
import { eventsService } from '@/services/api';
import { Event } from '@/types';

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsService.getUpcomingEvents();
        setEvents(data.slice(0, 6));
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <section className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">
            Discover Amazing Events
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300">
            Find and book tickets for the best events happening in your area. 
            From concerts to conferences, workshops to festivals - we've got it all!
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/events"
              className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Events
            </Link>
            <Link
              href="/auth/register"
              className="border-2 border-indigo-600 text-indigo-400 font-semibold py-3 px-8 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose EventBook?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We make event discovery and booking simple, secure, and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Easy Booking</h3>
              <p className="text-gray-300">
                Book your tickets in just a few clicks. No complicated processes or hidden fees.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Local Events</h3>
              <p className="text-gray-300">
                Discover events happening right in your neighborhood and nearby areas.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
              <p className="text-gray-300">
                Join a community of event enthusiasts and never miss out on amazing experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
              <p className="text-gray-300 mt-2">Don't miss out on these amazing events</p>
            </div>
            <Link
              href="/events"
              className="flex items-center text-indigo-400 hover:text-indigo-300 font-medium"
            >
              View All Events
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg shadow animate-pulse">
                  <div className="h-48 bg-gray-600 rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 bg-gray-600 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-600 rounded"></div>
                      <div className="h-3 bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-white mb-2">No events available</h3>
              <p className="text-gray-400">Check back later for new events!</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-800 text-white border-t border-gray-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of users who trust EventBook for their event booking needs.
          </p>
          <Link
            href="/auth/register"
            className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
}
