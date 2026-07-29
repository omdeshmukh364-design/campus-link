import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dummy data for demonstration
const dummyConversations = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "",
    lastMessage: "Hey, are you joining the event tomorrow?",
    unread: true,
  },
  {
    id: "2",
    name: "Maya Patel",
    avatar: "",
    lastMessage: "Let's collaborate on the project!",
    unread: false,
  },
  {
    id: "3",
    name: "Tech Innovators Society",
    avatar: "",
    lastMessage: "Welcome to the community!",
    unread: false,
  },
];

export default function MessagesPage() {
  const { user } = useAuth();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Please sign in to access messages and network with others.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Theme Toggle Button */}
      <ThemeToggle />
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Messages & Networking</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-6">
          {/* Conversation List */}
          <div className="w-1/3 border-r pr-4">
            <h3 className="font-semibold mb-4">Conversations</h3>
            <div className="space-y-2">
              {dummyConversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/40 transition-smooth ${selectedId === conv.id ? "bg-muted/60" : ""}`}
                  onClick={() => setSelectedId(conv.id)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={conv.avatar} />
                    <AvatarFallback>{conv.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{conv.name}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{conv.lastMessage}</div>
                  </div>
                  {conv.unread && <span className="w-2 h-2 bg-primary rounded-full" />}
                </div>
              ))}
            </div>
          </div>
          {/* Message Area */}
          <div className="flex-1 flex flex-col">
            {selectedId ? (
              <>
                <div className="flex-1 mb-4">
                  {/* Message history would go here */}
                  <div className="text-muted-foreground text-center py-12">Chat history coming soon...</div>
                </div>
                <form className="flex gap-2" onSubmit={e => { e.preventDefault(); setMessage(""); }}>
                  <Input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <Button type="submit">Send</Button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Select a conversation to start networking.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
