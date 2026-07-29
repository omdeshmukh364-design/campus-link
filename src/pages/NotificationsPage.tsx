import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell,
  UserPlus,
  Calendar,
  MessageSquare,
  Award,
  Check,
  Trash2
} from "lucide-react";

export default function NotificationsPage() {
  const { profile, userRole } = useAuth();

  // Mock notifications - will be replaced with real data from Supabase
  const notifications = [
    {
      id: "1",
      type: "community",
      title: "Welcome to Tech Innovators Society!",
      message: "Your membership has been approved. Start exploring and connecting with other members.",
      timestamp: "2 hours ago",
      isRead: false,
      icon: UserPlus
    },
    {
      id: "2",
      type: "event",
      title: "Upcoming Event: AI Workshop",
      message: "Your registered event starts in 2 days. Don't forget to prepare!",
      timestamp: "1 day ago",
      isRead: false,
      icon: Calendar
    },
    {
      id: "3",
      type: "message",
      title: "New comment on your post",
      message: "Alex Chen commented: 'Great insights! Would love to collaborate.'",
      timestamp: "2 days ago",
      isRead: true,
      icon: MessageSquare
    },
    {
      id: "4",
      type: "achievement",
      title: "Achievement Unlocked!",
      message: "You've attended 5 community events. Keep up the great work!",
      timestamp: "3 days ago",
      isRead: true,
      icon: Award
    }
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const NotificationCard = ({ notification }: { notification: typeof notifications[0] }) => {
    const Icon = notification.icon;
    
    return (
      <Card className={notification.isRead ? "opacity-60" : ""}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-lg ${notification.isRead ? 'bg-muted' : 'bg-primary/10'}`}>
              <Icon className={`h-5 w-5 ${notification.isRead ? 'text-muted-foreground' : 'text-primary'}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-medium line-clamp-1">{notification.title}</h3>
                {!notification.isRead && (
                  <Badge variant="secondary" className="ml-2">New</Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {notification.message}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {notification.timestamp}
                </span>
                
                <div className="flex space-x-2">
                  {!notification.isRead && (
                    <Button variant="ghost" size="sm">
                      <Check className="h-4 w-4 mr-1" />
                      Mark as read
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle Button */}
      <ThemeToggle />
      <div className="container py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm">
              <a href="/dashboard">
                Return to Dashboard
              </a>
            </Button>
            <div>
              <h1 className="text-4xl font-bold mb-2">Notifications</h1>
              <p className="text-muted-foreground">
                {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              All
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {notifications.filter(n => !n.isRead).length > 0 ? (
              notifications
                .filter(n => !n.isRead)
                .map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))
            ) : (
              <Card className="p-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Unread Notifications</h3>
                <p className="text-muted-foreground">
                  You're all caught up!
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="communities" className="space-y-4">
            {notifications
              .filter(n => n.type === 'community')
              .map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            {notifications
              .filter(n => n.type === 'event')
              .map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
