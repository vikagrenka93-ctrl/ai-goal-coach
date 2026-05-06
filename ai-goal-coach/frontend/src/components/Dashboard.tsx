import { useMemo, useState } from "react";
import PremiumBanner from "./PremiumBanner";
import TaskList, { type Task } from "./TaskList";
import GoalCard, { type Goal } from "./GoalCard";
import AddGoalModal from "./AddGoalModal";

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  const [goals, setGoals] = useState<Goal[]>([
    { id: "g1", title: "Пробежать 5 км", description: "3 раза в неделю", completedTasks: 2, totalTasks: 8 },
    { id: "g2", title: "Английский B2", description: "30 минут в день", completedTasks: 4, totalTasks: 12 }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: "t1", title: "Пробежка 20 минут", done: false },
    { id: "t2", title: "Упражнение на аудирование", done: true }
  ]);

  const overallPct = useMemo(() => {
    const total = goals.reduce((a, g) => a + g.totalTasks, 0);
    const done = goals.reduce((a, g) => a + g.completedTasks, 0);
    return total === 0 ? 0 : Math.round((done / total) * 100);
  }, [goals]);

  return (
    <div className="grid">
      <div>
        <div className="card">
          <div className="cardHeader">
            <div>
              <div className="cardTitle">Сегодня</div>
              <div className="cardSubtitle">
                Общий прогресс: <strong>{overallPct}%</strong>
              </div>
            </div>
            <button className="btn btnPrimary" onClick={() => setModalOpen(true)}>
              ➕ Цель
            </button>
          </div>

          <TaskList
            tasks={tasks}
            onToggle={(id) =>
              setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
            }
          />
        </div>

        <div style={{ height: 14 }} />

        <div className="card">
          <div className="cardHeader">
            <div>
              <div className="cardTitle">Активные цели</div>
              <div className="cardSubtitle">Выберите цель, чтобы посмотреть план и отметки.</div>
            </div>
          </div>

          <div className="btnRow">
            {goals.map((g) => (
              <div key={g.id} style={{ flex: "1 1 320px" }}>
                <GoalCard goal={g} onOpen={() => {}} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <PremiumBanner onUpgrade={() => {}} />
        <div className="card">
          <div className="cardTitle">🧠 Коуч</div>
          <div className="cardSubtitle">
            Маленький шаг сегодня важнее идеального плана. Выберите одну задачу и сделайте её за 10 минут.
          </div>
          <div className="hr" />
          <div className="btnRow">
            <button className="btn btnPrimary">Получить мотивацию</button>
            <button className="btn">Сгенерировать план</button>
          </div>
        </div>
      </div>

      <AddGoalModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(g) => {
          setGoals((prev) => [
            { id: crypto.randomUUID(), title: g.title, description: g.description, completedTasks: 0, totalTasks: 0 },
            ...prev
          ]);
        }}
      />
    </div>
  );
}

