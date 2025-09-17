-- EventBook Demo Data
-- Additional sample data for testing and demonstration
-- Run this AFTER the main database_setup.sql

USE eventbooking;

-- Insert more diverse users for testing
INSERT INTO users (id, email, password, name, role) VALUES 
-- Regular users (password: user123 for all)
('user002', 'alice.smith@email.com', '$2b$12$92VHtlVJhwGUqZCRp3QEfO5F1qIGqUQ6E9F.GJkUwDOGhQwRcpK4O', 'Alice Smith', 'USER'),
('user003', 'bob.johnson@email.com', '$2b$12$92VHtlVJhwGUqZCRp3QEfO5F1qIGqUQ6E9F.GJkUwDOGhQwRcpK4O', 'Bob Johnson', 'USER'),
('user004', 'emma.wilson@email.com', '$2b$12$92VHtlVJhwGUqZCRp3QEfO5F1qIGqUQ6E9F.GJkUwDOGhQwRcpK4O', 'Emma Wilson', 'USER'),
('user005', 'michael.brown@email.com', '$2b$12$92VHtlVJhwGUqZCRp3QEfO5F1qIGqUQ6E9F.GJkUwDOGhQwRcpK4O', 'Michael Brown', 'USER'),
('user006', 'sarah.davis@email.com', '$2b$12$92VHtlVJhwGUqZCRp3QEfO5F1qIGqUQ6E9F.GJkUwDOGhQwRcpK4O', 'Sarah Davis', 'USER'),
('user007', 'david.miller@email.com', '$2b$12$92VHtlVJhwGUqZCRp3QEfO5F1qIGqUQ6E9F.GJkUwDOGhQwRcpK4O', 'David Miller', 'USER'),
('user008', 'lisa.garcia@email.com', '$2b$12$92VHtlVJhwGUqZCRp3QEfO5F1qIGqUQ6E9F.GJkUwDOGhQwRcpK4O', 'Lisa Garcia', 'USER'),

-- Additional admin users (password: admin123 for all)
('admin002', 'events.manager@eventbook.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/3EQ8h9JhzMoQyaOay', 'Events Manager', 'ADMIN'),
('admin003', 'coordinator@eventbook.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/3EQ8h9JhzMoQyaOay', 'Event Coordinator', 'ADMIN');

-- Insert more diverse events for different categories
INSERT INTO events (id, title, description, date, location, capacity, price, imageUrl) VALUES 

-- Technology & Business Events
(
    'event006',
    'AI & Machine Learning Summit 2025',
    'Join industry leaders and researchers as they explore the latest breakthroughs in artificial intelligence and machine learning. Features keynote speeches, hands-on workshops, and networking opportunities with AI professionals.',
    '2025-11-05 09:30:00',
    'Tech Innovation Center, Silicon Valley',
    300,
    199.99,
    'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800'
),
(
    'event007',
    'Digital Marketing Masterclass',
    'Learn cutting-edge digital marketing strategies from experts who have helped brands grow from startup to millions in revenue. Covers SEO, social media, content marketing, and conversion optimization.',
    '2025-10-12 10:00:00',
    'Business Conference Center',
    80,
    149.50,
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
),
(
    'event008',
    'Blockchain & Cryptocurrency Workshop',
    'Understand the fundamentals of blockchain technology and cryptocurrency trading. Perfect for beginners and intermediate learners. Includes practical exercises and Q&A sessions.',
    '2025-10-28 14:00:00',
    'Financial District Conference Room',
    50,
    89.00,
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800'
),

