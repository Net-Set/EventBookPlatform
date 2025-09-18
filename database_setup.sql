-- EventBook Database Setup
-- Run this in phpMyAdmin or MySQL command line

-- Create database
CREATE DATABASE IF NOT EXISTS eventbooking;
USE eventbooking;

-- Users table
CREATE TABLE users (
    id VARCHAR(191) NOT NULL PRIMARY KEY,
    email VARCHAR(191) NOT NULL UNIQUE,
    password VARCHAR(191) NOT NULL,
    name VARCHAR(191) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
);

-- Events table
CREATE TABLE events (
    id VARCHAR(191) NOT NULL PRIMARY KEY,
    title VARCHAR(191) NOT NULL,
    description TEXT NOT NULL,
    date DATETIME(3) NOT NULL,
    location VARCHAR(191) NOT NULL,
    capacity INT NOT NULL,
    price DOUBLE NOT NULL,
    imageUrl VARCHAR(191),
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
);

-- Bookings table
CREATE TABLE bookings (
    id VARCHAR(191) NOT NULL PRIMARY KEY,
    userId VARCHAR(191) NOT NULL,
    eventId VARCHAR(191) NOT NULL,
    seatCount INT NOT NULL DEFAULT 1,
    status ENUM('CONFIRMED', 'CANCELLED') NOT NULL DEFAULT 'CONFIRMED',
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    UNIQUE KEY bookings_userId_eventId_key (userId, eventId),
    CONSTRAINT bookings_userId_fkey FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT bookings_eventId_fkey FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Sample data for testing

-- Insert admin user (password: admin123)
INSERT INTO users (id, email, password, name, role) VALUES 
('admin001', 'admin@eventbook.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/3EQ8h9JhzMoQyaOay', 'Admin User', 'ADMIN');

-- Insert regular user (password: user123)
INSERT INTO users (id, email, password, name, role) VALUES 
('user001', 'john@example.com', '$2b$12$92VHtlVJhwGUqZCRp3QEfO5F1qIGqUQ6E9F.GJkUwDOGhQwRcpK4O', 'John Doe', 'USER');

-- Insert sample events
INSERT INTO events (id, title, description, date, location, capacity, price, imageUrl) VALUES 
(
    'event001',
    'Tech Conference 2025',
    'A comprehensive technology conference featuring the latest trends in web development, AI, and cloud computing. Join industry experts and network with fellow developers.',
    '2025-10-15 09:00:00',
    'Convention Center, Downtown',
    150,
    99.99,
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
),
(
    'event002', 
    'Music Festival - Summer Vibes',
    'Experience the best of summer music with top artists performing live. Food trucks, art installations, and great vibes await you at this outdoor festival.',
    '2025-09-25 18:00:00',
    'Central Park Amphitheater',
    500,
    75.00,
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800'
),
(
    'event003',
    'Cooking Workshop - Italian Cuisine',
    'Learn to cook authentic Italian dishes from a professional chef. This hands-on workshop includes all ingredients and a delicious meal at the end.',
    '2025-09-30 14:00:00',
    'Culinary Arts Studio',
    20,
    85.50,
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'
),
(
    'event004',
    'Art Gallery Opening - Modern Masters',
    'Join us for the opening of our latest exhibition featuring contemporary art from emerging and established artists. Wine and appetizers included.',
    '2025-10-05 19:00:00',
    'Modern Art Gallery',
    100,
    25.00,
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800'
),
(
    'event005',
    'Startup Pitch Competition',
    'Watch innovative startups pitch their ideas to a panel of investors. Networking opportunities and prizes for the best presentations.',
    '2025-10-20 13:00:00',
    'Innovation Hub',
    200,
    15.00,
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800'
);

-- Insert sample bookings
INSERT INTO bookings (id, userId, eventId, seatCount, status) VALUES 
('booking001', 'user001', 'event001', 2, 'CONFIRMED'),
('booking002', 'user001', 'event003', 1, 'CONFIRMED');

-- Show tables to verify creation
SHOW TABLES;

-- Show sample data
SELECT 'Users:' as '';
SELECT * FROM users;

SELECT 'Events:' as '';
SELECT id, title, date, location, capacity, price FROM events;

SELECT 'Bookings:' as '';
SELECT b.id, u.name as user_name, e.title as event_title, b.status 
FROM bookings b 
JOIN users u ON b.userId = u.id 
JOIN events e ON b.eventId = e.id;

-- Useful queries for testing

-- Count bookings per event
SELECT 'Event booking counts:' as '';
SELECT e.title, COUNT(b.id) as booking_count, e.capacity, (e.capacity - COUNT(b.id)) as available_spots
FROM events e
LEFT JOIN bookings b ON e.id = b.eventId AND b.status = 'CONFIRMED'
GROUP BY e.id, e.title, e.capacity
ORDER BY e.date;

COMMIT;