import { useState } from "react";
import Icon from "@/components/ui/icon";

const plans = [
  { id: 1, label: "Гибкий", apy: "8.5%", lockDays: 0, color: "from-teal-400 to-cyan-500", badge: "Без блокировки" },
  { id: 2, label: "30 дней", apy: "14.2%", lockDays: 30, color: "from-blue-400 to-violet-500", badge: "Популярный" },
  { id: 3, label: "90 дней", apy: "22.8%", lockDays: 90, color: "from-violet-500 to-pink-500", badge: "Макс. доход" },
];

const positions = [
  {
    id: 1,
    amount: "1,000.00",
    apy: "14.2%",
    earned: "12.48",
    start: "01 мая 2026",
    end: "31 мая 2026",
    progress: 22,
    plan: "30 дней",
    color: "from-blue-400 to-violet-500",
    daysLeft: 24,
  },
  {
    id: 2,
    amount: "500.00",
    apy: "8.5%",
    earned: "3.21",
    start: "05 апр 2026",
    end: "Гибкий",
    progress: 100,
    plan: "Гибкий",
    color: "from-teal-400 to-cyan-500",
    daysLeft: null,
  },
];

export default function Staking() {
  const [selectedPlan, setSelectedPlan] = useState(2);
  const [amount, setAmount] = useState("");

  const selected = plans.find((p) => p.id === selectedPlan)!;
  const calcEarnings = () => {
    const n = parseFloat(amount.replace(",", ".")) || 0;
    const rate = parseFloat(selected.apy) / 100;
    const days = selected.lockDays || 30;
    return ((n * rate * days) / 365).toFixed(2);
  };

  return (
    <div className="min-h-screen relative overflow-hidden grid-bg">
      {/* Свечение фона */}
      <div className="absolute top-[-100px] right-[-150px] w-[400px] h-[400px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-[-100px] w-[350px] h-[350px] rounded-full opacity-8"
        style={{ background: "radial-gradient(circle, #00ffd1 0%, transparent 70%)" }} />

      <div className="relative z-10 p-4 md:p-6 max-w-6xl mx-auto space-y-6">

        {/* Заголовок */}
        <div className="animate-fade-up">
          <h1 className="text-2xl font-bold font-syne">
            Стейкинг <span className="gradient-text-cyan">USDT</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Зарабатывайте пассивный доход на своих активах</p>
        </div>

        {/* Сводка */}
        <div className="animate-fade-up grid grid-cols-3 gap-3" style={{ animationDelay: "60ms" }}>
          {[
            { label: "В стейкинге", value: "$1,500", icon: "Lock", color: "text-cyan-400" },
            { label: "Заработано", value: "$15.69", icon: "TrendingUp", color: "text-emerald-400" },
            { label: "Средняя APY", value: "12.4%", icon: "Percent", color: "text-violet-400" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-3 text-center card-hover">
              <Icon name={stat.icon as never} size={18} className={`mx-auto mb-2 ${stat.color}`} />
              <p className="text-base font-bold font-mono-custom">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Выбор плана */}
        <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Выберите план</h2>
          <div className="grid grid-cols-3 gap-3">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`glass rounded-2xl p-4 text-left transition-all border ${
                  selectedPlan === plan.id
                    ? "border-cyan-500/50 bg-cyan-500/10"
                    : "border-white/5 hover:border-white/15"
                }`}
              >
                <div className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block mb-2 bg-gradient-to-r ${plan.color} text-black`}>
                  {plan.badge}
                </div>
                <p className="font-semibold text-sm">{plan.label}</p>
                <p className={`text-2xl font-bold font-syne mt-1 bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                  {plan.apy}
                </p>
                <p className="text-xs text-muted-foreground mt-1">годовых</p>
                {selectedPlan === plan.id && (
                  <div className="mt-2 flex items-center gap-1 text-cyan-400 text-xs">
                    <Icon name="CheckCircle2" size={12} />
                    Выбран
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Форма стейкинга */}
        <div className="animate-fade-up glass rounded-3xl p-5" style={{ animationDelay: "180ms" }}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Новая позиция</h2>

          <div className="relative mb-4">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.,]/g, ""))}
              placeholder="0.00"
              className="w-full glass rounded-2xl px-4 py-4 text-2xl font-bold font-mono-custom bg-transparent border border-white/10 focus:border-cyan-500/50 outline-none text-white placeholder-white/20 transition-colors pr-24"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="text-cyan-400 font-bold text-sm">USDT</span>
              <button className="text-xs text-muted-foreground hover:text-white glass rounded-lg px-2 py-1 transition-colors">
                Макс
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm mb-5">
            <span className="text-muted-foreground">Доступно: <span className="text-white font-mono-custom">4,280.00 USDT</span></span>
            {amount && (
              <span className="text-emerald-400">
                ≈ +{calcEarnings()} USDT за {selected.lockDays || 30} дн.
              </span>
            )}
          </div>

          <button className="btn-neon-cyan w-full rounded-2xl py-4 flex items-center justify-center gap-2 font-bold text-base">
            <Icon name="Zap" size={18} />
            Начать стейкинг {amount ? `${amount} USDT` : ""}
          </button>
        </div>

        {/* Активные позиции */}
        <div className="animate-fade-up" style={{ animationDelay: "240ms" }}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Активные позиции</h2>
          <div className="space-y-3">
            {positions.map((pos) => (
              <div key={pos.id} className="glass rounded-2xl p-5 card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pos.color} flex items-center justify-center`}>
                      <Icon name="Lock" size={16} className="text-black" />
                    </div>
                    <div>
                      <p className="font-semibold">{pos.plan} · {pos.apy} APY</p>
                      <p className="text-xs text-muted-foreground font-mono-custom">С {pos.start}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold font-mono-custom">{pos.amount}</p>
                    <p className="text-xs text-muted-foreground">USDT</p>
                  </div>
                </div>

                {/* Прогресс */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                    <span>Прогресс</span>
                    <span>{pos.daysLeft ? `Осталось ${pos.daysLeft} дн.` : "Гибкий — снять в любой момент"}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full progress-neon transition-all" style={{ width: `${pos.progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Заработано: </span>
                    <span className="text-emerald-400 font-mono-custom font-semibold">+{pos.earned} USDT</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="glass rounded-xl px-4 py-2 text-xs text-cyan-400 hover:bg-cyan-500/10 transition-colors border border-cyan-500/20">
                      Получить награду
                    </button>
                    <button className="glass rounded-xl px-4 py-2 text-xs text-muted-foreground hover:text-white transition-colors">
                      Вывести
                    </button>
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
