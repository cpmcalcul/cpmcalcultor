# 环境变量配置指南

## 概述

本项目使用环境变量来管理敏感配置信息，如API密钥、数据库连接等。为了确保安全性，这些文件不会被提交到git仓库中。

## 设置步骤

### 1. 复制环境变量模板

```bash
# 复制模板文件
cp .env.example .env.local
```

### 2. 配置环境变量

编辑 `.env.local` 文件，填入你的实际配置值：

```bash
# 使用你喜欢的编辑器
code .env.local
# 或者
nano .env.local
# 或者
notepad .env.local
```

### 3. 必需的环境变量

#### 应用配置
```env
NEXT_PUBLIC_WEB_URL=https://your-domain.com
NEXT_PUBLIC_DEFAULT_THEME=dark
```

#### 数据库配置
```env
DATABASE_URL=postgresql://username:password@localhost:5432/cpmcalculator
```

#### 认证配置
```env
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key-here
```

### 4. 可选的环境变量

根据你需要的功能，配置相应的服务：

- **支付系统**: Stripe, PayPal
- **AI服务**: OpenAI, Replicate, DeepSeek
- **存储服务**: Cloudflare R2, AWS S3
- **分析服务**: Google Analytics, Plausible
- **社交登录**: Google, GitHub

## 安全注意事项

### ✅ 应该做的
- 使用 `.env.local` 文件存储本地开发配置
- 在生产环境中使用环境变量或密钥管理服务
- 定期轮换API密钥和密码
- 使用强密码和复杂的密钥

### ❌ 不应该做的
- 不要将 `.env.local` 文件提交到git
- 不要在代码中硬编码敏感信息
- 不要在公开的仓库中暴露API密钥
- 不要使用生产环境的密钥进行开发

## 文件说明

| 文件 | 用途 | 是否提交到git |
|------|------|---------------|
| `.env.example` | 环境变量模板 | ✅ 是 |
| `.env.local` | 本地开发配置 | ❌ 否 |
| `.env.development` | 开发环境配置 | ❌ 否 |
| `.env.production` | 生产环境配置 | ❌ 否 |

## 部署配置

### Vercel部署
在Vercel控制台中添加环境变量：
1. 进入项目设置
2. 选择 "Environment Variables"
3. 添加所需的环境变量

### Docker部署
使用docker-compose.yml文件：
```yaml
environment:
  - DATABASE_URL=postgresql://...
  - NEXTAUTH_SECRET=...
```

### 其他平台
根据部署平台的要求配置环境变量。

## 故障排除

### 常见问题

1. **环境变量不生效**
   - 确保文件名正确 (`.env.local`)
   - 重启开发服务器
   - 检查变量名拼写

2. **数据库连接失败**
   - 检查 `DATABASE_URL` 格式
   - 确认数据库服务正在运行
   - 验证用户名和密码

3. **API调用失败**
   - 检查API密钥是否正确
   - 确认API服务是否可用
   - 查看控制台错误信息

### 获取帮助

如果遇到问题，请：
1. 检查控制台错误信息
2. 查看项目文档
3. 在GitHub Issues中提问

## 更新环境变量

当需要更新环境变量时：
1. 更新 `.env.example` 文件
2. 更新本文档
3. 通知团队成员更新他们的 `.env.local` 文件
