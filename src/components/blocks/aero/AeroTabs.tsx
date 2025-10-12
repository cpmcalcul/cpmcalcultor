'use client';

import { Button } from "@/components/ui/button";
import { TabContent } from "@/types/aero";

interface AeroTabsProps {
  tabs: TabContent[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  isTransitioning: boolean;
}

const AeroTabs = ({ tabs, activeTabId, onTabChange, isTransitioning }: AeroTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8 animate-fade-in">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        
        return (
          <Button
            key={tab.id}
            variant={isActive ? "default" : "secondary"}
            size="sm"
            onClick={() => onTabChange(tab.id)}
            disabled={isTransitioning}
            className={`
              transition-all duration-300 transform hover:scale-105
              ${isActive 
                ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 shadow-lg animate-pulse" 
                : "bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-amber-400/50 backdrop-blur-sm"
              }
              ${isTransitioning ? "opacity-70" : ""}
            `}
          >
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
};

export default AeroTabs;
