import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    const { date, ...rest } = createEventDto;
    
    const eventDate = new Date(date);
    if (eventDate <= new Date()) {
      throw new BadRequestException('Event date must be in the future');
    }

    return this.prismaService.event.create({
      data: {
        ...rest,
        date: eventDate,
      },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });
  }

  async findAll() {
    return this.prismaService.event.findMany({
      include: {
        _count: {
          select: { bookings: true },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async findUpcoming() {
    return this.prismaService.event.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const event = await this.prismaService.event.findUnique({
      where: { id },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);
    
    if (updateEventDto.date) {
      const eventDate = new Date(updateEventDto.date);
      if (eventDate <= new Date()) {
        throw new BadRequestException('Event date must be in the future');
      }
    }

    const { date, ...rest } = updateEventDto;
    
    return this.prismaService.event.update({
      where: { id },
      data: {
        ...rest,
        ...(date && { date: new Date(date) }),
      },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    
    return this.prismaService.event.delete({
      where: { id },
    });
  }

  async getAvailableCapacity(eventId: string): Promise<number> {
    const event = await this.findOne(eventId);
    const confirmedBookings = await this.prismaService.booking.count({
      where: {
        eventId,
        status: 'CONFIRMED',
      },
    });

    return event.capacity - confirmedBookings;
  }
}