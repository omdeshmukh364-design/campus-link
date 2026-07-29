import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

interface Profile {
  id: string;
  user_id: string;
  email?: string;
  full_name: string;
  college_name?: string;
  department?: string;
  year_of_study?: number;
  profile_picture_url?: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  phone_number?: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  created_at: string;
  updated_at: string;
}

interface UserRole {
  role: 'student' | 'faculty' | 'admin';
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userRole, setUserRole] = useState<'student' | 'faculty' | 'admin' | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState({
          user: session?.user ?? null,
          session: session,
          loading: false,
        });

        // Fetch user profile and role if user is authenticated
        if (session?.user && event !== 'SIGNED_OUT') {
          setTimeout(async () => {
            try {
              // Fetch profile
              const { data: profileData, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', session.user.id)
                .maybeSingle();

              if (error) {
                console.error('Error fetching profile:', error);
                return;
              }

              if (profileData) {
                setProfile(profileData as Profile);
              } else {
                // Create profile if it doesn't exist
                const userData = session.user.user_metadata;
                const newProfile = {
                  user_id: session.user.id,
                  email: session.user.email,
                  full_name: userData.full_name || 'Unknown User',
                  college_name: userData.college_name || null,
                  department: userData.department || null,
                  year_of_study: userData.year_of_study || null,
                  verification_status: 'pending'
                };

                const { data: createdProfile, error: createError } = await supabase
                  .from('profiles')
                  .insert([newProfile])
                  .select()
                  .single();

                if (createError) {
                  console.error('Error creating profile:', createError);
                } else {
                  setProfile(createdProfile as Profile);
                }
              }

              // Fetch user role from user_roles table
              const { data: roleData, error: roleError } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', session.user.id)
                .maybeSingle();

              if (roleError) {
                console.error('Error fetching role:', roleError);
              } else if (roleData) {
                setUserRole(roleData.role as 'student' | 'faculty' | 'admin');
              }
            } catch (error) {
              console.error('Profile fetch error:', error);
            }
          }, 0);
        } else {
          setProfile(null);
          setUserRole(null);
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState({
        user: session?.user ?? null,
        session: session,
        loading: false,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error);
      return { error };
    }
    return { error: null };
  };

  return {
    ...authState,
    profile,
    userRole,
    signOut,
  };
}