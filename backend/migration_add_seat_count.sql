-- Migration to add seatCount to existing bookings table
-- Run this script if you already have the database set up

USE eventbooking;

-- Add seatCount column to existing bookings table
ALTER TABLE bookings ADD COLUMN seatCount INT NOT NULL DEFAULT 1;

-- Update existing bookings to have seatCount = 1
UPDATE bookings SET seatCount = 1 WHERE seatCount IS NULL OR seatCount = 0;

-- Verify the changes
SELECT 'Updated bookings table with seatCount column' as status;
SELECT * FROM bookings LIMIT 5;

COMMIT;