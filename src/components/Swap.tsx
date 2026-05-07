import { useState } from "react";
import Icon from "@/components/ui/icon";

const tokens = [
  { symbol: "USDT", name: "Tether", balance: "4,280.00", price: 1.0 },
  { symbol: "ETH", name: "Ethereum", balance: "1.847", price: 3324.5 },
  { symbol: "BNB", name: "Binance Coin", balance: "8.22", price: 595.12 },
  { symbol: "BTC", name: "Bitcoin", balance: "0.041", price: 90530 },
  { symbol: "SOL", name: "Solana", balance: "12.5", price: 168.4 },
];

const tokenColors: Record<string, string> = {
  USDT: "from-emerald-400 to-teal-500",
  ETH: "from-blue-400 to-violet-500",
  BNB: "from-yellow-400 to-orange-400",
  BTC: "from-orange-400 to-red-400",
  SOL: "from-purple-400 to-pink-500",
};

const recentSwaps = [
  { from: "ETH", to: "USDT", fromAmt: "0.5", toAmt: "1662.25", time: "2 часа назад", status: "ok" },
  { from: "BNB", to: "ETH", fromAmt: "2.0", toAmt: "0.358", time: "Вчера", status: "ok" },
  { from: "USDT", to: "SOL", fromAmt: "500", toAmt: "2.969", time: "3 дня назад", status: "ok" },
];

