'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Home, Search, User, Settings, Heart, Plus } from 'lucide-react';
import { BottomNavigation, navigationPresets } from '@/components/ui/bottom-navigation';
import { AdvancedBottomNavigation, advancedPresets } from '@/components/ui/advanced-bottom-navigation';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

interface MobileNavigationProps {
  variant?: 'basic' | 'advanced';
  preset?: 'default' | 'social' | 'ecommerce' | 'messaging' | 'music' | 'shopping';
  theme?: 'default' | 'minimal' | 'colorful' | 'dark' | 'light' | 'gradient' | 'glassmorphism';
  showLabels?: boolean;
  animationType?: 'bounce' | 'slide' | 'scale' | 'rotate';
  hapticFeedback?: boolean;
}

// 默认路由配置
const defaultNavItems = [
  { id: 'home', icon: Home, label: '首页', path: '/' },
  { id: 'search', icon: Search, label: '社交', path: '/social' },
  { id: 'create', icon: Plus, label: '工具', path: '/tools' },
  { id: 'favorites', icon: Heart, label: '文章', path: '/blog' },
  { id: 'profile', icon: User, label: '单词表', path: '/glossary' }
];

// 社交应用路由配置
const socialNavItems = [
  { id: 'home', icon: Home, label: '首页', path: '/' },
  { id: 'search', icon: Search, label: '发现', path: '/discover' },
  { id: 'create', icon: Plus, label: '发布', path: '/create', isSpecial: true },
  { id: 'activity', icon: Heart, label: '动态', path: '/activity' },
  { id: 'profile', icon: User, label: '我的', path: '/profile' }
];

// 电商应用路由配置
const ecommerceNavItems = [
  { id: 'home', icon: Home, label: '首页', path: '/' },
  { id: 'search', icon: Search, label: '搜索', path: '/search' },
  { id: 'cart', icon: Plus, label: '购物车', path: '/cart' },
  { id: 'favorites', icon: Heart, label: '收藏', path: '/favorites' },
  { id: 'account', icon: User, label: '账户', path: '/account' }
];

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  variant = 'basic',
  preset = 'default',
  theme = 'default',
  showLabels = true,
  animationType = 'bounce',
  hapticFeedback = true
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const isMobile = useIsMobile();
  const t = useTranslations('navigation');

  // 如果不是移动端，不显示底部导航
  if (!isMobile) {
    return null;
  }

  // 获取当前预设的导航项
  const getNavItems = () => {
    let items;
    switch (preset) {
      case 'social':
        items = socialNavItems;
        break;
      case 'ecommerce':
        items = ecommerceNavItems;
        break;
      default:
        items = defaultNavItems;
        break;
    }

    // 添加国际化支持和当前路径检测
    return items.map(item => ({
      ...item,
      label: t(item.id, { fallback: item.label }),
      isActive: pathname === `/${locale}${item.path}` || 
                (item.path === '/' && pathname === `/${locale}`),
      color: getItemColor(item.id)
    }));
  };

  // 获取项目颜色
  const getItemColor = (id: string) => {
    const colorMap: Record<string, string> = {
      home: '#8B5CF6',
      search: '#06B6D4',
      create: '#F59E0B',
      discover: '#06B6D4',
      activity: '#EF4444',
      favorites: '#EF4444',
      cart: '#F59E0B',
      profile: '#10B981',
      account: '#10B981'
    };
    return colorMap[id] || '#8B5CF6';
  };

  // 处理导航点击
  const handleNavClick = (item: any) => {
    // 对于特殊按钮，可以自定义行为
    if (item.isSpecial) {
      // 例如：打开模态框、相机等
      console.log('特殊按钮点击:', item.label);
      // 这里可以添加自定义逻辑
    }
    
    // 正常路由跳转
    const fullPath = item.path === '/' ? `/${locale}` : `/${locale}${item.path}`;
    router.push(fullPath);
  };

  const navItems = getNavItems();

  // 根据变体选择组件
  if (variant === 'advanced') {
    return (
      <AdvancedBottomNavigation
        items={navItems}
        onItemClick={handleNavClick}
        theme={theme as any}
        showLabels={showLabels}
        animationType={animationType}
        hapticFeedback={hapticFeedback}
      />
    );
  }

  return (
    <BottomNavigation
      items={navItems}
      onItemClick={handleNavClick}
      variant={theme as any}
    />
  );
};

export default MobileNavigation;
