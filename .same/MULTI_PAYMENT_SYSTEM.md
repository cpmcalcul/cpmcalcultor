# 多支付提供商系统使用指南

## 🎉 系统特性

✅ **同时支持三个支付提供商**: Stripe、PayPal、Creem  
✅ **动态选择**: 用户可以在前端选择支付方式  
✅ **统一API**: 所有支付提供商使用相同的API接口  
✅ **独立处理**: 每个提供商有独立的回调和webhook处理  
✅ **数据统一**: 所有订单记录在统一的数据库中  

## 🚀 快速开始

### 1. 环境变量配置

```bash
# Stripe 配置
STRIPE_PRIVATE_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# PayPal 配置
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_ENV=sandbox
PAYPAL_WEBHOOK_ID=...
NEXT_PUBLIC_PAYPAL_CLIENT_ID=...

# Creem 配置
CREEM_API_KEY=...
CREEM_ENV=test

# 产品映射配置
STRIPE_PRODUCTS={"basic-monthly":"price_xxx","pro-monthly":"price_xxx"}
PAYPAL_PLANS={"basic-monthly":"P-xxx","pro-monthly":"P-xxx"}  
CREEM_PRODUCTS={"basic-monthly":"prod_xxx","pro-monthly":"prod_xxx"}

# 默认支付提供商（可选，会被前端覆盖）
PAY_PROVIDER=stripe
```

### 2. 前端使用

#### 方式一：统一支付界面

```tsx
import { UnifiedPayment } from "@/components/payment";

function PricingPage() {
  return (
    <UnifiedPayment
      productId="basic-monthly"
      productName="基础版月度订阅"
      price={9.99}
      currency="USD"
      interval="month"
      onSuccess={(result) => {
        console.log("支付成功:", result);
      }}
      onError={(error) => {
        console.error("支付失败:", error);
      }}
    />
  );
}
```

#### 方式二：简单支付选项

```tsx
import { SimplePaymentOptions } from "@/components/payment";

function QuickCheckout() {
  return (
    <SimplePaymentOptions
      productId="pro-monthly"
      productName="专业版月度订阅"
      price={19.99}
      currency="USD"
      onSuccess={(result) => {
        console.log("支付成功:", result);
      }}
      onError={(error) => {
        console.error("支付失败:", error);
      }}
    />
  );
}
```

#### 方式三：支付提供商选择器

```tsx
import { PaymentProviderSelector, QuickPaymentButton } from "@/components/payment";
import { useState } from "react";

function CustomPayment() {
  const [provider, setProvider] = useState("stripe");

  return (
    <div>
      <PaymentProviderSelector
        onProviderSelect={setProvider}
        selectedProvider={provider}
        currency="USD"
      />
      
      {provider && (
        <QuickPaymentButton
          provider={provider}
          productId="basic-monthly"
          currency="USD"
          onSuccess={(result) => console.log("Success:", result)}
          onError={(error) => console.error("Error:", error)}
        />
      )}
    </div>
  );
}
```

### 3. API 使用

#### 创建订单并指定支付提供商

```typescript
const response = await fetch("/api/checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    product_id: "basic-monthly",
    currency: "usd",
    locale: "en",
    provider: "paypal", // 指定使用PayPal
  }),
});

const result = await response.json();
// 重定向到支付页面
window.location.href = result.checkout_url;
```

## 📊 API 端点

### 支付创建
- **URL**: `POST /api/checkout`
- **参数**:
  ```json
  {
    "product_id": "basic-monthly",
    "currency": "usd", 
    "locale": "en",
    "provider": "stripe|paypal|creem"  // 新增字段
  }
  ```

### 回调处理
- **Stripe**: `GET /api/pay/callback/stripe`
- **PayPal**: `GET /api/pay/callback/paypal`  
- **Creem**: `GET /api/pay/callback/creem`

### Webhook 通知
- **Stripe**: `POST /api/pay/notify/stripe`
- **PayPal**: `POST /api/pay/notify/paypal`
- **Creem**: `POST /api/pay/notify/creem`

## 🗄️ 数据库结构

orders 表新增字段：

```sql
ALTER TABLE orders ADD COLUMN paypal_subscription_id VARCHAR(255);
ALTER TABLE orders ADD COLUMN paypal_plan_id VARCHAR(255);  
ALTER TABLE orders ADD COLUMN payment_provider VARCHAR(50) DEFAULT 'stripe';
```

