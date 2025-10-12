# PayPal 支付集成文档

## 概述

本项目已成功集成PayPal支付系统，支持订阅支付和一次性支付。PayPal集成与现有的Stripe和Creem支付系统并行运行。

## 环境变量配置

### 必需的环境变量

```bash
# PayPal配置
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_ENV=sandbox  # 或 production
PAYPAL_WEBHOOK_ID=your_webhook_id

# 前端PayPal配置
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id

# 支付提供商选择
PAY_PROVIDER=paypal  # 可选值: stripe, paypal, creem

# PayPal产品/计划映射 (JSON格式)
PAYPAL_PLANS={"basic-monthly":"P-BASIC-MONTHLY-PLAN-ID","pro-monthly":"P-PRO-MONTHLY-PLAN-ID"}
```

### 可选的环境变量

```bash
# PayPal Webhook验证 (开发环境可跳过)
SKIP_WEBHOOK_VERIFICATION=true  # 仅在开发环境使用
```

## PayPal开发者控制台设置

### 1. 创建应用

1. 登录 [PayPal开发者控制台](https://developer.paypal.com/)
2. 创建新的REST API应用
3. 获取Client ID和Secret
4. 配置Webhook端点

### 2. 创建产品和计划

使用PayPal API或控制台创建产品和订阅计划：

```bash
# 创建产品
curl -X POST https://api-m.sandbox.paypal.com/v1/catalogs/products \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SaaS Basic Plan",
    "description": "Basic subscription plan",
    "type": "SERVICE",
    "category": "SOFTWARE"
  }'

# 创建订阅计划
curl -X POST https://api-m.sandbox.paypal.com/v1/billing/plans \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "PROD-XXXXXXXXXXXX",
    "name": "Basic Monthly Plan",
    "billing_cycles": [{
      "frequency": {"interval_unit": "MONTH", "interval_count": 1},
      "tenure_type": "REGULAR",
      "sequence": 1,
      "total_cycles": 0,
      "pricing_scheme": {
        "fixed_price": {"value": "9.99", "currency_code": "USD"}
      }
    }]
  }'
```

### 3. 配置Webhook

在PayPal开发者控制台中设置Webhook端点：

- **URL**: `https://your-domain.com/api/pay/notify/paypal`
- **事件类型**:
  - `BILLING.SUBSCRIPTION.CREATED`
  - `BILLING.SUBSCRIPTION.ACTIVATED`
  - `BILLING.SUBSCRIPTION.CANCELLED`
  - `BILLING.SUBSCRIPTION.SUSPENDED`
  - `BILLING.SUBSCRIPTION.EXPIRED`
  - `BILLING.SUBSCRIPTION.PAYMENT_FAILED`
  - `BILLING.SUBSCRIPTION.RENEWED`

## 使用方法

### 前端集成

```tsx
import { PayPalProvider, PayPalSubscribeButton } from "@/components/paypal";

function PricingPage() {
  return (
    <PayPalProvider>
      <PayPalSubscribeButton
        planId="basic-monthly"
        planName="Basic Monthly Plan"
        price={9.99}
        currency="USD"
        onSuccess={(subscriptionId) => {
          console.log("Payment successful:", subscriptionId);
        }}
        onError={(error) => {
          console.error("Payment failed:", error);
        }}
      />
    </PayPalProvider>
  );
}
```

### API端点

- **创建订阅**: `POST /api/checkout` (设置 `PAY_PROVIDER=paypal`)
- **支付回调**: `GET /api/pay/callback/paypal`
- **Webhook通知**: `POST /api/pay/notify/paypal`

## 数据库变更

### 新增字段

在 `orders` 表中新增了以下字段：

```sql
ALTER TABLE orders ADD COLUMN paypal_subscription_id VARCHAR(255);
ALTER TABLE orders ADD COLUMN paypal_plan_id VARCHAR(255);
ALTER TABLE orders ADD COLUMN payment_provider VARCHAR(50) DEFAULT 'stripe';
```

### 迁移

运行数据库迁移：

```bash
npm run db:generate
npm run db:migrate
```

## 支付流程

### 订阅支付流程

1. 用户点击PayPal支付按钮
2. 前端调用 `/api/checkout` 创建订单
3. 系统根据 `PAY_PROVIDER` 选择PayPal处理
4. 创建PayPal订阅并返回审批链接
5. 用户在PayPal完成支付授权
6. PayPal重定向到回调页面
7. 系统处理回调并更新订单状态
8. PayPal发送Webhook通知确认订阅激活
9. 系统更新用户积分和订阅状态

### Webhook事件处理

系统处理以下PayPal Webhook事件：

- **ACTIVATED**: 订阅激活，更新订单状态为已支付
- **CANCELLED**: 订阅取消，降级用户权限
- **SUSPENDED**: 订阅暂停，暂时限制访问
- **EXPIRED**: 订阅过期，移除访问权限
- **RENEWED**: 订阅续费，添加积分
- **PAYMENT_FAILED**: 支付失败，记录并通知用户

## 错误处理

### 常见错误

1. **Client ID未配置**: 检查 `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
2. **Webhook验证失败**: 检查 `PAYPAL_WEBHOOK_ID` 配置
3. **计划映射错误**: 检查 `PAYPAL_PLANS` JSON格式
4. **订单未找到**: 检查订单创建和会话ID关联

### 调试模式

开发环境可以跳过Webhook验证：

```bash
NODE_ENV=development
SKIP_WEBHOOK_VERIFICATION=true
```

## 安全注意事项

1. **生产环境**必须启用Webhook签名验证
2. 不要在客户端暴露 `PAYPAL_CLIENT_SECRET`
3. 定期轮换API密钥
4. 监控异常支付活动
5. 实施幂等性检查防止重复处理

## 测试

### 沙盒测试

1. 使用PayPal沙盒环境进行测试
2. 创建测试买家和卖家账户
3. 使用测试信用卡信息
4. 验证Webhook事件处理

### 测试用例

- [ ] 成功创建订阅
- [ ] 支付授权和激活
- [ ] 订阅取消
- [ ] 支付失败处理
- [ ] Webhook事件处理
- [ ] 错误状态处理

## 监控和日志

系统会记录以下关键事件：

- PayPal API调用
- Webhook事件接收和处理
- 订单状态变更
- 用户积分更新
- 错误和异常

查看日志以进行故障排除和监控。

## 支持的功能

✅ 订阅支付 (月度/年度)  
✅ PayPal Webhook处理  
✅ 订阅状态同步  
✅ 多货币支持  
✅ 错误处理和重试  
❌ 一次性支付 (待实现)  
❌ PayPal退款API (待实现)  
❌ 订阅修改API (待实现)  

## 相关文件

- `src/integrations/paypal/index.ts` - PayPal客户端
- `src/services/paypal.ts` - PayPal业务逻辑
- `src/components/paypal/` - 前端组件
- `src/app/api/pay/callback/paypal/` - 回调处理
- `src/app/api/pay/notify/paypal/` - Webhook处理
- `src/db/schema.ts` - 数据库模式更新

