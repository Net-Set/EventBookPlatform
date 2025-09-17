import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserRole } from '@prisma/client';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(
    @GetUser('id') userId: string,
    @Body(ValidationPipe) createBookingDto: CreateBookingDto,
  ) {
    return this.bookingsService.create(userId, createBookingDto);
  }

  @Get('my-bookings')
  findMyBookings(@GetUser('id') userId: string) {
    return this.bookingsService.findUserBookings(userId);
  }

  @Get('stats')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  getBookingStats() {
    return this.bookingsService.getBookingStats();
  }

  @Get('event/:eventId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  findEventBookings(@Param('eventId') eventId: string) {
    return this.bookingsService.findEventBookings(eventId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.bookingsService.findOne(id, userId);
  }

  @Delete(':id')
  cancel(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.bookingsService.cancel(id, userId);
  }
}