示例数据：
```sql
INSERT INTO orders (
  order_no, product_id, amount, currency, 
  payment_provider, stripe_session_id
) VALUES (
  'order_123', 'basic-monthly', 999, 'USD',
  'paypal', 'I-PAYPAL-SUB-ID'  
);
```

## 🔧 核心组件

### PaymentProviderSelector
支付提供商选择器，显示可用的支付方式并允许用户选择。

**特性**:
- 自动过滤支持当前货币的支付方式
- 显示每个提供商的特性和支持的货币
- 响应式设计，支持移动端

### UnifiedPayment  
统一支付界面，提供完整的支付流程。

**流程**:
1. 用户选择支付提供商
2. 显示订单详情
3. 调用对应的支付组件
4. 处理支付结果

### SimplePaymentOptions
简化的支付选项，直接显示所有支付按钮。

**特性**:
- 快速支付体验
- 同时显示所有支付方式
- 适合简单的购买流程

### QuickPaymentButton
快速支付按钮，直接调用支付API。

**参数**:
- `provider`: 支付提供商
- `productId`: 产品ID  
- `currency`: 货币
- `onSuccess/onError`: 回调函数

## 🔒 安全考虑

### API 安全
```typescript
// 验证支付提供商
const validProviders = ["stripe", "paypal", "creem"];
if (!validProviders.includes(provider)) {
  return respErr(`Invalid payment provider: ${provider}`);
}
```

### Webhook 验证
每个支付提供商都有独立的签名验证：

```typescript
// PayPal webhook验证
const isValid = await client.verifyWebhookSignature(rawBody, headers);
if (!isValid) {
  return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
}
```

### 环境隔离
- 开发环境可以跳过webhook验证
- 生产环境强制启用签名验证
- 支持沙盒/测试环境

## 📈 监控和日志

系统会记录关键事件：

```typescript
console.log("Processing payment with provider:", provider);
console.log("Payment successful:", { orderId, provider, amount });
console.log("Webhook received:", { eventType, provider, resourceId });
```

建议监控指标：
- 各支付提供商的成功率
- 支付方式的使用分布  
- 错误率和响应时间
- Webhook事件处理状态

## 🧪 测试

### 单元测试
```typescript
describe("Multi-payment system", () => {
  test("should accept valid payment provider", () => {
    const provider = "paypal";
    expect(validProviders.includes(provider)).toBe(true);
  });

  test("should reject invalid payment provider", () => {
    const provider = "invalid";
    expect(validProviders.includes(provider)).toBe(false);
  });
});
```

### 集成测试
1. 测试每个支付提供商的完整流程
2. 验证订单状态更新
3. 测试webhook事件处理
4. 验证多货币支持

### 手动测试
1. 在沙盒环境测试所有支付方式
2. 验证支付成功和失败场景
3. 测试订阅续费和取消
4. 检查错误处理和用户提示

## 🚀 部署清单

- [ ] 配置所有支付提供商的环境变量
- [ ] 运行数据库迁移: `npm run db:migrate` 
- [ ] 在各支付平台配置webhook端点
- [ ] 测试支付流程在生产环境的可用性
- [ ] 监控支付成功率和错误日志
- [ ] 配置支付失败告警

## 📝 常见问题

**Q: 如何添加新的支付提供商？**  
A: 1) 在checkout API中添加新的provider分支 2) 创建对应的回调和webhook处理路由 3) 更新前端组件支持新提供商

**Q: 可以同时处理多个支付提供商的订单吗？**  
A: 是的，每个订单都会记录使用的支付提供商，系统可以同时处理来自不同提供商的订单。

**Q: 如何处理支付提供商故障？**  
A: 用户可以选择其他可用的支付方式。建议在前端检测支付提供商可用性并提供备选方案。

**Q: 支持退款操作吗？**  
A: 目前支持通过各支付提供商的后台进行退款。未来可以实现统一的退款API。

## 📚 相关文档

- [Stripe 集成文档](https://stripe.com/docs)
- [PayPal 订阅 API](https://developer.paypal.com/docs/subscriptions/)
- [Creem API 文档](https://docs.creem.io)
- [项目 PayPal 集成文档](./PAYPAL_INTEGRATION.md)

