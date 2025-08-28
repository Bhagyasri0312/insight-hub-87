import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  Plus, 
  Edit, 
  Trash2,
  Shield,
  Download
} from "lucide-react";
import { useState } from "react";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
  const [stats] = useState({
    totalUsers: 1247,
    totalAudiobooks: 5623,
    activeGenerations: 23,
    storageUsed: "847 GB"
  });

  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Premium", status: "Active" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "Admin", status: "Active" }
  ]);

  const [audiobooks] = useState([
    { id: 1, title: "The Great Adventure", author: "User123", duration: "2:30", status: "Published" },
    { id: 2, title: "Business Insights", author: "ProUser", duration: "1:45", status: "Processing" },
    { id: 3, title: "Poetry Collection", author: "Artist99", duration: "0:58", status: "Published" }
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-6xl h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center">
              <Shield className="w-6 h-6 mr-2 text-primary" />
              Admin Panel
            </h2>
            <Button variant="ghost" onClick={onClose}>
              ✕
            </Button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 glass-card">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="glass-card p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">{stats.totalUsers}</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="glass-card p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-success/20 rounded-lg">
                      <FileText className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Audiobooks</p>
                      <p className="text-2xl font-bold">{stats.totalAudiobooks}</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="glass-card p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-warning/20 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Jobs</p>
                      <p className="text-2xl font-bold">{stats.activeGenerations}</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="glass-card p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-destructive/20 rounded-lg">
                      <Settings className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Storage Used</p>
                      <p className="text-2xl font-bold">{stats.storageUsed}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="glass-card p-6">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 rounded-lg glass-card">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">User generated new audiobook: "Chapter {i}"</span>
                      <Badge variant="outline" className="ml-auto text-xs">2 min ago</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">User Management</h3>
                <Button className="gradient-primary text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
              
              <Card className="glass-card">
                <div className="p-4 border-b border-white/20">
                  <Input placeholder="Search users..." className="glass-card border-white/20" />
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 glass-card rounded-lg">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={user.role === 'Admin' ? 'default' : 'outline'}>
                            {user.role}
                          </Badge>
                          <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Content Management</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" className="glass-card border-white/20">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button className="gradient-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Content
                  </Button>
                </div>
              </div>
              
              <Card className="glass-card p-4">
                <div className="space-y-3">
                  {audiobooks.map((book) => (
                    <div key={book.id} className="flex items-center justify-between p-3 glass-card rounded-lg">
                      <div>
                        <p className="font-medium">{book.title}</p>
                        <p className="text-sm text-muted-foreground">by {book.author} • {book.duration}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={book.status === 'Published' ? 'default' : 'secondary'}>
                          {book.status}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card className="glass-card p-6">
                <h3 className="font-semibold mb-4">Analytics Dashboard</h3>
                <p className="text-muted-foreground">Analytics charts and user activity tracking would be displayed here.</p>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="glass-card p-6">
                <h3 className="font-semibold mb-4">System Settings</h3>
                <p className="text-muted-foreground">System configuration and settings would be managed here.</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default AdminPanel;