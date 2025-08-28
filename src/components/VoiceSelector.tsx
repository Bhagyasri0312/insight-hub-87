import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, Play, Pause } from "lucide-react";
import { useState } from "react";

interface Voice {
  id: string;
  name: string;
  description: string;
  gender: "male" | "female";
  accent: string;
  isPremium?: boolean;
}

const voices: Voice[] = [
  {
    id: "michael",
    name: "Michael",
    description: "Confident and clear male voice",
    gender: "male",
    accent: "American"
  },
  {
    id: "allison",
    name: "Allison",
    description: "Friendly and expressive female voice",
    gender: "female",
    accent: "American"
  },
  {
    id: "james",
    name: "James",
    description: "Warm and professional tone",
    gender: "male",
    accent: "British",
    isPremium: true
  },
  {
    id: "sarah",
    name: "Sarah",
    description: "Natural and engaging delivery",
    gender: "female",
    accent: "Australian",
    isPremium: true
  }
];

interface VoiceSelectorProps {
  selectedVoice: string;
  onVoiceSelect: (voiceId: string) => void;
}

const VoiceSelector = ({ selectedVoice, onVoiceSelect }: VoiceSelectorProps) => {
  const [playingPreview, setPlayingPreview] = useState<string | null>(null);

  const handlePreview = (voiceId: string) => {
    if (playingPreview === voiceId) {
      setPlayingPreview(null);
    } else {
      setPlayingPreview(voiceId);
      // Simulate audio preview
      setTimeout(() => setPlayingPreview(null), 3000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Volume2 className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">Select Voice</h3>
      </div>

      <div className="space-y-3">
        {voices.map((voice) => (
          <Card
            key={voice.id}
            className={`
              cursor-pointer transition-all duration-200 p-4
              ${selectedVoice === voice.id 
                ? 'ring-2 ring-primary bg-primary/10 glass-card glow-effect' 
                : 'glass-card hover:bg-white/30 dark:hover:bg-white/10'
              }
            `}
            onClick={() => onVoiceSelect(voice.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium">{voice.name}</h4>
                  {voice.isPremium && (
                    <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">
                      Premium
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {voice.accent}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {voice.description}
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreview(voice.id);
                }}
                className="ml-4"
              >
                {playingPreview === voice.id ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VoiceSelector;