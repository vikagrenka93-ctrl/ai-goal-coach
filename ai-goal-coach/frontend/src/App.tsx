import { NavLink, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import GoalsPage from "./pages/GoalsPage";
import GoalDetailPage from "./pages/GoalDetailPage";
import StatsPage from "./pages/StatsPage";
import SettingsPage from "./pages/SettingsPage";
import { useTelegramWebApp } from "./hooks/useTelegramWebApp";

function PillLink(props: { to: string; label: string }) {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }) => `pill ${isActive ? "pillActive" : ""}`}
    >
      {props.label}
    </NavLink>
  );
}

export default function App() {
  const tg = useTelegramWebApp();

  return (
    <div className="container">
      <div className="topbar">
        <div className="brand">
          <div className="logo" />
          <div className="brandTitle">
            <strong>AI Goal Coach</strong>
            <span className="muted">{tg.isTelegram ? "Telegram WebApp" : "Web"}</span>
          </div>
        </div>

        <nav className="nav">
          <PillLink to="/" label="Дашборд" />
          <PillLink to="/goals" label="Цели" />
          <PillLink to="/stats" label="Статистика" />
          <PillLink to="/settings" label="Настройки" />
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/goals/:goalId" element={<GoalDetailPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

