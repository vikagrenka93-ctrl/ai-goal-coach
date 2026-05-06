import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalCard, { type Goal } from "../components/GoalCard";
import AddGoalModal from "../components/AddGoalModal";

export default function GoalsPage() {
  const nav = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([
    { id: "g1", title: "Пробежать 5 км", description: "3 раза в неделю", completedTasks: 2, totalTasks: 8 }
  ]);

  return (
    <div>
      <div className="card">
        <div className="cardHeader">
          <div>
            <div className="cardTitle">🎯 Все цели</div>
            <div className="cardSubtitle">Список целей пользователя (пока демо-данные).</div>
          </div>
          <button className="btn btnPrimary" onClick={() => setModalOpen(true)}>
            ➕ Добавить
          </button>
        </div>
      </div>

      <div style={{ height: 14 }} />

      <div className="btnRow">
        {goals.map((g) => (
          <div key={g.id} style={{ flex: "1 1 340px" }}>
            <GoalCard goal={g} onOpen={() => nav(`/goals/${g.id}`)} />
          </div>
        ))}
      </div>

      <AddGoalModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(g) => {
          const id = crypto.randomUUID();
          setGoals((prev) => [
            { id, title: g.title, description: g.description, completedTasks: 0, totalTasks: 0 },
            ...prev
          ]);
        }}
      />
    </div>
  );
}

