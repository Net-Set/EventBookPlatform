# 🎫 EventBook Platform

A comprehensive event booking platform that makes event discovery and booking simple, secure, and enjoyable.

![EventBook Platform](https://img.shields.io/badge/Status-Active-green)
![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)
![NestJS](https://img.shields.io/badge/NestJS-11.0.1-ea2845)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.16.2-2d3748)

## 🌟 Discover Amazing Events

<div align="center">

### Find and book tickets for the best events happening in your area. From concerts to conferences, workshops to festivals - we've got it all!

🎫 **[Browse Events](#-features)** • 🚀 **[Get Started](#-installation--setup)**

</div>

---

## 💫 Why Choose EventBook?

**We make event discovery and booking simple, secure, and enjoyable.**

<table>
<tr>
<td align="center" width="33%">
  <h3>🎯 Easy Booking</h3>
  <p>Book your tickets in just a few clicks. No complicated processes or lengthy forms.</p>
</td>
<td align="center" width="33%">
  <h3>📍 Local Events</h3>
  <p>Discover events happening right in your neighborhood with location-based search.</p>
</td>
<td align="center" width="33%">
  <h3>👥 Community</h3>
  <p>Join a community of event enthusiasts and never miss out on exciting opportunities.</p>
</td>
</tr>
</table>

## 🌟 Overview

EventBook is a comprehensive full-stack event booking platform that transforms how people discover, book, and manage events in their area. Whether you're looking for concerts, conferences, workshops, or festivals - EventBook provides a seamless experience for both event-goers and organizers.

## 🏗️ Architecture

This project follows a modern full-stack architecture with:

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: NestJS with TypeScript
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT-based authentication with role-based access control
- **State Management**: Zustand for client-side state management

## 🚀 Technology Stack

### Frontend
- **Framework**: Next.js 15.5.3
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **State Management**: Zustand 4.5.7
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Framework**: NestJS 11.0.1
- **Language**: TypeScript 5.7.3
- **Database ORM**: Prisma 6.16.2
- **Database**: MySQL
- **Authentication**: JWT with Passport
- **Password Hashing**: bcrypt                                                                
- **Validation**: class-validator & class-transformer

## 📋 Prerequisites

- Node.js 18.x or later
- MySQL 8.x
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/eventbook-platform.git
cd eventbook-platform
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Configure your DATABASE_URL and JWT_SECRET in .env

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed
```

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Configure your API URL in .env.local
```

### 4. Database Setup
```bash
# Create database and run initial setup
mysql -u root -p < database_setup.sql

# Load demo data (optional)
mysql -u root -p < demo_data.sql
```

## 🚦 Running the Application

### Development Mode

#### Backend (Port 3001)
```bash
cd backend
npm run start:dev
```

#### Frontend (Port 3000)
```bash
cd frontend
npm run dev
```

### Production Mode

#### Backend
```bash
cd backend
npm run build
npm run start:prod
```

#### Frontend
```bash
cd frontend
npm run build
npm start
```

## 📁 Project Structure

```
EventBookPlatform/
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── events/         # Events management
│   │   ├── bookings/       # Booking system
│   │   ├── admin/          # Admin panel
│   │   └── prisma/         # Database service
│   ├── prisma/             # Database schema and migrations
│   └── test/               # E2E tests
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/            # Next.js app router pages
│   │   ├── components/     # Reusable UI components
│   │   ├── lib/            # Utility libraries
│   │   ├── services/       # API services
│   │   ├── store/          # Zustand state management
│   │   └── types/          # TypeScript type definitions
│   └── public/             # Static assets
├── database_setup.sql      # Database initialization
└── demo_data.sql          # Sample data
```

## 🔐 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile

### Events
- `GET /events` - Get all events
- `GET /events/:id` - Get event by ID
- `POST /events` - Create new event (Admin only)
- `PUT /events/:id` - Update event (Admin only)
- `DELETE /events/:id` - Delete event (Admin only)

### Bookings
- `POST /bookings` - Create new booking
- `GET /bookings` - Get user bookings
- `DELETE /bookings/:id` - Cancel booking

### Admin
- `GET /admin/users` - Get all users (Admin only)
- `GET /admin/bookings` - Get all bookings (Admin only)
- `GET /admin/stats` - Get platform statistics (Admin only)

## 🎨 Features

### For Users
- **Event Discovery**: Browse and search for events by category, location, and date
- **Easy Booking**: Simple and secure booking process
- **User Dashboard**: Manage bookings and view event history
- **Responsive Design**: Optimized for all devices

### For Admins
- **Event Management**: Create, update, and delete events
- **User Management**: View and manage user accounts
- **Booking Analytics**: Track bookings and generate reports
- **Dashboard**: Comprehensive admin dashboard with statistics

## 🧪 Testing

### Backend Tests
```bash
cd backend

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Frontend Tests
```bash
cd frontend

# Run tests
npm test

# Test with coverage
npm run test:coverage
```

## 🔄 API Testing

Import the Postman collection for easy API testing:
```
EventBook-API.postman_collection.json
```

## 🚀 Deployment

### Docker Deployment (Recommended)
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Manual Deployment
1. Set up MySQL database
2. Configure environment variables
3. Build and deploy backend to your server
4. Build and deploy frontend to Vercel/Netlify

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing React framework
- NestJS team for the powerful Node.js framework
- Prisma team for the excellent ORM
- All contributors who have helped shape this project

## 📞 Support

For support, email support@eventbook.com or join our Discord community.

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by the EventBook Team