import { useState, useCallback } from 'react';
import { TabContent, getTabContent } from '@/types/aero';

export const useActiveTab = (locale: string = 'en') => {
  const [activeTabId, setActiveTabId] = useState<string>('chat');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tabsContent = getTabContent(locale);
  const activeTab = tabsContent.find(tab => tab.id === activeTabId) || tabsContent[0];

  const switchTab = useCallback((tabId: string) => {
    if (tabId === activeTabId) return;
    
    setIsTransitioning(true);
    
    // Smooth transition delay
    setTimeout(() => {
      setActiveTabId(tabId);
      setIsTransitioning(false);
    }, 200);
  }, [activeTabId]);

  return {
    activeTab,
    activeTabId,
    switchTab,
    isTransitioning,
    allTabs: tabsContent
  };
};
