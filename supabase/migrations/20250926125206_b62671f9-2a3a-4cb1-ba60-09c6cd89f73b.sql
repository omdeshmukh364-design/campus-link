-- Create users profiles table with enhanced security
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT,
  full_name TEXT NOT NULL,
  role TEXT CHECK (role IN ('student', 'faculty', 'admin')) NOT NULL DEFAULT 'student',
  college_name TEXT,
  department TEXT,
  year_of_study INTEGER,
  profile_picture_url TEXT,
  bio TEXT,
  skills TEXT[],
  interests TEXT[],
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  phone_number TEXT,
  verification_status TEXT CHECK (verification_status IN ('pending', 'verified', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create communities table
CREATE TABLE public.communities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  college_name TEXT NOT NULL,
  logo_url TEXT,
  cover_image_url TEXT,
  member_count INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0,
  events_count INTEGER DEFAULT 0,
  faculty_advisor_id UUID,
  status TEXT CHECK (status IN ('active', 'inactive', 'pending_approval')) DEFAULT 'pending_approval',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID NOT NULL
);

-- Enable RLS for communities
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;

-- Communities are viewable by everyone
CREATE POLICY "Communities are viewable by everyone" 
ON public.communities 
FOR SELECT 
USING (true);

-- Only faculty can create communities
CREATE POLICY "Faculty can create communities" 
ON public.communities 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('faculty', 'admin')
  )
);

-- Create posts table
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  author_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  post_type TEXT CHECK (post_type IN ('announcement', 'achievement', 'recruitment', 'story', 'event')) NOT NULL,
  images TEXT[],
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Posts are viewable by everyone
CREATE POLICY "Posts are viewable by everyone" 
ON public.posts 
FOR SELECT 
USING (true);

-- Only community members can create posts (simplified for now)
CREATE POLICY "Authenticated users can create posts" 
ON public.posts 
FOR INSERT 
WITH CHECK (auth.uid() = author_id);

-- Create community memberships table
CREATE TABLE public.community_memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT CHECK (role IN ('member', 'moderator', 'admin')) DEFAULT 'member',
  status TEXT CHECK (status IN ('active', 'pending', 'rejected')) DEFAULT 'pending',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(community_id, user_id)
);

-- Enable RLS for memberships
ALTER TABLE public.community_memberships ENABLE ROW LEVEL SECURITY;

-- Users can view their own memberships
CREATE POLICY "Users can view their own memberships" 
ON public.community_memberships 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can apply to communities
CREATE POLICY "Users can apply to communities" 
ON public.community_memberships 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_communities_updated_at
BEFORE UPDATE ON public.communities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();