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

// 国际化键值映射
export const getTabContent = (locale: string = 'en') => {
  const isZh = locale === 'zh';
  
  return [
    {
      id: "chat",
      label: isZh ? "聊天模式" : "Chat Mode",
      title: isZh ? "SuperMaker AI 助手" : "SuperMaker AI Assistant",
      subtitle: isZh ? "使用先进AI技术的智能对话" : "Intelligent Conversations with Advanced AI Technology",
      description: isZh ? "体验下一代AI对话。通过我们先进的AI聊天界面获得创意协助、技术指导和创新解决方案。" : "Experience next-generation AI conversations. Get creative assistance, technical guidance, and innovative solutions through our advanced AI chat interface.",
      placeholder: isZh ? "询问我任何关于您创意项目的问题..." : "Ask me anything about your creative projects...",
      backgroundImage: "/src/assets/hero-background.jpg",
      category: "chat" as const
    },
    {
      id: "veo",
      label: isZh ? "Veo 3 视频" : "Veo 3 Video",
      title: isZh ? "Veo 3 AI 视频生成器" : "Veo 3 AI Video Generator",
      subtitle: isZh ? "使用Google最新AI模型创建专业视频" : "Create Professional Videos with Google's Latest AI Model",
      description: isZh ? "使用Google突破性的Veo 3模型生成令人惊叹的高质量视频。以前所未有的真实感将您的想法转化为电影杰作。" : "Generate stunning, high-quality videos using Google's breakthrough Veo 3 model. Transform your ideas into cinematic masterpieces with unprecedented realism.",
      placeholder: isZh ? "描述您想要使用Veo 3创建的视频..." : "Describe the video you want to create with Veo 3...",
      backgroundImage: "/src/assets/veo-video-bg.jpg",
      category: "video" as const
    },
    {
      id: "gemini",
      label: isZh ? "Gemini Flash 图像" : "Gemini Flash Image",
      title: isZh ? "Gemini Flash 图像生成器" : "Gemini Flash Image Generator",
      subtitle: isZh ? "使用Google Gemini进行闪电般快速的图像创建" : "Lightning-Fast Image Creation with Google's Gemini",
      description: isZh ? "使用Gemini Flash以闪电般的速度创建、编辑和增强图像。体验AI图像生成中质量与速度的完美结合。" : "Create, edit, and enhance images at blazing speed with Gemini Flash. Experience the perfect blend of quality and speed in AI image generation.",
      placeholder: isZh ? "描述您想要使用Gemini Flash生成的图像..." : "Describe the image you want to generate with Gemini Flash...",
      backgroundImage: "/src/assets/image-generation-bg.jpg",
      category: "image" as const
    },
    {
      id: "text-video",
      label: isZh ? "文本转视频" : "Text to Video",
      title: isZh ? "AI 文本转视频生成器" : "AI Text-to-Video Generator",
      subtitle: isZh ? "将文字转化为电影体验" : "Transform Words into Cinematic Experiences",
      description: isZh ? "将您的书面想法转化为引人入胜的视频内容。我们先进的AI理解上下文并创建完美匹配您愿景的视频。" : "Convert your written ideas into compelling video content. Our advanced AI understands context and creates videos that perfectly match your vision.",
      placeholder: isZh ? "写下您想要转化为视频的故事或场景..." : "Write a story or scene you want to turn into a video...",
      backgroundImage: "/src/assets/veo-video-bg.jpg",
      category: "video" as const
    },
    {
      id: "image-video",
      label: isZh ? "图像转视频" : "Image to Video",
      title: isZh ? "AI 图像转视频生成器" : "AI Image-to-Video Generator",
      subtitle: isZh ? "用运动为静态图像注入生命" : "Bring Static Images to Life with Motion",
      description: isZh ? "用真实的运动和效果为您的图像制作动画。通过智能运动预测将静态照片转化为动态视频内容。" : "Animate your images with realistic motion and effects. Transform still photographs into dynamic video content with intelligent movement prediction.",
      placeholder: isZh ? "描述您希望图像如何移动和制作动画..." : "Describe how you want your image to move and animate...",
      backgroundImage: "/src/assets/veo-video-bg.jpg",
      category: "video" as const
    },
    {
      id: "text-image",
      label: isZh ? "文本转图像" : "Text to Image",
      title: isZh ? "AI 文本转图像生成器" : "AI Text-to-Image Generator",
      subtitle: isZh ? "从文本描述创建令人惊叹的视觉效果" : "Create Stunning Visuals from Text Descriptions",
      description: isZh ? "从简单的文本提示生成美丽、高分辨率的图像。从照片般真实的场景到艺术插图，让您的想象力变为现实。" : "Generate beautiful, high-resolution images from simple text prompts. From photorealistic scenes to artistic illustrations, bring your imagination to life.",
      placeholder: isZh ? "详细描述您想要创建的图像..." : "Describe the image you want to create in detail...",
      backgroundImage: "/src/assets/image-generation-bg.jpg",
      category: "image" as const
    },
    {
      id: "image-image",
      label: isZh ? "图像转图像" : "Image to Image",
      title: isZh ? "AI 图像转图像生成器" : "AI Image-to-Image Generator",
      subtitle: isZh ? "使用AI转换和增强您的图像" : "Transform and Enhance Your Images with AI",
      description: isZh ? "使用先进的AI编辑、转换和增强现有图像。改变风格、修改内容或完全重新想象您的视觉资产。" : "Edit, transform, and enhance existing images using advanced AI. Change styles, modify content, or completely reimagine your visual assets.",
      placeholder: isZh ? "描述您希望如何转换图像..." : "Describe how you want to transform your image...",
      backgroundImage: "/src/assets/image-generation-bg.jpg",
      category: "image" as const
    },
    {
      id: "text-music",
      label: isZh ? "文本转音乐" : "Text to Music",
      title: isZh ? "AI 音乐生成器" : "AI Music Generator",
      subtitle: isZh ? "从文本描述创作原创音乐" : "Compose Original Music from Text Descriptions",
      description: isZh ? "创建自定义配乐、旋律和完整的音乐作品。从环境音景到完整的管弦乐作品，使用AI进行创作。" : "Create custom soundtracks, melodies, and complete musical compositions. From ambient soundscapes to full orchestral pieces, compose with AI.",
      placeholder: isZh ? "描述您想要的音乐风格、情绪和乐器..." : "Describe the music style, mood, and instruments you want...",
      backgroundImage: "/src/assets/music-generation-bg.jpg",
      category: "audio" as const
    },
    {
      id: "text-speech",
      label: isZh ? "文本转语音" : "Text to Speech",
      title: isZh ? "AI 语音生成器" : "AI Voice Generator",
      subtitle: isZh ? "从文本进行自然语音合成" : "Natural-Sounding Voice Synthesis from Text",
      description: isZh ? "将文本转换为具有情感和表现力的逼真语音。为叙述、对话和配音选择各种语音和语言。" : "Convert text into lifelike speech with emotion and expression. Choose from various voices and languages for narration, dialogue, and voiceovers.",
      placeholder: isZh ? "输入您想要转换为自然语音的文本..." : "Enter the text you want to convert to natural speech...",
      backgroundImage: "/src/assets/music-generation-bg.jpg",
      category: "audio" as const
    }
  ];
};

// 保持向后兼容性
export const tabsContent = getTabContent('en');
