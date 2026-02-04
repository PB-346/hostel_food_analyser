-- Create enum for hostel type
CREATE TYPE public.hostel_type AS ENUM ('Boys', 'Girls', 'Co-Ed');

-- Create enum for meal type
CREATE TYPE public.meal_type AS ENUM ('Breakfast', 'Lunch', 'Dinner', 'Snacks');

-- Create table for food reviews
CREATE TABLE public.reviews (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    reviewer_name TEXT NOT NULL,
    hostel_name TEXT NOT NULL,
    hostel_type hostel_type NOT NULL,
    city TEXT,
    meal_type meal_type NOT NULL,
    dish_name TEXT,
    overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
    taste_rating INTEGER NOT NULL CHECK (taste_rating >= 1 AND taste_rating <= 5),
    hygiene_rating INTEGER NOT NULL CHECK (hygiene_rating >= 1 AND hygiene_rating <= 5),
    quantity_rating INTEGER NOT NULL CHECK (quantity_rating >= 1 AND quantity_rating <= 5),
    review_text TEXT CHECK (char_length(review_text) <= 500),
    is_recommended BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read reviews (public feature)
CREATE POLICY "Anyone can read reviews" 
ON public.reviews 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to insert reviews (public feature)
CREATE POLICY "Anyone can submit reviews" 
ON public.reviews 
FOR INSERT 
WITH CHECK (true);