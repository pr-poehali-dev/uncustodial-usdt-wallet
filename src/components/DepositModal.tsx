import { useState } from "react";
import Icon from "@/components/ui/icon";

const networks = [
  { id: "trc20", label: "TRC-20", name: "TRON", fee: "0 USDT", color: "from-red-400 to-orange-400" },
  { id: "erc20", label: "ERC-20", name: "Ethereum", fee: "~$2.50", color: "from-blue-400 to-violet-500" },
  { id: "bep20", label: "BEP-20", name: "BNB Chain", fee: "~$0.10", color: "from-yellow-400 to-orange-400" },
];

const tokens = ["USDT", "ETH", "BNB", "BTC"];

const addresses: Record<string, string> = {
  trc20: "TQnV5b8Mu7XMkLpNt6Uw2DkGfR93BcYqPz",
  erc20: "0x4f3A9b21c8f302E5a7d89B2c4F1e0A3d88B2c4F1",
  bep20: "bnb1qvzkg6fgmk5x9phksfv7n5vz3kg6fgmk5x9ph",
};

interface Props {
  onClose: () => void;
}

export default function DepositModal({ onClose }: Props) {
  const [selectedNetwork, setSelectedNetwork] = useState("trc20");
  const [selectedToken, setSelectedToken] = useState("USDT");
  const [copied, setCopied] = useState(false);

  const address = addresses[selectedNetwork];

  const handleCopy = () => {
    navigator.clipboard.writeText(address).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Модалка */}
      <div className="relative z-10 w-full md:max-w-md glass-strong rounded-t-3xl md:rounded-3xl border border-white/10 p-6 animate-fade-up">
        {/* Хэндл (мобильный) */}
        <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-5 md:hidden" />

        {/* Заголовок */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #00ffd1, #00b8ff)" }}>
              <Icon name="ArrowDownLeft" size={18} className="text-black" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-syne">Пополнение</h2>
              <p className="text-xs text-muted-foreground">Получите криптовалюту</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="glass rounded-xl p-2 hover:bg-white/10 transition-colors"
          >
            <Icon name="X" size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Выбор токена */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Токен</p>
          <div className="flex gap-2 flex-wrap">
            {tokens.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedToken(t)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                  selectedToken === t
                    ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
                    : "glass border-white/5 text-muted-foreground hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Выбор сети */}
        <div className="mb-5">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Сеть</p>
          <div className="space-y-2">
            {networks.map((net) => (
              <button
                key={net.id}
                onClick={() => setSelectedNetwork(net.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${
                  selectedNetwork === net.id
                    ? "border-cyan-500/40 bg-cyan-500/8"
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
                  <p className="text-xs font-mono-custom text-emerald-400">{net.fee}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* QR-код (имитация) */}
        <div className="glass rounded-2xl p-4 mb-4 flex flex-col items-center">
          <div className="w-36 h-36 rounded-2xl bg-white p-2 mb-3 relative">
            {/* QR паттерн — визуальная имитация */}
            <div className="w-full h-full rounded-xl overflow-hidden"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='132' height='132'%3E%3Crect width='132' height='132' fill='white'/%3E%3Crect x='8' y='8' width='36' height='36' rx='4' fill='%23000'/%3E%3Crect x='12' y='12' width='28' height='28' rx='2' fill='white'/%3E%3Crect x='16' y='16' width='20' height='20' rx='1' fill='%23000'/%3E%3Crect x='88' y='8' width='36' height='36' rx='4' fill='%23000'/%3E%3Crect x='92' y='12' width='28' height='28' rx='2' fill='white'/%3E%3Crect x='96' y='16' width='20' height='20' rx='1' fill='%23000'/%3E%3Crect x='8' y='88' width='36' height='36' rx='4' fill='%23000'/%3E%3Crect x='12' y='92' width='28' height='28' rx='2' fill='white'/%3E%3Crect x='16' y='96' width='20' height='20' rx='1' fill='%23000'/%3E%3Crect x='52' y='8' width='8' height='8' fill='%23000'/%3E%3Crect x='64' y='8' width='8' height='8' fill='%23000'/%3E%3Crect x='52' y='20' width='8' height='8' fill='%23000'/%3E%3Crect x='52' y='52' width='8' height='8' fill='%23000'/%3E%3Crect x='64' y='52' width='8' height='8' fill='%23000'/%3E%3Crect x='76' y='52' width='8' height='8' fill='%23000'/%3E%3Crect x='52' y='64' width='8' height='8' fill='%23000'/%3E%3Crect x='76' y='64' width='8' height='8' fill='%23000'/%3E%3Crect x='52' y='76' width='8' height='8' fill='%23000'/%3E%3Crect x='64' y='76' width='8' height='8' fill='%23000'/%3E%3Crect x='52' y='88' width='8' height='8' fill='%23000'/%3E%3Crect x='64' y='100' width='8' height='8' fill='%23000'/%3E%3Crect x='76' y='88' width='8' height='8' fill='%23000'/%3E%3Crect x='88' y='52' width='8' height='8' fill='%23000'/%3E%3Crect x='100' y='52' width='8' height='8' fill='%23000'/%3E%3Crect x='112' y='64' width='8' height='8' fill='%23000'/%3E%3Crect x='100' y='76' width='8' height='8' fill='%23000'/%3E%3Crect x='88' y='88' width='8' height='8' fill='%23000'/%3E%3Crect x='100' y='100' width='8' height='8' fill='%23000'/%3E%3Crect x='112' y='112' width='8' height='8' fill='%23000'/%3E%3C/svg%3E")`,
                backgroundSize: "cover",
              }}
            />
            {/* Лого в центре QR */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #00ffd1, #a855f7)" }}>
                <span className="text-xs font-black text-black">CV</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Отсканируйте для получения {selectedToken}</p>
        </div>

        {/* Адрес */}
        <div className="glass rounded-2xl p-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-0.5">Адрес ({networks.find(n => n.id === selectedNetwork)?.label})</p>
            <p className="text-xs font-mono-custom text-white truncate">{address}</p>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${
              copied ? "bg-emerald-500/20 text-emerald-400" : "glass text-cyan-400 hover:bg-cyan-500/10"
            }`}
          >
            <Icon name={copied ? "Check" : "Copy"} size={13} />
            {copied ? "Скопировано" : "Копировать"}
          </button>
        </div>

        {/* Предупреждение */}
        <div className="mt-4 flex items-start gap-2 glass rounded-xl p-3">
          <Icon name="AlertCircle" size={14} className="text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Отправляйте только <span className="text-white font-semibold">{selectedToken}</span> через сеть <span className="text-white font-semibold">{networks.find(n => n.id === selectedNetwork)?.label}</span>. Иные активы могут быть утеряны.
          </p>
        </div>
      </div>
    </div>
  );
}
