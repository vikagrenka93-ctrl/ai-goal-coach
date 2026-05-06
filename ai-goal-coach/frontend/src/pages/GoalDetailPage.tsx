import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TaskList, { type Task } from "../components/TaskList";

export default function GoalDetailPage() {
  const { goalId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([
    { id: "t1", title: "Сформировать план на неделю", done: true },
    { id: "t2", title: "Сделать тренировку 1", done: false },
    { id: "t3", title: "Сделать тренировку 2", done: false }
  ]);

  const done = useMemo(() => tasks.filter((t) => t.done).length, [tasks]);

  return (
    <div>
      <div className="card">
        <div className="cardHeader">
          <div>
            <div className="cardTitle">Цель: {goalId}</div>
            <div className="cardSubtitle">
              Задачи: {done}/{tasks.length}
            </div>
          </div>
          <Link className="pill" to="/goals">
            ← Назад
          </Link>
        </div>
        <div className="hr" />
        <TaskList
          tasks={tasks}
          onToggle={(id) =>
            setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
          }
        />
      </div>
    </div>
  );
}

