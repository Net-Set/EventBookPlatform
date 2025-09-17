import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  async getDashboardStats() {
    const [totalUsers, totalEvents, totalBookings, totalRevenue] = await Promise.all([
      this.prismaService.user.count(),
      this.prismaService.event.count(),
      this.prismaService.booking.count(),
      this.getTotalRevenue(),
    ]);

    const bookingStats = await this.getBookingStats();
    
    const eventStats = await this.getEventStats();

    return {
      overview: {
        totalUsers,
        totalEvents,
        totalBookings,
        totalRevenue,
      },
      bookings: bookingStats,
      events: eventStats,
    };
  }

  async getBookingStats() {
    const [confirmed, cancelled, totalRevenue] = await Promise.all([
      this.prismaService.booking.count({
        where: { status: BookingStatus.CONFIRMED },
      }),
      this.prismaService.booking.count({
        where: { status: BookingStatus.CANCELLED },
      }),
      this.getTotalRevenue(),
    ]);

    const total = confirmed + cancelled;

    return {
      total,
      confirmed,
      cancelled,
      confirmedPercentage: total > 0 ? Math.round((confirmed / total) * 100) : 0,
      cancelledPercentage: total > 0 ? Math.round((cancelled / total) * 100) : 0,
      totalRevenue,
    };
  }

  async getEventStats() {
    const now = new Date();
    
    const [upcoming, past, totalEvents] = await Promise.all([
      this.prismaService.event.count({
        where: { date: { gte: now } },
      }),
      this.prismaService.event.count({
        where: { date: { lt: now } },
      }),
      this.prismaService.event.count(),
    ]);

    const popularEvents = await this.prismaService.event.findMany({
      select: {
        id: true,
        title: true,
        date: true,
        capacity: true,
        _count: {
          select: {
            bookings: {
              where: { status: BookingStatus.CONFIRMED },
            },
          },
        },
      },
      orderBy: {
        bookings: {
          _count: 'desc',
        },
      },
      take: 5,
    });

    return {
      total: totalEvents,
      upcoming,
      past,
      upcomingPercentage: totalEvents > 0 ? Math.round((upcoming / totalEvents) * 100) : 0,
      pastPercentage: totalEvents > 0 ? Math.round((past / totalEvents) * 100) : 0,
      popularEvents: popularEvents.map(event => ({
        id: event.id,
        title: event.title,
        date: event.date,
        capacity: event.capacity,
        bookingCount: event._count.bookings,
        occupancyRate: Math.round((event._count.bookings / event.capacity) * 100),
      })),
    };
  }

  async getUserStats() {
    const totalUsers = await this.prismaService.user.count();
    const adminUsers = await this.prismaService.user.count({
      where: { role: 'ADMIN' },
    });
    const regularUsers = totalUsers - adminUsers;

    const activeUsers = await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        _count: {
          select: {
            bookings: {
              where: { status: BookingStatus.CONFIRMED },
            },
          },
        },
      },
      orderBy: {
        bookings: {
          _count: 'desc',
        },
      },
      take: 10,
    });

    return {
      total: totalUsers,
      admins: adminUsers,
      regularUsers,
      activeUsers: activeUsers.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        joinedAt: user.createdAt,
        totalBookings: user._count.bookings,
      })),
    };
  }

  async getAllUsers() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            bookings: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAllEventsDetailed() {
    const now = new Date();
    
    return this.prismaService.event.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        location: true,
        capacity: true,
        price: true,
        imageUrl: true,
        createdAt: true,
        _count: {
          select: {
            bookings: {
              where: { status: BookingStatus.CONFIRMED },
            },
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    }).then(events => 
      events.map(event => ({
        ...event,
        status: event.date >= now ? 'upcoming' : 'past',
        confirmedBookings: event._count.bookings,
        availableSpots: event.capacity - event._count.bookings,
        occupancyRate: Math.round((event._count.bookings / event.capacity) * 100),
      }))
    );
  }

  async getAllBookingsDetailed() {
    return this.prismaService.booking.findMany({
      select: {
        id: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        event: {
          select: {
            id: true,
            title: true,
            date: true,
            location: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getRevenueStats() {
    const confirmedBookings = await this.prismaService.booking.findMany({
      where: { status: BookingStatus.CONFIRMED },
      include: {
        event: {
          select: {
            price: true,
            title: true,
            date: true,
          },
        },
      },
    });

    const totalRevenue = confirmedBookings.reduce((sum, booking) => sum + booking.event.price, 0);
    
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const recentBookings = await this.prismaService.booking.findMany({
      where: {
        status: BookingStatus.CONFIRMED,
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      include: {
        event: {
          select: {
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const monthlyRevenueMap = new Map<string, number>();
    recentBookings.forEach(booking => {
      const monthKey = booking.createdAt.toISOString().substring(0, 7);
      const currentRevenue = monthlyRevenueMap.get(monthKey) || 0;
      monthlyRevenueMap.set(monthKey, currentRevenue + booking.event.price);
    });

    const monthlyRevenue = Array.from(monthlyRevenueMap.entries())
      .map(([month, revenue]) => ({ month, revenue }))
      .sort((a, b) => a.month.localeCompare(b.month));

    return {
      totalRevenue,
      confirmedBookingsCount: confirmedBookings.length,
      averageBookingValue: confirmedBookings.length > 0 ? totalRevenue / confirmedBookings.length : 0,
      recentBookings: confirmedBookings.slice(0, 10).map(booking => ({
        id: booking.id,
        eventTitle: booking.event.title,
        eventDate: booking.event.date,
        price: booking.event.price,
        bookedAt: booking.createdAt,
      })),
      monthlyRevenue,
    };
  }

  private async getTotalRevenue(): Promise<number> {
    const confirmedBookings = await this.prismaService.booking.findMany({
      where: { status: BookingStatus.CONFIRMED },
      include: {
        event: {
          select: { price: true },
        },
      },
    });

    return confirmedBookings.reduce((sum, booking) => sum + booking.event.price, 0);
  }

  async getEventBookingsDetailed(eventId: string) {
    const event = await this.prismaService.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        location: true,
        capacity: true,
        price: true,
        _count: {
          select: {
            bookings: true,
          },
        },
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    const bookings = await this.prismaService.booking.findMany({
      where: { eventId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const confirmedCount = bookings.filter(b => b.status === BookingStatus.CONFIRMED).length;
    const cancelledCount = bookings.filter(b => b.status === BookingStatus.CANCELLED).length;

    return {
      event,
      bookings,
      statistics: {
        totalBookings: bookings.length,
        confirmedBookings: confirmedCount,
        cancelledBookings: cancelledCount,
        availableSpots: event.capacity - confirmedCount,
        occupancyRate: Math.round((confirmedCount / event.capacity) * 100),
        totalRevenue: confirmedCount * event.price,
      },
    };
  }
}