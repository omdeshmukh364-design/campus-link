// Enhanced database types for LinkedIn-inspired features
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          email?: string;
          full_name: string;
          college_name?: string;
          department?: string;
          year_of_study?: number;
          profile_picture_url?: string;
          cover_image_url?: string;
          bio?: string;
          headline?: string;
          location?: string;
          skills?: string[];
          interests?: string[];
          linkedin_url?: string;
          github_url?: string;
          portfolio_url?: string;
          phone_number?: string;
          verification_status: 'pending' | 'verified' | 'rejected';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      experiences: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          company_organization: string;
          location?: string;
          start_date: string;
          end_date?: string;
          is_current: boolean;
          description?: string;
          skills_used?: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['experiences']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['experiences']['Insert']>;
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          technologies?: string[];
          project_url?: string;
          github_url?: string;
          image_urls?: string[];
          start_date: string;
          end_date?: string;
          is_ongoing: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      achievements: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description?: string;
          issuer: string;
          date_achieved: string;
          certificate_url?: string;
          image_url?: string;
          achievement_type: 'certification' | 'award' | 'competition' | 'academic' | 'other';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['achievements']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['achievements']['Insert']>;
      };
      connections: {
        Row: {
          id: string;
          requester_id: string;
          addressee_id: string;
          status: 'pending' | 'accepted' | 'rejected';
          message?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['connections']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['connections']['Insert']>;
      };
      endorsements: {
        Row: {
          id: string;
          endorser_id: string;
          endorsed_id: string;
          skill: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['endorsements']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['endorsements']['Insert']>;
      };
      recommendations: {
        Row: {
          id: string;
          recommender_id: string;
          recommended_id: string;
          relationship: string;
          content: string;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['recommendations']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['recommendations']['Insert']>;
      };
      opportunities: {
        Row: {
          id: string;
          creator_id: string;
          title: string;
          description: string;
          opportunity_type: 'internship' | 'job' | 'research' | 'project' | 'competition';
          company_organization: string;
          location?: string;
          is_remote: boolean;
          requirements?: string[];
          skills_required?: string[];
          application_deadline?: string;
          application_url?: string;
          salary_range?: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['opportunities']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['opportunities']['Insert']>;
      };
      communities: {
        Row: {
          id: string;
          name: string;
          description: string;
          category: string;
          creator_id: string;
          cover_image_url?: string;
          logo_url?: string;
          website_url?: string;
          social_links?: Record<string, string>;
          location?: string;
          meeting_schedule?: string;
          requirements?: string[];
          tags?: string[];
          member_count: number;
          is_verified: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['communities']['Row'], 'id' | 'member_count' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['communities']['Insert']>;
      };
      community_members: {
        Row: {
          id: string;
          community_id: string;
          user_id: string;
          role: 'member' | 'moderator' | 'admin' | 'owner';
          status: 'pending' | 'approved' | 'rejected';
          joined_at: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['community_members']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['community_members']['Insert']>;
      };
      posts: {
        Row: {
          id: string;
          author_id: string;
          community_id?: string;
          content: string;
          media_urls?: string[];
          post_type: 'text' | 'image' | 'video' | 'carousel' | 'story' | 'achievement' | 'recruitment';
          hashtags?: string[];
          mentions?: string[];
          is_story: boolean;
          story_expires_at?: string;
          likes_count: number;
          comments_count: number;
          shares_count: number;
          saves_count: number;
          is_pinned: boolean;
          visibility: 'public' | 'community' | 'connections' | 'private';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['posts']['Row'], 'id' | 'likes_count' | 'comments_count' | 'shares_count' | 'saves_count' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['posts']['Insert']>;
      };
      post_likes: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['post_likes']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['post_likes']['Insert']>;
      };
      post_comments: {
        Row: {
          id: string;
          post_id: string;
          author_id: string;
          content: string;
          parent_comment_id?: string;
          likes_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['post_comments']['Row'], 'id' | 'likes_count' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['post_comments']['Insert']>;
      };
      post_saves: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['post_saves']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['post_saves']['Insert']>;
      };
      community_highlights: {
        Row: {
          id: string;
          community_id: string;
          title: string;
          description?: string;
          cover_image_url?: string;
          post_ids: string[];
          order_index: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['community_highlights']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['community_highlights']['Insert']>;
      };
    };
  };
}