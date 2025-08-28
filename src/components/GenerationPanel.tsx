import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Volume2, 
  Download, 
  Play, 
  Pause, 
  Share2, 
  RotateCcw,
  Radio,
  FileAudio
} from "lucide-react";
import { useState } from "react";

interface GenerationPanelProps {
  isGenerating: boolean;
  audioUrl?: string;
  onGenerate: () => void;
  onRegenerate: () => void;
}

const GenerationPanel = ({ 
  isGenerating, 
  audioUrl, 
  onGenerate, 
  onRegenerate 
}: GenerationPanelProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Simulate audio playback
    if (!isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 100);
    }
  };

  const features = [
    "AI-powered tone adaptation",
    "Natural-sounding voice narration", 
    "Downloadable MP3 format",
    "Side-by-side text comparison"
  ];

  return (
    <div className="space-y-6">
      {/* Generate Audio Section */}
      <Card className="glass-card p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Generate Audio</h3>
          </div>

          {isGenerating ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Generating your audiobook...</span>
              </div>
              <Progress value={45} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Processing text with AI-powered voice synthesis...
              </p>
            </div>
          ) : audioUrl ? (
            <div className="space-y-4">
              {/* Audio Player */}
              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePlayPause}
                    className="glass-card border-white/20"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Radio className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Generated Audiobook</span>
                      <Badge variant="outline" className="text-xs">3:45</Badge>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button className="gradient-primary text-white glow-effect">
                  <Download className="w-4 h-4 mr-2" />
                  Download MP3
                </Button>
                <Button variant="outline" className="glass-card border-white/20">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onRegenerate}
                  className="glass-card border-white/20"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              onClick={onGenerate}
              className="w-full gradient-primary text-white glow-effect"
              size="lg"
            >
              <FileAudio className="w-5 h-5 mr-2" />
              Generate Audiobook
            </Button>
          )}
        </div>
      </Card>

      {/* Key Features */}
      <Card className="glass-card p-6">
        <h4 className="font-semibold mb-4">Key Features</h4>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default GenerationPanel;