import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: string, createBookingDto: CreateBookingDto) {
    const { eventId } = createBookingDto;

    const event = await this.prismaService.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.date <= new Date()) {
      throw new BadRequestException('Cannot book past events');
    }

    const existingBooking = await this.prismaService.booking.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });

    if (existingBooking) {
      throw new ConflictException('You have already booked this event');
    }

    const confirmedBookings = await this.prismaService.booking.count({
      where: {
        eventId,
        status: BookingStatus.CONFIRMED,
      },
    });

    if (confirmedBookings >= event.capacity) {
      throw new BadRequestException('Event is fully booked');
    }

    return this.prismaService.booking.create({
      data: {
        userId,
        eventId,
      },
      include: {
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
    });
  }

  async findUserBookings(userId: string) {
    return this.prismaService.booking.findMany({
      where: { userId },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            date: true,
            location: true,
            price: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findEventBookings(eventId: string) {
    return this.prismaService.booking.findMany({
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
  }

  async findOne(id: string, userId?: string) {
    const where: any = { id };
    if (userId) {
      where.userId = userId;
    }

    const booking = await this.prismaService.booking.findUnique({
      where,
      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            date: true,
            location: true,
            price: true,
            imageUrl: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async cancel(id: string, userId: string) {
    const booking = await this.findOne(id, userId);

    if (booking.status === BookingStatus.CANCELLED) {
      throw new BadRequestException('Booking is already cancelled');
    }

    if (booking.event.date <= new Date()) {
      throw new BadRequestException('Cannot cancel booking for past events');
    }

    return this.prismaService.booking.update({
      where: { id },
      data: {
        status: BookingStatus.CANCELLED,
      },
      include: {
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
    });
  }

  async getBookingStats() {
    const totalBookings = await this.prismaService.booking.count();
    const confirmedBookings = await this.prismaService.booking.count({
      where: { status: BookingStatus.CONFIRMED },
    });
    const cancelledBookings = await this.prismaService.booking.count({
      where: { status: BookingStatus.CANCELLED },
    });

    return {
      total: totalBookings,
      confirmed: confirmedBookings,
      cancelled: cancelledBookings,
    };
  }
}