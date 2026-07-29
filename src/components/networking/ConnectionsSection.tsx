import { useState } from "react";
import { Users, UserPlus, MessageCircle, MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Connection {
  id: string;
  user_id: string;
  full_name: string;
  headline?: string;
  profile_picture_url?: string;
  college_name?: string;
  department?: string;
  mutual_connections?: number;
  connection_date?: string;
}

interface ConnectionRequest {
  id: string;
  requester_id: string;
  full_name: string;
  headline?: string;
  profile_picture_url?: string;
  college_name?: string;
  message?: string;
  created_at: string;
}

interface ConnectionsSectionProps {
  connections: Connection[];
  pendingRequests: ConnectionRequest[];
  sentRequests: ConnectionRequest[];
  isOwnProfile?: boolean;
  onAcceptRequest?: (requestId: string) => void;
  onRejectRequest?: (requestId: string) => void;
  onCancelRequest?: (requestId: string) => void;
  onMessage?: (userId: string) => void;
  onViewProfile?: (userId: string) => void;
}

export function ConnectionsSection({
  connections,
  pendingRequests,
  sentRequests,
  isOwnProfile = false,
  onAcceptRequest,
  onRejectRequest,
  onCancelRequest,
  onMessage,
  onViewProfile
}: ConnectionsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("connections");

  const filteredConnections = connections.filter(connection =>
    connection.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.headline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.college_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Users className="h-5 w-5" />
            Network
          </CardTitle>
          <Badge variant="secondary">
            {connections.length} connection{connections.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="connections">
              Connections ({connections.length})
            </TabsTrigger>
            {isOwnProfile && (
              <>
                <TabsTrigger value="pending">
                  Pending ({pendingRequests.length})
                </TabsTrigger>
                <TabsTrigger value="sent">
                  Sent ({sentRequests.length})
                </TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="connections" className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search connections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Connections List */}
            {filteredConnections.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>
                  {searchQuery ? 'No connections found matching your search' : 'No connections yet'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredConnections.map((connection) => (
                  <div key={connection.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                    <Avatar 
                      className="h-12 w-12 cursor-pointer" 
                      onClick={() => onViewProfile?.(connection.user_id)}
                    >
                      <AvatarImage src={connection.profile_picture_url} />
                      <AvatarFallback>
                        {connection.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="font-medium cursor-pointer hover:text-primary transition-colors"
                        onClick={() => onViewProfile?.(connection.user_id)}
                      >
                        {connection.full_name}
                      </h3>
                      {connection.headline && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {connection.headline}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        {connection.college_name && (
                          <span>{connection.college_name}</span>
                        )}
                        {connection.mutual_connections && connection.mutual_connections > 0 && (
                          <>
                            <span>•</span>
                            <span>{connection.mutual_connections} mutual connection{connection.mutual_connections !== 1 ? 's' : ''}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onMessage?.(connection.user_id)}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewProfile?.(connection.user_id)}>
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>Remove Connection</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {isOwnProfile && (
            <>
              <TabsContent value="pending" className="space-y-4">
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No pending connection requests</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pendingRequests.map((request) => (
                      <div key={request.id} className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={request.profile_picture_url} />
                            <AvatarFallback>
                              {request.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium">{request.full_name}</h3>
                            {request.headline && (
                              <p className="text-sm text-muted-foreground">{request.headline}</p>
                            )}
                            {request.college_name && (
                              <p className="text-xs text-muted-foreground mt-1">{request.college_name}</p>
                            )}
                            
                            {request.message && (
                              <div className="mt-2 p-2 bg-muted/30 rounded text-sm">
                                <p className="text-muted-foreground text-xs mb-1">Message:</p>
                                <p>{request.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <Button
                            onClick={() => onAcceptRequest?.(request.id)}
                            size="sm"
                            className="flex-1"
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => onRejectRequest?.(request.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="sent" className="space-y-4">
                {sentRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No sent connection requests</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sentRequests.map((request) => (
                      <div key={request.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={request.profile_picture_url} />
                          <AvatarFallback>
                            {request.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium">{request.full_name}</h3>
                          {request.headline && (
                            <p className="text-sm text-muted-foreground">{request.headline}</p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Pending</Badge>
                          <Button
                            onClick={() => onCancelRequest?.(request.id)}
                            variant="outline"
                            size="sm"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}