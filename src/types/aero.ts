export interface TabContent {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  placeholder: string;
  backgroundImage: string;
  category: 'video' | 'image' | 'audio' | 'chat';
}

/**
 * 使用翻译函数生成 Tab 内容
 * @param t - 翻译函数 (来自 useTranslations 或 getTranslations)
 * @returns TabContent 数组
 */
export const getTabContent = (t: (key: string) => string): TabContent[] => {
  return [
    {
      id: "chat",
      label: t('aero_section.tabs.chat'),
      title: t('aero_section.content.chat.title'),
      subtitle: t('aero_section.content.chat.subtitle'),
      description: t('aero_section.content.chat.description'),
      placeholder: t('aero_section.content.chat.placeholder'),
      backgroundImage: "/src/assets/hero-background.jpg",
      category: "chat" as const
    },
    {
      id: "veo",
      label: t('aero_section.tabs.veo'),
      title: t('aero_section.content.veo.title'),
      subtitle: t('aero_section.content.veo.subtitle'),
      description: t('aero_section.content.veo.description'),
      placeholder: t('aero_section.content.veo.placeholder'),
      backgroundImage: "/src/assets/veo-video-bg.jpg",
      category: "video" as const
    },
    {
      id: "gemini",
      label: t('aero_section.tabs.gemini'),
      title: t('aero_section.content.gemini.title'),
      subtitle: t('aero_section.content.gemini.subtitle'),
      description: t('aero_section.content.gemini.description'),
      placeholder: t('aero_section.content.gemini.placeholder'),
      backgroundImage: "/src/assets/image-generation-bg.jpg",
      category: "image" as const
    },
    {
      id: "text-video",
      label: t('aero_section.tabs.text_video'),
      title: t('aero_section.content.text_video.title'),
      subtitle: t('aero_section.content.text_video.subtitle'),
      description: t('aero_section.content.text_video.description'),
      placeholder: t('aero_section.content.text_video.placeholder'),
      backgroundImage: "/src/assets/veo-video-bg.jpg",
      category: "video" as const
    },
    {
      id: "image-video",
      label: t('aero_section.tabs.image_video'),
      title: t('aero_section.content.image_video.title'),
      subtitle: t('aero_section.content.image_video.subtitle'),
      description: t('aero_section.content.image_video.description'),
      placeholder: t('aero_section.content.image_video.placeholder'),
      backgroundImage: "/src/assets/veo-video-bg.jpg",
      category: "video" as const
    },
    {
      id: "text-image",
      label: t('aero_section.tabs.text_image'),
      title: t('aero_section.content.text_image.title'),
      subtitle: t('aero_section.content.text_image.subtitle'),
      description: t('aero_section.content.text_image.description'),
      placeholder: t('aero_section.content.text_image.placeholder'),
      backgroundImage: "/src/assets/image-generation-bg.jpg",
      category: "image" as const
    },
    {
      id: "image-image",
      label: t('aero_section.tabs.image_image'),
      title: t('aero_section.content.image_image.title'),
      subtitle: t('aero_section.content.image_image.subtitle'),
      description: t('aero_section.content.image_image.description'),
      placeholder: t('aero_section.content.image_image.placeholder'),
      backgroundImage: "/src/assets/image-generation-bg.jpg",
      category: "image" as const
    },
    {
      id: "text-music",
      label: t('aero_section.tabs.text_music'),
      title: t('aero_section.content.text_music.title'),
      subtitle: t('aero_section.content.text_music.subtitle'),
      description: t('aero_section.content.text_music.description'),
      placeholder: t('aero_section.content.text_music.placeholder'),
      backgroundImage: "/src/assets/music-generation-bg.jpg",
      category: "audio" as const
    },
    {
      id: "text-speech",
      label: t('aero_section.tabs.text_speech'),
      title: t('aero_section.content.text_speech.title'),
      subtitle: t('aero_section.content.text_speech.subtitle'),
      description: t('aero_section.content.text_speech.description'),
      placeholder: t('aero_section.content.text_speech.placeholder'),
      backgroundImage: "/src/assets/music-generation-bg.jpg",
      category: "audio" as const
    }
  ];
};