-- Arts & Culture Events
(
    'event009',
    'Photography Workshop - Street Photography',
    'Master the art of street photography with award-winning photographer. Learn composition, lighting, and storytelling through images. Includes outdoor shooting session and photo critique.',
    '2025-09-28 11:00:00',
    'Creative Arts Studio',
    25,
    95.00,
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800'
),
(
    'event010',
    'Jazz Night - Live Music Experience',
    'An intimate evening with renowned jazz musicians performing classic and contemporary pieces. Features local and international artists in a cozy atmosphere with premium drinks and appetizers.',
    '2025-10-08 20:00:00',
    'Blue Note Jazz Club',
    120,
    45.00,
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800'
),
(
    'event011',
    'Contemporary Dance Performance',
    'Experience a mesmerizing contemporary dance performance by the acclaimed City Dance Company. A fusion of modern choreography and classical elements that tells compelling stories through movement.',
    '2025-10-18 19:30:00',
    'Metropolitan Theater',
    200,
    35.00,
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800'
),

-- Health & Wellness Events
(
    'event012',
    'Mindfulness & Meditation Retreat',
    'A day-long retreat focused on mindfulness practices, guided meditation, and stress reduction techniques. Suitable for beginners and experienced practitioners. Includes healthy meals and take-home resources.',
    '2025-09-30 08:00:00',
    'Zen Wellness Center',
    40,
    120.00,
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
),
(
    'event013',
    'Yoga & Wellness Festival',
    'A celebration of holistic health featuring yoga sessions, wellness workshops, healthy food vendors, and mindfulness activities. Perfect for the whole family with activities for all skill levels.',
    '2025-10-15 09:00:00',
    'Riverside Park',
    500,
    25.00,
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'
),

-- Food & Culinary Events
(
    'event014',
    'Wine Tasting - French Vineyard Collection',
    'Explore the rich flavors of French wines with a certified sommelier. Learn about wine regions, tasting techniques, and food pairings. Includes premium wine selections and gourmet cheese platter.',
    '2025-10-22 18:30:00',
    'Wine & Dine Restaurant',
    30,
    75.00,
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800'
),
(
    'event015',
    'Sushi Making Workshop',
    'Learn the art of sushi making from a master sushi chef. Hands-on experience making various types of sushi, understanding ingredients, and proper techniques. All materials and fresh ingredients provided.',
    '2025-09-26 15:00:00',
    'Culinary Arts Institute',
    16,
    110.00,
    'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800'
),

-- Sports & Fitness Events
(
    'event016',
    'Marathon Training Bootcamp',
    'Intensive training program for marathon preparation. Led by professional trainers and experienced runners. Includes training plans, nutrition guidance, and group support system.',
    '2025-10-01 06:00:00',
    'Central Park Running Track',
    100,
    65.00,
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
),
(
    'event017',
    'Rock Climbing Adventure Day',
    'Outdoor rock climbing experience for beginners and intermediate climbers. Professional instruction, safety equipment provided, and stunning natural scenery. Transportation included.',
    '2025-10-14 08:00:00',
    'Mountain Ridge Climbing Area',
    20,
    140.00,
    'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800'
),

-- Education & Learning Events
(
    'event018',
    'Public Speaking Confidence Workshop',
    'Overcome fear of public speaking and develop confidence in presentations. Interactive exercises, video feedback, and personalized coaching. Perfect for professionals and students.',
    '2025-10-07 13:00:00',
    'Learning & Development Center',
    35,
    85.00,
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
),
(
    'event019',
    'Creative Writing Intensive',
    'Three-day intensive workshop for aspiring writers. Cover storytelling techniques, character development, and publishing insights. Led by published authors and literary agents.',
    '2025-11-10 09:00:00',
    'Writers Guild Headquarters',
    25,
    295.00,
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800'
),

-- Entertainment & Social Events
(
    'event020',
    'Comedy Night - Stand-Up Showcase',
    'An evening of laughter featuring local and touring comedians. Family-friendly show with a variety of comedy styles. Light refreshments and cash bar available.',
    '2025-09-29 20:00:00',
    'Comedy Club Downtown',
    150,
    28.00,
    'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800'
),
(
    'event021',
    'Board Game Tournament Weekend',
    'Two-day tournament featuring classic and modern board games. Prizes for winners, casual gaming areas, and game vendors. Perfect for families and serious gamers alike.',
    '2025-10-21 10:00:00',
    'Gaming Convention Center',
    200,
    40.00,
    'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800'
);

