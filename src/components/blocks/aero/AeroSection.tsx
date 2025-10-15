'use client';

import { useState } from "react";
import AeroTabs from "./AeroTabs";
import AeroContent from "./AeroContent";
import AeroInput from "./AeroInput";
import HintsSection from "./HintsSection";
import ColorBackground from "./ColorBackground";
import { useActiveTab } from "@/hooks/useActiveTab";

const AeroSection = () => {
  const { activeTab, activeTabId, switchTab, isTransitioning, allTabs } = useActiveTab();
  const [inputValue, setInputValue] = useState("");

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Video Background */}
      <ColorBackground />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-32 pb-16">
        <AeroContent activeTab={activeTab} isTransitioning={isTransitioning} />
        
        {/* Tabs and Input container with consistent width */}
        <div className="w-full max-w-6xl mx-auto">
          {/* Tabs */}
          <AeroTabs 
            tabs={allTabs}
            activeTabId={activeTabId}
            onTabChange={switchTab}
            isTransitioning={isTransitioning}
          />
          
          {/* Input Section */}
          <AeroInput 
            activeTab={activeTab} 
            isTransitioning={isTransitioning}
            inputValue={inputValue}
            onInputChange={setInputValue}
          />
          
          {/* Hints Section */}
          <HintsSection onHintClick={setInputValue} />
        </div>
      </div>
    </section>
  );
};

export default AeroSection;
