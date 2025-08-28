import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Mic, Type } from "lucide-react";
import { useState, useRef } from "react";

interface TextInputProps {
  text: string;
  onTextChange: (text: string) => void;
  isProcessing?: boolean;
}

const TextInput = ({ text, onTextChange, isProcessing = false }: TextInputProps) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxCharacters = 5000;
  const characterCount = text.length;
  const progressPercentage = (characterCount / maxCharacters) * 100;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onTextChange(content);
      };
      reader.readAsText(file);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <FileText className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">Input Your Text</h3>
        <Badge variant="outline" className="ml-auto">
          {characterCount}/{maxCharacters}
        </Badge>
      </div>

      <Card className={`
        glass-card transition-all duration-200 p-6
        ${dragActive ? 'ring-2 ring-primary bg-primary/10' : ''}
      `}>
        <div
          className="space-y-4"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {/* File Upload Area */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFileButtonClick}
              className="glass-card border-white/20"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload .txt
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="glass-card border-white/20"
              disabled
            >
              <Mic className="w-4 h-4 mr-2" />
              Voice Input
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="glass-card border-white/20"
              disabled
            >
              <Type className="w-4 h-4 mr-2" />
              Process Text
            </Button>
          </div>

          {/* Text Area */}
          <div className="relative">
            <Textarea
              placeholder="Paste your text here or upload a .txt file..."
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              className="min-h-[200px] glass-card border-white/20 resize-none"
              maxLength={maxCharacters}
              disabled={isProcessing}
            />
            
            {dragActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-primary/10 border-2 border-dashed border-primary rounded-lg">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-primary font-medium">Drop your text file here</p>
                </div>
              </div>
            )}
          </div>

          {/* Character Count Progress */}
          <div className="space-y-2">
            <Progress 
              value={progressPercentage} 
              className="h-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Character count</span>
              <span className={characterCount > maxCharacters * 0.9 ? 'text-warning' : ''}>
                {characterCount} / {maxCharacters}
              </span>
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".txt"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
          className="hidden"
        />
      </Card>
    </div>
  );
};

export default TextInput;