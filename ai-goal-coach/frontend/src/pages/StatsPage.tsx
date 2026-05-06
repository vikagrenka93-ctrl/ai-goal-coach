import CalendarView from "../components/CalendarView";
import StatsChart from "../components/StatsChart";

export default function StatsPage() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
      <StatsChart />
      <CalendarView />
    </div>
  );
}

