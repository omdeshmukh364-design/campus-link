import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ThemeToggle from "@/components/ThemeToggle";

export default function CreateCommunityPage() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* Theme Toggle Button */}
        <ThemeToggle />
        <Card>
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Please sign in to create a community.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (!name.trim() || !category.trim() || !collegeName.trim()) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }
    try {
      const { error: dbError } = await supabase.from("communities").insert([
        {
          name: name.trim(),
          description: description.trim(),
          category: category.trim(),
          college_name: collegeName.trim(),
          created_by: user.id,
          created_at: new Date().toISOString(),
        },
      ] as any);
      if (dbError) {
        setError(dbError.message);
      } else {
        setSuccess("Community created successfully!");
        setName("");
        setDescription("");
        setCategory("");
        setCollegeName("");
      }
    } catch (err) {
      setError("Failed to create community. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create a Community</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleCreate}>
            <div>
              <label className="block mb-1 font-medium">Community Name *</label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter community name" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your community" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Category *</label>
              <Input value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Technology, Arts, Sports" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">College/University *</label>
              <Input value={collegeName} onChange={e => setCollegeName(e.target.value)} placeholder="Enter institution name" required />
            </div>
            {error && <div className="text-destructive text-sm">{error}</div>}
            {success && <div className="text-success text-sm">{success}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Community"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
