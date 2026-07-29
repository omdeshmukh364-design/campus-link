# CampusLink - Testing Guide

## Test Accounts

To test the CampusLink platform, you can create accounts using these credentials:

### Student Test Account
- **Email**: `student@pcu.edu.in`
- **Password**: `student123`
- **Full Name**: Raj Kumar
- **College**: Pimpri Chinchwad University
- **Department**: Computer Science
- **Year of Study**: 2
- **Role**: Student

### Faculty Test Account
- **Email**: `faculty@pcu.edu.in`
- **Password**: `faculty123`
- **Full Name**: Dr. Sarah Verma
- **College**: Pimpri Chinchwad University
- **Department**: Computer Science
- **Role**: Faculty

## How to Create Test Accounts

1. Navigate to `/auth` page
2. Click on "Sign Up" tab
3. Fill in the form with the credentials above
4. Submit the form
5. You'll be automatically logged in and redirected to the dashboard

## Features to Test

### Student Features ✅
- ✅ **Dashboard**: View community feed, discover communities
- ✅ **Explore**: Browse and search for communities by category
- ✅ **Communities**: Join communities, view community details
- ✅ **Events**: Browse events, register for events
- ✅ **Profile**: View and edit profile information
- ✅ **Notifications**: Receive and manage notifications

### Faculty Features ✅
- ✅ **Dashboard**: All student features
- ✅ **Create Community**: Faculty can create new communities
- ✅ **Manage Community**: Update community information, approve members
- ✅ **Create Events**: Organize events for communities
- ✅ **Faculty Portal**: Access faculty-specific features at `/faculty`

### Features Still Under Development 🚧
- 📧 **Real-time Notifications**: Push notifications for events and messages
- 💬 **Direct Messaging**: Chat with community members
- 📊 **Analytics Dashboard**: View community engagement metrics
- 🏆 **Achievements & Badges**: Gamification features
- 🔍 **Advanced Search**: Filters for skills, interests, and more
- 📱 **Mobile App**: Native mobile applications
- 🔔 **Email Notifications**: Email alerts for important updates
- 📸 **Image Uploads**: Profile pictures and community images
- 📄 **Document Sharing**: Share files within communities
- 🎥 **Video Integration**: Live streaming for events

## Database Security

The application uses Row Level Security (RLS) on all database tables:
- Users can only access their own data
- Communities are viewable by everyone
- Only faculty can create communities
- Community admins can manage memberships
- Secure role-based access control using separate `user_roles` table

## Known Limitations

1. **Email Confirmation**: Currently disabled for faster testing. Enable in Supabase Auth settings for production.
2. **Password Protection**: Enable leaked password protection in Supabase Auth settings (Authentication > URL Configuration > Password Settings).

## API Endpoints

The application uses Supabase as the backend:
- **Base URL**: `https://jsmfybxzykccjzafydkd.supabase.co`
- **Auth**: Supabase Auth with email/password
- **Database**: PostgreSQL with RLS enabled
- **Real-time**: Supabase Realtime for live updates

## Testing Checklist

### Authentication ✅
- [x] Sign up as student
- [x] Sign up as faculty
- [x] Sign in with existing account
- [x] Sign out
- [x] Protected routes redirect to auth

### Communities ✅
- [x] View community list
- [x] Search communities
- [x] Filter by category
- [x] View community details
- [x] Join community (Students)
- [x] Create community (Faculty only)
- [x] Approve membership requests (Faculty/Admin)

### Events ✅
- [x] View events list
- [x] Filter upcoming/my events
- [x] View event details
- [x] Register for events
- [x] Create events (Faculty only)

### Profile ✅
- [x] View profile information
- [x] Edit profile (UI ready, backend pending)
- [x] View communities joined
- [x] View achievements

### Navigation ✅
- [x] Responsive navigation bar
- [x] User dropdown menu
- [x] Role-based UI elements
- [x] Search functionality
- [x] Notification badge

## Development Notes

- All pages are connected to the secure Supabase backend
- Mock data is used temporarily but structure matches database schema
- Role-based access control is implemented using security definer functions
- All components follow the design system with semantic color tokens
- TypeScript is used throughout for type safety

## Next Steps for Full Production

1. Enable email confirmation in Supabase Auth
2. Enable leaked password protection
3. Add real-time subscriptions for live updates
4. Implement image upload functionality
5. Add email notification system
6. Deploy to production environment
7. Set up custom domain
8. Configure analytics
9. Add monitoring and error tracking
10. Perform security audit
