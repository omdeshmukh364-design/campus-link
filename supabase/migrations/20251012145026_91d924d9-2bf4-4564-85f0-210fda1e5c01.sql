-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('student', 'faculty', 'admin');

-- Create user_roles table for secure role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Update communities policies to use has_role function
DROP POLICY IF EXISTS "Faculty can create communities" ON public.communities;

CREATE POLICY "Faculty can create communities"
  ON public.communities
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'faculty') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Faculty can update their communities"
  ON public.communities
  FOR UPDATE
  USING (created_by = auth.uid() AND (public.has_role(auth.uid(), 'faculty') OR public.has_role(auth.uid(), 'admin')));

-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  created_by UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  max_participants INTEGER,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  image_url TEXT,
  status TEXT DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone"
  ON public.events
  FOR SELECT
  USING (true);

CREATE POLICY "Community members can create events"
  ON public.events
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.community_memberships
      WHERE user_id = auth.uid() AND community_id = events.community_id AND status = 'approved'
    )
  );

-- Create event_registrations table
CREATE TABLE public.event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  status TEXT DEFAULT 'registered',
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(event_id, user_id)
);

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can register for events"
  ON public.event_registrations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their registrations"
  ON public.event_registrations
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  related_id UUID,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their notifications"
  ON public.notifications
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their notifications"
  ON public.notifications
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create post_likes table
CREATE TABLE public.post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(post_id, user_id)
);

ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can like posts"
  ON public.post_likes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view likes"
  ON public.post_likes
  FOR SELECT
  USING (true);

CREATE POLICY "Users can unlike posts"
  ON public.post_likes
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create post_comments table
CREATE TABLE public.post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments are viewable by everyone"
  ON public.post_comments
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON public.post_comments
  FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- Update posts policies
CREATE POLICY "Authors can update their posts"
  ON public.posts
  FOR UPDATE
  USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their posts"
  ON public.posts
  FOR DELETE
  USING (auth.uid() = author_id);

-- Update community_memberships policies
CREATE POLICY "Community admins can update memberships"
  ON public.community_memberships
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.communities
      WHERE id = community_memberships.community_id 
      AND created_by = auth.uid()
    )
  );

-- Create triggers for updated_at
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_post_comments_updated_at
  BEFORE UPDATE ON public.post_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();