export default function Swap() {
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDT");
  const [fromAmount, setFromAmount] = useState("");
  const [showFromSelector, setShowFromSelector] = useState(false);
  const [showToSelector, setShowToSelector] = useState(false);
  const [slippage, setSlippage] = useState("0.5");

  const from = tokens.find((t) => t.symbol === fromToken)!;
  const to = tokens.find((t) => t.symbol === toToken)!;

  const toAmount = fromAmount
    ? ((parseFloat(fromAmount) * from.price) / to.price).toFixed(6)
    : "";

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount || "");
  };

  const rate = from && to ? (from.price / to.price).toFixed(6) : "—";

  return (
    <div className="min-h-screen relative overflow-hidden grid-bg">
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #00b8ff 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-[-80px] w-[300px] h-[300px] rounded-full opacity-8"
        style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }} />

      <div className="relative z-10 p-4 md:p-6 max-w-2xl mx-auto space-y-5">

        {/* Заголовок */}
        <div className="animate-fade-up">
          <h1 className="text-2xl font-bold font-syne">
            Обмен <span className="gradient-text-cyan">токенов</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Мгновенный своп без посредников</p>
        </div>

        {/* Курс */}
        <div className="animate-fade-up glass rounded-2xl p-3 flex items-center justify-between" style={{ animationDelay: "60ms" }}>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Activity" size={14} className="text-cyan-400" />
            Лучший маршрут
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-mono-custom text-white">1 {fromToken} = {rate} {toToken}</span>
            <Icon name="RefreshCw" size={12} className="text-muted-foreground" />
          </div>
        </div>

        {/* Основная форма */}
        <div className="animate-fade-up relative" style={{ animationDelay: "120ms" }}>
          {/* От */}
          <div className="glass rounded-3xl p-5 relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground uppercase tracking-widest">Отдаёте</span>
              <span className="text-xs text-muted-foreground font-mono-custom">
                Баланс: <span className="text-white">{from.balance} {fromToken}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setShowFromSelector(!showFromSelector); setShowToSelector(false); }}
                className={`flex items-center gap-2 glass rounded-2xl px-3 py-2.5 min-w-[120px] transition-all ${showFromSelector ? "border-cyan-500/50" : "hover:border-white/20"}`}
              >
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${tokenColors[fromToken]} flex items-center justify-center text-xs font-bold text-black`}>
                  {fromToken.slice(0, 2)}
                </div>
                <span className="font-bold">{fromToken}</span>
                <Icon name="ChevronDown" size={14} className="text-muted-foreground ml-auto" />
              </button>
              <input
                type="text"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value.replace(/[^0-9.,]/g, ""))}
                placeholder="0.00"
                className="flex-1 bg-transparent text-right text-3xl font-bold font-mono-custom outline-none text-white placeholder-white/20"
              />
            </div>
            {fromAmount && (
              <p className="text-right text-sm text-muted-foreground mt-2 font-mono-custom">
                ≈ ${(parseFloat(fromAmount) * from.price).toFixed(2)}
              </p>
            )}

            {/* Дропдаун выбора токена */}
            {showFromSelector && (
              <div className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-2xl p-2 z-50 border border-white/10">
                {tokens.filter((t) => t.symbol !== toToken).map((t) => (
                  <button
                    key={t.symbol}
                    onClick={() => { setFromToken(t.symbol); setShowFromSelector(false); }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                  >
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${tokenColors[t.symbol]} flex items-center justify-center text-xs font-bold text-black`}>
                      {t.symbol.slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{t.symbol}</p>
                      <p className="text-xs text-muted-foreground">{t.name}</p>
                    </div>
                    <span className="text-xs font-mono-custom text-muted-foreground">{t.balance}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Кнопка переключения */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={handleSwapTokens}
              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              style={{ background: "linear-gradient(135deg, #00ffd1, #a855f7)" }}
            >
              <Icon name="ArrowUpDown" size={18} className="text-black font-bold" />
            </button>
          </div>

          {/* До */}
          <div className="glass rounded-3xl p-5 mt-2 relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground uppercase tracking-widest">Получаете</span>
              <span className="text-xs text-muted-foreground font-mono-custom">
                Баланс: <span className="text-white">{to.balance} {toToken}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setShowToSelector(!showToSelector); setShowFromSelector(false); }}
                className={`flex items-center gap-2 glass rounded-2xl px-3 py-2.5 min-w-[120px] transition-all ${showToSelector ? "border-cyan-500/50" : "hover:border-white/20"}`}
              >
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${tokenColors[toToken]} flex items-center justify-center text-xs font-bold text-black`}>
                  {toToken.slice(0, 2)}
                </div>
                <span className="font-bold">{toToken}</span>
                <Icon name="ChevronDown" size={14} className="text-muted-foreground ml-auto" />
              </button>
              <div className="flex-1 text-right">
                <p className="text-3xl font-bold font-mono-custom text-white/90">
                  {toAmount || <span className="text-white/20">0.00</span>}
                </p>
              </div>
            </div>
            {toAmount && (
              <p className="text-right text-sm text-emerald-400 mt-2 font-mono-custom">
                ≈ ${(parseFloat(toAmount) * to.price).toFixed(2)}
              </p>
            )}

            {showToSelector && (
              <div className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-2xl p-2 z-50 border border-white/10">
                {tokens.filter((t) => t.symbol !== fromToken).map((t) => (
                  <button
                    key={t.symbol}
                    onClick={() => { setToToken(t.symbol); setShowToSelector(false); }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                  >
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${tokenColors[t.symbol]} flex items-center justify-center text-xs font-bold text-black`}>
                      {t.symbol.slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{t.symbol}</p>
                      <p className="text-xs text-muted-foreground">{t.name}</p>
                    </div>
                    <span className="text-xs font-mono-custom text-muted-foreground">{t.balance}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Настройки */}
        <div className="animate-fade-up glass rounded-2xl p-4" style={{ animationDelay: "180ms" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Icon name="Settings2" size={14} />
              Проскальзывание
            </span>
            <div className="flex items-center gap-2">
              {["0.1", "0.5", "1.0"].map((v) => (
                <button
                  key={v}
                  onClick={() => setSlippage(v)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-all ${slippage === v ? "tab-active border" : "glass text-muted-foreground hover:text-white"}`}
                >
                  {v}%
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Комиссия сети</span>
            <span className="font-mono-custom">~$1.24</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-muted-foreground">Минимум получите</span>
            <span className="font-mono-custom text-emerald-400">
              {toAmount ? (parseFloat(toAmount) * (1 - parseFloat(slippage) / 100)).toFixed(6) : "—"} {toToken}
            </span>
          </div>
        </div>

        {/* Кнопка */}
        <button
          className={`animate-fade-up w-full rounded-2xl py-4 flex items-center justify-center gap-2 font-bold text-base transition-all ${
            fromAmount ? "btn-neon-cyan" : "glass text-muted-foreground cursor-not-allowed opacity-50"
          }`}
          style={{ animationDelay: "220ms" }}
        >
          <Icon name="Zap" size={18} />
          {fromAmount ? `Обменять ${fromAmount} ${fromToken} → ${toToken}` : "Введите сумму"}
        </button>

        {/* История свопов */}
        <div className="animate-fade-up" style={{ animationDelay: "260ms" }}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">История обменов</h2>
          <div className="glass rounded-2xl overflow-hidden divide-y divide-white/5">
            {recentSwaps.map((swap, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${tokenColors[swap.from]} flex items-center justify-center text-xs font-bold text-black z-10`}>
                      {swap.from.slice(0, 2)}
                    </div>
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${tokenColors[swap.to]} flex items-center justify-center text-xs font-bold text-black -ml-2`}>
                      {swap.to.slice(0, 2)}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{swap.from} → {swap.to}</p>
                    <p className="text-xs text-muted-foreground font-mono-custom">{swap.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono-custom font-semibold">{swap.fromAmt} → {swap.toAmt}</p>
                  <div className="flex items-center gap-1 justify-end">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-xs text-emerald-400">Выполнен</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
