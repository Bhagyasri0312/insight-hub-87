import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Settings2 } from "lucide-react";
import Header from "@/components/Header";
import TextInput from "@/components/TextInput";
import ToneSelector from "@/components/ToneSelector";
import VoiceSelector from "@/components/VoiceSelector";
import GenerationPanel from "@/components/GenerationPanel";
import FilterPanel from "@/components/FilterPanel";
import AdminPanel from "@/components/AdminPanel";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [text, setText] = useState("");
  const [selectedTone, setSelectedTone] = useState("neutral");
  const [selectedVoice, setSelectedVoice] = useState("michael");
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    dateRange: "",
    popularity: [0],
    duration: [0],
    voices: [],
    tones: []
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleGenerate = () => {
    if (!text.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setAudioUrl("generated-audio.mp3");
    }, 3000);
  };

  const handleRegenerate = () => {
    setAudioUrl("");
    handleGenerate();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header 
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onSearch={handleSearch}
      />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            EchoVerse
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your text into expressive, AI-powered audiobooks with customizable tones and natural-sounding voices
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <Button 
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="glass-card border-white/20"
            >
              <Filter className="w-4 h-4 mr-2" />
              Smart Filters
            </Button>
            <Button 
              variant="outline"
              onClick={() => setShowAdmin(true)}
              className="glass-card border-white/20"
            >
              <Settings2 className="w-4 h-4 mr-2" />
              Admin Panel
            </Button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <TextInput 
              text={text}
              onTextChange={setText}
              isProcessing={isGenerating}
            />
            
            <ToneSelector 
              selectedTone={selectedTone}
              onToneSelect={setSelectedTone}
            />
            
            <VoiceSelector 
              selectedVoice={selectedVoice}
              onVoiceSelect={setSelectedVoice}
            />
          </div>

          {/* Right Column */}
          <div>
            <GenerationPanel 
              isGenerating={isGenerating}
              audioUrl={audioUrl}
              onGenerate={handleGenerate}
              onRegenerate={handleRegenerate}
            />
          </div>
        </div>
      </main>

      {/* Filter Panel */}
      <FilterPanel 
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Admin Panel */}
      <AdminPanel 
        isOpen={showAdmin}
        onClose={() => setShowAdmin(false)}
      />
    </div>
  );
};

export default Index;
