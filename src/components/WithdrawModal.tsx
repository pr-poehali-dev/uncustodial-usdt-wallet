import { useState } from "react";
import Icon from "@/components/ui/icon";

const networks = [
  { id: "trc20", label: "TRC-20", name: "TRON", fee: "1 USDT", color: "from-red-400 to-orange-400" },
  { id: "erc20", label: "ERC-20", name: "Ethereum", fee: "~$2.50", color: "from-blue-400 to-violet-500" },
  { id: "bep20", label: "BEP-20", name: "BNB Chain", fee: "~$0.15", color: "from-yellow-400 to-orange-400" },
];

const tokens = [
  { symbol: "USDT", balance: "4,280.00" },
  { symbol: "ETH", balance: "1.847" },
  { symbol: "BNB", balance: "8.22" },
  { symbol: "BTC", balance: "0.041" },
];

type Step = "form" | "confirm" | "success";

interface Props {
  onClose: () => void;
}

export default function WithdrawModal({ onClose }: Props) {
  const [step, setStep] = useState<Step>("form");
  const [selectedNetwork, setSelectedNetwork] = useState("trc20");
  const [selectedToken, setSelectedToken] = useState("USDT");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const token = tokens.find((t) => t.symbol === selectedToken)!;
  const network = networks.find((n) => n.id === selectedNetwork)!;

  const isValid = address.length > 10 && parseFloat(amount) > 0;

  const handleConfirm = () => setStep("confirm");
  const handleSend = () => setStep("success");

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full md:max-w-md glass-strong rounded-t-3xl md:rounded-3xl border border-white/10 p-6 animate-fade-up">
        <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-5 md:hidden" />

        {/* Заголовок */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {step !== "form" && (
              <button
                onClick={() => setStep(step === "confirm" ? "form" : "form")}
                className="glass rounded-xl p-2 hover:bg-white/10 transition-colors mr-1"
              >
                <Icon name="ArrowLeft" size={16} className="text-muted-foreground" />
              </button>
            )}
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
              <Icon name="ArrowUpRight" size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-syne">Вывод средств</h2>
              <p className="text-xs text-muted-foreground">
                {step === "form" ? "Укажите реквизиты" : step === "confirm" ? "Подтверждение" : "Готово"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="glass rounded-xl p-2 hover:bg-white/10 transition-colors">
            <Icon name="X" size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* ШАГ 1: Форма */}
        {step === "form" && (
          <div className="space-y-4">
            {/* Токен */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Токен</p>
              <div className="flex gap-2 flex-wrap">
                {tokens.map((t) => (
                  <button
                    key={t.symbol}
                    onClick={() => setSelectedToken(t.symbol)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                      selectedToken === t.symbol
                        ? "border-violet-500/50 bg-violet-500/10 text-violet-400"
                        : "glass border-white/5 text-muted-foreground hover:text-white"
                    }`}
                  >
                    {t.symbol}
                  </button>
                ))}
              </div>
            </div>

            {/* Сеть */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Сеть</p>
              <div className="space-y-2">
                {networks.map((net) => (
                  <button
                    key={net.id}
                    onClick={() => setSelectedNetwork(net.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${
                      selectedNetwork === net.id
                        ? "border-violet-500/40 bg-violet-500/8"
                        : "glass border-white/5 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${net.color} flex items-center justify-center text-xs font-bold text-black`}>
                        {net.label.slice(0, 1)}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold">{net.label}</p>
                        <p className="text-xs text-muted-foreground">{net.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Комиссия</p>
                      <p className="text-xs font-mono-custom text-yellow-400">{net.fee}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Адрес */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Адрес получателя</p>
              <div className="relative">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={selectedNetwork === "trc20" ? "TQnV5b8Mu7..." : "0x4f3A9b21..."}
                  className="w-full glass rounded-2xl px-4 py-3.5 text-sm font-mono-custom bg-transparent border border-white/10 focus:border-violet-500/50 outline-none text-white placeholder-white/20 transition-colors pr-12"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 glass rounded-lg p-1.5 hover:bg-white/10 transition-colors">
                  <Icon name="ScanLine" size={15} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Сумма */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Сумма</p>
              <div className="relative">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^0-9.,]/g, ""))}
                  placeholder="0.00"
                  className="w-full glass rounded-2xl px-4 py-3.5 text-2xl font-bold font-mono-custom bg-transparent border border-white/10 focus:border-violet-500/50 outline-none text-white placeholder-white/20 transition-colors pr-28"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className="text-violet-400 font-bold text-sm">{selectedToken}</span>
                  <button
                    onClick={() => setAmount(token.balance.replace(",", ""))}
                    className="glass rounded-lg px-2 py-1 text-xs text-muted-foreground hover:text-white transition-colors"
                  >
                    Макс
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-muted-foreground">Доступно: <span className="text-white font-mono-custom">{token.balance} {selectedToken}</span></span>
                {amount && <span className="text-yellow-400">Комиссия: {network.fee}</span>}
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={!isValid}
              className={`w-full rounded-2xl py-4 flex items-center justify-center gap-2 font-bold text-base transition-all ${
                isValid ? "btn-neon-violet" : "glass text-muted-foreground cursor-not-allowed opacity-40"
              }`}
            >
              <Icon name="ArrowUpRight" size={18} />
              Продолжить
            </button>
          </div>
        )}

        {/* ШАГ 2: Подтверждение */}
        {step === "confirm" && (
          <div className="space-y-4">
            <div className="glass rounded-2xl divide-y divide-white/5">
              {[
                { label: "Токен", value: selectedToken },
                { label: "Сеть", value: network.label + " · " + network.name },
                { label: "Сумма", value: amount + " " + selectedToken, highlight: true },
                { label: "Комиссия", value: network.fee, warn: true },
                { label: "Получатель", value: address.slice(0, 8) + "..." + address.slice(-6), mono: true },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className={`text-sm font-semibold ${
                    row.highlight ? "gradient-text-violet" :
                    row.warn ? "text-yellow-400" : ""
                  } ${row.mono ? "font-mono-custom text-xs" : ""}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-2 glass rounded-xl p-3">
              <Icon name="AlertTriangle" size={14} className="text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Убедитесь, что адрес верный. Отменить транзакцию невозможно.
              </p>
            </div>

            <button
              onClick={handleSend}
              className="btn-neon-violet w-full rounded-2xl py-4 flex items-center justify-center gap-2 font-bold text-base"
            >
              <Icon name="Send" size={18} />
              Подтвердить вывод
            </button>
          </div>
        )}

        {/* ШАГ 3: Успех */}
        {step === "success" && (
          <div className="flex flex-col items-center py-4 space-y-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center animate-pulse-glow"
              style={{ background: "linear-gradient(135deg, #00ffd1, #a855f7)" }}>
              <Icon name="Check" size={36} className="text-black" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold font-syne mb-1">Транзакция отправлена</h3>
              <p className="text-sm text-muted-foreground">
                {amount} {selectedToken} отправлено через {network.label}
              </p>
            </div>
            <div className="glass rounded-2xl p-3 w-full text-center">
              <p className="text-xs text-muted-foreground mb-1">Хэш транзакции</p>
              <p className="text-xs font-mono-custom text-cyan-400">0xf3a2...bc91</p>
            </div>
            <button
              onClick={onClose}
              className="btn-neon-cyan w-full rounded-2xl py-4 font-bold text-base"
            >
              Готово
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
