-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT CHECK (role IN ('student', 'parent', 'teacher', 'admin')) DEFAULT 'student',
    age INTEGER,
    gender TEXT,
    language TEXT,
    village TEXT,
    district TEXT,
    mobile TEXT,
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Create education table
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    level TEXT NOT NULL,
    passing_year TEXT NOT NULL,
    institution TEXT NOT NULL,
    percentage TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Create user_skills table
CREATE TABLE IF NOT EXISTS public.user_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    skill TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_interests table
CREATE TABLE IF NOT EXISTS public.user_interests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    interest TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.users;

DROP POLICY IF EXISTS "Users can view their own education" ON public.education;
DROP POLICY IF EXISTS "Users can update their own education" ON public.education;
DROP POLICY IF EXISTS "Users can insert their own education" ON public.education;
DROP POLICY IF EXISTS "Users can delete their own education" ON public.education;

DROP POLICY IF EXISTS "Users can view their own skills" ON public.user_skills;
DROP POLICY IF EXISTS "Users can update their own skills" ON public.user_skills;
DROP POLICY IF EXISTS "Users can insert their own skills" ON public.user_skills;
DROP POLICY IF EXISTS "Users can delete their own skills" ON public.user_skills;

DROP POLICY IF EXISTS "Users can view their own interests" ON public.user_interests;
DROP POLICY IF EXISTS "Users can update their own interests" ON public.user_interests;
DROP POLICY IF EXISTS "Users can insert their own interests" ON public.user_interests;
DROP POLICY IF EXISTS "Users can delete their own interests" ON public.user_interests;

-- Create policies for users table
CREATE POLICY "Users can view their own profile"
    ON public.users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.users FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON public.users FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own profile"
    ON public.users FOR DELETE
    USING (auth.uid() = id);

-- Create policies for education table
CREATE POLICY "Users can view their own education"
    ON public.education FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own education"
    ON public.education FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own education"
    ON public.education FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own education"
    ON public.education FOR DELETE
    USING (auth.uid() = user_id);

-- Create policies for user_skills table
CREATE POLICY "Users can view their own skills"
    ON public.user_skills FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own skills"
    ON public.user_skills FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own skills"
    ON public.user_skills FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own skills"
    ON public.user_skills FOR DELETE
    USING (auth.uid() = user_id);

-- Create policies for user_interests table
CREATE POLICY "Users can view their own interests"
    ON public.user_interests FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own interests"
    ON public.user_interests FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own interests"
    ON public.user_interests FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interests"
    ON public.user_interests FOR DELETE
    USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.education TO authenticated;
GRANT ALL ON public.user_skills TO authenticated;
GRANT ALL ON public.user_interests TO authenticated; 