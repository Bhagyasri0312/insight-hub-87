import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Calendar, Clock, Play, Pause } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Generation {
  id: string;
  title: string;
  text_content: string;
  voice_id: string;
  tone_id: string;
  audio_url: string | null;
  duration_seconds: number | null;
  created_at: string;
}

const Downloads = () => {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchGenerations();
    }
  }, [user]);

  const fetchGenerations = async () => {
    try {
      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGenerations(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch downloads',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (audioUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      // Simulate audio playback
      setTimeout(() => setPlayingId(null), 3000);
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'Unknown';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-4">
        <div className="container mx-auto max-w-4xl pt-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Downloads</h1>
            <p className="text-muted-foreground">Please sign in to view your downloads.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-4">
        <div className="container mx-auto max-w-4xl pt-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">Downloads</h1>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-4">
      <div className="container mx-auto max-w-4xl pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Downloads</h1>
          <p className="text-muted-foreground">
            Your generated audio files are ready for download
          </p>
        </div>

        {generations.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Download className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No downloads yet</h3>
              <p className="text-muted-foreground">
                Generate some audio content to see your downloads here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {generations.map((generation) => (
              <Card key={generation.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{generation.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {generation.text_content}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(generation.created_at)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatDuration(generation.duration_seconds)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{generation.voice_id}</Badge>
                      <Badge variant="outline">{generation.tone_id}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {generation.audio_url && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePlay(generation.id)}
                        >
                          {playingId === generation.id ? (
                            <Pause className="h-4 w-4 mr-2" />
                          ) : (
                            <Play className="h-4 w-4 mr-2" />
                          )}
                          {playingId === generation.id ? 'Pause' : 'Play'}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDownload(generation.audio_url!, generation.title)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Downloads;