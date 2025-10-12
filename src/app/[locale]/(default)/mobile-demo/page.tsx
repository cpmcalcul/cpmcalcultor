import { useTranslations } from 'next-intl';
import { MobileNavigation } from '@/components/navigation/mobile-navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function MobileDemoPage() {
  const t = useTranslations();

  return (
    <>
      <div className="container mx-auto p-4 main-content">
        <div className="space-y-6">
          {/* 页面标题 */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">移动端底部导航演示</h1>
            <p className="text-muted-foreground">
              在移动设备上查看底部导航效果，支持多种主题和样式
            </p>
          </div>

          {/* 功能卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  基础导航
                  <Badge variant="secondary">默认</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  简洁的底部导航栏，支持图标、标签和徽章显示
                </p>
                <ul className="text-sm space-y-1">
                  <li>• 响应式设计</li>
                  <li>• 图标动画效果</li>
                  <li>• 徽章数字显示</li>
                  <li>• 触觉反馈支持</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  高级导航
                  <Badge variant="default">高级</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  功能丰富的导航栏，支持特殊按钮和多种主题
                </p>
                <ul className="text-sm space-y-1">
                  <li>• 玻璃拟态效果</li>
                  <li>• 涟漪点击动画</li>
                  <li>• 特殊按钮支持</li>
                  <li>• 多种动画类型</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  路由集成
                  <Badge variant="outline">自动</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  与Next.js路由系统完美集成，支持国际化
                </p>
                <ul className="text-sm space-y-1">
                  <li>• 自动路由跳转</li>
                  <li>• 当前页面高亮</li>
                  <li>• 国际化支持</li>
                  <li>• 移动端检测</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* 主题预览 */}
          <Card>
            <CardHeader>
              <CardTitle>主题预览</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  当前页面演示了默认主题的效果。底部导航会根据设备自动显示：
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">支持的主题：</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 默认主题（深色）</li>
                      <li>• 简约主题（浅色）</li>
                      <li>• 彩色主题（渐变）</li>
                      <li>• 玻璃拟态主题</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">预设配置：</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 社交应用样式</li>
                      <li>• 电商应用样式</li>
                      <li>• 音乐应用样式</li>
                      <li>• 自定义配置</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 使用说明 */}
          <Card>
            <CardHeader>
              <CardTitle>使用说明</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">移动端查看：</h4>
                  <p className="text-sm text-muted-foreground">
                    请在移动设备或缩小浏览器窗口至移动端尺寸（宽度 &lt; 768px）查看底部导航效果。
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">功能特性：</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 点击导航项会进行路由跳转</li>
                    <li>• 当前页面会自动高亮显示</li>
                    <li>• 支持徽章数字和特殊按钮</li>
                    <li>• 内置触觉反馈和动画效果</li>
                    <li>• 支持iOS安全区域适配</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 底部占位 */}
          <div className="h-20"></div>
        </div>
      </div>

      {/* 移动端底部导航 */}
      <MobileNavigation 
        variant="basic"
        preset="default"
        theme="default"
        showLabels={true}
        hapticFeedback={true}
      />
    </>
  );
}
