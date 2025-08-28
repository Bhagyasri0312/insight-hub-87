import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smile, 
  Zap, 
  Heart, 
  Star, 
  Frown, 
  AlertTriangle,
  Gamepad2,
  Waves,
  Eye
} from "lucide-react";

interface ToneOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  isSelected?: boolean;
}

const toneOptions: ToneOption[] = [
  {
    id: "neutral",
    name: "Neutral",
    description: "Clear and balanced narration",
    icon: <Smile className="w-5 h-5" />,
    color: "bg-blue-500/20 text-blue-600 border-blue-500/30",
    isSelected: true
  },
  {
    id: "suspenseful",
    name: "Suspenseful",
    description: "Dramatic and engaging delivery",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-orange-500/20 text-orange-600 border-orange-500/30"
  },
  {
    id: "inspiring",
    name: "Inspiring",
    description: "Uplifting and motivational tone",
    icon: <Heart className="w-5 h-5" />,
    color: "bg-pink-500/20 text-pink-600 border-pink-500/30"
  },
  {
    id: "cheerful",
    name: "Cheerful",
    description: "Bright, happy, and energetic",
    icon: <Star className="w-5 h-5" />,
    color: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
  },
  {
    id: "sad",
    name: "Sad",
    description: "Soft, serious, and emotional",
    icon: <Frown className="w-5 h-5" />,
    color: "bg-gray-500/20 text-gray-600 border-gray-500/30"
  },
  {
    id: "angry",
    name: "Angry",
    description: "Intense and passionate delivery",
    icon: <AlertTriangle className="w-5 h-5" />,
    color: "bg-red-500/20 text-red-600 border-red-500/30"
  },
  {
    id: "playful",
    name: "Playful",
    description: "Fun, lively, and whimsical",
    icon: <Gamepad2 className="w-5 h-5" />,
    color: "bg-green-500/20 text-green-600 border-green-500/30"
  },
  {
    id: "calm",
    name: "Calm",
    description: "Relaxed and soothing delivery",
    icon: <Waves className="w-5 h-5" />,
    color: "bg-blue-500/20 text-blue-600 border-blue-500/30"
  },
  {
    id: "confident",
    name: "Confident",
    description: "Assured and persuasive tone",
    icon: <Eye className="w-5 h-5" />,
    color: "bg-purple-500/20 text-purple-600 border-purple-500/30"
  }
];

interface ToneSelectorProps {
  selectedTone: string;
  onToneSelect: (toneId: string) => void;
}

const ToneSelector = ({ selectedTone, onToneSelect }: ToneSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Smile className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">Choose Tone</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {toneOptions.map((tone) => (
          <Card
            key={tone.id}
            className={`
              cursor-pointer transition-all duration-200 p-4 text-center
              ${selectedTone === tone.id 
                ? 'ring-2 ring-primary bg-primary/10 glass-card glow-effect' 
                : 'glass-card hover:bg-white/30 dark:hover:bg-white/10'
              }
            `}
            onClick={() => onToneSelect(tone.id)}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={`p-2 rounded-lg ${tone.color}`}>
                {tone.icon}
              </div>
              <div>
                <h4 className="font-medium text-sm">{tone.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {tone.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;