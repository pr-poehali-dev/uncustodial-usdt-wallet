import { useState } from "react";
import Icon from "@/components/ui/icon";

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 6,
  duration: Math.random() * 4 + 4,
  top: Math.random() * 100,
}));

const transactions = [
  { id: 1, type: "in", label: "Получено USDT", amount: "+500.00", date: "Сегодня, 14:32", token: "USDT" },
  { id: 2, type: "out", label: "Отправлено ETH", amount: "-0.15", date: "Вчера, 09:15", token: "ETH" },
  { id: 3, type: "stake", label: "Стейкинг USDT", amount: "-1000.00", date: "05 мая, 18:00", token: "USDT" },
  { id: 4, type: "in", label: "Начислена награда", amount: "+12.48", date: "04 мая, 00:00", token: "USDT" },
  { id: 5, type: "swap", label: "Своп ETH → BNB", amount: "~0.5 ETH", date: "03 мая, 11:22", token: "BNB" },
];

const tokens = [
  { symbol: "USDT", name: "Tether", balance: "4,280.00", usd: "4,280.00", change: "+1.2%", positive: true, color: "from-emerald-400 to-teal-500" },
  { symbol: "ETH", name: "Ethereum", balance: "1.847", usd: "6,142.30", change: "+3.7%", positive: true, color: "from-blue-400 to-violet-500" },
  { symbol: "BNB", name: "Binance Coin", balance: "8.22", usd: "4,892.10", change: "-0.8%", positive: false, color: "from-yellow-400 to-orange-400" },
  { symbol: "BTC", name: "Bitcoin", balance: "0.041", usd: "3,711.40", change: "+5.1%", positive: true, color: "from-orange-400 to-red-400" },
];

export default function Dashboard() {
  const [copied, setCopied] = useState(false);
  const address = "0x4f3A...8B2c";
  const fullAddress = "0x4f3A9b21c8f302E5a7d89B2c4F1e0A3d88B2c4F1";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden grid-bg">
      {/* Частицы фона */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: p.id % 3 === 0 ? "#00ffd1" : p.id % 3 === 1 ? "#a855f7" : "#3b82f6",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Фоновые свечения */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #00ffd1 0%, transparent 70%)" }} />
      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-8"
        style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }} />

      <div className="relative z-10 p-4 md:p-6 max-w-6xl mx-auto space-y-6">

        {/* Заголовок */}
        <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground font-mono-custom">Главный кошелёк</span>
            <div className="flex items-center gap-2 glass rounded-full px-3 py-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-mono-custom">Сеть активна</span>
            </div>
          </div>

          {/* Адрес кошелька */}
          <div className="glass rounded-2xl p-4 flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #00ffd1, #a855f7)" }}>
                <Icon name="Wallet" size={18} className="text-black" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono-custom">Адрес кошелька</p>
                <p className="font-mono-custom text-sm text-white">{address}</p>
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="glass rounded-xl px-3 py-2 flex items-center gap-2 text-xs transition-all hover:border-cyan-500/40"
              style={{ color: copied ? "#00ffd1" : "#94a3b8" }}
            >
              <Icon name={copied ? "Check" : "Copy"} size={14} />
              {copied ? "Скопировано" : "Копировать"}
            </button>
          </div>
        </div>

        {/* Общий баланс */}
        <div className="animate-fade-up glass rounded-3xl p-6 relative overflow-hidden card-hover"
          style={{ animationDelay: "80ms" }}>
          <div className="absolute inset-0 opacity-20"
            style={{ background: "linear-gradient(135deg, rgba(0,255,209,0.1) 0%, rgba(168,85,247,0.1) 100%)" }} />
          <div className="absolute top-4 right-4 w-24 h-24 opacity-5">
            <div className="w-full h-full rounded-full animate-spin-slow"
              style={{ border: "1px solid #00ffd1", borderTopColor: "transparent" }} />
          </div>

          <p className="text-sm text-muted-foreground mb-2">Общий баланс</p>
          <div className="flex items-end gap-3">
            <h1 className="text-5xl font-bold gradient-text-cyan animate-number-glow font-syne">
              $19,025<span className="text-2xl">.80</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 text-emerald-400 text-sm">
              <Icon name="TrendingUp" size={14} />
              <span>+$842.30</span>
            </div>
            <span className="text-muted-foreground text-sm">за 24 часа</span>
            <span className="glass rounded-full px-2 py-0.5 text-xs text-emerald-400">+4.6%</span>
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-3 mt-5">
            <button className="btn-neon-cyan flex-1 rounded-2xl py-3 flex items-center justify-center gap-2 text-sm font-bold">
              <Icon name="ArrowDownLeft" size={16} />
              Получить
            </button>
            <button className="btn-neon-violet flex-1 rounded-2xl py-3 flex items-center justify-center gap-2 text-sm font-bold">
              <Icon name="ArrowUpRight" size={16} />
              Отправить
            </button>
            <button className="glass rounded-2xl px-5 py-3 flex items-center justify-center text-sm text-muted-foreground hover:text-white transition-colors">
              <Icon name="QrCode" size={18} />
            </button>
          </div>
        </div>

        {/* Токены */}
        <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-widest">Активы</h2>
          <div className="grid grid-cols-2 gap-3">
            {tokens.map((token, i) => (
              <div key={token.symbol}
                className="glass rounded-2xl p-4 card-hover cursor-pointer"
                style={{ animationDelay: `${150 + i * 50}ms` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${token.color} flex items-center justify-center text-xs font-bold text-black`}>
                    {token.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{token.symbol}</p>
                    <p className="text-xs text-muted-foreground">{token.name}</p>
                  </div>
                </div>
                <p className="text-lg font-bold font-mono-custom">${token.usd}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground font-mono-custom">{token.balance}</p>
                  <span className={`text-xs ${token.positive ? "text-emerald-400" : "text-red-400"}`}>
                    {token.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Последние транзакции */}
        <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Транзакции</h2>
            <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">Все →</button>
          </div>
          <div className="glass rounded-2xl overflow-hidden divide-y divide-white/5">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    tx.type === "in" ? "bg-emerald-500/20 text-emerald-400" :
                    tx.type === "out" ? "bg-red-500/20 text-red-400" :
                    tx.type === "stake" ? "bg-violet-500/20 text-violet-400" :
                    "bg-blue-500/20 text-blue-400"
                  }`}>
                    <Icon name={
                      tx.type === "in" ? "ArrowDownLeft" :
                      tx.type === "out" ? "ArrowUpRight" :
                      tx.type === "stake" ? "Lock" : "Repeat2"
                    } size={15} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tx.label}</p>
                    <p className="text-xs text-muted-foreground font-mono-custom">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-mono-custom font-semibold ${
                    tx.type === "in" ? "text-emerald-400" : tx.type === "out" ? "text-red-400" : "text-white"
                  }`}>{tx.amount}</p>
                  <p className="text-xs text-muted-foreground">{tx.token}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