-- Insert more realistic bookings to show variety
INSERT INTO bookings (id, userId, eventId, status) VALUES 
-- Tech conference bookings
('booking003', 'user002', 'event006', 'CONFIRMED'),
('booking004', 'user003', 'event006', 'CONFIRMED'),
('booking005', 'user004', 'event006', 'CONFIRMED'),
('booking006', 'user005', 'event006', 'CONFIRMED'),

-- Music and entertainment bookings
('booking007', 'user002', 'event010', 'CONFIRMED'),
('booking008', 'user006', 'event010', 'CONFIRMED'),
('booking009', 'user007', 'event020', 'CONFIRMED'),

-- Workshop bookings
('booking010', 'user003', 'event009', 'CONFIRMED'),
('booking011', 'user008', 'event012', 'CONFIRMED'),
('booking012', 'user004', 'event015', 'CONFIRMED'),

-- Fitness and wellness bookings  
('booking013', 'user005', 'event013', 'CONFIRMED'),
('booking014', 'user006', 'event016', 'CONFIRMED'),

-- Some cancelled bookings for testing
('booking015', 'user007', 'event007', 'CANCELLED'),
('booking016', 'user008', 'event008', 'CANCELLED'),

-- Food and wine events
('booking017', 'user001', 'event014', 'CONFIRMED'),
('booking018', 'user002', 'event015', 'CONFIRMED'),

-- Adventure and sports
('booking019', 'user003', 'event017', 'CONFIRMED'),
('booking020', 'user004', 'event016', 'CONFIRMED');

-- Display summary of demo data
SELECT '=== DEMO DATA SUMMARY ===' as '';

SELECT 'Total Users:' as '', COUNT(*) as count FROM users;
SELECT 'Admin Users:' as '', COUNT(*) as count FROM users WHERE role = 'ADMIN';
SELECT 'Regular Users:' as '', COUNT(*) as count FROM users WHERE role = 'USER';

SELECT 'Total Events:' as '', COUNT(*) as count FROM events;
SELECT 'Total Bookings:' as '', COUNT(*) as count FROM bookings;
SELECT 'Confirmed Bookings:' as '', COUNT(*) as count FROM bookings WHERE status = 'CONFIRMED';
SELECT 'Cancelled Bookings:' as '', COUNT(*) as count FROM bookings WHERE status = 'CANCELLED';

-- Show event categories and pricing
SELECT 'Event Price Range:' as '';
SELECT 
    MIN(price) as min_price, 
    MAX(price) as max_price, 
    AVG(price) as avg_price,
    COUNT(*) as total_events
FROM events;

-- Show popular events (most bookings)
SELECT 'Most Popular Events:' as '';
SELECT 
    e.title,
    COUNT(b.id) as booking_count,
    e.capacity,
    (e.capacity - COUNT(b.id)) as available_spots
FROM events e
LEFT JOIN bookings b ON e.id = b.eventId AND b.status = 'CONFIRMED'
GROUP BY e.id, e.title, e.capacity
ORDER BY booking_count DESC
LIMIT 5;

-- Show upcoming events by month
SELECT 'Upcoming Events by Month:' as '';
SELECT 
    MONTHNAME(date) as month,
    COUNT(*) as event_count
FROM events 
WHERE date >= NOW()
GROUP BY MONTH(date), MONTHNAME(date)
ORDER BY MONTH(date);

-- Show user booking activity
SELECT 'Most Active Users:' as '';
SELECT 
    u.name,
    u.email,
    COUNT(b.id) as total_bookings,
    COUNT(CASE WHEN b.status = 'CONFIRMED' THEN 1 END) as confirmed_bookings
FROM users u
LEFT JOIN bookings b ON u.id = b.userId
WHERE u.role = 'USER'
GROUP BY u.id, u.name, u.email
HAVING COUNT(b.id) > 0
ORDER BY total_bookings DESC;

COMMIT;