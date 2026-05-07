import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Icon from "@/components/ui/icon";
import Dashboard from "@/components/Dashboard";
import Staking from "@/components/Staking";
import Swap from "@/components/Swap";

type Tab = "dashboard" | "staking" | "swap";

const tabs = [
  { id: "dashboard" as Tab, label: "Кошелёк", icon: "Wallet" },
  { id: "staking" as Tab, label: "Стейкинг", icon: "Lock" },
  { id: "swap" as Tab, label: "Обмен", icon: "Repeat2" },
];

const AppContent = () => {
  const [active, setActive] = useState<Tab>("dashboard");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Шапка */}
      <header className="sticky top-0 z-50 glass border-b border-white/5 px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center animate-pulse-glow"
            style={{ background: "linear-gradient(135deg, #00ffd1, #a855f7)" }}
          >
            <span className="text-xs font-black text-black">CV</span>
          </div>
          <span className="font-bold text-white tracking-tight font-syne">CryptoVault</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="glass rounded-full px-3 py-1.5 flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-mono-custom">TRC-20</span>
          </div>
          <button className="glass rounded-xl p-2 hover:bg-white/5 transition-colors">
            <Icon name="Bell" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Контент */}
      <main className="flex-1 overflow-auto pb-24">
        {active === "dashboard" && <Dashboard />}
        {active === "staking" && <Staking />}
        {active === "swap" && <Swap />}
      </main>

      {/* Нижняя навигация */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 px-4 py-2">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className="flex flex-col items-center gap-1 py-2 px-5 rounded-2xl transition-all relative"
                style={{ background: isActive ? "rgba(0,255,209,0.08)" : "transparent" }}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl border border-cyan-500/30" />
                )}
                <Icon
                  name={tab.icon as never}
                  size={20}
                  className={isActive ? "text-cyan-400" : "text-muted-foreground"}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: isActive ? "#00ffd1" : undefined }}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: "#00ffd1" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <AppContent />
  </TooltipProvider>
);

export default App;
