import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  async getDashboard() {
    return this.adminService.getDashboardStats();
  }

  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('users/stats')
  async getUserStats() {
    return this.adminService.getUserStats();
  }

  @Get('events')
  async getAllEvents() {
    return this.adminService.getAllEventsDetailed();
  }

  @Get('events/stats')
  async getEventStats() {
    return this.adminService.getEventStats();
  }

  @Get('events/:eventId/bookings')
  async getEventBookings(@Param('eventId') eventId: string) {
    return this.adminService.getEventBookingsDetailed(eventId);
  }

  @Get('bookings')
  async getAllBookings() {
    return this.adminService.getAllBookingsDetailed();
  }

  @Get('bookings/stats')
  async getBookingStats() {
    return this.adminService.getBookingStats();
  }

  @Get('revenue')
  async getRevenue() {
    return this.adminService.getRevenueStats();
  }
}