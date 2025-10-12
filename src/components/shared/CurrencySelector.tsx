import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const CURRENCIES: Currency[] = [
  { code: "CNY", symbol: "¥", name: "人民币 (CNY)" },
  { code: "USD", symbol: "$", name: "美元 (USD)" },
  { code: "EUR", symbol: "€", name: "欧元 (EUR)" },
  { code: "GBP", symbol: "£", name: "英镑 (GBP)" },
  { code: "JPY", symbol: "¥", name: "日元 (JPY)" },
  { code: "KRW", symbol: "₩", name: "韩元 (KRW)" },
  { code: "HKD", symbol: "HK$", name: "港币 (HKD)" },
  { code: "SGD", symbol: "S$", name: "新加坡元 (SGD)" },
];

interface CurrencySelectorProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export function CurrencySelector({ currency, onCurrencyChange }: CurrencySelectorProps) {
  return (
    <div className="w-48">
      <Label htmlFor="currency" className="text-sm mb-2 block">
        选择货币
      </Label>
      <Select
        value={currency.code}
        onValueChange={(code) => {
          const selected = CURRENCIES.find((c) => c.code === code);
          if (selected) onCurrencyChange(selected);
        }}
      >
        <SelectTrigger id="currency" className="h-10">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {CURRENCIES.map((curr) => (
            <SelectItem key={curr.code} value={curr.code}>
              {curr.symbol} {curr.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
